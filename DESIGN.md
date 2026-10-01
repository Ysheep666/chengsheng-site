---
name: "成声"
description: "本机有声书校样台；宣纸、松烟、朱红，书稿宋体与操作系统字体。"
colors:
  paper: "#f7f5f0"
  white: "#fffdfa"
  ink: "#272a24"
  muted: "#666b61"
  line: "#deded3"
  soft: "#eeeee5"
  accent: "#b23e30"
  accent-hover: "#963326"
  accent-wash: "#f9eae3"
  room: "#272b24"
  room-text: "#f1f2e9"
  room-muted: "#c1c5b8"
  ink-hover: "#44483d"
  editable-row: "#f6f4ed"
  complete-wash: "#edf1e6"
typography:
  display:
    fontFamily: "\"Chengsheng Serif\", \"Songti SC\", \"STSong\", serif"
    fontSize: "clamp(42px, 4.65vw, 67px)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "\"Chengsheng Serif\", \"Songti SC\", \"STSong\", serif"
    fontSize: "clamp(32px, 3.2vw, 44px)"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.75
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "16px"
    lineHeight: 1.75
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "13px"
    lineHeight: 1.75
  navigation:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "14px"
    lineHeight: 1.75
  button:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  button-small:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  proof:
    fontFamily: "\"Chengsheng Serif\", \"Songti SC\", \"STSong\", serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.65
  disclosure:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "15px"
    lineHeight: 1.75
rounded:
  button: "6px"
  app-window: "12px"
  app-window-mobile: "8px"
  proof-editor: "0"
  chapter-option: "5px"
spacing:
  button: "11px 24px"
  button-small: "8px 15px"
  button-demo: "7px 12px"
  proof-row: "8px 12px"
  proof-editor: "6px 0"
  section: "94px"
  workspace: "0 28px 13px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "{spacing.button}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-primary-incompatible:
    backgroundColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.button-small}"
    rounded: "{rounded.button}"
    padding: "{spacing.button-small}"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-small}"
    rounded: "{rounded.button}"
    padding: "{spacing.button-demo}"
  button-outline-hover:
    backgroundColor: "{colors.soft}"
  textarea-proof:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.proof}"
    rounded: "{rounded.proof-editor}"
    padding: "{spacing.proof-editor}"
    width: "100%"
  navigation-desktop:
    textColor: "{colors.muted}"
    typography: "{typography.navigation}"
  proof-row:
    padding: "{spacing.proof-row}"
  proof-row-editable:
    backgroundColor: "{colors.editable-row}"
  proof-row-changed:
    backgroundColor: "{colors.accent-wash}"
  proof-row-complete:
    backgroundColor: "{colors.complete-wash}"
  app-window:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.app-window}"
  native-disclosure:
    textColor: "{colors.ink}"
    typography: "{typography.disclosure}"
    padding: "17px 0"
  button-demo:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.button-small}"
    rounded: "{rounded.button}"
    padding: "{spacing.button-demo}"
  button-demo-hover:
    backgroundColor: "{colors.accent-hover}"
  button-demo-disabled:
    backgroundColor: "#eeeee6"
    textColor: "#747a6b"
  setup-note:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
---

# Design System: 成声

## Overview

**Creative North Star: "有声书校样台"**

成声以一张能操作的书稿校样承载品牌：亮宣纸给文字留出空间，松烟让阅读稳定，朱红标记行动与正在返修的句子。宋体用于标题和书稿，系统字体用于导航、按钮、角色与状态；文字是页面的主要视觉材料。

工具窗保留接近本机应用的圆角、标题栏和章节侧栏。页面说明区主要依靠留白、底色和细分隔线组织层次，校样窗用一处柔和投影突出可操作的示例。控件紧凑，关键操作仍有明确的点击面积和键盘焦点。

描述性来源沿用 PRODUCT.md 的品牌承诺与产品定位，以及 .impeccable/surfaces/index-html.md 已确认的方向；本次刷新保留这一视觉世界。数值来源为当前 site.css，结构与交互来源为 index.html、site.js 和 404.html。字体出处见 assets/fonts/SOURCE.txt。本轮独立浏览器审查截图由主代理查看并归档，证据路径为 .impeccable/review/copy-round3/desktop.png 与 .impeccable/review/copy-round3/mobile.png；此文档提取不包含独立浏览器测试或评审结论。

**Key Characteristics:**

- 宣纸底色与松烟正文，朱红行动和编辑状态。
- 宋体承载书稿与标题，系统字体承载操作。
- 平面说明区与有柔和投影的校样窗。
- 原生 disclosure、文字状态、可见焦点与至少 44px 的主要点击区域。

## Colors

调色板沿用宣纸、松烟、朱红。frontmatter 的前 12 项对应当前 `:root` 自定义属性；`ink-hover`、`editable-row` 和 `complete-wash` 来自当前组件的十六进制字面值，没有新增 CSS 变量。

### Primary

- **朱红 `accent`**：主要下载、演示返修、链接强调、编辑状态、警示文字及常规焦点。
- **朱红悬停 `accent-hover`**：朱红按钮的 hover。
- **朱红浅底 `accent-wash`**：校样已改与返修中的行底色。

### Neutral

| Token | 实际角色 |
| --- | --- |
| `paper` / `white` | 页面宣纸底 / 工具白 |
| `ink` / `muted` | 松烟正文 / 辅助文字 |
| `line` / `soft` | 分隔线 / 描边按钮悬停浅底 |
| `room` / `room-text` / `room-muted` | 深色说明区 / 正文 / 辅助文字 |
| `ink-hover` | 松烟按钮悬停底色 |
| `editable-row` | 默认可编辑校样底色 |
| `complete-wash` | 返修演示完成底色 |

组件细节仍使用源码字面色：标题栏 `#eeeee7`、标题栏文字 `#606559`、章节底 `#f0f0e8`、选中章节 `#e3e5d9`；书脊 `#59614c` / `#f0eedf`；输入下划线 `#b7baac`、逐句分隔线 `#e9e9df`；描边默认 / hover 为 `#cdd0c3` / `#afb5a2`。演示按钮禁用底 / 文字为 `#eeeee6` / `#747a6b`，完成状态文字为 `#475f37`，转环底线为 `#cc9e8e`。这些状态色不构成第二品牌色。

深色说明区分隔线 `#4b5143`、图标 `#c3ccb4`，焦点 `#edb5a3`；文字选中为 `#e9c2b2`，深色区选中为 `#7b5144`。滚动条辅助色为 `#b9bcb0`。

源码没有 tonal ramp。侧车中的八阶 OKLCH 色带只用于面板预览；frontmatter 的源码颜色仍是规范值。

## Typography

**Display / Book Font:** `"Chengsheng Serif", "Songti SC", "STSong", serif`。
**Body / UI Font:** `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`。

`Chengsheng Serif` 是本站自托管 Noto Serif SC 的别名，来自 Noto / Google Fonts，为中文字符子集，变量字重范围 500–700，采用 SIL OFL 1.1 授权。`@font-face` 使用 `font-display: swap`，全局 `font-synthesis: none`。宋体承载书稿语气，系统字体让操作清晰。

### Hierarchy

| 角色 | 实际字号与行高 | 用途 |
| --- | --- | --- |
| Display | `clamp(42px, 4.65vw, 67px)`、600、1.4、字距 `-0.025em` | 首页大标题 |
| Headline | `clamp(32px, 3.2vw, 44px)`、600、1.5、字距 `-0.02em` | 区段标题 |
| Title | 19px、500；手机 17px | 四步制书标题 |
| Body | 16px、1.75 | 基础说明；hero 描述另用 17px / 1.85 |
| Label | 13px、继承 1.75 行高 | 状态、反馈及平台摘要 |
| Button | 15px、500、1.5；紧凑操作 13px | 主操作与校样操作 |
| Proof | 18px、500、1.65 | 校样段落与可编辑句子 |
| Disclosure | 15px、继承 1.75 行高 | FAQ summary |

角色尺寸来自实际选择器，没有统一数学倍率。1050px 以下大标题 56px、校样 17px；820px 以下大标题 52px；600px 以下大标题 `clamp(33px, 10.5vw, 47px)` / 1.55，段标题 31px / 1.55，校样 16px / 1.65。行号与字符计数使用 tabular numerals。移动 hero 描述最大宽 23em，平台提示 34em，FAQ 段落 37em。

404 复用同一字体和组件：编号 100px / 1.3，手机 80px；页标题 `clamp(30px, 5vw, 48px)`。

## Layout

居中容器为 `min(1120px, calc(100% - 80px))`。顶栏 sticky，高度至少 78px；锚点预留 104px。首屏上 / 下留白为 57px / 72px，常规区段为上下 94px，深色说明区为上下 88px。说明区通过留白和连续分隔线组织内容。

校样窗为 `190px minmax(0, 1fr)` 的章节 / 工作区布局，工作区 padding `0 28px 13px`。逐句表为 `26px 62px minmax(0, 1fr) 72px`，gap 10px，依次为行号、角色、文字与状态。行最小高度 52px，padding `8px 12px`；textarea 最小高度 44px，padding `6px 0`。四步流程为四列，单步两侧 22px，以竖线分隔；本机说明为 `1fr 1.12fr`、gap 90px；FAQ 为 `0.85fr 1.15fr`、gap 100px。

| 实际断点（max-width） | 主要变化 |
| --- | --- |
| 1050px | 章节栏 162px，工作区水平 padding 20px；本机说明 / FAQ gap 60px。 |
| 820px | 容器宽 `calc(100% - 48px)`；顶栏至少 70px；桌面导航换原生移动 disclosure；章节侧栏隐藏；流程两列；常规区段上下 64px；FAQ 单列。 |
| 600px | 容器宽 `calc(100% - 40px)`；顶栏至少 66px、锚点预留 88px；校样列 `16px 34px minmax(0, 1fr) 60px`、gap 6px，行至少 62px、padding `9px 6px`；工作区 `0 12px 13px`；常规区段上下 51px、深色区 53px；本机说明单列。 |
| 360px | hero 操作纵排；校样变为 `14px 30px minmax(0, 1fr)` 三列、gap 5px，状态放在第三列下一行并左对齐，释放正文宽度；紧凑演示按钮水平 padding 8px，图标隐藏。 |

主要按钮默认至少 48px 高；品牌链接、顶栏、演示、文字链接、配置指南、重试和移动导航操作至少 44px。主下载在常规视口最小宽 180px，600px 以下 164px，360px 以下 182px。演示按钮在手机为 13px 字号、水平 padding 10px；书稿输入在手机为 16px。site.js 按实际行高与容器宽度调整输入行数，最多 56 字符。

首页保留顶栏与首屏的 DMG 直达入口、页脚轻量 ZIP 链接。平台摘要说明 Apple 芯片 Mac 与 macOS 12 及以上要求；不兼容设备的保存说明使用中性辅助色。首屏配置前提为居中的 flex 文字行，gap `0 8px`、margin-top 4px，配置指南链接至少 44px 高。首屏状态行在空状态时隐藏；ZIP 点击状态在页脚就近显示，状态段占完整一行、右对齐。隐藏文件名、校验值及发行说明只供发布脚本更新，不是布局组件。

## Elevation & Depth

深度来自宣纸、工具白、章节底与深色说明区的明度差和 1px 分隔线。校样窗采用柔和的环境投影，让可操作示例浮在纸面；导航菜单、FAQ 和首屏配置说明保持平面。

### Shadow Vocabulary

- **校样窗环境投影**：`0 22px 64px -20px rgb(39 43 36 / 23%)`；打印时移除。

默认键盘焦点为 `2px solid var(--accent)`，outline-offset 5px；书稿 textarea 的 offset 为 3px，底边同时变朱红；深色说明区焦点色为 `#edb5a3`。可用按钮 hover 上移 1px、active 回原位，不增加新投影。

按钮底色 / 文字 / 边框过渡为 160ms `ease`，位移为 220ms `var(--ease)`；链接箭头 250ms，FAQ 图标 230ms，校样行底色 350ms。`--ease` 为 `cubic-bezier(0.16, 1, 0.3, 1)`。演示中的转环为 850ms linear infinite。`prefers-reduced-motion: reduce` 关闭动画、过渡和平滑滚动；JS 演示等待从 750ms 缩为 150ms。

## Shapes

按钮与移动菜单圆角 6px，章节选项 5px。校样窗圆角 12px，600px 以下 8px；品牌图标外框为 6px / 手机 5px。书脊为直角竖排块；textarea 为零圆角，通过单根下划线界定输入。跳到正文链接沿用 4px 圆角。

图标为行内 SVG：22px，stroke 1.6，圆端与圆连接；小图标 18px，微型状态图标 14px / stroke 1.8。窗口圆点与返修转环为圆形。`forced-colors: active` 给按钮、校样窗与书脊补 `ButtonText` 边框，可编辑行补 `Highlight` outline，窗口圆点改为 `ButtonText`。

## Components

### Buttons

动作明确，沿用本机工具的紧凑圆角。

- **Primary**：首屏 DMG 入口，朱红底 / 工具白文字，6px 圆角，padding `11px 24px`，15px / 500，最小高 48px；hover 为 `accent-hover`。不兼容设备上改为松烟底及“保存 Mac 安装包”，继续显示平台说明。
- **Ink**：顶栏 DMG 直达入口，松烟底 / 工具白文字；small 规格为 padding `8px 15px`、13px、最小高 44px，hover `#44483d`。600px 以下水平 padding 11px，隐藏图标。
- **Outline**：“换个例句”，透明底 / 松烟字，`#cdd0c3` 边框；hover 为浅底 / `#afb5a2` 边框。padding `7px 12px`、13px、最小高 44px。
- **Demo**：“演示返修”，朱红底 / 工具白字，沿用 compact 规格，最小宽 140px；禁用底 / 字为 `#eeeee6` / `#747a6b`。空输入或文字未变时不能演示；忙碌时输入设为只读以保留焦点，换例句和返修停用，重置仍可用。
- **Reset / Retry**：带下划线的文字按钮，至少 44px 高。重置默认辅助色、可用时 hover 朱红；检查新版失败后的重试为朱红。
- **Hover / active / focus**：遵循已记录的位移、过渡与焦点；静态示例面不补交互态。

### Inputs / Fields

书稿输入保持书页的一部分。

- **校样 textarea**：`--book`、18px / 500 / 1.65，透明底、零圆角、底边 `#b7baac`，padding `6px 0`、min-height 44px；focus 为 2px 朱红 outline、offset 3px，底边朱红。初始 HTML 为禁用静态示例；startDemo 初始化后启用第三句和操作。静态禁用文字仍为松烟，opacity 1。
- **反馈**：空句显示朱红文字。字段通过 aria-describedby 关联计数、行状态与 role="status" 反馈；结果同时有文字状态与底色。

### Navigation

顶栏由品牌、说明导航和直接下载组成。所有品牌链接最小高 44px，覆盖首页顶栏、页脚与 404。桌面链接为 14px 辅助色、gap 36px、至少 44px 高，hover 朱红；1050px 以下 gap 24px。820px 以下使用原生 details，summary 为“导航”、至少 44px；菜单宽至少 172px、padding `9px 16px`、6px 圆角、1px 分隔线边框、工具白底，open 时箭头转 180°。选择项目后菜单关闭，Esc 关闭并把焦点还给 summary；hash 指向 details 时自动展开。

页脚链接为辅助色、至少 44px 高、12px 系统字；600px 以下 11px。ZIP 备用包、版本记录与回到顶部保持文字链接规格。

### Cards / Containers

校样窗为工具白底、12px / 手机 8px 圆角、overflow hidden，采用唯一环境投影。标题栏至少 45px / 手机 40px，下方 1px 分隔线；章节区使用既有纸面底色，选中章节为 5px 圆角。首屏配置说明保持无外框、无底色的文字与链接。

### Proof Row

行号、角色、宋体书稿与文字状态形成四列。源码使用原生 table，保留 table / rowgroup / row / columnheader / rowheader / cell 的读屏结构；列标题为 scope="col"，行号为 scope="row"。第三句的 label 与 textarea 位于文字单元格内，aria-describedby 同时关联反馈、计数与行状态。360px 及以下改成三列，状态落到第三列下一行并左对齐；第四列表头只在视觉上隐藏，仍保留读屏关联。默认“已出声”辅以勾形 SVG；第三句在 JS 初始化后可编辑。默认可编辑行用 `editable-row`；changed 与 rendering 用 `accent-wash`，状态为朱红 / 600；complete 用 `complete-wash`，状态文字 `#475f37`。返修中设置 aria-busy，其余三句保留。字符计数为 12px / 1.5。

工具栏从静态页面到 JS 初始化后始终标注“示例 · 不生成音频”。静态反馈为“静态校样示例。”；noscript 明确启用 JavaScript 才可操作示例，下载不受影响。反馈按输入、演示中、完成和重置状态显示必要信息；JS 生成提示时，在 600px 及以下省略桌面快捷键。caption 保留无音频说明。侧车只提供静态组件预览，不复制演示脚本。

### Setup Note

首屏配置前提沿用 13px 系统字与辅助色，居中、可换行、无背景和边框；链接为朱红，最小高 44px，使用现有下划线和全局焦点。它是当前首屏的一行说明。

### Native Disclosure

FAQ summary 为 15px、padding-block 17px、最小高 66px；手机为 14px / 至少 62px。正文为 14px / 1.95、最大宽 37em，padding `1px 28px 20px 0`，手机右 padding 为 0。加号为 17px、open 时旋转 45°、230ms 过渡，不新增 hover 色。首次配置指南为系统字体 14px / 1.9，材料与操作分段；相邻段落间隔 10px，步骤间隔 18px。完成检查沿用松烟文字 13px，恢复提示上方为 1px 分隔线与 15px 留白，不新增状态底色。

### Release Status

首屏与 ZIP 页脚状态都使用 13px 辅助文字，data-alert 为朱红，空状态隐藏。页脚状态占完整一行并右对齐。读取新版信息失败时保留当前链接并显示“重新检查新版”；点击下载只说已打开链接，进度交给浏览器下载列表。若先打开链接后清单返回了另一版，提示显示在最近点击的 DMG 首屏或 ZIP 页脚状态位置。ZIP 点击后清单合法返回时清空首屏的检查状态，避免异地残留。文件名、校验值与发行说明位于 hidden 容器，保持发布兼容而不形成组件样例。

## Do's and Don'ts

### Do:

- Do 使用 --paper、--white、--ink、--muted 与 --line 构成页面、工具面和阅读层次，朱红沿用 --accent 的行动与编辑角色。
- Do 将 --book 用于标题和书稿，--ui 用于工具操作；移动校样输入沿用实际的 16px 字号。
- Do 保留按钮和链接的可见焦点、主要操作至少 44px 的点击高度，以及 reduced-motion 下关闭动画和过渡的行为。
- Do 用底色、分隔线及文字标签一起表达校样状态，保留“已改”“演示中”“已出声”的文字和 role="status" 反馈。
- Do 使用原生 details / summary 承载 FAQ 和移动导航，沿用已有的展开与焦点行为。
- Do 将发布数据与用户组件区分开；保留无脚本下载链接和既有发布标记。

### Don't:

- Don't 把侧车里合成的 OKLCH 预览色阶写成源码已定义的 CSS 变量。
- Don't 为静态校样行或校样窗添加可点击、hover 或键盘焦点的假语义。
- Don't 用新的通用字号比例替换已有角色字号，或把所有说明区改成带投影的卡片。
- Don't 将网页操作示意描述为已经调用模型或生成音频；保留现有的示例说明。
- Don't 将隐藏发布元数据制作成用户组件或补回已删除的下载工具区。
