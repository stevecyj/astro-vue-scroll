import { test, expect } from "@playwright/test"

// 專門用於錄製頁面轉場效果的測試套件
// 根據轉場矩陣設計，涵蓋所有轉場方向組合

test("轉場錄製 - Special → Normal (Home → Live Casino)", async ({ page }) => {
  // 從 Special 頁面 (Home) 轉到 Normal 頁面 (Live Casino)
  // 預期效果: 向上滑出 + 從下滑入

  await page.goto("/")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000) // 讓起始頁面穩定顯示

  // 點擊導航到 Live Casino
  await page.getByRole("link", { name: "Live Casino" }).click()

  // 等待轉場完成
  await expect(page).toHaveURL("/live-casino")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000) // 讓轉場效果完整展示

  // 驗證目標頁面載入正常
  await expect(page.locator('[data-page-type="normal"]')).toBeVisible()
})

test("轉場錄製 - Special → Special (Home → Who We Are)", async ({ page }) => {
  // 從 Special 頁面 (Home) 轉到另一個 Special 頁面 (Who We Are)
  // 預期效果: 向下滑出 + 從上滑入

  await page.goto("/")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 點擊導航到 Who We Are
  await page.getByRole("link", { name: "Who We Are" }).click()

  // 等待轉場完成
  await expect(page).toHaveURL("/who-we-are")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 驗證目標頁面載入正常
  await expect(page.locator('[data-page-type="special"]')).toBeVisible()
})

test("轉場錄製 - Normal → Special (News → Home)", async ({ page }) => {
  // 從 Normal 頁面 (News) 轉到 Special 頁面 (Home)
  // 預期效果: 向下滑出 + 從上滑入

  await page.goto("/news")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 點擊導航到 Home
  await page.getByRole("link", { name: "Home" }).click()

  // 等待轉場完成
  await expect(page).toHaveURL("/")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 驗證目標頁面載入正常
  await expect(page.locator('[data-page-type="special"]')).toBeVisible()
})

test("轉場錄製 - Normal → Normal (Live Casino → Contact)", async ({ page }) => {
  // 從 Normal 頁面 (Live Casino) 轉到另一個 Normal 頁面 (Contact)
  // 預期效果: 向上滑出 + 從下滑入 (預設行為)

  await page.goto("/live-casino")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 點擊導航到 Contact
  await page.getByRole("link", { name: "Contact Us" }).click()

  // 等待轉場完成
  await expect(page).toHaveURL("/contact")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 驗證目標頁面載入正常
  await expect(page.locator('[data-page-type="normal"]')).toBeVisible()
})

test("Contact Us 頁面滾輪滾動操作錄製", async ({ page }) => {
  // 專門錄製 Contact Us 頁面的滾輪滾動操作

  await page.goto("/contact")
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)

  // 驗證頁面載入正常
  await expect(page.locator('[data-page-type="normal"]')).toBeVisible()

  // 執行滾輪向下滾動操作
  await page.mouse.wheel(0, 300)
  await page.waitForTimeout(800)

  // 再次滾動展示更多內容
  await page.mouse.wheel(0, 400)
  await page.waitForTimeout(800)

  // 向上滾動回到頂部
  await page.mouse.wheel(0, -500)
  await page.waitForTimeout(800)

  // 最終停留展示
  await page.waitForTimeout(1000)
})

test.only("完整導航流程錄製 - 所有頁面轉場展示", async ({ page }) => {
  // 按順序訪問所有頁面，展示完整的導航流程和轉場效果
  // 路徑: Home → Who We Are → Live Casino → News → Blog → Contact → Home

  // 起始頁面 - Home (Special)
  await page.goto("/")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(1500)

  // 1. Home → Who We Are (Special → Special)
  await page.getByRole("link", { name: "Who We Are" }).click()
  await expect(page).toHaveURL("/who-we-are")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(1500)

  // 2. Who We Are → Live Casino (Special → Normal)
  await page.getByRole("link", { name: "Live Casino" }).click()
  await expect(page).toHaveURL("/live-casino")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(1500)

  // 3. Live Casino → News (Normal → Normal)
  await page.getByRole("link", { name: "News" }).click()
  await expect(page).toHaveURL("/news")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(1500)

  // 4. News → Blog (Normal → Normal)
  await page.getByRole("link", { name: "Blog" }).click()
  await expect(page).toHaveURL("/blog")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(1500)

  // 5. Blog → Contact (Normal → Normal) + 滾動操作
  await page.getByRole("link", { name: "Contact Us" }).click()
  await expect(page).toHaveURL("/contact")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(1000)

  // 在 Contact 頁面執行滾動操作
  await page.mouse.wheel(0, 400)
  await page.waitForTimeout(800)
  await page.mouse.wheel(0, -200)
  await page.waitForTimeout(1000)

  // 6. Contact → Home (Normal → Special)
  await page.getByRole("link", { name: "Home" }).click()
  await expect(page).toHaveURL("/")
  await page.waitForLoadState("domcontentloaded")
  await page.waitForTimeout(2000)

  // 最終驗證回到首頁
  await expect(page.locator('[data-page-type="special"]')).toBeVisible()
})
