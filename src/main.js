import './style.css';
import css from './style.css?inline';
import { projects, skills, profiles } from './data.js';

function portfolioApp(content, stylesheet, embedded = {}) {
  const { projects, skills, profiles } = content;
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = new URL(location.href);
  let lang = (url.searchParams.get('lang') || content.initialLang) === 'en' ? 'en' : 'zh';
  let profile = profiles[url.searchParams.get('view')] ? url.searchParams.get('view') : 'general';
  let custom = content.custom || null;
  let filter = 'all';
  let activeProject = null;
  let galleryIndex = 0;
  let recommendation = null;
  const t = (o) => o[lang];
  const txt = (zh, en) => lang === 'zh' ? zh : en;
  const asset = (n) => embedded[n] || `./assets/${n}`;
  const page = (n) => asset(`page-${String(n).padStart(2,'0')}.jpg`);
  const cover = (n) => asset(`cover-${String(n).padStart(2,'0')}.jpg`);
  const current = () => profile === 'custom' && custom ? custom : profiles[profile] || profiles.general;
  const skillName = (id) => t(skills.find(s => s.id === id).name);
  const chips = (ids) => ids.map(id => `<span class="chip">${esc(skillName(id))}</span>`).join('');
  const byOrder = () => current().order.map(id => projects.find(p => p.id === id)).filter(Boolean);
  function setURL() {
    try { const u = new URL(location.href);u.searchParams.set('lang',lang);u.searchParams.set('view',profile === 'custom' ? 'general' : profile);history.replaceState(null,'',u); } catch {}
  }
  function render() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = `${txt('陆雨甜','Yutian Lu')} · ${txt('研究 / 策划 / 体验', 'Research / Strategy / Experience')}`;
    const c = current();
    const featured = projects.find(p => p.id === 'transit');
    const count = projects.length;
    $('#app').innerHTML = `
      <a class="skip" href="#work">${txt('跳至作品', 'Skip to projects')}</a>
      <header><a class="wordmark" href="#" aria-label="Yutian Lu home">YL<span>${txt('陆雨甜','YUTIAN LU')}<span class="wordmark-sub">${txt('研究 · 策划 · 体验', 'RESEARCH · STRATEGY · EXPERIENCE')}</span></span></a>
        <nav aria-label="${txt('主导航','Main navigation')}"><a href="#work">${txt('精选项目','Work')}</a><a href="#approach">${txt('我的方法','Approach')}</a><button class="nav-tool" id="customize">${txt('定制投递版','Tailor portfolio')} <span>↗</span></button><button id="language" class="language" aria-label="${txt('Switch to English','切换为中文')}">${lang === 'zh' ? '<b>中</b> / EN' : '中 / <b>EN</b>'}</button></nav>
      </header>
      <main>
        <section class="hero">
          <div class="hero-copy"><div class="eyebrow"><i></i> ${txt('作品与思考', 'SELECTED WORK & THINKING')} <span>ACADEMIC WORK</span></div>
            <h1>${esc(t(c.title)).replace(/\n/g,'<br>')}</h1><p class="intro">${esc(t(c.intro))}</p>
            <div class="hero-actions"><a class="solid" href="#work">${txt('探索我的项目','Explore my work')} <span>↓</span></a><a class="text-link" href="${asset(featured.sourcePdf)}" download="Studio2-The-Intersection.pdf">${txt('Studio 2 图集 PDF', 'Studio 2 boards PDF')} ↗</a></div>
            ${Object.keys(embedded).length ? '' : `<a class="offline-download text-link" href="./downloads/Lu-Yutian-Portfolio.zip" download>${txt('下载离线双语网页（ZIP）','Download offline bilingual website (ZIP)')} ↓</a>`}<div class="hero-note"><span>01 / ${String(count).padStart(2,'0')}</span>${txt('不同尺度的设计，同一份对人的关注。','Different scales. The same attention to people.')}</div>
          </div>
          <figure class="hero-art"><div class="art-top"><span>FIELD NOTES / 001</span><span>TUNG CHUNG, HK ↗</span></div><div class="hero-image"><img src="${cover(featured.cover)}" alt="${esc(t(featured.original))}"></div><figcaption><span>${txt('从换乘出发，连接城市生活。','From a transfer to a place for everyday life.')}</span><span>TRANSIT & EXPERIENCE</span></figcaption><div class="art-index">空间，是理解人的另一种语言。<br><em>Space as a way of understanding people.</em></div></figure>
        </section>
        <section class="skill-strip" aria-label="${txt('核心能力','Core capabilities')}">${c.priority.map((id,i) => `<div><small>0${i+1}</small><span>${esc(skillName(id))}</span></div>`).join('')}</section>
        <section id="work" class="work section"><div class="section-heading"><div><span class="eyebrow">01 — ${txt('项目档案','PROJECT ARCHIVE')}</span><h2>${txt('用项目，回答问题。','Questions, explored through projects.')}</h2></div><span class="section-side">${txt(`${count} 个项目 / 多种思考视角`,`${count} projects / multiple perspectives`)}</span></div>
          <div class="filters" role="group" aria-label="${txt('按能力筛选项目','Filter projects by capability')}"><button data-filter="all" aria-pressed="${filter === 'all'}">${txt('全部项目','All projects')} <sup>${String(count).padStart(2,'0')}</sup></button>${skills.map(s => `<button data-filter="${s.id}" aria-pressed="${filter === s.id}">${esc(t(s.name))}</button>`).join('')}</div>
          <div class="project-grid">${byOrder().filter(p => filter === 'all' || p.skills.includes(filter)).map(p => `<article class="project-card"><button class="project-open" data-project="${p.id}" aria-label="${txt('查看','View')} ${esc(t(p.original))}"><div class="project-image ${p.id}"><img src="${cover(p.cover)}" loading="lazy" alt="${esc(t(p.original))}"><span class="image-badge">${esc(t(p.type))}</span><span class="round-arrow">↗</span></div><div class="project-meta"><span>${esc(t(p.location))}</span><span>CASE ${p.no}</span></div><h3>${esc(t(p.title))}</h3><p class="original-name">${esc(t(p.original))}</p><div class="chips">${chips(p.skills)}</div></button></article>`).join('')}</div>
        </section>
        <section id="approach" class="approach section"><div class="section-heading"><div><span class="eyebrow">02 — ${txt('思考方式','WAYS OF THINKING')}</span><h2>${txt('从看见，到回应。','From observation to response.')}</h2></div><p>${txt('我关注的不只是最终的图，\n还有每一个决定为什么成立。','Beyond the final image,\nI care about the reasons behind each decision.')}</p></div><div class="method-grid">${skills.map((s,i) => `<article><span class="method-number">0${i+1} /</span><h3>${esc(t(s.name))}</h3><p>${esc(t(s.desc))}</p><button class="evidence-link" data-skill="${s.id}">${txt('在项目中查看证据','Explore project evidence')} ↗</button></article>`).join('')}</div></section>
        <section class="closing"><span class="eyebrow">03 — ${txt('继续探索','KEEP EXPLORING')}</span><h2>${txt('让每一次探索，\n成为下一步的起点。','Every exploration,\na starting point for what’s next.').replace(/\n/g,'<br>')}</h2><p>${txt('城市与空间设计背景 · 研究、文化策划与体验探索','Urban & spatial design · Research, cultural strategy & experience')}</p><div class="board-downloads"><a class="text-link" href="${asset(featured.sourcePdf)}" download="Studio2-The-Intersection.pdf">${txt('Studio 2 项目图集','Studio 2 project boards')} ↓</a><a class="text-link" href="${asset('Project-Boards.pdf')}" download="Yutian-Lu-Project-Boards.pdf">${txt('其余项目图集','Other project boards')} ↓</a></div><div class="contact-links"><a href="mailto:luyutian0428@163.com">luyutian0428@163.com ↗</a><a href="tel:+8613701210428">+86 137 0121 0428</a></div></section>
      </main><footer><span>© ${new Date().getFullYear()} ${txt('陆雨甜','Yutian Lu')}</span><span>${txt('以证据讲述过程，以设计回应需求。','Evidence-led stories. People-centred proposals.')}</span><a href="#">${txt('回到顶部','Back to top')} ↑</a></footer>
      <dialog id="case-dialog" class="case-dialog" aria-labelledby="case-title"></dialog>
      <dialog id="image-dialog" class="image-dialog" aria-label="${txt('放大图板','Enlarged project board')}"></dialog>
      <dialog id="tailor-dialog" class="tailor-dialog" aria-labelledby="tailor-title"></dialog>
      <div class="toast" role="status" aria-live="polite"></div>`;
    $('#language').onclick = () => { lang = lang === 'zh' ? 'en' : 'zh'; setURL(); render(); $('#language').focus(); };
    $('#customize').onclick = openTailor;
    document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { filter = b.dataset.filter; render(); $(`[data-filter="${filter}"]`).focus(); });
    document.querySelectorAll('[data-project]').forEach(b => b.onclick = () => openProject(b.dataset.project));
    document.querySelectorAll('[data-skill]').forEach(b => b.onclick = () => { filter = b.dataset.skill; render(); $('#work').scrollIntoView({behavior:'smooth'}); $(`[data-filter="${filter}"]`).focus({preventScroll:true}); });
  }
  function showDialog(d) {
    const returnFocus = document.activeElement;
    d.showModal(); document.body.style.overflow = 'hidden';
    d.addEventListener('close', () => {document.body.style.overflow=document.querySelector('dialog[open]')?'hidden':''; returnFocus?.focus();}, {once:true});
    d.addEventListener('click', e => {if(e.target === d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
  }
  function openProject(id) {
    activeProject = projects.find(p => p.id === id); galleryIndex = 0;
    const p = activeProject, d = $('#case-dialog');
    const pdfFile = p.sourcePdf || 'Project-Boards.pdf';
    const pdfPage = p.sourcePage ?? p.cover - 1;
    d.innerHTML = `<div class="dialog-bar"><span>PROJECT ${p.no} / ${esc(t(p.type))}</span><button class="close" aria-label="${txt('关闭项目','Close project')}">×</button></div><div class="case-content"><span class="eyebrow">${esc(t(p.location))}</span><h2 id="case-title">${esc(t(p.title))}</h2><p class="case-original">${esc(t(p.original))}</p><p class="role">${esc(t(p.role))}</p>${p.id !== 'railway' ? `<p class="team-note">${txt('以下介绍小组项目的整体思路与成果。','The following describes the team project’s overall approach and outputs.')}</p>` : ''}<div class="chips">${chips(p.skills)}</div><div class="case-intro"><h3>${txt('项目背景','Context')}</h3><p>${esc(t(p.background))}</p></div><blockquote>${esc(t(p.question))}</blockquote><div class="case-steps">${p.steps.map((s,i) => `<article><small>0${i+1}</small><h3>${esc(t(s[0]))}</h3><p>${esc(t(s[1]))}</p></article>`).join('')}</div>${p.highlights ? `<section class="case-highlights" aria-label="${txt('分析与设计证据','Analysis and design evidence')}"><h3>${txt('从分析到设计，关键的三步','Three steps from analysis to design')}</h3>${p.highlights.map((h,i)=>`<figure class="case-highlight"><figcaption><h3>${esc(t(h.title))}</h3><p>${esc(t(h.text))}</p></figcaption><button data-highlight="${i}" aria-label="${txt('放大','Enlarge')} ${esc(t(h.title))}"><img src="${asset(h.image)}" alt="${esc(t(h.title))}" loading="lazy"><span>${txt('查看细节','Explore detail')} ↗</span></button><small>${esc(t(h.source))}</small></figure>`).join('')}</section>` : ''}<div class="gallery"><div class="gallery-toolbar"><h3>${txt('原始图板 · 点击放大','Original boards · click to enlarge')}</h3><span id="gallery-count"></span></div><a id="gallery-full" target="_blank" rel="noopener"><img id="gallery-image" alt=""></a><div class="gallery-controls"><button id="prev-page" aria-label="${txt('上一张','Previous board')}">←</button><div class="gallery-thumbs">${p.pages.map((n,i) => `<button data-page="${i}" aria-label="${txt('查看 PDF 第','View PDF page ')} ${typeof n === 'number' ? n : i+1} ${txt('页','')}"><img src="${page(n)}" alt=""></button>`).join('')}</div><button id="next-page" aria-label="${txt('下一张','Next board')}">→</button></div></div><div class="case-evidence"><h3>${txt('成果与证据边界','Outputs & evidence')}</h3><p>${esc(t(p.outcome))}</p><small>${esc(t(p.evidence))}</small></div><a class="text-link" href="${asset(pdfFile)}#page=${pdfPage}" ${embedded[pdfFile] ? `download="${esc(pdfFile)}"` : 'target="_blank" rel="noopener"'}>${embedded[pdfFile] ? txt('下载项目图集','Download project boards') : txt('在项目图集中查看','View in the project boards PDF')} ↗</a></div>`;
    d.querySelector('.close').onclick = () => d.close();
    d.querySelectorAll('[data-page]').forEach(b => b.onclick = () => {galleryIndex = Number(b.dataset.page); updateGallery();});
    $('#prev-page').onclick = () => {galleryIndex = (galleryIndex+p.pages.length-1)%p.pages.length;updateGallery();};
    $('#next-page').onclick = () => {galleryIndex = (galleryIndex+1)%p.pages.length;updateGallery();};
    $('#gallery-full').onclick = e => {
      e.preventDefault();
      zoomImage(page(activeProject.pages[galleryIndex]), t(activeProject.original));
    };
    d.querySelectorAll('[data-highlight]').forEach(b => b.onclick = () => {
      const h=p.highlights[Number(b.dataset.highlight)];zoomImage(asset(h.image),t(h.title));
    });
    updateGallery();showDialog(d);
  }
  function zoomImage(src, title) {
    const zoom=$('#image-dialog');
    zoom.innerHTML=`<div class="dialog-bar"><span>${txt('原始图板 · 可滚动查看细节','PROJECT BOARD · SCROLL TO EXPLORE')}</span><button class="close" aria-label="${txt('关闭大图','Close enlarged image')}">×</button></div><div class="zoom-scroll"><img src="${esc(src)}" alt="${esc(title)}"></div>`;
    zoom.querySelector('.close').onclick=()=>zoom.close();showDialog(zoom);
  }
  function updateGallery() {
    const n = activeProject.pages[galleryIndex];
    const number = typeof n === 'number' ? n : galleryIndex+1;
    $('#gallery-image').src = page(n);$('#gallery-full').href = page(n);
    $('#gallery-image').alt = `${t(activeProject.original)} · PDF ${number}`;
    $('#gallery-count').textContent = `${galleryIndex+1} / ${activeProject.pages.length} · PDF ${number}`;
    document.querySelectorAll('[data-page]').forEach(b => b.setAttribute('aria-pressed',Number(b.dataset.page) === galleryIndex));
  }
  function toast(message) { $('.toast').textContent=message;$('.toast').classList.add('visible');setTimeout(() => $('.toast')?.classList.remove('visible'),3500); }
  function openTailor() {
    const d = $('#tailor-dialog');
    d.innerHTML = `<div class="dialog-bar"><span>PORTFOLIO STUDIO / ${txt('投递工作台','APPLICATION EDITOR')}</span><button class="close" aria-label="${txt('关闭定制面板','Close editor')}">×</button></div><div class="tailor-content"><span class="eyebrow">MAKE IT RELEVANT</span><h2 id="tailor-title">${txt('同一份经历，不同的重点。','Same experience. A different focus.')}</h2><p>${txt('保留项目事实，调整介绍、能力排序和项目顺序。先选方向，或粘贴 JD 获得关键词建议，再编辑双语文案。','Keep project facts intact while changing the introduction, capability emphasis and project order. Choose a focus, or paste a job description for keyword-based suggestions, then edit both languages.')}</p><label for="profile-select">${txt('投递方向','Portfolio focus')}</label><select id="profile-select">${Object.entries(profiles).map(([key,p])=>`<option value="${key}" ${profile===key?'selected':''}>${esc(t(p.label))}</option>`).join('')}${custom ? `<option value="custom" ${profile==='custom'?'selected':''}>${txt('我的定制版','My custom version')}</option>` : ''}</select><label for="jd">${txt('岗位描述（可选）','Job description (optional)')}</label><textarea id="jd" rows="5" placeholder="${txt('粘贴 JD，识别与现有项目相关的能力…','Paste a JD to find capabilities supported by the projects…')}"></textarea><p class="field-note">${txt('仅在此浏览器内进行关键词匹配，无 AI 接口、不上传 JD。建议不是资格评估，也不会自动添加经历。','Keyword matching runs in this browser. No AI service; the JD is not uploaded. Suggestions do not assess eligibility or add experience.')}</p><button class="outline" id="analyze">${txt('分析关键词与证据','Match keywords to evidence')} ↗</button><div id="jd-result" aria-live="polite"></div><div class="edit-grid"><div><label for="title-zh">中文标题</label><textarea id="title-zh" rows="3"></textarea><label for="intro-zh">中文介绍</label><textarea id="intro-zh" rows="6"></textarea></div><div><label for="title-en">English headline</label><textarea id="title-en" rows="3"></textarea><label for="intro-en">English introduction</label><textarea id="intro-en" rows="6"></textarea></div></div><label for="project-order">${txt('项目顺序（可修改，逗号分隔）','Project order (editable, comma-separated)')}</label><input id="project-order"><p class="field-note">transit = ${txt('东涌 Studio 2','Tung Chung Studio 2')} · coking = ${txt('焦化厂','Coking plant')} · hutong = ${txt('南锣鼓巷','Nanluoguxiang')} · maze = Healing Maze · railway = ${txt('环铁','Huantie')}</p><div class="editor-actions"><button class="solid" id="apply">${txt('应用并预览','Apply & preview')} ↗</button><button class="outline" id="export">${txt('导出独立网页','Export standalone HTML')} ↓</button></div><p class="field-note" id="export-status" role="status">${txt('导出含双语与项目图，可离线打开；获得公开链接仍需部署。请勿把个人信息或 JD 原文放进介绍。','Exports include both languages and project images for offline use; a public URL requires deployment. Keep personal information and the full JD out of your introduction.')}</p><button id="share" class="text-link">${txt('复制当前预设链接','Copy preset link')} ↗</button><button id="reset" class="text-link reset">${txt('重置为综合版','Reset to general')}</button></div>`;
    d.querySelector('.close').onclick = () => d.close();
    function fill(c) { $('#title-zh').value=c.title.zh;$('#title-en').value=c.title.en;$('#intro-zh').value=c.intro.zh;$('#intro-en').value=c.intro.en;$('#project-order').value=c.order.join(', '); }
    fill(current());
    $('#profile-select').onchange = (e) => {recommendation=null;$('#jd-result').innerHTML='';fill(e.target.value==='custom'?custom:profiles[e.target.value]);};
    $('#analyze').onclick = () => {
      const jd = $('#jd').value.toLowerCase().trim();
      if (!jd) { $('#jd-result').textContent=txt('请先粘贴岗位描述。','Paste a job description first.');return; }
      const match = skills.map(s => ({id:s.id,hits:s.words.filter(w => jd.includes(w))})).sort((a,b)=>b.hits.length-a.hits.length);
      const matched=match.filter(s=>s.hits.length);
      if(!matched.length) {$('#jd-result').textContent=txt('未找到预设关键词，请选择方向并自行编辑；不据此推断岗位不匹配。','No preset keywords matched. Choose a focus and edit the text; this does not imply a poor fit.');return;}
      const pick = /文旅|文化|tourism|cultur/.test(jd) ? 'culture' : /用户|体验|user|experience|research/.test(jd) ? 'experience' : /创新|数字|游戏|game|digital|innovat/.test(jd) ? 'creative' : 'general';
      const base=profiles[pick];recommendation={...base,priority:match.map(m=>m.id),order:[...projects].sort((a,b)=>score(b)-score(a)).map(p=>p.id)};
      function score(p){return matched.reduce((sum,m)=>sum+(p.skills.includes(m.id)?m.hits.length:0),0);}
      $('#profile-select').value=pick;fill(recommendation);
      $('#jd-result').innerHTML=`<div class="match-result"><strong>${txt('已更新建议文案与排序','Suggested text and order updated')}</strong>${matched.map(m=>`<p>${esc(skillName(m.id))} <small>${m.hits.map(esc).join(' / ')}</small></p>`).join('')}<p class="field-note">${txt('优先查看对应项目的“成果与证据边界”。商业测算、实际运营、落地执行、抗压与冲突处理等仍需另补证据；学历、语言成绩等资格也需单独确认。','Check each project’s outputs and evidence. Commercial modelling, operations, delivery, resilience and conflict resolution need separate evidence, as do education and language qualifications.')}</p></div>`;
    };
    function readDraft() {
      const order=$('#project-order').value.split(/[,，]/).map(v=>v.trim()).filter(Boolean);
      if(order.length!==projects.length||new Set(order).size!==projects.length||order.some(id=>!projects.some(p=>p.id===id))) throw Error(txt(`项目顺序必须包含全部 ${projects.length} 个项目 ID，且各出现一次。`,`Include all ${projects.length} project IDs exactly once.`));
      for(const id of ['title-zh','title-en','intro-zh','intro-en']) if(!$('#'+id).value.trim()) throw Error(txt('请完整填写中英文标题和介绍。','Complete both headlines and introductions.'));
      const base=recommendation || ($('#profile-select').value==='custom'?custom:profiles[$('#profile-select').value]);
      return {label:{zh:'定制作品集',en:'Tailored portfolio'},title:{zh:$('#title-zh').value.trim(),en:$('#title-en').value.trim()},intro:{zh:$('#intro-zh').value.trim(),en:$('#intro-en').value.trim()},order,priority:base.priority};
    }
    $('#apply').onclick = () => {try{custom=readDraft();profile='custom';filter='all';d.close();setURL();render();window.scrollTo({top:0,behavior:'smooth'});toast(txt('已应用定制版。导出网页可保留此版本。','Custom version applied. Export HTML to keep this version.'));}catch(e){$('#export-status').textContent=e.message;}};
    $('#export').onclick = async () => {
      const b=$('#export');b.disabled=true;
      try {const draft=readDraft();$('#export-status').textContent=txt('正在打包图片与双语内容…','Packaging images and bilingual content…');await exportPage(draft);$('#export-status').textContent=txt('已生成独立 HTML。可离线打开，也可部署到静态托管。','Standalone HTML created. Open it offline or deploy it to static hosting.');}catch(e){$('#export-status').textContent=txt('导出失败：','Export failed: ')+e.message;}finally{b.disabled=false;}
    };
    $('#share').onclick = async () => {try{if(profile==='custom')throw Error(txt('自定义文字不会写入链接，请导出独立网页来保留。','Custom text is not stored in links. Export HTML to keep it.'));if(location.protocol==='file:')throw Error(txt('请先部署网站，再复制公开链接。','Deploy the site before sharing a public link.'));const u=new URL(location.href);u.searchParams.set('view',$('#profile-select').value==='custom'?'general':$('#profile-select').value);u.searchParams.set('lang',lang);await navigator.clipboard.writeText(u.href);$('#export-status').textContent=txt('已复制预设链接。公开访问需要部署网站。','Preset link copied. Public access requires deployment.');}catch(e){$('#export-status').textContent=e.message;}};
    $('#reset').onclick = () => {custom=null;profile='general';filter='all';recommendation=null;d.close();setURL();render();};
    showDialog(d);
  }
  async function exportPage(draft) {
    const names=[...new Set([
      ...projects.flatMap(p=>p.pages.map(n=>`page-${String(n).padStart(2,'0')}.jpg`)),
      ...projects.map(p=>`cover-${String(p.cover).padStart(2,'0')}.jpg`),
      ...projects.flatMap(p=>(p.highlights || []).map(h=>h.image)),
      ...projects.map(p=>p.sourcePdf || 'Project-Boards.pdf')
    ])];
    const assets={};
    await Promise.all(names.map(async n=>{
      if(embedded[n]){assets[n]=embedded[n];return;}
      const r=await fetch(asset(n));if(!r.ok)throw Error(`${n}: ${r.status}`);
      const blob=await r.blob();assets[n]=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('File read failed'));reader.readAsDataURL(blob);});
    }));
    const serialized=(x)=>JSON.stringify(x).replace(/</g,'\\u003c');
    const script=`(${portfolioApp.toString()})(${serialized({...content,custom:draft,initialLang:lang})},${serialized(stylesheet)},${serialized(assets)});`;
    const html=`<!doctype html><html lang="${lang==='zh'?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yutian Lu · Portfolio</title><style>${stylesheet}</style></head><body><div id="app"></div><script>${script.replace(/<\/script/gi,'<\\/script')}<\/script></body></html>`;
    const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}));link.download=`Yutian-Lu-Portfolio-${new Date().toISOString().slice(0,10)}.html`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),10000);
  }
  if (content.custom) profile='custom';
  render();
}

portfolioApp({ projects, skills, profiles }, css);
