Method: isolated Assessment B（/root/impeccable_evidence_review）；未读取 Assessment A、历史 critique 或主代理结论。

目标为 `/Users/xyz/ABC/chengsheng-site/{index.html,site.css,site.js,404.html}`，运行地址为 `http://127.0.0.1:4173/`。本报告只记录独立技术证据，不给 Nielsen 分数、不修改产品代码。全部临时脚本、截图及原始数据保存在本目录。

## 已确认的技术问题

无 P0 阻断。确认 P1 1 项、P2 3 项；另有 P3 1 项触控尺寸改进建议。检测器的 31 条 warning 是信号数，不等于 31 个用户问题。

1. **[P1] 第三句行号的正文对比度低于 AA。** `#demo-row > .line-number` 的“3”用 `#707765` 显示在 `#f6f4ed` 上，实测 **4.2257:1**，字号桌面 11px、手机 10px，未标为装饰。该行号用于定位可返修的第三句，因此需要正文 4.5:1。axe 将此项列为 `incomplete`，原因是文本太短；人工结合语义和 RGB 值确认不足。位置：`index.html:96`、`site.css:136`、`site.css:140`。建议统一检查各编辑状态的行号颜色，达到 4.5:1。建议 `$impeccable audit`。

2. **[P2] 返修开始后焦点落到 body，Esc 无法重置。** 在输入框改字并按 Ctrl+Enter，或点击“演示单句返修”后，脚本禁用正在聚焦的输入/按钮；`document.activeElement` 变为 `BODY`。演示中按 Esc 不取消；约 750ms 完成后焦点仍在 body，Esc 也不重置。按 Tab 或重新聚焦演示区后才可恢复键盘操作。两种触发方式独立复现。重置按钮能在演示中取消计时器，取消结果不会被延迟完成覆盖，所以任务仍有可用路径。位置：`site.js:240`、`site.js:252`、`site.js:271`。建议演示中把焦点放到区域内的可用控件，完成/取消后恢复输入框焦点，并确保这些状态下 Esc 可触发重置。建议 `$impeccable harden`。

3. **[P2] 相同锚点再次访问时，模型配置说明保持折叠。** 第一次点击“了解模型配置”与直接访问 `/#model-help` 都会打开答案；随后手动关闭该 details，回到流程区再次点击同一链接，URL 已经是 `#model-help`，不会触发 `hashchange`。结果只滚到题目，`open=false`、答案 `checkVisibility()=false`。截图见 `b-model-help-repeat-anchor.png`。位置：`index.html:123`、`index.html:177`、`site.js:286`、`site.js:290`。建议同页锚点点击时也执行目标 disclosure 的打开逻辑。建议 `$impeccable harden`。

4. **[P2] 手机端功能信息缩到 10px。** 390 和 320 视口的角色、状态与 DMG 文件信息为 10px；320 视口的流程辅助说明也为 10px。这是实际计算样式，支持检测器 14 条 `undersized-ui-text`。位置：`site.css:367`、`site.css:369`、`site.css:404`、`site.css:434`。这些信息说明“哪句、谁说、是否完成、下到哪一个文件”，字号会影响窄屏识别。建议至少达到技能的 11px 功能文字底线，关键说明优先 12–13px，并一并检查列宽。**WCAG 没有绝对字号下限，本项不声称字号本身违反 AA。** 建议 `$impeccable typeset`。

5. **[P3] 部分次要触控控件低于 44px 质量目标。** 手机顶栏下载入口 40px 高；芯片帮助 summary 40px；打开 ZIP 区后的复制按钮 36px；校样输入框在 390/320 宽分别约 33.39/31.75px。主要下载按钮、手机演示按钮和菜单项达到至少 44px，FAQ summary 为至少 62px。手机已量到的控件至少 24px，**低于 44px 不自动构成 WCAG AA 违反**。位置：`site.css:78`、`site.css:203`、`site.css:240` 与输入框样式。建议下一轮将这些次要控件点击区补到 44px。建议 `$impeccable adapt`。

## 检测器原始结果与核对

执行且仅执行一次扫描：

```text
/Users/xyz/.agents/skills/impeccable/scripts/impeccable detect --json index.html 404.html
```

退出码 **2**；stderr 为空。CLI help 确认支持变长参数 `[file-or-dir-or-url...]`，两个目标均属这次有效扫描。31 条 warning 全部位于 `index.html`；`404.html` 没有报告。规则计数：

| Rule | Count | 上下文结果 |
|---|---:|---|
| `cramped-padding` | 13 | 12 条容器/级联误报，1 条紧凑版本 chip 的上下文例外；未确认为用户缺陷 |
| `undersized-ui-text` | 14 | 手机计算样式确认，合并为问题 B4 |
| `tiny-text` | 4 | 小辅助文字信号存在；输出无 selector/行号，不能逐条唯一定位；代码/终端上下文单独判断 |

全部 rules、description、severity、category、file、line、snippet 原样保存在 `detector-b-round1.stdout` 和 `detector-b-round1.json`；最终机器结果 `assessment-b-round1.json` 还给每条信号加了 ordinal 和核对说明。检测器给出的行号全部为 **0**，不能当实际源码行号使用，上述技术问题附的是人工定位行号。

容器信号的具体核对：

- `app-window` 是边到边的工具窗框架，真实文字由 sidebar/main 子区留出 20/28px；不是文字贴边。
- `window-titlebar` 未写 padding，但通过 45px 高度居中，实际文字上下距约 11.5/12.5px，侧部文字离边 18px。
- 流程最后一列的 `border-right` 被 `li:last-child` 清除；中间列各有 22px 边距。
- 本机事实分隔行的底部 padding 为 23px，最后一行取消底部 border。
- 安装列表三行上下 padding 为 14px，实际文字到顶部约 19/20px。
- ZIP、FAQ 的外壳无 padding，但 summary 子元素各有 12px、17px 的垂直 padding。
- FAQ section 自身垂直 padding 为 94px（手机 51px），不是文字贴着分隔线。
- 版本 chip 的真实垂直 padding 为 1px、横向 9px；它是非交互的短标记，实测无裁切。这是保留的上下文例外，未把检测器“低 padding”机械转为缺陷。

详细边界、子元素 inset 和级联证据见 `confirmation-b-round1.json.paddingEvidence`。

## 浏览器验证覆盖

Browser plugin 不可用；父任务提供的 CUA 浏览器库存为空，因此按 frontend-testing-debugging 使用 regular Playwright 回退。调用指定的已安装 Playwright 与 Chromium headless shell；每个任务使用新 context/new page。没有安装浏览器、没有新增长驻服务。

| 验证范围 | 结果与证据 |
|---|---|
| 首页与 404：1440×900、390×844、320×740 | 内容正常；无横向溢出；截图覆盖首屏、整页及 404；404 恢复链接均指向首页或下载 |
| 正常 CSP 下控制台与资源 | 三个首页基线 console warning/error、pageerror 均为 0；本机 CSS、JS、图标、字体及清单全部 200 |
| 键盘焦点 | 跳到正文链接可见并到达 `#main`；Tab 顺序有记录；输入框和其他控件有 2px focus outline；演示状态存在 B2 |
| 演示 | 改字/示例按钮、Ctrl+Enter、演示完成、空值禁止、Esc 在区域内重置均有效；其他 3 句保持原文；重置按钮能取消生成中的计时器；脱焦后的 Esc 存在 B2 |
| FAQ / 模型配置 / 校验锚点 | 7 个 FAQ 可用 Enter 开合；首个模型配置链接及直接 deep link 打开对应 details；直接 `#checksum` 打开 ZIP 区；重复相同 hash 存在 B3 |
| 手机菜单 | 390/320 均可打开，菜单落在视口内；点击 FAQ 关闭菜单并导航；Esc 关闭并把焦点交还 summary |
| 无 JavaScript 下载 | 390 视口禁用 JS 后，固定 0.0.7 的 DMG、ZIP 都产生浏览器 download 事件；脚本交互控件隐藏，示例输入禁用，原生 details 可用 |
| 校验值 | 纯 64 位值、真实 `shasum` 的绝对路径整行、大小写、`*` 文件标记通过；错误 hash、错误文件名、12 位不完整值、非 hex、空值均给出正确状态 |
| 复制 | 浏览器真实剪贴板权限允许时，下载地址/命令/hash 三项 readText 均与目标一致；CDP 拒绝权限后三项均选中精确的手动复制值、显示提示并重新启用按钮 |
| 更新清单 | 成功、HTTP 503、网络失败、坏 JSON、坏数据、路径穿越数据、真实 8 秒超时、0.0.8 新版本、裸文件名、失败后重试全部通过 |
| 先点击后清单更新 | 先打开 0.0.7 下载链接，随后清单成为 0.0.8，明确提示刚才下载的是旧版本，下载、文件名、命令和 hash 同步到新版本 |
| 发布标记 | 唯一 `span[data-release]`、唯一 `p.lede[data-release-notes]`（class 只有 lede）；echo 1 个、DMG 链接 2 个、ZIP 链接 1 个；文件与 checksum 标记各 1 个 |
| Reduced motion | 保留“演示中/完成”的文字状态；spinner 无 animation，演示约 150ms 完成；未因全局停止动画丢失必要状态反馈 |
| Axe | 6 次扫描（两页×三视口），violation 均 0；三个首页各有同一个 `color-contrast` incomplete，人工确认 B1；404 incomplete 0 |

下载均通过路由返回极小测试附件，确认浏览器文件名、状态和可取消的下载事件；**没有获取真实约 100MB 二进制，也未验证其内容**。校验解析使用 `/tmp` 下的小文件，路由清单只替换该测试的期望 hash；真实命令输出如下，已在输入框得到“ZIP 文件校验通过”：

```text
98ede3c60ab2f68e4474e02bdad4a4255624bb88edfde497f64002a4ff7e2e47  /tmp/chengsheng-redesign-evidence/Chengsheng-0.0.7-arm64.zip
```

正常 CSP 和产品行为先测试。axe 仅在后续独立 `bypassCSP: true` 测试 context 注入，以运行工具；没有更改产品 CSP。

## Overlay 与回退

在单独正常 CSP tab 中，`document.title` 改写成功，inline 和外部 script 标签能添加到 DOM；两种脚本执行均被 `script-src 'self'` 阻止。控制台记录了 inline execution 与 `http://localhost:49999/detect.js` 两条明确 CSP 错误，外部请求失败原因为 `csp`。这与正常页面基线无错误相区分。

**没有注入可用 overlay，没有 `[Human]` 可见浏览器页，也没有运行页面内 detector。** 已知执行门槛被严格 CSP 阻止，未启动不可能通过该策略的 live-server，未弱化产品 CSP。回退证据为完整 CLI JSON、正常浏览器 DOM/交互/截图及单独 axe 扫描。

## 性能与资源

范围按任务要求限于静态资源，不运行 Lighthouse、不安装新浏览器，也不将本地极短加载时间当生产性能承诺。

- 一个自托管字体文件：`assets/fonts/chengsheng-serif.woff2` **138,388 bytes（135.14 KiB）**，使用 preload 与 `font-display: swap`。正常浏览器只请求本机字体，没有第三方字体地址。
- HTML/CSS/JS/图标/字体/清单合计首页静态资产 **215,345 bytes（210.30 KiB）**；包含 404、字体许可/来源文字及 CNAME 的公开文件合计 **223,307 bytes（218.07 KiB）**。未计大安装包及非发布说明文件；逐文件 bytes/hash 见 `static-b-round1.json`。
- 唯一浏览器脚本为 `/site.js`，无 package.json 与前端 runtime/组件依赖。CSS 无 backdrop-filter、filter 或 will-change；动画只有受控 spinner 与短过渡。
- 所有 img 有明确 width/height；两个下方图标为 lazy，滚到对应视口后都 complete、naturalWidth=512。没有图片加载失败或布局横向溢出。
- 主题明确声明 `color-scheme: light`，颜色以 CSS tokens 为主；任务没有要求暗色模式，因此不把缺少暗色主题作为缺陷。

## 原始采样误报说明

第一轮 90 个断言中有 9 个 false；其中 8 个是测试采样/断言问题，已在一次有界确认中消除，原始 JSON 保留以便复查：

- 内容非空曾用任意的 1500 字符阈值，实际 1366–1426 字符，标题、校样、下载及 FAQ 明确存在；改用语义内容证据判定。
- 两个手机页脚 lazy img 在未进入视口前 `complete=false`；滚到页脚后全部成功。
- 首次模型配置 anchor 的早期采样发生在 hashchange/平滑滚动完成之前；等待后首访通过。重复相同 hash 折叠是独立真实缺陷 B3。
- 两个复制失败回退断言读到了上一次提示，因为 promise 尚未结束；等待精确目标值、alert 与按钮重新启用后都通过。

剩下的第一轮失败是 B2；确认轮分别证明 Ctrl+Enter 和按钮方式的脱焦/失效 Esc，并发现 B3。手动对比度只引用稳定初始底色的 4.2257:1；确认 JSON 的部分 changed/complete 颜色样本处于 350ms 背景过渡中，**不将那些 phase 标签理解为最终稳定颜色**。

## 运行记录与交付

- target slug：`index-html`；`.impeccable/critique/ignore.md` 不存在。
- independence：未读 A、历史评审或父代理结论；检测器 findings 没有通过消息进入父代理合并上下文。
- detector：一次双目标 scan，完整原始 JSON 与 counts/rules/locations 已保留，无 rerun。
- browser：回退原因明确；headless，所有 context 与 browser 均已关闭。
- overlay：严格 CSP 阻止，未注入；live-server 未启动，无该服务清理需求；本代理不管理父任务提供的 4173 服务。
- temp cleanup：按任务要求保留的证据均在 `/tmp/chengsheng-redesign-evidence`；项目代码未写入、未修改。
- 主要产物：`assessment-b-round1.json`（汇总机器结果）；`detector-b-round1.json/.stdout/.stderr/.meta.json`；`browser-b-round1.json`；`confirmation-b-round1.json`；`static-b-round1.json`；6 份 `axe-b-*.json`；`b-home-*`、`b-404-*`、`b-demo-*`、`b-menu-*` 等截图与两个临时 Playwright 脚本。

Questions skipped: Assessment B 独立证据子任务；主代理负责合并与 critique 收尾。
