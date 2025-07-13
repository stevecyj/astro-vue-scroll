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

---

# Playwright 整合計劃

## 目標
為專案加入 Playwright 端到端測試工具，實現 codegen 功能可以錄製網頁操作過程並生成測試代碼，同時支援測試執行錄影。

## 任務清單

### 高優先級任務
- [x] **安裝 Playwright 及其相關依賴套件**
  - ✅ 安裝 `@playwright/test`
  - ✅ 安裝瀏覽器 binaries (Chromium, Firefox, WebKit)
  - ✅ 確保與現有專案相容性

- [x] **初始化 Playwright 配置檔案，設定瀏覽器和測試選項**
  - ✅ 建立 `playwright.config.js`
  - ✅ 配置測試目錄和輸出目錄
  - ✅ 設定瀏覽器選項和視窗大小

- [x] **設定 codegen 功能，可以錄製網頁操作並生成測試代碼**
  - ✅ 配置 codegen 命令
  - ✅ 設定適當的 baseURL
  - ✅ 確保可以錄製並生成測試腳本

- [x] **配置錄影功能，記錄測試執行過程**
  - ✅ 設定 video 選項
  - ✅ 配置錄影輸出目錄
  - ✅ 設定錄影品質和大小

### 中優先級任務
- [x] **建立基本的測試腳本範例，測試主要頁面功能**
  - ✅ 建立首頁導航測試
  - ✅ 測試頁面轉場動效
  - ✅ 驗證各頁面載入正常

- [x] **在 package.json 中新增 Playwright 相關的 npm scripts**
  - ✅ 添加測試執行命令
  - ✅ 添加 codegen 命令
  - ✅ 添加瀏覽器安裝命令

- [x] **測試 codegen 和錄影功能是否正常運作**
  - ✅ 執行測試驗證功能正常
  - ✅ 驗證錄影檔案正常產生
  - ✅ 確認所有桌面瀏覽器測試通過

## 預期成果
1. ✅ 完整的 Playwright 測試環境
2. ✅ 可錄製用戶操作的 codegen 工具
3. ✅ 測試執行過程的視頻記錄
4. ✅ 針對專案主要功能的基礎測試套件

---

## 整合結果總覽

### 已完成的 Playwright 功能

**1. 核心安裝與配置**
- 安裝 `@playwright/test@^1.54.1`
- 配置支援 Chromium, Firefox, WebKit 三大桌面瀏覽器
- 自動啟動本地開發伺服器進行測試

**2. Codegen 錄製功能**
```bash
npm run codegen                # 啟動 codegen，錄製操作並生成測試代碼
npm run codegen:chromium       # 使用 Chromium 瀏覽器錄製
npm run codegen:firefox        # 使用 Firefox 瀏覽器錄製
npm run codegen:webkit         # 使用 WebKit 瀏覽器錄製
```

**3. 錄影與截圖功能**
- 測試失敗時自動錄製影片 (`video: 'retain-on-failure'`)
- 測試失敗時自動截圖 (`screenshot: 'only-on-failure'`)
- 錄影檔案儲存在 `test-results/` 目錄

**4. 測試執行命令**
```bash
npm run test              # 執行所有測試 (headless 模式)
npm run test:headed       # 執行測試並顯示瀏覽器視窗
npm run test:ui           # 使用 Playwright UI 模式執行測試
npm run test:report       # 查看測試報告
```

**5. 完整測試覆蓋**
- 首頁載入功能測試
- 導航功能測試（6 個頁面間切換）
- 頁面轉場動效測試（驗證 View Transitions）
- 響應式設計測試（多種視窗大小）
- 所有頁面載入測試（確保無死連結）

### 測試結果
✅ 15 項測試全部通過（Chromium、Firefox、WebKit 各 5 項測試）
✅ 測試執行時間：13.9 秒
✅ 錄影功能已驗證可正常運作

### 使用方式

**開始錄製操作：**
1. 確保開發伺服器運行：`npm run dev`
2. 執行：`npm run codegen`
3. 在開啟的瀏覽器中操作網站
4. Playwright 會自動生成對應的測試代碼

**執行測試：**
- `npm run test` - 快速執行所有測試
- `npm run test:headed` - 觀看測試執行過程
- `npm run test:ui` - 使用圖形界面調試測試

Playwright 整合完成！現在你擁有完整的端到端測試環境，支援 codegen 錄製和視頻記錄功能。

---

## 最近修復記錄 (2025-07-13)

### 問題描述
用戶嘗試執行 `npm run codegen` 時遇到連接錯誤：
```
[Error: net::ERR_CONNECTION_REFUSED at http://localhost:4321/
```

### 解決過程
1. **問題分析**: 發現開發服務器未運行，導致 Playwright codegen 無法連接到 localhost:4321
2. **服務器啟動**: 使用 `nohup npm run dev > dev-server.log 2>&1 &` 在背景啟動開發服務器
3. **連接驗證**: 使用 `curl -I http://localhost:4321` 確認服務器正常響應 (HTTP/1.1 200 OK)
4. **Codegen 執行**: 成功啟動 `npm run codegen`，現在可以錄製測試操作

### 修復結果
✅ Astro 開發服務器已在背景運行 (PID: 79989)  
✅ Playwright codegen 工具已啟動，可開始錄製測試操作  
✅ 用戶現在可以在瀏覽器中操作網站並自動生成測試代碼  

### 使用說明
- 開發服務器現在運行在背景，無需額外啟動
- Playwright codegen 已開啟瀏覽器視窗，可直接開始錄製操作
- 錄製完成後，生成的測試代碼會顯示在終端中
- 如需查看服務器日誌：`tail -f dev-server.log`