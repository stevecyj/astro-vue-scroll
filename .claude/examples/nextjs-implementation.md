# Next.js 動態頁面轉場實作指南

將 commit a3fae4e 的轉場系統適配到 Next.js 13+ App Router 的完整實作。

## 📁 專案結構

```
app/
├── layout.tsx               # 根佈局
├── globals.css             # 全域樣式 (包含轉場動畫)
├── components/
│   ├── TransitionProvider.tsx  # 轉場提供者
│   └── PageWrapper.tsx         # 頁面包裝組件
├── page.tsx                # 首頁 (Special)
├── about/
│   └── page.tsx           # 關於頁面 (Special)
├── blog/
│   └── page.tsx           # 部落格 (Normal)
└── lib/
    └── transitions.ts      # 轉場邏輯
```

## 🎨 1. 根佈局設置

```tsx
// app/layout.tsx
import './globals.css'
import TransitionProvider from './components/TransitionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  )
}
```

## 🔄 2. 轉場提供者組件

```tsx
// app/components/TransitionProvider.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { PageTransitionManager } from '../lib/transitions'

let transitionManager: PageTransitionManager | null = null

export default function TransitionProvider({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // 初始化轉場管理器
    if (!transitionManager) {
      transitionManager = new PageTransitionManager({
        specialPages: ['/', '/about'],
        specialPageNames: {
          '/': 'hero-page',
          '/about': 'about-page'
        },
        debug: process.env.NODE_ENV === 'development'
      })

      // Next.js 專用事件監聽
      transitionManager.setupEventListeners = function() {
        // 監聽路由變化
        const handleRouteChange = (url: string) => {
          this.handleTransition(url)
        }

        // 使用 Next.js 路由事件
        if (typeof window !== 'undefined') {
          // 監聽瀏覽器歷史變化
          const originalPushState = window.history.pushState
          const originalReplaceState = window.history.replaceState

          window.history.pushState = function(state, title, url) {
            handleRouteChange(url as string)
            return originalPushState.call(this, state, title, url)
          }

          window.history.replaceState = function(state, title, url) {
            handleRouteChange(url as string)
            return originalReplaceState.call(this, state, title, url)
          }

          // 監聽 popstate
          window.addEventListener('popstate', () => {
            handleRouteChange(window.location.pathname)
          })
        }
      }

      transitionManager.init()
    }
  }, [])

  // 當路徑變化時觸發轉場檢查
  useEffect(() => {
    if (transitionManager && pathname) {
      // 延遲執行確保 DOM 已更新
      setTimeout(() => {
        transitionManager.handleTransition(pathname)
      }, 0)
    }
  }, [pathname])

  return <>{children}</>
}
```

## 🧩 3. 頁面包裝組件

```tsx
// app/components/PageWrapper.tsx
import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  pageType: 'special' | 'normal'
  transitionName?: string
  className?: string
}

export default function PageWrapper({ 
  children, 
  pageType, 
  transitionName,
  className = '' 
}: PageWrapperProps) {
  const style = transitionName ? { viewTransitionName: transitionName } : {}

  return (
    <div 
      data-page-type={pageType}
      style={style}
      className={className}
    >
      {children}
    </div>
  )
}
```

## 🏠 4. 頁面實作範例

### 特殊頁面 (首頁)

```tsx
// app/page.tsx
import PageWrapper from './components/PageWrapper'

export default function HomePage() {
  return (
    <PageWrapper 
      pageType="special" 
      transitionName="hero-page"
      className="hero-section"
    >
      <nav>
        {/* 導航組件 */}
      </nav>
      <main>
        <h1>歡迎來到我們的平台</h1>
        <p>體驗未來的線上娛樂...</p>
      </main>
    </PageWrapper>
  )
}
```

### 關於頁面 (特殊)

```tsx
// app/about/page.tsx
import PageWrapper from '../components/PageWrapper'

export default function AboutPage() {
  return (
    <PageWrapper 
      pageType="special" 
      transitionName="about-page"
      className="about-section"
    >
      <nav>
        {/* 導航組件 */}
      </nav>
      <main>
        <h1>關於我們</h1>
        <p>我們的使命和願景...</p>
      </main>
    </PageWrapper>
  )
}
```

### 普通頁面 (部落格)

```tsx
// app/blog/page.tsx
import PageWrapper from '../components/PageWrapper'

export default function BlogPage() {
  return (
    <PageWrapper 
      pageType="normal"
      className="blog-section"
    >
      <nav>
        {/* 導航組件 */}
      </nav>
      <main>
        <h1>我們的部落格</h1>
        <div>
          {/* 部落格內容 */}
        </div>
      </main>
    </PageWrapper>
  )
}
```

## ⚙️ 5. 轉場邏輯適配

```typescript
// app/lib/transitions.ts
class NextJSPageTransitionManager {
  private config: any
  
  constructor(config: any) {
    this.config = {
      specialPages: ['/', '/about'],
      specialPageNames: {
        '/': 'hero-page',
        '/about': 'about-page'
      },
      pageTypeSelector: '[data-page-type]',
      debug: false,
      ...config
    }
  }

  init() {
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Next.js 專用邏輯，將在 TransitionProvider 中覆寫
  }

  handleTransition(targetUrl: string) {
    const currentPageElement = document.querySelector(this.config.pageTypeSelector)
    
    if (!currentPageElement) {
      this.log('未找到當前頁面元素')
      return
    }

    const currentPageType = this.getCurrentPageType(currentPageElement)
    const targetPageType = this.getPageType(targetUrl)
    
    this.log(`頁面轉場: ${currentPageType} → ${targetPageType}`, { targetUrl })
    
    this.applyTransitionLogic(currentPageElement, currentPageType, targetPageType)
  }

  getCurrentPageType(element: Element): string {
    return element.getAttribute('data-page-type') || 'normal'
  }

  getPageType(url: string): string {
    const cleanUrl = url.split('?')[0].split('#')[0]
    return this.config.specialPages.includes(cleanUrl) ? 'special' : 'normal'
  }

  applyTransitionLogic(currentElement: Element, currentType: string, targetType: string) {
    if (currentType === 'special' && targetType === 'normal') {
      this.setUpwardExit(currentElement)
    } else if (currentType === 'normal' && targetType === 'special') {
      this.setDownwardExit(currentElement)
    }
  }

  setUpwardExit(element: Element) {
    const currentTransitionName = this.getCurrentTransitionName(element)
    
    if (currentTransitionName === 'hero-page') {
      (element as HTMLElement).style.viewTransitionName = 'hero-page-up'
    } else if (currentTransitionName === 'about-page') {
      (element as HTMLElement).style.viewTransitionName = 'about-page-up'
    }
    
    this.log('設置向上退出動畫', { currentTransitionName })
  }

  setDownwardExit(element: Element) {
    (element as HTMLElement).style.viewTransitionName = 'normal-page-down'
    this.log('設置向下退出動畫')
  }

  getCurrentTransitionName(element: Element): string {
    return (element as HTMLElement).style.viewTransitionName || 
           window.getComputedStyle(element).viewTransitionName ||
           'root'
  }

  log(message: string, data: any = {}) {
    if (this.config.debug) {
      console.log(`[NextJS PageTransition] ${message}`, data)
    }
  }
}

export { NextJSPageTransitionManager as PageTransitionManager }
```

## 🎨 6. CSS 樣式設置

```css
/* app/globals.css */

/* 啟用 View Transitions */
@view-transition {
  navigation: auto;
}

/* 預設轉場動畫 */
::view-transition-old(root) {
  animation: slide-out-up 0.6s ease-in-out;
}

::view-transition-new(root) {
  animation: slide-in-down 0.6s ease-in-out;
}

/* 特殊頁面轉場 */
::view-transition-old(hero-page),
::view-transition-old(about-page) {
  animation: slide-out-down 0.6s ease-in-out;
}

::view-transition-new(hero-page),
::view-transition-new(about-page) {
  animation: slide-in-up 0.6s ease-in-out;
}

/* 動態轉場 */
::view-transition-old(hero-page-up),
::view-transition-old(about-page-up) {
  animation: slide-out-up 0.6s ease-in-out;
}

::view-transition-old(normal-page-down) {
  animation: slide-out-down 0.6s ease-in-out;
}

/* Keyframes */
@keyframes slide-out-up {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes slide-in-down {
  from {
    transform: translateY(100vh);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes slide-in-up {
  from {
    transform: translateY(-100vh);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 頁面樣式 */
.hero-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.about-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.blog-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: #333;
}

/* 無障礙支援 */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-old(hero-page),
  ::view-transition-old(about-page),
  ::view-transition-new(hero-page),
  ::view-transition-new(about-page),
  ::view-transition-old(hero-page-up),
  ::view-transition-old(about-page-up),
  ::view-transition-old(normal-page-down) {
    animation: none;
  }
}
```

## 🚀 7. 使用 Hook 簡化實作

```tsx
// app/hooks/usePageTransition.ts
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface UsePageTransitionProps {
  pageType: 'special' | 'normal'
  transitionName?: string
}

export function usePageTransition({ pageType, transitionName }: UsePageTransitionProps) {
  const pathname = usePathname()

  useEffect(() => {
    // 設置頁面元素屬性
    const pageElement = document.querySelector('[data-page-type]')
    if (pageElement && transitionName) {
      (pageElement as HTMLElement).style.viewTransitionName = transitionName
    }
  }, [transitionName])

  return {
    pageProps: {
      'data-page-type': pageType,
      style: transitionName ? { viewTransitionName: transitionName } : {}
    }
  }
}
```

### 使用 Hook 的頁面範例

```tsx
// app/page.tsx (使用 Hook)
'use client'

import { usePageTransition } from './hooks/usePageTransition'

export default function HomePage() {
  const { pageProps } = usePageTransition({
    pageType: 'special',
    transitionName: 'hero-page'
  })

  return (
    <div {...pageProps} className="hero-section">
      <nav>
        {/* 導航組件 */}
      </nav>
      <main>
        <h1>歡迎來到我們的平台</h1>
        <p>體驗未來的線上娛樂...</p>
      </main>
    </div>
  )
}
```

## 🎛️ 8. Next.js 配置

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 確保 View Transitions API 支援
    appDir: true,
  },
  
  // 如果需要支援 CSS 模組
  cssModules: true,
}

module.exports = nextConfig
```

## 🎯 9. 進階功能

### 條件式轉場

```tsx
// app/components/ConditionalTransition.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ConditionalTransition({ children }: { children: React.ReactNode }) {
  const [enableTransitions, setEnableTransitions] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // 根據用戶偏好或設備能力調整
    const userPreference = localStorage.getItem('animation-preference')
    const isLowPowerMode = navigator.hardwareConcurrency < 4
    
    setEnableTransitions(userPreference !== 'minimal' && !isLowPowerMode)
  }, [])

  useEffect(() => {
    // 動態切換轉場效果
    document.documentElement.style.setProperty(
      '--transition-duration', 
      enableTransitions ? '0.6s' : '0s'
    )
  }, [enableTransitions])

  return <>{children}</>
}
```

### 轉場狀態管理

```tsx
// app/context/TransitionContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TransitionState {
  isTransitioning: boolean
  fromPage: string | null
  toPage: string | null
}

const TransitionContext = createContext<{
  state: TransitionState
  setTransitioning: (from: string, to: string) => void
  finishTransition: () => void
}>({
  state: { isTransitioning: false, fromPage: null, toPage: null },
  setTransitioning: () => {},
  finishTransition: () => {}
})

export function TransitionContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    fromPage: null,
    toPage: null
  })

  const setTransitioning = (from: string, to: string) => {
    setState({
      isTransitioning: true,
      fromPage: from,
      toPage: to
    })
  }

  const finishTransition = () => {
    setState({
      isTransitioning: false,
      fromPage: null,
      toPage: null
    })
  }

  return (
    <TransitionContext.Provider value={{ state, setTransitioning, finishTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)
```

## 🐛 10. 故障排除

### 常見問題解決

1. **SSR/Hydration 問題**
```tsx
// 使用動態導入避免 SSR 問題
import dynamic from 'next/dynamic'

const TransitionProvider = dynamic(
  () => import('./components/TransitionProvider'),
  { ssr: false }
)
```

2. **路由變化檢測問題**
```tsx
// 使用 Next.js 專用的路由事件
import { useRouter } from 'next/navigation'

const router = useRouter()

useEffect(() => {
  const handleRouteChange = () => {
    // 轉場邏輯
  }
  
  router.events.on('routeChangeStart', handleRouteChange)
  return () => router.events.off('routeChangeStart', handleRouteChange)
}, [])
```

3. **TypeScript 支援**
```typescript
// types/transitions.d.ts
declare global {
  interface CSSStyleDeclaration {
    viewTransitionName: string
  }
}

export {}
```

這個 Next.js 實作提供了與原始 Astro 版本相同的動態轉場功能，並且針對 Next.js 的特性進行了優化。