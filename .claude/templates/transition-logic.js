/**
 * 動態頁面轉場邏輯模板
 * 基於 commit a3fae4e 的實作分析
 * 
 * 核心功能:
 * 1. 監聽導航事件
 * 2. 檢測當前和目標頁面類型
 * 3. 動態分配 view-transition-name
 * 4. 實現智能方向控制
 */

class PageTransitionManager {
  constructor(config = {}) {
    this.config = {
      // 特殊頁面路徑映射 (需根據專案調整)
      specialPages: ['/', '/about', '/who-we-are'],
      
      // 特殊頁面的 view-transition-name 映射
      specialPageNames: {
        '/': 'hero-page',
        '/about': 'about-page',
        '/who-we-are': 'about-page'
      },
      
      // 頁面類型選擇器
      pageTypeSelector: '[data-page-type]',
      
      // Debug 模式
      debug: false,
      
      ...config
    };
    
    this.init();
  }

  /**
   * 初始化轉場管理器
   */
  init() {
    // 根據不同框架選擇對應的事件監聽
    this.setupEventListeners();
  }

  /**
   * 設置事件監聽器 (需根據框架調整)
   */
  setupEventListeners() {
    // Astro 框架
    if (typeof document !== 'undefined' && 'astro' in window) {
      document.addEventListener('astro:before-preparation', (event) => {
        this.handleTransition(event.to.pathname);
      });
    }
    
    // 通用 popstate 事件 (作為後備)
    window.addEventListener('popstate', () => {
      // 延遲執行以確保 URL 已更新
      setTimeout(() => {
        this.handleTransition(window.location.pathname);
      }, 0);
    });
  }

  /**
   * 處理頁面轉場邏輯
   * @param {string} targetUrl - 目標頁面 URL
   */
  handleTransition(targetUrl) {
    const currentPageElement = document.querySelector(this.config.pageTypeSelector);
    
    if (!currentPageElement) {
      this.log('未找到當前頁面元素');
      return;
    }

    const currentPageType = this.getCurrentPageType(currentPageElement);
    const targetPageType = this.getPageType(targetUrl);
    
    this.log(`頁面轉場: ${currentPageType} → ${targetPageType}`, { targetUrl });
    
    // 根據轉場類型決定動畫方向
    this.applyTransitionLogic(currentPageElement, currentPageType, targetPageType);
  }

  /**
   * 取得當前頁面類型
   * @param {Element} element - 當前頁面元素
   * @returns {string} 頁面類型
   */
  getCurrentPageType(element) {
    return element.getAttribute('data-page-type') || 'normal';
  }

  /**
   * 取得目標頁面類型
   * @param {string} url - 目標頁面 URL
   * @returns {string} 頁面類型
   */
  getPageType(url) {
    // 清理 URL (移除 query string 和 hash)
    const cleanUrl = url.split('?')[0].split('#')[0];
    
    return this.config.specialPages.includes(cleanUrl) ? 'special' : 'normal';
  }

  /**
   * 應用轉場邏輯
   * @param {Element} currentElement - 當前頁面元素
   * @param {string} currentType - 當前頁面類型
   * @param {string} targetType - 目標頁面類型
   */
  applyTransitionLogic(currentElement, currentType, targetType) {
    // 轉場邏輯矩陣
    if (currentType === 'special' && targetType === 'normal') {
      // Special → Normal: 向上滑出
      this.setUpwardExit(currentElement);
    } else if (currentType === 'normal' && targetType === 'special') {
      // Normal → Special: 向下滑出
      this.setDownwardExit(currentElement);
    }
    // Special → Special 和 Normal → Normal 使用預設動畫
  }

  /**
   * 設置向上退出動畫
   * @param {Element} element - 當前頁面元素
   */
  setUpwardExit(element) {
    const currentTransitionName = this.getCurrentTransitionName(element);
    
    if (currentTransitionName === 'hero-page') {
      element.style.viewTransitionName = 'hero-page-up';
    } else if (currentTransitionName === 'about-page') {
      element.style.viewTransitionName = 'about-page-up';
    }
    
    this.log('設置向上退出動畫', { currentTransitionName });
  }

  /**
   * 設置向下退出動畫
   * @param {Element} element - 當前頁面元素
   */
  setDownwardExit(element) {
    element.style.viewTransitionName = 'normal-page-down';
    this.log('設置向下退出動畫');
  }

  /**
   * 取得當前的 view-transition-name
   * @param {Element} element - 頁面元素
   * @returns {string} transition name
   */
  getCurrentTransitionName(element) {
    return element.style.viewTransitionName || 
           window.getComputedStyle(element).viewTransitionName ||
           'root';
  }

  /**
   * Debug 日誌
   * @param {string} message - 訊息
   * @param {Object} data - 額外數據
   */
  log(message, data = {}) {
    if (this.config.debug) {
      console.log(`[PageTransition] ${message}`, data);
    }
  }
}

// ===================================================
// 框架特定的實作範例
// ===================================================

/**
 * Astro 專用實作
 */
function initAstroTransitions(config = {}) {
  return new PageTransitionManager({
    specialPages: ['/', '/who-we-are'],
    specialPageNames: {
      '/': 'hero-page',
      '/who-we-are': 'about-page'
    },
    ...config
  });
}

/**
 * Next.js 專用實作 (需配合 App Router)
 */
function initNextJSTransitions(config = {}) {
  const manager = new PageTransitionManager(config);
  
  // 覆寫事件監聽邏輯
  manager.setupEventListeners = function() {
    // Next.js 13+ App Router 事件
    if (typeof window !== 'undefined' && window.next) {
      window.next.router.events.on('routeChangeStart', (url) => {
        this.handleTransition(url);
      });
    }
  };
  
  return manager;
}

/**
 * Nuxt 專用實作
 */
function initNuxtTransitions(config = {}) {
  const manager = new PageTransitionManager(config);
  
  // 使用 Nuxt 的導航鉤子
  if (typeof navigateTo !== 'undefined') {
    // 需要在 Nuxt plugin 中實作
    manager.setupEventListeners = function() {
      // 使用 Nuxt 的 page:transition:finish hook
    };
  }
  
  return manager;
}

// ===================================================
// 導出和使用範例
// ===================================================

// ES6 模組導出
export { PageTransitionManager, initAstroTransitions, initNextJSTransitions, initNuxtTransitions };

// CommonJS 導出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    PageTransitionManager, 
    initAstroTransitions, 
    initNextJSTransitions, 
    initNuxtTransitions 
  };
}

// 瀏覽器全域變數
if (typeof window !== 'undefined') {
  window.PageTransitionManager = PageTransitionManager;
  window.initAstroTransitions = initAstroTransitions;
}

/**
 * 使用範例:
 * 
 * // 基本使用
 * const transitionManager = new PageTransitionManager({
 *   specialPages: ['/', '/about'],
 *   debug: true
 * });
 * 
 * // Astro 專案
 * const astroTransitions = initAstroTransitions({
 *   debug: process.env.NODE_ENV === 'development'
 * });
 * 
 * // 自定義配置
 * const customTransitions = new PageTransitionManager({
 *   specialPages: ['/', '/home', '/landing'],
 *   specialPageNames: {
 *     '/': 'main-page',
 *     '/home': 'home-page',
 *     '/landing': 'landing-page'
 *   },
 *   pageTypeSelector: '[data-page-category]',
 *   debug: true
 * });
 */