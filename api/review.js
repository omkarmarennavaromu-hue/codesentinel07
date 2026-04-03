// api/review.js — Vercel Serverless Function
// No npm packages needed. Uses native fetch (built into Node 18+).
// Calls OpenRouter → Qwen Coder model → returns JSON review

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, prompt } = req.body || {};
  if (!code) return res.status(400).json({ error: 'Missing code in request body.' });

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set. Add it in Vercel → Settings → Environment Variables.' });

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://codesentinel.vercel.app',
        'X-Title': 'CodeSentinel AI'
      },
      body: JSON.stringify({
        model: 'qwen/qwen-2.5-coder-32b-instruct',
        messages: [
          { role: 'system', content: 'You are CodeSentinel AI. Return ONLY valid JSON. No markdown. No text outside the JSON object.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 4096,
        temperature: 0.15,
        response_format: { type: 'json_object' }
      })
    });

    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      return res.status(502).json({ error: e?.error?.message || `OpenRouter error: ${r.status}` });
    }

    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return res.status(502).json({ error: 'Empty response from AI.' });

    return res.status(200).json({ result: content });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error.' });
  }
}
