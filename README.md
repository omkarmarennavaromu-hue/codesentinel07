# ⬡ CodeSentinel AI
> Built by **Omkar R Marennavar** | Powered by Qwen AI

## Files
```
code-review-ai/
├── index.html       ← Landing page
├── app.html         ← Reviewer UI (no language selector — AI auto-detects)
├── api/
│   └── review.js   ← Vercel serverless function → OpenRouter → Qwen
├── vercel.json      ← Routing config
├── .gitignore       ← Keeps .env safe
└── README.md
```

## What you get per review
- 🧠 Auto language detection (C, C++, Python, Java, JavaScript + more)
- 🐛 Bugs & errors with line numbers
- 🔐 Security vulnerabilities with fixes
- ⚡ Time & space complexity (Big-O)
- 🎯 Quality score /10
- ✨ Fixed & optimized code

## Deploy in 4 steps

### 1. Get OpenRouter API key
- Go to https://openrouter.ai/keys
- Create key → Add $2-5 credits

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "CodeSentinel AI"
git remote add origin https://github.com/YOUR_USERNAME/code-review-ai.git
git push -u origin main
```

### 3. Deploy on Vercel
- Go to https://vercel.com
- New Project → Import your repo → Deploy

### 4. Add API key
- Vercel Dashboard → Project → Settings → Environment Variables
- Name: `OPENROUTER_API_KEY`
- Value: your key from step 1
- Click Save → Redeploy

**Done. Your app is live!**

---
No npm. No node_modules. No build step. Pure HTML + CSS + JS + one serverless function.
