# 成声网站

公开页是 `https://chengsheng.app/`。静态文件在这个仓库的 `main`，GitHub Pages 从这里部署，自定义域名写在 `CNAME`。

下载按钮写在首页上，没有脚本也能点。页面再读 `downloads/latest-mac.json`，核对版本、zip 地址和 sha256 之后才改按钮。对不上就留着页面上写好的那一版。`file` 是绝对 `https://` 链接，或与版本一致的裸文件名 `Chengsheng-<版本>-arm64.zip`。zip 和磁盘映像挂在本仓库的 Release `app-v<版本>` 上，不进 `downloads/`。

已经安装的成声读的是同一份说明。有新的稳定版会自动下载并核对，配置里点「重启安装」才换上。

本地预览：

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

稳定版由成声仓库在本机跑 `python3 scripts/pack/publish_site.py --tag vX.Y.Z`。它把安装包传到 Release，并把首页的版本、说明、下载地址和校验写成这一版。候选版不进这个网站。

发布脚本靠这几处标记改首页，改页面时留着：

- 唯一的 `<span data-release>`，不要再加别的属性。别处的版本用 `<span data-release-echo>`，同样不要加别的属性
- `<p class="lede" data-release-notes>`，`class` 只有 `lede`
- 下载用带 `data-download="dmg"` 或 `data-download="zip"` 的链接，`href` 用双引号。页面上可以有多处，发布时每一处都会改
- `<span data-file="dmg">` 和 `<span data-file="zip">` 放文件名，不要加别的属性。文件名与发行说明在首页隐藏元数据中，仍由发布脚本更新
- `<code data-checksum>` 放 zip 的 sha256，保持在隐藏发行元数据中

首页包含按句返修的交互示意、制书流程、本机与远程模型说明、第一次出声指南与常见问题。按用户确认，整块底部安装下载区域已移除：顶栏与首屏直接下载 DMG，页脚提供 ZIP 备用包和版本记录。示意不调用模型、不生成音频。关闭 JavaScript 后，下载链接与原生折叠内容仍可使用。

字体是自托管的 Noto Serif SC 子集，来源与 OFL 许可保留在 `assets/fonts/`。页面没有外部运行时依赖；只会从本域读取版本清单。修改标题或书稿里的宋体文字后，需检查字体子集是否包含新增字形。

首次重实现的调研依据见 [.impeccable/research/2026-09-30-redesign.md](.impeccable/research/2026-09-30-redesign.md)，官方页面截图及 DOM 观察归档在 `.impeccable/research/references/`。设计评审使用 impeccable 的十项启发式，每项 0–4，总分 40；首次重实现经历 32 → 35 → 39 分，该阶段截图和验证记录在 `.impeccable/review/round3/`，历轮评分与修复记录在 `.impeccable/critique/`。设计系统见 [DESIGN.md](DESIGN.md)，预览侧车见 [.impeccable/design.json](.impeccable/design.json)。

后续全站文案审查见 [.impeccable/research/2026-10-01-copy-audit.md](.impeccable/research/2026-10-01-copy-audit.md)，检查必要性、固定 v0.0.7 产品事实和用户操作语言，包含移除整个底部下载区的范围说明与逐项清单。

本次精简合并评审经历 31 → 34 → 37/40，最终独立设计评分37/40，技术定向检查12/12通过。当前实现的截图、原始检查与报告在 [.impeccable/review/copy-round3/](.impeccable/review/copy-round3/)，前两轮原始失败与解释也分别保留在 `copy-round1/`、`copy-round2/`。
