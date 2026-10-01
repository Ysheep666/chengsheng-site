# Assessment B — 删除下载安装块后的独立技术证据

本轮仅核查技术与浏览器证据，不评分。目标为 index.html、site.css、site.js、404.html；现场 URL 为 http://127.0.0.1:4173/。未读取 A、其他代理结果或旧 critique 报告，未运行 context / seed，没有修改源文件。

## 结论

下载块已完整删除，没有 #download 残链。顶栏和首屏两个 DMG 直达链接、页脚 ZIP 备用链接，以及发布所需版本、隐藏文件名、SHA256 和说明元数据仍完整。版本信息失败、被拒绝、重试、更新和下载点击反馈均在路由样本中可用。示例操作和窄屏导航没有发现功能回归。

确认一个 P2 问题：部分品牌链接，以及桌面配置指南链接没有达到本轮指定的 44px 点击高度。它没有阻断下载，也不是 axe 报出的 WCAG AA 违规。

## 确认问题 B-01（P2）

位置：site.css:61 `.brand`、site.css:182 `.workflow-note a`、site.css:220 页脚品牌文字。

- 首页 1440：顶栏品牌 43.75px，配置指南 21px，页脚品牌 36.75px。
- 首页 390 / 320：顶栏品牌 38.5px，页脚品牌 36.75px。
- 404 1440：品牌 43.75px；404 390 / 320：品牌 38.5px。
- 下载、演示、移动导航、FAQ 和普通页脚链接均达到 44px。

影响：品牌链接在手机上的有效点击高度偏小，配置指南在桌面只是 21px 高的独立链接。可在基础规则给 `.brand` 加 `min-height:44px`，把配置指南的 `display:inline-flex; align-items:center; min-height:44px` 从手机规则提升到基础规则。建议命令：`$impeccable adapt`。

44px 是本轮明确的检查门槛，也对应 WCAG 2.5.5 的增强目标尺寸；不能据此宣称 WCAG AA 失败。

## 单次 detector 原始结果

实际命令：`/Users/xyz/.agents/skills/impeccable/scripts/impeccable detect --json index.html 404.html`。

仅执行一次，exit code 2，stderr 为空。原始 JSON 见 `assessment-b-detector.raw.json`；退出码和 stderr 另存同目录。共有14条：`cramped-padding` 9条 warning；`design-system-color` 5条 advisory。13条位于 index.html，1条位于 404.html；工具所有 line 字段为0，原始 snippet 完整保留在 JSON 中。

核实说明：

- 9条 cramped-padding 为静态检测没有还原容器层次与排版内边距。应用窗口外壳使用内部标题栏、侧栏和工作区完成留白；标题栏45/40px高且居中，工作区28/12px横向内边距。流程列有22px内边距，深色事实行23px纵向内边距，FAQ区94/51px纵向留白，FAQ summary 有17px纵向内边距和66/62px高度。三个宽度截图与DOM未见文字贴边、裁切或溢出。对应 site.css:101、102、124、174、187、199、205。
- 两页h1黑色以及 app-window 的 #999边框共3条色彩提示来自 print 规则（site.css:366、369）。屏幕实际两页h1均为 `rgb(39, 42, 36)`，不是工具所报的纯黑。
- 剩余2条色彩 advisory 对应标题分隔符 #848b7b（site.css:103）及深色事实边线 #4b5143（site.css:187）。这是现有非正文层次色，检测器提示登记之外的色值，但未确认可读性或删除后的体验故障；不将其升级为实际体验缺陷。

扫描发生在 Root 最后调整404 h1措辞之前；此后仅该文字变化，结构、CSS和CSP保持不变。遵守只运行一次的要求，没有重跑 detector。

## 浏览器实测

使用常规 Playwright fallback，因为本轮 Browser plugin/skill 不可用。新建独立 browser contexts / pages，三个视口为1440×900、390×900、320×900。首页与404各三个宽度都有完整截图和 axe 原始 JSON。

- 两页 × 三宽度 axe：0 violation、0 incomplete。Root 后来把404标题精简为“页面不存在。”，已重新截取该页三个宽度并重跑该页 axe：仍0 violation / incomplete。这里没有给出视觉或健康评分。
- 没有 `#download`、`.download-section` 或指向被删目标的链接；其余同页 hash 引用对象均存在。
- 没有正文横向溢出、控件文案裁切或缺失的 `aria-describedby` / `aria-labelledby` 对象。
- 两个 DMG href 确实是 GitHub Releases 的 `.dmg` 文件地址；页脚 ZIP 为真实 `.zip` 文件地址，而不是仅靠JS赋值。
- 首页正常版本 feed v0.0.7 返回后 status 为空，无重复“已是最新”提示；重试按钮保持隐藏。
- 测试了HTTP503、网络失败、格式坏JSON、null、坏版本、版本HTML注入、坏SHA256、javascript协议、HTTP协议、目录穿越、URL凭据、query、fragment、错文件名、URL引号及非字符串文件名。失败/不合法数据保持v0.0.7三条链接与checksum不变，明确仍可下载，出现重试；重试获取正常feed后恢复。另用Playwright fake clock验证8秒超时分支和重试入口。
- v0.0.8合法feed同步更新全部两条DMG、一条ZIP、两个隐藏文件名、SHA256以及版本。文案明确下载链接v0.0.8、功能说明对应v0.0.7；隐藏说明仍保留。
- 仅文件名的合法feed生成 `/downloads/Chengsheng-0.0.8-arm64.zip` / `.dmg` 地址，大写SHA256规范为小写。
- 若在新版feed返回前点击下载，后续反馈会说明刚才打开v0.0.7和新链接v0.0.8。
- 每个宽度点击顶栏DMG、首屏DMG、页脚ZIP，反馈均为“已打开…下载链接。进度请查看浏览器下载列表。”，没有“已下载完成”断言。全部用route提供的小型attachment样本，未请求真实大安装包。
- 示例：换个例句、输入修改、Ctrl+Enter、Esc、重置按钮、返修中Esc取消、空输入说明与禁用、56字中文及连续56字英文自动高度均通过；其他三句不变。通过焦点在示例外时以DOM触发动作，验证演示开始、完成和重置均不抢外部焦点。
- `#model-help` 首次点击展开，关闭后点击相同hash仍重新展开。手机菜单能打开、选择锚点后收起，Esc收起并回到菜单summary焦点；菜单链接达到44px。
- Windows UA显示平台说明，两条DMG改为“保存 Mac 安装包”；描述对象仍完整。减少动态效果模式保留返修状态和完成反馈，页面滚动为auto。
- 初次键盘Tab进入可见“跳到正文”，有2px实线焦点框，Enter正常到 #main。
- 禁用JS与阻断site.js，三个宽度均保持静态校样示例、明确“网页不生成音频”、可操作下载，三条href均存在；两种模式合计18次下载点击均使用小型fixture确认。

原始主脚本81个断言记录有72通过、9失败。6条失败是上述44px目标高度问题，同一类实际问题；其余3条是Playwright `getByText` 无法找到 noscript 段落的测试工具限制。定向改用CSS locator `noscript > p`后，该段在三宽度均可见且文案正确，九次无JS下载全部确认。原始失败记录保留，没有抹去。定向复核另外增加1条feed超时检查和3条最终404确认，均通过。无未解释的页面异常；console中只有主动阻断script、模拟503与网络失败的预期消息。

## CSP、overlay 与清理

本轮没有可见的用户浏览器overlay。已知严格CSP会拒绝外部overlay，按任务要求不重新尝试、不弱化策略、不启动live-server；替代信号是单次CLI、Playwright截图/DOM/行为断言和axe。CSP仍为页面原始self限制。

没有启动或停止现有127.0.0.1:4173服务。三个运行脚本的浏览器和所有contexts均已关闭。脚本、截图、原始JSON与报告按要求保留在 `/tmp/chengsheng-copy-refinement`。

初轮四个源文件前后SHA256一致。Root授权最后修改404标题后，以最新404 SHA重新确认；最后确认阶段四文件前后也完全一致。B没有源文件写入。完整指纹及授权变化说明保存于 assessment-b.json。

## 证据文件

- `assessment-b.json`：完整合并结构，含原始detector、主浏览器结果、定向复核、最后404确认与指纹。
- `assessment-b-browser.cjs` / `assessment-b-browser-results.json`：初轮脚本与完整断言/DOM/console/screenshot记录。
- `assessment-b-followup.cjs` / `assessment-b-followup-results.json`：noscript CSS定位与feed超时的定向复核。
- `assessment-b-404-confirm.cjs` / `assessment-b-404-final-results.json`：最终404文字、截图、axe、指纹确认。
- `b-home-{1440,390,320}.png`、`b-404-final-{1440,390,320}.png`：最终主页面截图。
- `b-demo-long-*`、`b-model-help-*`、`b-no-js-*`、`b-blocked-site-js-*`、`b-new-feed.png`：边界与异常状态截图。
- `b-axe-*.json`：全部axe原始输出。

Questions skipped: 本报告为隔离B交付；父代理将在A完成后合并并处理最终对话。
