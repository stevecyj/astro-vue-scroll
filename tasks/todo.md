# Astro + Vue 專案架構分析

## 專案概覽

這是一個基於 Astro 框架的多頁面網站，整合了 Vue.js 並實現了 View Transitions 功能。專案展示了垂直滾動動效和頁面轉場效果。

## 1. 專案結構分析

### 檔案結構
```
astro-vue-scroll/
├── astro.config.mjs          # Astro 配置檔
├── package.json              # 專案依賴管理
├── tsconfig.json            # TypeScript 配置
├── public/                  # 靜態資源
│   └── favicon.svg
└── src/
    ├── components/          # Vue 元件 (目前為空)
    ├── layouts/            # 佈局模板
    │   └── Layout.astro    # 主要佈局檔案
    └── pages/              # 頁面路由
        ├── index.astro     # 首頁
        ├── blog.astro      # 部落格頁面
        ├── contact.astro   # 聯絡頁面
        ├── who-we-are.astro # 關於我們
        ├── live-casino.astro # 真人娛樂場
        └── news.astro      # 新聞頁面
```

## 2. View Transitions 實現分析

### 核心配置
- **引入方式**: 在 `Layout.astro` 中導入 `ViewTransitions` 元件
- **啟用位置**: 在 `<head>` 區段中添加 `<ViewTransitions />`
- **客戶端支援**: 每個頁面底部都有 `import { ViewTransitions } from "astro:transitions/client"`

### 轉場動效
實現了垂直滑動轉場效果：
- **退出動畫**: `slide-out-up` - 頁面向上滑出（0.6秒）
- **進入動畫**: `slide-in-down` - 新頁面從上方滑入（0.6秒）
- **無障礙支援**: 使用 `@media (prefers-reduced-motion: reduce)` 關閉動畫

### 轉場樣式
```css
::view-transition-old(root) {
  animation: slide-out-up 0.6s ease-in-out;
}
::view-transition-new(root) {
  animation: slide-in-down 0.6s ease-in-out;
}
```

## 3. 頁面路由與佈局系統

### 佈局架構
- **統一佈局**: 所有頁面都使用 `Layout.astro` 作為基礎模板
- **響應式導航**: 固定頂部導航列，包含毛玻璃效果
- **slot 機制**: 使用 Astro 的 `<slot />` 注入頁面內容

### 導航結構
- Home (`/`)
- Who We Are (`/who-we-are`)
- Live Casino (`/live-casino`)
- News (`/news`)
- Contact Us (`/contact`)
- Blog (`/blog`)

### 頁面設計模式
所有頁面遵循相同的設計模式：
- 全高度佈局 (`min-height: calc(100vh - 80px)`)
- 漸層背景
- 置中內容容器
- 統一的視覺風格

## 4. 建置配置與依賴

### 主要依賴
```json
{
  "@astrojs/vue": "^5.1.0",    // Vue 整合
  "astro": "^5.11.0",          // Astro 框架
  "vue": "^3.5.17"             // Vue 3
}
```

### Astro 配置 (astro.config.mjs)
```javascript
export default defineConfig({
  integrations: [vue()],       // 啟用 Vue 整合
  vite: {
    css: {
      transformer: 'postcss'   // CSS 轉換器
    }
  }
});
```

### TypeScript 配置
- 繼承 Astro 嚴格模式配置
- 包含所有專案檔案
- 排除 dist 目錄

## 5. 特殊模式與慣例

### 設計模式
1. **模組化佈局**: 單一 Layout 檔案管理所有共用樣式和結構
2. **漸層背景**: 每頁使用不同色彩的 CSS 漸層
3. **毛玻璃效果**: 導航列和卡片元件使用 `backdrop-filter: blur()`
4. **響應式網格**: 使用 CSS Grid 的 `auto-fit` 和 `minmax`

### 樣式慣例
- 使用 `rgba()` 實現半透明效果
- 統一的過渡動畫時間（0.3s）
- 一致的邊框圓角（15px-50px）
- 標準化的間距系統（1rem, 2rem, 3rem）

### CSS 架構
- **全域樣式**: 在 Layout.astro 中定義基礎重置和導航樣式
- **頁面樣式**: 每個頁面都有獨立的 `<style>` 區塊
- **響應式設計**: 使用現代 CSS Grid 和 Flexbox

## 6. 開發腳本
- `npm run dev`: 開發伺服器
- `npm run build`: 生產建置
- `npm run preview`: 預覽建置結果

## 總結

這是一個結構清晰、設計現代的 Astro + Vue 專案，充分利用了 Astro 的 View Transitions 功能創造流暢的頁面轉場體驗。專案採用了一致的設計語言和架構模式，易於維護和擴展。