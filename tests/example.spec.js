import { test, expect } from '@playwright/test';

test('首頁載入並測試基本功能', async ({ page }) => {
  await page.goto('/');

  // 驗證頁面標題
  await expect(page).toHaveTitle(/Home - Demo/);
  
  // 驗證導航存在
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  
  // 驗證主要內容存在
  const heroSection = page.locator('[data-page-type="special"]');
  await expect(heroSection).toBeVisible();
});

test('導航功能測試', async ({ page }) => {
  await page.goto('/');
  
  // 測試導航到 "Who We Are" 頁面
  await page.getByRole('link', { name: 'Who We Are' }).click();
  await expect(page).toHaveURL('/who-we-are');
  await expect(page.locator('[data-page-type="special"]')).toBeVisible();
  
  // 測試導航到 Live Casino 頁面
  await page.getByRole('link', { name: 'Live Casino' }).click();
  await expect(page).toHaveURL('/live-casino');
  await expect(page.locator('[data-page-type="normal"]')).toBeVisible();
  
  // 測試導航到 News 頁面
  await page.getByRole('link', { name: 'News' }).click();
  await expect(page).toHaveURL('/news');
  
  // 測試導航到 Blog 頁面
  await page.getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL('/blog');
  
  // 測試導航到 Contact 頁面
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await expect(page).toHaveURL('/contact');
  
  // 返回首頁
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/');
});

test('頁面轉場動效測試', async ({ page }) => {
  await page.goto('/');
  
  // 等待頁面完全載入
  await page.waitForLoadState('networkidle');
  
  // 點擊導航到另一個頁面，測試轉場效果
  await page.getByRole('link', { name: 'Who We Are' }).click();
  
  // 驗證頁面已轉換
  await expect(page).toHaveURL('/who-we-are');
  await expect(page.locator('[data-page-type="special"]')).toBeVisible();
  
  // 測試從 special 頁面到 normal 頁面的轉場
  await page.getByRole('link', { name: 'News' }).click();
  await expect(page).toHaveURL('/news');
  await expect(page.locator('[data-page-type="normal"]')).toBeVisible();
  
  // 測試從 normal 頁面回到 special 頁面的轉場
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('[data-page-type="special"]')).toBeVisible();
});

test('響應式設計測試', async ({ page }) => {
  // 測試桌面版本
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
  
  // 測試行動版本
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
  
  // 測試平板版本
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
});

test('所有頁面載入測試', async ({ page }) => {
  const pages = ['/', '/who-we-are', '/live-casino', '/news', '/contact', '/blog'];
  
  for (const pagePath of pages) {
    await page.goto(pagePath);
    
    // 驗證頁面正常載入
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('[data-page-type]')).toBeVisible();
    
    // 等待頁面完全載入
    await page.waitForLoadState('networkidle');
  }
});