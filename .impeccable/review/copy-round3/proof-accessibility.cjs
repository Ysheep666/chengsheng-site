const fs=require('fs');
const assert=require('node:assert/strict');
const {chromium}=require('/Users/xyz/.npm/_npx/420ff84f11983ee5/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/Users/xyz/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell',headless:true});
 const results=[];
 try{
  for(const width of [1440,320]){
   const context=await browser.newContext({viewport:{width,height:900}});
   try{
    const page=await context.newPage();await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
    const table=page.getByRole('table',{name:'四句校样示例'});
    assert.equal(await table.count(),1,'校样应具有真实表格语义');
    assert.equal(await table.getByRole('row').count(),5);
    assert.deepEqual(await table.getByRole('columnheader').allTextContents(),['句','角色','校样文字','状态']);
    assert.deepEqual(await table.getByRole('rowheader').allTextContents(),['1','2','3','4']);
    assert.equal(await table.getByRole('row').nth(3).getByRole('cell').count(),3);
    assert.equal(await table.getByRole('row').nth(3).getByRole('textbox').count(),1);
    const snapshot=await table.ariaSnapshot();assert.match(snapshot,/columnheader "状态"/);assert.match(snapshot,/rowheader "3"/);
    const dimensions=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));assert.equal(dimensions.document,width);
    results.push({width,dimensions,snapshot});
   }finally{await context.close();}
  }
  fs.writeFileSync('/tmp/chengsheng-copy-refinement/proof-accessibility-results.json',JSON.stringify(results,null,2)+'\n');
  console.log('PASS: desktop and 320px expose four column headers, four row headers, and editable sentence without overflow');
 }finally{await browser.close();}
})().catch(error=>{console.error(error.message);process.exitCode=1;});
