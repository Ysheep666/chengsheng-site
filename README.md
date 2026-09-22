# 成声网站

静态页。下载页和自动更新用同一份文件，都在 `downloads/`。

```
downloads/latest-mac.json
downloads/Chengsheng-<version>-arm64.zip
downloads/Chengsheng-<version>-arm64.dmg
```

应用读取 `https://chengsheng.app/downloads/latest-mac.json`，再在同一目录下载 json 里的 zip。换域名时改成声仓库里的 `SITE_ORIGIN`。

本地预览：

```bash
python3 -m http.server 4173
```

稳定版打包后，成声的 `publish.py` 会把 zip、dmg 和 json 复制到这里（旁边有 `../chengsheng-site`，或设置 `CHENGSHENG_SITE_DIR`）。zip 和 dmg 不进 git。
