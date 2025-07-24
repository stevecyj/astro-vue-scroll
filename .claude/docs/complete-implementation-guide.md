# 動態頁面轉場系統完整實作指南

基於 commit a3fae4e 的頁面轉場系統分析與跨框架實作指南。

## 🎯 系統概述

### 核心特色
- **智能方向檢測**: 根據頁面類型自動調整轉場方向
- **動態 CSS 分配**: JavaScript 運行時修改 `view-transition-name`
- **視覺一致性**: 確保不同頁面類型間的轉場邏輯合理
- **框架無關性**: 可適配任何支援 View Transitions API 的框架

### 轉場邏輯矩陣

| 來源頁面 | 目標頁面 | 退出動畫 | 進入動畫 | 視覺效果 |
|----------|----------|----------|----------|----------|
| Special → Normal | 特殊→普通 | slide-out-up | slide-in-down | 向上推出 |
| Special → Special | 特殊→特殊 | slide-out-down | slide-in-up | 向下推出，向上進入 |
| Normal → Special | 普通→特殊 | slide-out-down | slide-in-up | 向下推出，向上進入 |
| Normal → Normal | 普通→普通 | slide-out-up | slide-in-down | 向上推出 *(預設)* |

## 📋 實作步驟

### Phase 1: 基礎架構設置

#### 1.1 CSS 動畫系統
```bash
# 複製 CSS 動畫模板
cp .claude/templates/css-animations.css src/styles/transitions.css
```

**必要 CSS 規則:**
- `@view-transition { navigation: auto; }`
- 4 組 keyframe 動畫: `slide-out-up/down`, `slide-in-up/down`
- 預設轉場: `::view-transition-old/new(root)`
- 特殊頁面轉場: 固定 transition names
- 動態轉場: 運行時分配的 transition names
- 無障礙支援: `@media (prefers-reduced-motion: reduce)`

#### 1.2 JavaScript 邏輯核心
```bash
# 複製轉場邏輯模板
cp .claude/templates/transition-logic.js src/scripts/transitions.js
```

**核心組件:**
- `PageTransitionManager` 類別
- 事件監聽器設置
- 頁面類型檢測邏輯
- 動態 `view-transition-name` 分配

### Phase 2: 頁面分類系統

#### 2.1 特殊頁面 (Special Pages)
**定義:** 主要入口頁面，通常是首頁、關於頁面等

**設置要求:**
```html
<!-- HTML 屬性 -->
<div data-page-type="special">

<!-- CSS 固定 transition name -->
.hero-section {
  view-transition-name: hero-page;
}

.about-section {
  view-transition-name: about-page;
}
```

**配置映射:**
```javascript
const config = {
  specialPages: ['/', '/about', '/who-we-are'],
  specialPageNames: {
    '/': 'hero-page',
    '/about': 'about-page',
    '/who-we-are': 'about-page'
  }
}
```

#### 2.2 普通頁面 (Normal Pages)
**定義:** 內容頁面，如部落格、新聞、聯絡等

**設置要求:**
```html
<!-- HTML 屬性 -->
<div data-page-type="normal">
<!-- 不需要固定的 view-transition-name -->
```

### Phase 3: 框架整合

#### 3.1 Astro 整合
```astro
<!-- Layout.astro -->
<ClientRouter />
<script>
  import { initAstroTransitions } from './transitions.js';
  
  const transitionManager = initAstroTransitions({
    specialPages: ['/', '/about'],
    debug: import.meta.env.DEV
  });
</script>
```

**事件監聽:** `astro:before-preparation`

#### 3.2 Next.js 整合
```tsx
// TransitionProvider.tsx
import { PageTransitionManager } from './transitions';

useEffect(() => {
  const transitionManager = new PageTransitionManager({
    // 配置...
  });
  
  // 覆寫事件監聽使用 Next.js 路由
  transitionManager.setupEventListeners = function() {
    // Next.js 路由事件邏輯
  };
}, []);
```

**事件監聽:** 路由變化檢測 + history API 攔截

#### 3.3 其他框架適配
- **Nuxt**: `page:before-navigate` hook
- **SvelteKit**: `beforeNavigate` + `afterNavigate`
- **Vue Router**: `beforeEach` navigation guard
- **React Router**: 導航攔截器

### Phase 4: 測試與優化

#### 4.1 功能測試檢查清單
- [ ] 所有頁面類型組合的轉場測試
- [ ] 瀏覽器前進/後退功能
- [ ] 直接 URL 訪問
- [ ] 無障礙功能 (prefers-reduced-motion)
- [ ] 效能測試 (低階設備)

#### 4.2 視覺效果驗證
- [ ] 轉場方向符合邏輯矩陣
- [ ] 動畫流暢度
- [ ] 不同螢幕尺寸的適配
- [ ] 動畫時長一致性

## 🎨 自定義配置指南

### 調整動畫參數

```css
/* 修改動畫時長 */
::view-transition-old(root) {
  animation-duration: 0.4s; /* 更快 */
}

/* 自定義緩動函數 */
::view-transition-new(hero-page) {
  animation: slide-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 添加新的轉場效果 */
@keyframes fade-transition {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

### 擴展頁面類型

```javascript
const config = {
  specialPages: ['/', '/landing', '/home', '/about'],
  specialPageNames: {
    '/': 'main-page',
    '/landing': 'landing-page',
    '/home': 'home-page',
    '/about': 'about-page'
  },
  
  // 新增：子分類系統
  pageCategories: {
    'content': ['normal'],
    'marketing': ['special'],
    'admin': ['normal']
  }
};
```

### 條件式轉場

```javascript
const transitionManager = new PageTransitionManager({
  // 基於用戶偏好的條件轉場
  shouldTransition: (fromType, toType) => {
    const userPreference = localStorage.getItem('animation-level');
    const isLowPowerMode = navigator.hardwareConcurrency < 4;
    
    return userPreference !== 'minimal' && !isLowPowerMode;
  },
  
  // 自定義轉場邏輯
  customTransitionLogic: (currentElement, currentType, targetType) => {
    // 實作自定義轉場規則
  }
});
```

## 🎭 進階功能實作

### 轉場狀態管理

```javascript
class AdvancedTransitionManager extends PageTransitionManager {
  constructor(config) {
    super(config);
    this.transitionHistory = [];
    this.isTransitioning = false;
  }
  
  handleTransition(targetUrl) {
    if (this.isTransitioning) {
      this.log('轉場進行中，跳過');
      return;
    }
    
    this.isTransitioning = true;
    this.transitionHistory.push({
      from: window.location.pathname,
      to: targetUrl,
      timestamp: Date.now()
    });
    
    super.handleTransition(targetUrl);
    
    // 轉場完成後重置狀態
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600); // 配合動畫時長
  }
}
```

### 效能監控

```javascript
const transitionManager = new PageTransitionManager({
  debug: true,
  
  // 效能追蹤
  onTransitionStart: (data) => {
    console.time(`transition-${data.from}-${data.to}`);
    
    // 發送到分析服務
    analytics.track('page_transition_start', {
      from: data.from,
      to: data.to,
      type: `${data.fromType}-${data.toType}`
    });
  },
  
  onTransitionEnd: (data) => {
    console.timeEnd(`transition-${data.from}-${data.to}`);
    
    analytics.track('page_transition_complete', data);
  },
  
  // 錯誤處理
  onError: (error, context) => {
    console.error('轉場錯誤:', error, context);
    
    // 後備處理：停用轉場
    document.documentElement.style.setProperty(
      '--transition-duration', '0s'
    );
  }
});
```

### A/B 測試支援

```javascript
class ABTestTransitionManager extends PageTransitionManager {
  constructor(config) {
    super(config);
    this.testVariant = this.getABTestVariant();
  }
  
  getABTestVariant() {
    const variants = ['default', 'fast', 'smooth', 'minimal'];
    const userVariant = localStorage.getItem('transition-test-variant');
    
    if (!userVariant) {
      const randomVariant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem('transition-test-variant', randomVariant);
      return randomVariant;
    }
    
    return userVariant;
  }
  
  applyTransitionLogic(currentElement, currentType, targetType) {
    switch (this.testVariant) {
      case 'fast':
        this.applyFastTransition(currentElement);
        break;
      case 'smooth':
        this.applySmoothTransition(currentElement);
        break;
      case 'minimal':
        // 不應用任何轉場
        break;
      default:
        super.applyTransitionLogic(currentElement, currentType, targetType);
    }
  }
}
```

## 🚀 最佳實踐建議

### 1. 效能優化
- **預載入關鍵資源**: 確保轉場目標頁面的關鍵資源已預載入
- **使用 `will-change`**: 為進行轉場的元素添加 `will-change: transform`
- **避免複雜動畫**: 在低階設備上簡化或停用轉場
- **批量 DOM 操作**: 減少轉場期間的 DOM 修改

### 2. 用戶體驗
- **提供關閉選項**: 允許用戶停用動畫
- **響應式適配**: 確保在不同螢幕尺寸下都有良好效果
- **載入狀態**: 為長時間轉場提供載入指示器
- **錯誤後備**: 轉場失敗時的優雅降級

### 3. 開發維護
- **模組化設計**: 將轉場邏輯與業務邏輯分離
- **配置驅動**: 通過配置文件管理轉場規則
- **充分測試**: 涵蓋所有頁面組合和邊界情況
- **文檔完整**: 為團隊提供清晰的使用指南

### 4. 瀏覽器兼容性
- **功能檢測**: 檢查 View Transitions API 支援
- **漸進增強**: 在不支援的瀏覽器中優雅降級
- **Polyfill 使用**: 考慮使用轉場 polyfill 擴展支援

```javascript
// 功能檢測範例
const supportsViewTransitions = 'startViewTransition' in document;

if (supportsViewTransitions) {
  // 啟用轉場系統
  const transitionManager = new PageTransitionManager(config);
} else {
  // 使用傳統導航
  console.log('瀏覽器不支援 View Transitions API');
}
```

## 🐛 故障排除指南

### 常見問題與解決方案

#### 1. 轉場不生效
**可能原因:**
- View Transitions API 不支援
- `data-page-type` 屬性缺失
- CSS 動畫定義錯誤

**檢查步驟:**
```javascript
// Debug 檢查
console.log('支援 View Transitions:', 'startViewTransition' in document);
console.log('當前頁面元素:', document.querySelector('[data-page-type]'));
console.log('Computed styles:', window.getComputedStyle(element).viewTransitionName);
```

#### 2. 動畫方向錯誤
**可能原因:**
- 頁面類型配置錯誤
- URL 匹配邏輯問題
- 動態 transition name 分配失敗

**檢查步驟:**
```javascript
// 啟用 debug 模式
const transitionManager = new PageTransitionManager({
  debug: true,
  verbose: true
});
```

#### 3. 效能問題
**可能原因:**
- 複雜的動畫計算
- DOM 操作過於頻繁
- 記憶體洩漏

**解決方案:**
```javascript
// 效能優化配置
const transitionManager = new PageTransitionManager({
  // 在低階設備上簡化動畫
  simplifyOnLowEnd: true,
  
  // 限制轉場頻率
  debounceMs: 100,
  
  // 自動清理
  autoCleanup: true
});
```

#### 4. SSR/Hydration 問題
**解決方案:**
```javascript
// 延遲初始化避免 hydration 問題
useEffect(() => {
  // 確保在客戶端環境初始化
  if (typeof window !== 'undefined') {
    const transitionManager = new PageTransitionManager(config);
  }
}, []);
```

## 📊 實作檢查清單

### 基礎設置
- [ ] CSS 動畫規則已定義
- [ ] JavaScript 轉場邏輯已實作
- [ ] 框架事件監聽已設置
- [ ] 頁面分類系統已建立

### 功能測試
- [ ] Special → Normal 轉場測試
- [ ] Special → Special 轉場測試
- [ ] Normal → Special 轉場測試
- [ ] Normal → Normal 轉場測試
- [ ] 瀏覽器歷史導航測試
- [ ] 直接 URL 訪問測試

### 體驗優化
- [ ] 無障礙功能支援
- [ ] 響應式設計適配
- [ ] 載入效能優化
- [ ] 錯誤處理機制

### 生產準備
- [ ] 瀏覽器兼容性測試
- [ ] 效能監控設置
- [ ] 使用者設定選項
- [ ] 文檔和維護指南

這個完整的實作指南提供了從分析到部署的全面指導，確保你能成功在任何專案中實作這個動態頁面轉場系統。