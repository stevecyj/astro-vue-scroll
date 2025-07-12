# Astro Vue 垂直滾動頁面切換

使用 Astro 4.0 + Vue 3 + View Transitions API 建立的垂直滾動頁面切換效果展示專案。

## 功能特色

- ✅ Astro 4.0 + Vue 3 整合
- ✅ View Transitions API 垂直滾動切換動畫
- ✅ 6 個不同主題的頁面：Home, Who We Are, Live Casino, News, Contact Us, Blog
- ✅ 固定導航列設計
- ✅ 響應式布局
- ✅ 每個頁面不同的背景色系和內容

## 頁面展示

1. **Home** - 藍紫色漸層，歡迎頁面
2. **Who We Are** - 綠色漸層，團隊介紹
3. **Live Casino** - 深色漸層，遊戲展示
4. **News** - 紫綠色漸層，新聞資訊
5. **Contact Us** - 藍紫色漸層，聯絡表單
6. **Blog** - 粉色漸層，部落格文章

## 動畫效果

- 舊頁面向上滑出 (slide-out-up)
- 新頁面從上方滑入 (slide-in-down)
- 動畫時間: 0.6秒
- 支援 prefers-reduced-motion 設定

## 🚀 專案結構

```text
/
├── public/
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── who-we-are.astro
│   │   ├── live-casino.astro
│   │   ├── news.astro
│   │   ├── contact.astro
│   │   └── blog.astro
│   └── components/
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 技術架構

- **框架**: Astro 4.0
- **前端框架**: Vue 3
- **動畫**: View Transitions API
- **樣式**: 原生 CSS + CSS Grid + Flexbox
- **響應式**: Mobile-first 設計

## 特色說明

這個專案展示了如何使用 Astro 的 View Transitions API 來實現流暢的垂直滾動頁面切換效果。每個頁面都有獨特的設計主題和背景色系，適合作為現代網站的基礎模板。
