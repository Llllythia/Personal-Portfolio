import { chromium } from 'playwright-core';
import { spawn, spawnSync } from 'node:child_process';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const port=4179;
const server=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port',String(port),'--strictPort'],{stdio:'pipe'});
let browser;
try {
  for(let i=0;i<80;i++) {
    try{if((await fetch(`http://127.0.0.1:${port}`)).ok)break;}catch{}
    if(i===79)throw Error('Release preview did not start');
    await new Promise(r=>setTimeout(r,100));
  }
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const page=await browser.newPage({acceptDownloads:true});
  await page.goto(`http://127.0.0.1:${port}/`);
  await page.locator('#customize').click();
  const pending=page.waitForEvent('download');
  await page.locator('#export').click();
  const download=await pending;
  await mkdir('.local/offline-package',{recursive:true});
  await mkdir('.local/offline-downloads',{recursive:true});
  await download.saveAs('.local/offline-package/Portfolio.html');
  await writeFile('.local/offline-package/README.txt','陆雨甜 / Yutian Lu · 双语作品集\n\n解压后，用 Chrome、Edge、Safari 或 Firefox 打开 Portfolio.html。无需安装软件或连接网络。支持中英切换、项目图集和投递版编辑。\n\nAfter unzipping, open Portfolio.html in a browser. No installation or network connection is required.\n');
  const zip=spawnSync('zip',['-j','-q',resolve('.local/offline-downloads/Lu-Yutian-Portfolio.zip'),'.local/offline-package/Portfolio.html','.local/offline-package/README.txt'],{stdio:'inherit'});
  if(zip.status!==0)throw Error('Could not create offline archive');
  await copyFile('.local/offline-package/Portfolio.html','.local/offline-downloads/Portfolio.html');
  console.log('Packaged owner-only files in ignored .local/offline-downloads/.');
} finally {await browser?.close();server.kill('SIGTERM');}
