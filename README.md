# ⚽ World Cup Predictor

A simple, single-page **World Cup match predictor** built with **React + Vite + TypeScript + Tailwind CSS**. No backend, no database — everything runs in the browser, so it deploys cleanly to **GitHub Pages**.

Pick two teams, fine-tune their ratings (overall / attack / defense / form), hit **Predict**, and get:

- 🟦 Team A win probability
- ⬜ Draw probability
- 🟥 Team B win probability
- 🎯 A recommended scoreline
- 📝 A short, human-readable explanation

---

## ✨ Features

- Choose any two teams from a built-in list (`src/data/teams.ts`).
- Each team ships with default ratings you can adjust live with sliders.
- Prediction logic based on a weighted strength model + logistic probability curve (`src/utils/predict.ts`).
- Clean, modern, football-themed UI.
- 100% static — perfect for GitHub Pages.

---

## 🧱 Project structure

```
world-cup-predictor/
├─ .github/workflows/deploy.yml   # auto-deploy to GitHub Pages
├─ index.html
├─ package.json
├─ vite.config.ts                 # set `base` here for Pages
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ index.css
   ├─ data/
   │  └─ teams.ts                 # teams + default ratings
   ├─ utils/
   │  └─ predict.ts               # prediction logic
   └─ components/
      ├─ TeamSelector.tsx
      ├─ RatingEditor.tsx
      └─ PredictionResult.tsx
```

---

## 🚀 Run locally

Requires **Node.js 18+**.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>).

To build and preview the production bundle locally:

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to GitHub Pages

There are two supported ways. **Option A (GitHub Actions) is recommended.**

### Before you start: set the `base` path

In `vite.config.ts`, `base` **must match your repository name**:

```ts
// repo: https://github.com/<user>/world-cup-predictor
base: '/world-cup-predictor/',
```

If you rename the repo, update this value too.

---

### Option A — GitHub Actions (recommended, auto-deploy on push)

1. Create a GitHub repo and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: World Cup Predictor"
   git branch -M main
   git remote add origin https://github.com/<user>/world-cup-predictor.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.
4. Your site will be live at:
   ```
   https://<user>.github.io/world-cup-predictor/
   ```

---

### Option B — Manual deploy with `gh-pages`

This project includes the `gh-pages` package and a `deploy` script.

```bash
npm run deploy
```

This builds the app and pushes the `dist/` folder to a `gh-pages` branch. Then, in **Settings → Pages**, set the source to the **`gh-pages` branch / root**.

---

## 🧮 How the prediction works

1. Each team's four ratings are combined into one **strength** score
   (overall is weighted highest; attack, defense, and form share the rest).
2. The strength **difference** is fed through a **logistic curve** to estimate win probability.
3. **Draw probability** is highest when the teams are evenly matched and shrinks as the gap grows.
4. A **recommended scoreline** is derived from each side's attack vs. the opponent's defense, then nudged to agree with the most likely outcome.

It's intentionally lightweight and transparent — easy to read and tweak in `src/utils/predict.ts`.

> ⚠️ Ratings are illustrative and predictions are just for fun — not betting advice.

---

## 🛠️ Customize

- **Add / edit teams:** `src/data/teams.ts`
- **Change the math:** `src/utils/predict.ts`
- **Restyle:** Tailwind classes in `src/components/*` and `tailwind.config.js`

---

## 📄 License

MIT — do whatever you like.
