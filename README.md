# ⚽ World Cup Predictor / 2026 世界杯预测器

A simple, single-page **World Cup match predictor** built with **React + Vite + TypeScript + Tailwind CSS**. No backend, no database — everything runs in the browser, so it deploys cleanly to **GitHub Pages**.

---

## 🇨🇳 中文说明

一个纯前端的 **2026 世界杯比赛预测器**，使用 **React + Vite + TypeScript + Tailwind CSS** 构建，无后端、无数据库，可直接部署到 **GitHub Pages**。

### 核心功能

- 🇨🇳 **全中文界面**，世界杯/足球氛围设计。
- 📋 内置 2026 美加墨世界杯 **48 支参赛球队**（A–L 共 12 个小组），含国旗、中文名、英文名、三字母代码。
- 🔎 **可搜索的球队选择组件**：支持输入「中文名 / 英文名 / 三字母代码」检索，例如 `巴西` / `Brazil` / `BRA` 都能找到巴西；搜索框为空时显示全部球队，无结果时显示「未找到球队」。
- 🚫 选择 Team A 后，Team B 不能再选同一支球队。
- 🎚️ 六项实力评分（综合 / 进攻 / 防守 / 状态 / 世界杯经验 / 稳定性），其中四项可在界面上实时调整。
- 📈 **预期进球 + 泊松分布** 预测模型：输出胜平负概率、双方预期进球、**Top 3 最可能比分**、预测可信度与中文预测分析。
- 🏁 **已完赛优先**：若所选两队对应一场已完赛比赛，页面会**优先展示真实赛果**并给出**赛后复盘**（方向是否正确、是否命中比分、净胜球/总进球误差）。
- 🔁 **双向匹配**：无论先选哪支球队，都能匹配同一场比赛，且比分按你选择的左右顺序正确显示。
- 💾 **赛前预测快照**：对未开赛比赛点击预测时，结果会保存到浏览器 `localStorage`；该场比赛完赛后优先用快照复盘（失败时自动回退，不影响页面）。
- 🈳 打开页面时两队均为空，仅显示「请选择两支球队，开始预测比赛结果」，不会默认展示任何比赛。
- 📱 简洁现代的世界杯风格 UI，含小组标签，移动端自适应。

> 已完赛比赛**优先显示真实赛果**，模型预测仅作为「赛后复盘」用于分析模型效果，不会覆盖真实结果。

### 本地运行（需 Node.js 18+）

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器（默认 http://localhost:5173）
npm run build   # 生产构建
npm run preview # 本地预览生产产物
```

### 部署到 GitHub Pages

1. 在 `vite.config.ts` 中将 `base` 改为你的仓库名，例如 `'/world-cup-predictor/'`。
2. 推送到 GitHub，在 **Settings → Pages → Source** 选择 **GitHub Actions**，仓库内置的工作流会在每次推送 `main` 时自动构建并部署。
3. 站点地址：`https://<用户名>.github.io/world-cup-predictor/`。

> ⚠️ **免责声明**：本工具为学习和娱乐项目。预测结果基于简化评分模型，不代表真实比赛结果。已完赛比赛会优先显示真实赛果，赛后复盘仅用于模型效果分析。

> 📄 本项目以 [MIT License](./LICENSE) 开源。

---

## 🇬🇧 English

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
