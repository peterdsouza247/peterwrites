# Peter Brendan — Author Website

Dark fantasy author site for Peter Brendan. Built with React + Vite.

## Before You Deploy

Open `src/App.jsx` and replace the placeholder Amazon and Goodreads links:

```js
const BOOKS = [
  {
    id: "legacy",
    amazon: "https://amazon.com",    // ← Replace with your real link
    goodreads: "https://goodreads.com", // ← Replace with your real link
  },
  // ... same for ash and scoot
]
```

---

## Deploy to GitHub Pages (Free — Recommended)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2 — Create a new repository
- Click the **+** icon → **New repository**
- Name it: `peter-brendan-site` (or anything you like)
- Set it to **Public**
- Do NOT initialise with a README
- Click **Create repository**

### Step 3 — Upload your files
On your new repo page, click **uploading an existing file**, then drag and drop ALL files from this folder (including the `.github` folder — make sure hidden folders are visible on your computer).

Or if you have Git installed, run in your terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/peter-brendan-site.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Under **Source**, select **GitHub Actions**
- Save

### Step 5 — Wait ~2 minutes
GitHub will automatically build and deploy your site. You'll find it at:
`https://YOUR_USERNAME.github.io/peter-brendan-site/`

---

## Custom Domain (e.g. peterbrendan.com)

1. Buy a domain from [Namecheap](https://namecheap.com) (~$12/year)
2. In GitHub Pages settings, enter your custom domain
3. In your domain's DNS settings, add these records:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  YOUR_USERNAME.github.io
   ```
4. Wait up to 24 hours for DNS to propagate

---

## Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## Making Changes

All content is in `src/App.jsx`. Key sections to update:

| What | Where in App.jsx |
|---|---|
| Book links | `const BOOKS = [...]` |
| Book descriptions | `blurb:` field in each book |
| Bio text | Inside `#about` section |
| Oracle questions | `const QUIZ = [...]` |
