# 成声网站

静态页。下载页和自动更新用同一份文件，都在 `downloads/`。

```
downloads/latest-mac.json
downloads/Chengsheng-<version>-arm64.zip
downloads/Chengsheng-<version>-arm64.dmg
```

应用读取 `https://ysheep666.github.io/chengsheng-site/downloads/latest-mac.json`，再在同一目录下载 json 里的 zip。换域名时改成声仓库里的 `SITE_ORIGIN`。

本地预览：

```bash
python3 -m http.server 4173
```

稳定版在 GitHub 上发布成功后，成声仓库的 `Publish Release to Site` 会把 zip、dmg、json 和首页上的版本推到这个仓库的 `main`。Pages 跟着部署。本机打包时，旁边有这个目录也会先把同样的文件抄进来。
