# Astro 動態頁面轉場實作指南

基於 commit a3fae4e 的完整 Astro 實作範例。

## 📁 專案結構

```
src/
├── layouts/
│   └── Layout.astro          # 主要佈局文件
├── pages/                    # 頁面路由
│   ├── index.astro          # 首頁 (Special)
│   ├── about.astro          # 關於 (Special)  
│   ├── blog.astro           # 部落格 (Normal)
│   └── contact.astro        # 聯絡 (Normal)
└── components/
    └── PageWrapper.vue      # 頁面包裝組件
```

## 🎨 1. Layout.astro 完整實作

```astro
---
// src/layouts/Layout.astro
import { ClientRouter } from "astro:transitions"

export interface Props {
  title: string
  description?: string
}

const { title, description = "Dynamic Page Transitions Demo" } = Astro.props
---

<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    
    <!-- 啟用 Astro ClientRouter -->
    <ClientRouter />
  </head>
  <body>
    <slot />

    <!-- 全域轉場動畫樣式 -->
    <style is:global>
      /* 匯入轉場動畫 CSS */
      @import "../styles/transitions.css";
    </style>

    <!-- 轉場邏輯腳本 -->
    <script>
      import { initAstroTransitions } from "../scripts/page-transitions.js";
      
      // 初始化轉場系統
      const transitionManager = initAstroTransitions({
        specialPages: ['/', '/about'],
        specialPageNames: {
          '/': 'hero-page',
          '/about': 'about-page'
        },
        debug: import.meta.env.DEV
      });
    </script>
  </body>
</html>
```

## 🧩 2. 頁面組件實作

### 特殊頁面 (Home)

```astro
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro"
import HeroSection from "../components/HeroSection.vue"
---

<Layout title="首頁">
  <HeroSection client:load />
</Layout>
```

```vue
<!-- src/components/HeroSection.vue -->
<template>
  <div class="hero-section" data-page-type="special">
    <nav><!-- 導航組件 --></nav>
    <main>
      <h1>歡迎來到我們的平台</h1>
      <p>體驗未來的線上娛樂...</p>
    </main>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* 固定的 view-transition-name */
  view-transition-name: hero-page;
}
</style>
```

### 普通頁面 (Blog)

```astro
---
// src/pages/blog.astro
import Layout from "../layouts/Layout.astro"
import BlogSection from "../components/BlogSection.vue"
---

<Layout title="部落格">
  <BlogSection client:load />
</Layout>
```

```vue
<!-- src/components/BlogSection.vue -->
<template>
  <div class="blog-section" data-page-type="normal">
    <nav><!-- 導航組件 --></nav>
    <main>
      <h1>我們的部落格</h1>
      <article><!-- 部落格內容 --></article>
    </main>
  </div>
</template>

<style scoped>
.blog-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  
  /* 普通頁面不需要固定的 view-transition-name */
  /* JavaScript 會動態分配 */
}
</style>
```

## ⚙️ 3. 轉場腳本整合

```javascript
// src/scripts/page-transitions.js
import { PageTransitionManager } from "./transition-logic.js";

export function initAstroTransitions(config = {}) {
  return new PageTransitionManager({
    // Astro 特定配置
    specialPages: ['/', '/about'],
    specialPageNames: {
      '/': 'hero-page',
      '/about': 'about-page'
    },
    
    // 覆寫事件監聽器使用 Astro 專用事件
    setupEventListeners() {
      document.addEventListener('astro:before-preparation', (event) => {
        this.handleTransition(event.to.pathname);
      });
      
      // 後備處理：處理直接 URL 變更
      document.addEventListener('astro:page-load', () => {
        this.resetTransitionNames();
      });
    },
    
    // 重置轉場名稱的方法
    resetTransitionNames() {
      const pageElement = document.querySelector('[data-page-type]');
      if (pageElement && pageElement.style.viewTransitionName) {
        const pageType = pageElement.getAttribute('data-page-type');
        
        if (pageType === 'special') {
          const currentUrl = window.location.pathname;
          const originalName = this.config.specialPageNames[currentUrl];
          if (originalName) {
            pageElement.style.viewTransitionName = originalName;
          }
        } else {
          // 清除普通頁面的動態 transition name
          pageElement.style.viewTransitionName = '';
        }
      }
    },
    
    ...config
  });
}
```

## 🎛️ 4. Astro 配置

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [vue()],
  
  // 啟用 View Transitions
  experimental: {
    viewTransitions: true
  },
  
  // 開發工具設定
  devToolbar: {
    enabled: false // 關閉以避免干擾轉場效果
  }
});
```

## 🎯 5. 使用方式

### 基本設置

1. **安裝依賴**
```bash
npm install @astrojs/vue
```

2. **複製模板文件**
```bash
cp .claude/templates/css-animations.css src/styles/transitions.css
cp .claude/templates/transition-logic.js src/scripts/transition-logic.js
```

3. **更新 Layout.astro**
按照上述範例更新主要佈局文件

### 頁面分類

1. **特殊頁面** (首頁、關於頁面)
   - 添加 `data-page-type="special"`
   - 設定固定的 `view-transition-name`
   - 在 `specialPages` 配置中定義路徑

2. **普通頁面** (內容頁面)
   - 添加 `data-page-type="normal"`
   - 不設定 `view-transition-name` (由 JS 動態分配)

### 自定義配置

```javascript
// 自定義特殊頁面
const customTransitions = initAstroTransitions({
  specialPages: ['/', '/home', '/landing', '/about'],
  specialPageNames: {
    '/': 'main-page',
    '/home': 'home-page', 
    '/landing': 'landing-page',
    '/about': 'about-page'
  },
  debug: true
});
```

## 🚀 6. 進階功能

### 條件轉場

```javascript
// 基於用戶偏好的轉場
const transitionManager = initAstroTransitions({
  // 根據用戶設定動態調整
  beforeTransition(currentType, targetType) {
    const userPreference = localStorage.getItem('animation-preference');
    if (userPreference === 'minimal') {
      return false; // 停用轉場
    }
    return true;
  }
});
```

### 效能監控

```javascript
// 轉場效能追蹤
const transitionManager = initAstroTransitions({
  debug: true,
  onTransitionStart: (data) => {
    console.time(`transition-${data.from}-${data.to}`);
  },
  onTransitionEnd: (data) => {
    console.timeEnd(`transition-${data.from}-${data.to}`);
  }
});
```

## 🎨 7. 樣式自定義

### 調整動畫時長

```css
/* src/styles/transitions.css */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s; /* 更快的轉場 */
}
```

### 自定義緩動函數

```css
::view-transition-old(hero-page) {
  animation: slide-out-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 添加新的轉場效果

```css
/* 淡入淡出效果 */
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

::view-transition-old(fade-page) {
  animation: fade-out 0.3s ease-in-out;
}

::view-transition-new(fade-page) {
  animation: fade-in 0.3s ease-in-out;
}
```

## 🐛 8. 故障排除

### 常見問題

1. **轉場不生效**
   - 檢查 `ClientRouter` 是否正確引入
   - 確認 `data-page-type` 屬性是否設定
   - 檢查瀏覽器是否支援 View Transitions API

2. **動畫方向錯誤**
   - 檢查 `specialPages` 配置是否正確
   - 確認 URL 路徑匹配邏輯
   - 檢查 `view-transition-name` 是否正確分配

3. **效能問題**
   - 確保動畫只在必要時觸發
   - 考慮為低效能設備停用複雜轉場
   - 使用 `will-change` 屬性優化動畫效能

### Debug 模式

```javascript
// 啟用詳細日誌
const transitionManager = initAstroTransitions({
  debug: true,
  verbose: true
});
```

這個實作提供了完整的 Astro 動態頁面轉場系統，可以直接套用到任何 Astro 專案中。