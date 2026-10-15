# Yutian Lu · 双语作品集

从本科作品集整理的研究、策划与体验设计网站。使用 Vite 和原生 JavaScript，无后端、数据库、API 密钥或外部字体依赖。JD 匹配在浏览器内执行。

## 开发

使用当前云环境的 Node.js 24 / npm 11（Vite 要求 Node 20.19+ 或 22.12+）。

```bash
cd /workspace/Personal-Portfolio
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173 --strictPort
```

## 构建和验证

```bash
npm run build
npm test
```

测试使用系统 `/usr/bin/chromium`，也可用 `CHROMIUM_PATH` 指定浏览器。它会自行启动并停止 4178 端口的生产预览，验证双语、四个案例、图集、筛选、JD 建议、输入验证、导出及离线导出版本。桌面、平板、手机截图存入忽略的 `test-results/`。当前环境的浏览器策略禁止直接打开 `file://`，测试将导出文件原样送入隔离、断网的浏览器上下文，验证其无网络依赖。

## 修改内容

- `src/data.js`：四个项目的中英文标题、背景、分析、成果、证据说明和能力标签；四种预设投递方向。
- `src/main.js`：网页结构、联系信息、项目图集和定制工作台。
- `src/style.css`：颜色、排版、响应式与减少动态效果支持。
- `public/assets/`：从用户 PDF 提取的项目页和项目图集 PDF。下载版移除原 PDF 封面，避免公开旧联系信息；页内 PDF 引用沿用原文件页码，打开项目图集时已校正偏移。
- `docs/capability-analysis.md`：详细能力提炼、JD 对应、证据边界与补充建议。

署名为本人确认的「陆雨甜 / Yutian Lu」。联系方式按本人明确授权公开。环铁为独立项目；其余为小组项目。Healing Maze 的小组性质按本人确认更正，原图板仍保留原文件标注；按本人偏好，暂略个人分工，项目说明呈现团队整体思路。

## 按 JD 定制

1. 打开“定制投递版”，选择综合、文旅、用户体验、数字创意方向。
2. 可选：粘贴 JD，用预设关键词匹配调整介绍建议、能力与项目排序。此功能不是 AI，不评估任职资格，不添加项目事实。
3. 修改中英文标题、介绍与项目顺序。项目 ID 必须四个各出现一次。应用可预览；自定义文字只保存在当前页面内存，刷新会丢失，需导出保留。
4. 导出独立 HTML，内嵌双语内容、项目图片、项目图集 PDF 及交互。每个岗位可保存一个不同文件；导出的版本也能再编辑、再导出。JD 原文不进入导出文件。
5. 预设版本可通过 `?view=culture&lang=zh` 等参数访问；`view` 支持 `general`、`culture`、`experience`、`creative`。自定义文案不编码在 URL 中。

导出文件保存在浏览器下载位置。测试也会生成 `.local/exports/Yutian-Lu-Portfolio.html`，仅作导出验证示例；其中定制文案不替换源文件的综合版。

## 发布

`npm run build` 生成静态网站 `dist/`，可部署至 GitHub Pages、Netlify 等静态托管。资源使用相对路径，支持仓库子目录。导出的单文件 HTML 也可单独托管。

用户已授权部署。`npm run release` 生成 `dist/`、离线 HTML 和 ZIP 下载包。`.github/workflows/deploy.yml` 在 main 更新时构建、检查并通过官方 GitHub Pages Actions 发布。GitHub Pages 应设置为 GitHub Actions。首次部署同时保留 gh-pages 成品分支，提供源码之外的网页及离线包下载。云环境的配置草稿保存与发布，也不同于网站上线。

云任务本身已隔离；后续直接使用现有 checkout，无须新建 Git worktree。
