const fs=require('fs');const assert=require('node:assert/strict');
const {chromium}=require('/Users/xyz/.npm/_npx/420ff84f11983ee5/node_modules/playwright');
const {expect}=require('/Users/xyz/.npm/_npx/420ff84f11983ee5/node_modules/@playwright/test');
const feed=JSON.parse(fs.readFileSync('/Users/xyz/ABC/chengsheng-site/downloads/latest-mac.json','utf8'));
(async()=>{
 const browser=await chromium.launch({executablePath:'/Users/xyz/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell',headless:true});const results=[];
 try{
  for(const version of ['0.0.7','0.0.8']){
   const context=await browser.newContext({viewport:{width:320,height:900},acceptDownloads:true});let finish;
   try{
    const gate=new Promise(resolve=>finish=resolve);
    await context.route('**/downloads/latest-mac.json',async route=>{await gate;await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(version==='0.0.7'?feed:{...feed,version,file:feed.file.replaceAll('0.0.7',version)})});});
    await context.route(/^https:\/\/github\.com\/Ysheep666\/chengsheng-site\/releases\/download\/.*\.zip$/,route=>route.fulfill({status:200,contentType:'application/octet-stream',headers:{'content-disposition':'attachment; filename="test.zip"'},body:'ZIP regression fixture'}));
    const page=await context.newPage();await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});await expect(page.locator('#status')).toContainText('正在检查新版');
    const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#download-zip').click()]);await download.cancel();await expect(page.locator('#zip-status')).toContainText('已打开 ZIP 下载链接');
    finish();await expect(page.locator('#status')).toHaveText('');await expect(page.locator('span[data-release]')).toHaveText(version);
    if(version==='0.0.8')await expect(page.locator('#zip-status')).toContainText('你刚才打开的是 v0.0.7');else await expect(page.locator('#zip-status')).toContainText('已打开 ZIP 下载链接');
    const result={version,hero:await page.locator('#status').textContent(),footer:await page.locator('#zip-status').textContent(),links:await page.locator('a[data-download]').evaluateAll(es=>es.map(e=>e.href))};assert.ok(result.links.every(url=>url.includes(version)));results.push(result);
   }finally{finish?.();await context.close();}
  }
  fs.writeFileSync('/tmp/chengsheng-copy-refinement/zip-loading-regression-results.json',JSON.stringify(results,null,2)+'\n');console.log('PASS: both current and newer feed clear hero loading after ZIP click and preserve local feedback');
 }finally{await browser.close();}
})().catch(error=>{console.error(error.message);process.exitCode=1;});
