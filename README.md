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

首页包含按句返修的交互示意、制书流程、模型说明与常见问题。顶栏与首屏直接下载 DMG，页脚提供 ZIP 备用包和版本记录。示意不调用模型、不生成音频。关闭 JavaScript 后，下载链接与原生折叠内容仍可使用。

字体是自托管的 Noto Serif SC 子集，来源与 OFL 许可保留在 `assets/fonts/`。页面没有外部运行时依赖；只会从本域读取版本清单。修改标题或书稿里的宋体文字后，需检查字体子集是否包含新增字形。

设计规范见 [DESIGN.md](DESIGN.md)，产品能力与约束见 [PRODUCT.md](PRODUCT.md)。调研、截图和审查记录位于本机的 `.impeccable/`，不纳入版本管理。`.pier/`、本机注入的 Pier skill 链接、环境变量文件和编辑器临时文件也由 `.gitignore` 排除；环境变量示例 `.env.example` 可以提交。
