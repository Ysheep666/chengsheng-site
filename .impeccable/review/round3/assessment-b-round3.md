Method: isolated Assessment B 第 3 轮，仅确认本轮改动；未读 A/历史 critique，不评分、不改源。

**前轮 P3 已关闭，本轮改动范围未发现新增阻断。** 37 个定向断言通过；源码测试前后 SHA-256 一致。未重跑完整 95 断言、axe、detector 或 overlay。

| 确认范围 | 实际证据 |
|---|---|
| command / checksum 复制按钮 | 1440×900、390×844、320×740 的默认、已复制、拒绝后恢复态均为 **65×44px**；`min-inline-size` 计算值 65px，文字左对齐 |
| 真实允许剪贴板 | 三视口两种值均通过浏览器 readText 精确核对；焦点留在按钮；成功标签随后恢复；相邻反馈可见 |
| 真实拒绝剪贴板 | 三视口通过 CDP 设置浏览器权限 denied；两种手选值精确一致、原标签恢复、按钮可用；反馈与展开 ZIP 区无横向溢出 |
| JS 开启 | startDemo 初始化后才显示“示意 · 仅第三句可编辑”，textarea 启用、操作控件显示 |
| JS 关闭 | 三视口显示“校样示意”和明确静态反馈，noscript 说明启用 JavaScript 后可操作；编辑禁用，操作控件隐藏；三个 DMG/ZIP href 保留 |
| site.js 加载失败 | 390 视口路由阻断后仍显示静态说明并保留下载链接；没有误显示可编辑状态 |
| 展开的新长指南 | 三视口四步与前置说明、工作流注、安装第 3 步全部渲染；段落/文档无横向溢出；仅确认文本渲染，应用事实由 root 核实 |
| Console / CSP | 正常开启、关闭、允许/拒绝复制路径无 console 或 pageerror；产品 CSP 保持原策略。单独阻断 site.js 的一次资源失败是预期故障注入，已明确分开记录 |

这是改动范围内的确认；未重新评定旧交互或上游应用事实，也未下载真实安装包。

原始证据：`browser-b-round3.json`；脚本：`assessment-b-browser-round3.cjs`；汇总：`assessment-b-round3.json`；稳定性：`source-stability-b-round3.json`。截图为 `b3-guide-{1440,390,320}.png`、320 视口的四张复制状态图，以及 390 视口的无 JS/脚本阻断静态示意图。没有读取 A 或主代理的截图报告。

所有 browser/context 已关闭；未开启额外服务器。临时产物仅保留在 `/tmp/chengsheng-redesign-evidence`，项目源文件未修改。

Questions skipped: 独立技术确认子任务，主代理负责合并。
