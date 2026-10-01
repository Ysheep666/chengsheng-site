Method: isolated Assessment B 第 2 轮（/root/impeccable_evidence_review）；未读 A 本轮消息/报告或历史 critique 报告，不评分、不改代码。

复核当前 `index.html / site.css / site.js / 404.html`，地址 `http://127.0.0.1:4173/`。测试前后源码 SHA-256 一致，见 `source-stability-b-round2.json`。本轮 **95 个路径断言全部通过**，未发现 P0/P1/P2；另从反馈状态的矩形记录保留 1 项 P3 质量观察。

## 原技术问题关闭证据

| 项目 | 第 2 轮实际证据 | 状态 |
|---|---|---|
| 行号对比度 | 改为 `--muted`：初始 4.968:1、已改 4.662:1、完成 4.772:1；等待背景过渡结束后测量，三视口均 ≥4.5 | 关闭 |
| 返修焦点与 Esc | Ctrl+Enter、按钮两种方式都在忙碌时保留 textarea 焦点，readonly 而未 disabled；生成中 Esc 取消、完成后 Esc 重置均成功 | 关闭 |
| 重复配置锚点 | 打开指南、手动关闭、同 hash 再点链接，四步指南重新打开；1440/390/320 均复现成功 | 关闭 |
| 手机功能小字 | 角色/状态/文件信息 13px；手机流程辅助说明 13px，桌面 12px；演示反馈与说明 13px | 关闭 |
| 次要控件高度 | 顶栏下载、芯片帮助、textarea、两种工具复制按钮默认/恢复态均达到至少 44×44 | 原尺寸问题关闭；成功文案有下述 P3 |

## 唯一保留的技术观察

**[P3] 复制成功时，两个工具按钮宽度暂时缩为 39px。** `#copy-command`、`#copy-checksum` 把文字换成“已复制”后，实际矩形为 **39×44px**（三个视口都有证据），约 2.5 秒后恢复原文案和 52/65px 宽。复制值、焦点、live status 与恢复均正确；这不阻断任务，也不声称违反 WCAG AA。它使反馈状态的横向触控目标低于 44px 质量目标。位置：`site.css:242`、`site.js:179`。可给工具按钮 `min-inline-size: 44px`，或预留文案宽度；建议 `$impeccable polish`。详情见 `assessment-b-round2.json.currentIssues` 与原始 copy 矩形。

## 改动路径验证

**长句与多行。** 输入 56 个中文字符后，textarea 在 1440/390/320 分别增长到 2/6/9 行，`clientHeight=scrollHeight` 为 71/170/250px，`scrollTop=0`，无横向内部滚动；所有文字可见。计数稳定显示“56 / 56 字符”，继续键入受 maxlength 阻止。含三个显式换行段落的文本也完全可见。截图：`b2-demo-long-1440.png`、`b2-demo-long-390.png`、`b2-demo-long-320.png`。

**返修的键盘与计时器。** 三个视口均验证：两种触发方式的忙碌态和完成态焦点为 `demo-sentence`；Esc 在忙碌时复原并取消计时器，等待 850ms 没有被延迟完成覆盖；完成后 Esc 复原；重置按钮取消并恢复 textarea 焦点。空白加换行的句子禁止返修，明确提示补文字。演示只改变第三句，其他三句原文不动。演示开始后主动聚焦顶栏下载链接，完成时焦点仍在该链接，未抢回演示区。

**锚点与菜单。** 配置指南同一片段链接再次点击可重新展开；展开后有四个步骤。390/320 菜单在视口内，点击 FAQ 关闭并导航；Esc 关闭后焦点回到 summary。

**真实剪贴板。** 允许路径使用浏览器 clipboard-read/write 权限，三种复制在三个视口的 `navigator.clipboard.readText()` 均与下载地址、命令、hash 精确一致。拒绝路径通过 CDP 设置浏览器真实权限为 denied，在 390/320 测试三种动作；未替换 navigator API。每项都在相邻的独立 `role=status` 中显示手选值，Selection 与期望值完全相同；按钮保持可用、焦点留在发起按钮、aria-busy 清除，失败原文案立即恢复。成功文字“已复制”随后恢复原文案，计时器未抢焦点。

三个 live status 为 `download-copy-status`、`command-copy-status`、`checksum-copy-status`。反馈距离相应按钮底部 7–9px；在本次将操作按钮置于可阅读位置的手机场景中，成功与失败反馈矩形都完整落在 sticky header 下方和视口下边界以内，长地址/命令会换行，没有横向溢出。每种手机复制状态都有 `b2-copy-allow-*` / `b2-copy-deny-*` 截图。测试没有证明“按钮只露出屏幕底部一点时，任意长度反馈仍全在屏内”；这里只报告实际测量的阅读位置。

**版本更新及重复 ZIP 标记。** 路由返回 0.0.8 裸文件名时，两个 `span[data-file="zip"]` 都变为 `Chengsheng-0.0.8-arm64.zip`，命令成为 `shasum -a 256 ~/Downloads/Chengsheng-0.0.8-arm64.zip`，两个 DMG 链接、ZIP 链接、版本、checksum 同步更新。三种真实复制值均取新值；带绝对路径的新文件名校验通过。发布标记仍有唯一 `span[data-release]` 和唯一 `p.lede[data-release-notes]`（class 只有 lede）。ZIP 标记重复为发布器支持的合法复用，不是重复 ID 或缺陷。

**必要清单回归。** 只补测 503 保留当前下载及可用 retry、重试后成功，以及上面的新版/裸文件名/复制值。已有坏 JSON、坏数据、超时等独立边界没有再次全面扩测。下载均路由成极小附件，DMG/ZIP 浏览器文件名正确；未获取真实约 100MB 二进制，也未验证安装。

**无 JavaScript。** 390 视口关闭 JS 后，原生 FAQ summary 能打开四步首次出声指南；固定版本 DMG/ZIP 链接产生下载事件；仅脚本使用的复制/演示操作隐藏，示例 textarea 保持禁用。核心帮助和下载可使用，无溢出。

## 页面、资源与 axe

- 首页与 404 均覆盖 1440×900、390×844、320×740；默认页、长句、指南展开、ZIP 展开和复制失败状态无文档横向溢出。
- 正常产品 CSP 下 console、pageerror、未成功请求均无异常；本机资源正常响应，lazy 图标进入视口后 complete。
- 首页与 404 三视口的 **6 份 axe 报告均为 0 violations、0 incomplete**。先完成正常 CSP 的真实操作，再在独立 `bypassCSP: true` 测试 context 注入 axe；未更改产品 CSP。这是自动扫描范围内的结果，不是全场景 WCAG 认证。
- 使用已安装 Playwright 与指定 Chromium headless shell。手机为触屏/UA/尺寸仿真，仍是 Chromium 引擎；没有实际 Safari 或真机测试。

## 第一轮检测器基线处理

**本轮未运行 `impeccable detect`，未尝试 overlay。** 仅重用 `detector-b-round1.stdout` 的原始信号；任何规则数量都属于第一轮，**不当作第 2 轮扫描结果**。机器 JSON 的 `currentFindingCount` 为 null。

14 条 `undersized-ui-text` 以当前角色、状态、流程与文件信息的计算字号核实关闭。4 条 `tiny-text` 的原输出均无 selector、行号为 0，不能机械逐条定位；相关演示反馈、下载说明及终端区域当前为 13px，剩余 11px 文字主要是桌面示例章节辅助信息及手机页脚导航，当前样式记录已保留。13 条容器/chip 信号沿用上下文核对：子元素内边距、居中标题栏、分隔线级联及紧凑 chip 未出现本轮裁切/任务故障；没有把旧 warning 数转换成当前问题总数。31 条基线原始 file/rule/location/snippet 均保留在本轮 JSON 的明确 baseline 字段。

## 产物与运行记录

- 汇总：`assessment-b-round2.json`；原始结果：`browser-b-round2.json`；脚本：`assessment-b-browser-round2.cjs`；源码稳定性：`source-fingerprint-b-round2.json` / `source-stability-b-round2.json`。
- 自动可访问性：6 份 `axe-b2-*.json`。截图全部 `b2-*.png`，覆盖三视口首屏/整页、长句、两页与手机复制反馈；没有读取主代理或 A 的截图报告。
- 未修改项目文件、未启动额外服务器、未重跑 detector/overlay；所有 browser/context 已关闭。按任务要求保留的临时证据只在 `/tmp/chengsheng-redesign-evidence`。
- A 隔离：未读 A 本轮消息/报告；合并前未通过消息发送 findings 或 counts。

Questions skipped: 独立技术证据复核；主代理负责 A 合并和 critique 收尾。
