# Playwright 測試說明

## 測試檔案結構

- `example.spec.js` - 基本功能測試範例
- 可在此目錄新增更多測試檔案

## 執行測試

### 基本測試執行
```bash
npm run test              # 執行所有測試 (headless 模式)
npm run test:headed       # 執行測試並顯示瀏覽器視窗
npm run test:ui           # 使用 Playwright UI 模式執行測試
```

### Codegen 錄製功能
```bash
npm run codegen                # 啟動 codegen，錄製操作並生成測試代碼
npm run codegen:chromium       # 使用 Chromium 瀏覽器錄製
npm run codegen:firefox        # 使用 Firefox 瀏覽器錄製
npm run codegen:webkit         # 使用 WebKit 瀏覽器錄製
```

### 測試報告
```bash
npm run test:report       # 查看測試報告
```

## Codegen 使用方法

1. 確保開發伺服器正在運行：`npm run dev`
2. 執行 codegen 命令：`npm run codegen`
3. 瀏覽器會自動開啟，你可以在網站上進行操作
4. Playwright 會自動記錄你的操作並生成測試代碼
5. 將生成的代碼複製到測試檔案中

## 測試功能說明

目前的測試涵蓋：
- 首頁載入測試
- 導航功能測試
- 頁面轉場動效測試
- 響應式設計測試
- 所有頁面載入測試

## 錄影功能

測試執行時會自動錄影（僅在測試失敗時保留錄影檔案）：
- 錄影檔案儲存在 `test-results/` 目錄
- 可在 `playwright.config.js` 中調整錄影設定

## 瀏覽器支援

測試會在以下瀏覽器中執行：
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)