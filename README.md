# 陆雨甜 / Yutian Lu · 双语个人网页

在线地址：https://llllythia.github.io/Personal-Portfolio/

访客直接用浏览器阅读，无需下载或登录。Vite + 原生 JavaScript，无后端、数据库和外部字体。公开版本展示五个案例、双语切换、能力筛选与图板放大；不提供 PDF、离线包或整站导出入口。

## 开发与检查

环境为 Node.js 24 / npm 11。当前云环境已安装 `/usr/bin/chromium`，也可通过 `CHROMIUM_PATH` 指定浏览器。

```bash
cd /workspace/Personal-Portfolio
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173 --strictPort
```

开发服务器绑定 127.0.0.1。本地开发模式保留定制投递版编辑器：可调整中英文介绍与项目顺序，并用本地关键词匹配分析 JD。它不是已接入的在线可视化编辑或发布服务。

```bash
npm run release
npm test
```

`release` 仅构建公开网页 `dist/`，不生成下载文件。测试自行启动生产预览 4178 端口与本地编辑器 4181 端口，验证五个案例、双语、图集、移动布局、JD 编辑与本地导出，以及旧 PDF/ZIP/离线 HTML 地址不可访问。

## 内容与展示

- `src/data.js`：五个项目的双语内容、能力标签与四种投递预设。Studio 2 为综合版和体验版重点案例。
- `src/main.js`：公开页面与仅在开发模式出现的定制工具。
- `src/style.css`：白底极简样式及响应式布局。
- `public/assets/`：网页实际展示的图片，不含源 PDF 或下载包。
- `docs/capability-analysis.md`：内部内容梳理与能力分析记录。

署名与联系方式按本人授权展示。环铁为独立项目，其余为小组项目；按本人偏好暂略细分个人贡献。Studio 2 的详情名称包含 Smart TOD Design，不显示课程性质标签。所有项目的“成果与证据边界”模块已按要求移除。

预设链接使用 `?view=culture&lang=zh`；支持 general、culture、experience、creative。自定义文字仍需通过本地工具保存，不自动生成公开版本。

## 本地留档

如本人确需生成离线副本，在本机运行 `npm run package:local`。文件仅生成在被 Git 忽略的 `.local/offline-downloads/` 中，不进入 dist，也不部署到公网。原 PDF 的当前实例备份保存在 `.local/source-documents/`（不会提交）；用户最初的上传文件也未改动。

## 发布与文件可见性

用户已授权部署。main 更新后，GitHub Actions 构建并测试，使用 rsync --delete 更新 gh-pages，再请求 Pages 构建。Pages 设置为 Deploy from a branch → gh-pages → / (root)。旧版 PDF、ZIP 和离线 HTML 从当前 main 与网站成品中移除。

这不构成防复制措施：浏览器能显示的图片仍可被截图或保存。公开 GitHub 仓库的历史提交可能仍含旧文件；本次没有重写 Git 历史，也不会撤回已下载的副本。

云任务已隔离，后续直接使用现有 checkout，无须另建 Git worktree。
