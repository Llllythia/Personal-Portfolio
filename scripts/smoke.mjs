import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';

const port = 4178;
const server = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'pipe' });
let browser;
const errors = [];
try {
  for(let i=0;i<60;i++) {
    try { if((await fetch(`http://127.0.0.1:${port}`)).ok)break; } catch {}
    if(i===59)throw Error('Preview did not become ready');
    await new Promise(r=>setTimeout(r,150));
  }
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless:true, args:['--no-sandbox'] });
  const context = await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
  const page = await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(`http://127.0.0.1:${port}`);
  assert.equal(await page.locator('.project-card').count(),5);
  assert.match(await page.locator('h1').innerText(),/理解人与场所/);
  assert.equal(await page.locator('[data-project]').first().getAttribute('data-project'),'transit');
  assert.match(await page.locator('.section-side').innerText(),/5 个项目/);
  assert.equal(await page.locator('a[href="mailto:luyutian0428@163.com"]').count(),1);
  await page.locator('[data-filter="experiment"]').click();
  assert.equal(await page.locator('.project-card').count(),1);
  await page.locator('[data-project="maze"]').click();
  assert.match(await page.locator('#case-dialog .role').innerText(),/小组/);
  await page.locator('#next-page').click();
  assert.match(await page.locator('#gallery-count').innerText(),/2 \/ 6/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#case-dialog').evaluate(e=>e.open),false);
  await page.locator('[data-filter="all"]').click();
  for(const id of ['transit','coking','hutong','railway']) {
    await page.locator(`[data-project="${id}"]`).click();
    await page.locator('#gallery-image').evaluate(img=>img.decode());
    assert.ok(await page.locator('#gallery-image').evaluate(img=>img.complete && img.naturalWidth>0));
    if(id==='transit') {
      assert.equal(await page.locator('.case-highlight').count(),3);
      assert.match(await page.locator('#gallery-count').innerText(),/1 \/ 6 · PDF 1/);
      assert.match(await page.locator('#case-dialog a.text-link').getAttribute('href'),/Studio2-The-Intersection.pdf#page=1/);
      await page.locator('[data-page="5"]').click();
      assert.match(await page.locator('#gallery-count').innerText(),/6 \/ 6 · PDF 6/);
      await page.locator('[data-highlight="1"]').click();
      await page.locator('#image-dialog img').evaluate(img=>img.decode());
      await page.keyboard.press('Escape');
    }
    await page.keyboard.press('Escape');
  }
  await page.locator('#language').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.match(await page.locator('h1').innerText(),/Understand people/);
  await page.locator('[data-project="hutong"]').click();
  assert.match(await page.locator('#case-dialog').innerText(),/12 tourists/);
  await page.keyboard.press('Escape');
  await page.locator('#language').click();
  await page.locator('#customize').click();
  await page.locator('#jd').fill('文旅文化资源策划，用户访谈研究、创新学习、商业测算');
  await page.locator('#analyze').click();
  assert.match(await page.locator('#jd-result').innerText(),/商业测算/);
  assert.equal(await page.locator('#profile-select').inputValue(),'culture');
  await page.locator('#project-order').fill('maze, maze, coking, hutong');
  await page.locator('#apply').click();
  assert.match(await page.locator('#export-status').innerText(),/全部 5 个项目/);
  await page.locator('#project-order').fill('maze, transit, hutong, railway, coking');
  await page.locator('#title-zh').fill('把研究转化为体验');
  await page.locator('#apply').click();
  assert.match(await page.locator('h1').innerText(),/把研究转化为体验/);
  assert.equal(await page.locator('[data-project]').first().getAttribute('data-project'),'maze');
  await page.locator('#customize').click();
  const downloadPromise=page.waitForEvent('download',{timeout:30000});
  await page.locator('#export').click();
  const download=await downloadPromise;
  await mkdir('.local/exports',{recursive:true});
  const exported=resolve('.local/exports/Yutian-Lu-Portfolio.html');
  await download.saveAs(exported);
  await page.keyboard.press('Escape');
  // Offline exported HTML must preserve custom content, bilingual UI and project images.
  const offline=await browser.newContext({offline:true,viewport:{width:390,height:844}});
  const exportedPage=await offline.newPage();
  exportedPage.on('pageerror',e=>errors.push(`export: ${e.message}`));
  exportedPage.on('requestfailed',r=>errors.push(`export request failed: ${r.url()}`));
  const standalone=await readFile(exported,'utf8');
  await exportedPage.route('http://127.0.0.1:4178/standalone.html',route=>route.fulfill({status:200,contentType:'text/html',body:standalone}));
  await exportedPage.goto('http://127.0.0.1:4178/standalone.html');
  assert.match(await exportedPage.locator('h1').innerText(),/把研究转化为体验/);
  assert.equal(await exportedPage.locator('.project-card').count(),5);
  await exportedPage.locator('#language').click();
  assert.match(await exportedPage.locator('h1').innerText(),/Discover cultural value/);
  await exportedPage.locator('[data-project="maze"]').click();
  await exportedPage.locator('#gallery-image').evaluate(img=>img.decode());
  assert.ok(await exportedPage.locator('#gallery-image').evaluate(img=>img.complete && img.naturalWidth>0));
  await exportedPage.locator('#gallery-full').click();
  assert.equal(await exportedPage.locator('#image-dialog').evaluate(d=>d.open),true);
  await exportedPage.keyboard.press('Escape');
  assert.equal(await exportedPage.locator('#case-dialog').evaluate(d=>d.open),true);
  await exportedPage.locator('#next-page').click();
  assert.match(await exportedPage.locator('#gallery-count').innerText(),/2 \/ 6/);
  await exportedPage.keyboard.press('Escape');
  await exportedPage.locator('[data-project="transit"]').click();
  assert.match(await exportedPage.locator('#case-title').innerText(),/Making transit/);
  await exportedPage.locator('.case-highlight img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  await exportedPage.locator('[data-highlight="2"]').click();
  await exportedPage.locator('#image-dialog img').evaluate(img=>img.decode());
  await exportedPage.keyboard.press('Escape');
  const pdfDownloadPending=exportedPage.waitForEvent('download');
  await exportedPage.locator('#case-dialog a[download]').click();
  const pdfDownload=await pdfDownloadPending;
  assert.equal(pdfDownload.suggestedFilename(),'Studio2-The-Intersection.pdf');
  assert.equal(await pdfDownload.failure(),null);
  await exportedPage.keyboard.press('Escape');
  // Re-export from the standalone version also needs to work.
  await exportedPage.locator('#customize').click();
  const secondDownload=exportedPage.waitForEvent('download');
  await exportedPage.locator('#export').click();
  assert.equal(await (await secondDownload).failure(),null);
  await offline.close();
  // Untrusted text remains text, including HTML-like input.
  await page.locator('#customize').click();
  await page.locator('#title-zh').fill('<img src=x onerror=alert(1)>');
  await page.locator('#apply').click();
  assert.equal(await page.locator('h1 img').count(),0);
  assert.equal(await page.locator('h1').innerText(),'<img src=x onerror=alert(1)>');
  await page.goto(`http://127.0.0.1:${port}/?view=experience&lang=en`);
  assert.match(await page.locator('h1').innerText(),/Start with people/);
  assert.equal(await page.locator('[data-project]').first().getAttribute('data-project'),'transit');
  // All language/size combinations must fit the viewport.
  await mkdir('test-results',{recursive:true});
  for(const width of [390,768,1440])for(const lang of ['zh','en']) {
    await page.setViewportSize({width,height:900});
    await page.goto(`http://127.0.0.1:${port}/?lang=${lang}`);
    await page.locator('.project-card:last-child img').scrollIntoViewIfNeeded();
    await page.evaluate(()=>window.scrollTo(0,0));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`Overflow at ${width}/${lang}`);
    await page.screenshot({path:`test-results/${width}-${lang}.png`,fullPage:true});
  }
  const pdf=await fetch(`http://127.0.0.1:${port}/assets/Project-Boards.pdf`);
  assert.equal(pdf.status,200);
  assert.ok((await pdf.arrayBuffer()).byteLength>1000000);
  const studioPdf=await fetch(`http://127.0.0.1:${port}/assets/Studio2-The-Intersection.pdf`);
  assert.equal(studioPdf.status,200);
  assert.equal((await studioPdf.arrayBuffer()).byteLength,5714805);
  assert.deepEqual(errors,[]);
  console.log('PASS: bilingual pages, 5 cases, capability filters, galleries, JD matching, validation, custom copy/order, HTML escaping, offline export/re-export, preset URLs, PDF and 6 responsive layouts.');
} finally {
  await browser?.close();server.kill('SIGTERM');
}
