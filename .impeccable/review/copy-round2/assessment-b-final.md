# 最终 Assessment B — 一次有界修复确认

目标为 Root 已宣布的修复范围。使用独立常规 Playwright contexts/pages，在1440、390、320宽度进行一次定向确认；没有读A或其他报告，没有评分，没有修改源文件，没有重跑detector、overlay、原81断言或axe。

## 结论

原B-01的44px问题已解决：三个宽度首页与404品牌目标均达到44px；首屏新setup-note配置指南也是44px。旧workflow-note和整个download-section均未恢复。

发现一个新的P2状态问题：检查版本期间先点击页脚ZIP，feed随后成功时，页脚反馈与新版本竞态提示正确，但首屏仍残留“正在检查新版，当前安装包可下载。”。下载没有阻断，需要清理首屏原loading状态。

## 新确认问题 B-final-01（P2）

位置：site.js `startRelease()` 的 `load()` 成功分支、`clickedStatus` 目标选择；index.html 的 `#status` / `#zip-status`。

复现证据：

1. route暂缓 `/downloads/latest-mac.json` 响应。
2. 点击页脚ZIP，小attachment fixture下载成功；`#zip-status` 正确显示“已打开 ZIP 下载链接。进度请查看浏览器下载列表。”。
3. 返回合法v0.0.8 feed，版本和两DMG/一ZIP href同步更新，页脚正确显示“下载链接已更新为 v0.0.8。你刚才打开的是 v0.0.7，可重新下载。”。
4. 首屏 `#status` 仍为“正在检查新版，当前安装包可下载。”。

原因：点击ZIP把clickedStatus切到页脚；成功分支在clickedVersion存在时仅写clickedStatus，没有清理原首屏loading文本。相同版本分支也跳过清理。

建议：feed成功且clickedStatus不是首屏status时，清理首屏原loading文本，保留页脚就近反馈和DMG自己的下载提示。

截图：`b-final-zip-race-newer-320.png`显示页脚的新版本反馈；完整数据在最终JSON的`results.raceEvidence`中，其中v0.0.8版本及三个已更新href证明feed已完成。相同版本案例本身没有等待version变化，不独自作为fetch已结束的证据；源码分支分析与已更新版本案例足以确认。

## 已确认的修复与功能

- 首页及404的品牌点击高度在1440、390、320均为44px；所有当前可见剩余交互目标通过44×44px检查。setup-note指南链接基础规则生效。
- 首屏前提提示和“配置指南”直达model-help；“试改一句”直达demo。配置指南第一次展开、关闭后相同hash再点击仍重新展开。
- 模型指南保留4步骤和2条确认项；FAQ保持4项。流程导出文案只包含本章或整书；DMG拖入应用程序及ZIP解压交接说明都存在。
- 普通feed成功后，首屏status与zip-status均为空，未重复显示版本状态。
- ZIP点击已在三个宽度用小fixture验证：下载事件出现，页脚状态文案正确，首屏status为空，反馈位于footer内部。没有“已下载完成”断言。
- 非Mac（Windows UA，390）两DMG文案为“保存 Mac 安装包”；ZIP仍为“ZIP备用包”。三个下载链接都关联 `platform-limit os-note`；轻量提示为“可保存安装包，在符合上方要求的 Mac 上运行成声。”，描述对象无缺失。
- 390、320的默认和修改后示例提示没有Ctrl、⌘、Esc；1440保留快捷键提示。320实测Ctrl+Enter完成返修、Esc重置仍有效。
- 320的状态移至第三列下一行；状态表头隐藏，整个表头继续aria-hidden。示例文字可用更宽第三列展示。
- 三宽度56字中文和连续英文均自适应高度，没有textarea裁切或页面横向滚动。
- 工具栏默认HTML与JS状态都是“示例 · 不生成音频”。无JS和阻断site.js三宽度均显示静态校样反馈、禁用编辑并隐藏操作按钮，仍保留真实三条下载href；18次小fixture下载确认正常。
- 无 `#download` 残块或残链，没有缺失ARIA描述对象。

## 原始断言记录与测量边界

本次24个定向断言记录为18通过、6失败，原始记录完整保留。

其中2条失败对应上面的版本检查loading残留，同一根本问题。

其余4条是打开FAQ后，summary和faq容器的scrollWidth比clientWidth多3–4px。document的宽度始终没有超视口。结合现有17px加号SVG旋转45deg，单侧外接尺寸约3.52px，这些数值与图标变换框相符；这是CSS和DOM证据支持的推断。未确认文字裁切或页面横向滚动，不作为需要修复的文案溢出。三个ZIP检查在这个无关FAQ的严格overflow断言失败前，已经通过下载事件、就近文案、首屏为空与页脚边界的检查。

三个正常首页截图、三个长句截图、无JS/阻断script窄屏截图、非Mac截图及两个ZIP竞态页脚截图已保留。没有再次启动浏览器验证这些测量告警。

## 证据与清理

- `assessment-b-final.json`：完整结构化结果、问题、已解决项和源指纹。
- `assessment-b-final-browser.cjs`：本次唯一浏览器检查脚本。
- `assessment-b-final-browser-results.json`：原始24断言、DOM、race、console、截图与指纹。
- `b-final-home-{1440,390,320}.png`、`b-final-long-{1440,390,320}.png`：最终页面及长句。
- `b-final-no-js-320.png`、`b-final-blocked-site-js-320.png`、`b-final-non-mac-390.png`：静态与设备状态。
- `b-final-zip-race-current-320.png`、`b-final-zip-race-newer-320.png`：ZIP反馈位置与竞态提示。

所有浏览器和contexts已关闭。未启动/停止服务，CSP保持不变；console仅包含三次主动阻断site.js的预期资源错误，没有页面异常。四个源文件前后SHA256完全一致。所有临时证据按要求留在 `/tmp/chengsheng-copy-refinement`。

Questions skipped: 最终B交付给父代理合并，下一次确认需等待其宣布具体变更范围。
