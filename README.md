# 成声网站

公开页是 `https://chengsheng.app/`。静态文件在这个仓库的 `main`，GitHub Pages 从这里部署，自定义域名写在 `CNAME`。

下载按钮写在首页上，没有脚本也能点。页面再读 `downloads/latest-mac.json`，核对版本、zip 地址和 sha256 之后才改按钮。对不上就留着页面上写好的那一版。`file` 是绝对 `https://` 链接，或与版本一致的裸文件名 `Chengsheng-<版本>-arm64.zip`。zip 和磁盘映像挂在本仓库的 Release `app-v<版本>` 上，不进 `downloads/`。

已经安装的成声读的是同一份说明。有新的稳定版会自动下载并核对，配置里点「重启安装」才换上。

本地预览：

```bash
python3 -m http.server 4173
```

稳定版由成声仓库在本机跑 `python3 scripts/pack/publish_site.py --tag vX.Y.Z`。它把安装包传到 Release，并把首页的版本、说明、下载地址和校验写成这一版。候选版不进这个网站。

发布脚本靠这几处标记改首页，改页面时留着：

- 唯一的 `<span data-release>`，不要再加别的属性
- `<p class="lede" data-release-notes>`，`class` 只有 `lede`
- 下载用带 `data-download="dmg"` 或 `data-download="zip"` 的链接，`href` 用双引号
- `<code data-checksum>` 放 zip 的 sha256
