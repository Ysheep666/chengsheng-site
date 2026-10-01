# 第三轮 Assessment B — 定向确认

本轮只确认原生校样表格和ZIP版本反馈清理两处变更。浏览器检查在父代理传达A完成通知之前结束；没有读A或其他报告，没有评分，没有修改源码。

## 结论

一次有界检查12项全部通过。此前B-final-01（ZIP点击后feed成功仍残留首屏loading）已解决。原生表格在测试浏览器的可访问性快照中保留4列、5行及字段描述；没有发现本次变更范围内的实质布局回归。

## 原生表格

1440与320均确认：

- 原生table / thead / tbody / tr / th / td，table名称“四句校样示例”，描述“示例 · 不生成音频”。
- 可访问性树含5个row、4个columnheader（句、角色、校样文字、状态）、4个rowheader、12个普通cell。DOM每行保留4个字段。
- 列头scope=col，行头scope=row；显式table、rowgroup、row、columnheader、rowheader、cell角色保留。
- 320的“状态”表头仅视觉裁切，display不是none，没有aria-hidden，浏览器可访问性快照仍包含该列。
- 编辑字段保留“编辑第三句校样，最多56个字符”的可访问名称，aria-describedby关联demo-feedback、demo-length、demo-state，三个对象均存在并被描述。
- 320仍保持三列视觉布局，状态位于第三列下一行；文本、单元格及table没有横向溢出，document宽度未超视口。

仅对 `.proof-table` 运行局部axe：1440与320各0 violation、0 incomplete；没有运行全页或全视口axe矩阵。证据是浏览器可访问性树、DOM、可访问名称/描述断言及局部axe，不声称运行了真实读屏软件会话。

## 长句与示例操作

1440与320分别输入56字中文和连续56字英文。桌面自动增至2行、clientHeight=scrollHeight=71px；320自动增至6行、clientHeight=scrollHeight=170px。无textarea文字裁切，table及页面无横向滚动。

Ctrl+Enter返修完成，反馈明确演示完成，其他三句未变。重置按钮恢复“门没关严。”、已出声状态和原控件禁用状态；重置后布局正常。桌面表格截图及320长句截图已视觉检查，没有发现实质排版回归。

## 静态状态

320无JS及阻断site.js均保留原生4列5行的可访问结构，工具栏为“示例 · 不生成音频”，反馈为“静态校样示例。”。输入禁用、操作按钮隐藏；无JS说明可见。两个DMG和页脚ZIP静态href完整，六次小attachment fixture下载均正常；被删除download块及hash残链均未恢复。

## 下载状态修复

ZIP均在feed返回之前点击，再明确等待对应response完成：

- 同版v0.0.7合法feed：首屏status清空，页脚“已打开 ZIP 下载链接”保留。
- 新版v0.0.8合法feed：首屏status清空，全部两DMG/一ZIP href更新；页脚保留“你刚才打开的是v0.0.7”的竞态说明。
- HTTP503：首屏出现失败及仍可下载v0.0.7说明，重试按钮可见，三条下载href不变，页脚已打开提示保留。重试成功后首屏清空、按钮隐藏，页脚提示继续保留。
- 对照DMG在feed返回前点击：feed成功后首屏的“已打开 DMG 下载链接”仍保留，没有被新清理条件误删。

全部下载使用route小fixture，未请求真实安装包。

## 范围与清理

既有FAQ旋转SVG的3–4px元素scrollWidth告警保留原解释，本轮没有重新扩测。没有detector、overlay、原全量套件或完整axe矩阵；CSP保持不变。没有启动或停止服务。

所有browser contexts与浏览器已关闭。四个源文件前后SHA256一致。console仅有主动阻断site.js与模拟503的预期资源消息，没有页面异常。

## 文件

- `assessment-b-round3.json`：完整结构化报告、结果与指纹。
- `assessment-b-round3-browser.cjs` / `assessment-b-round3-browser-results.json`：本轮新脚本与12项原始记录，包括可访问性快照。
- `b-round3-table-axe-1440.json` / `b-round3-table-axe-320.json`：局部axe原始结果。
- `b-round3-table-1440.png` / `b-round3-table-320.png`：默认表格。
- `b-round3-long-1440.png` / `b-round3-long-320.png`：长句。
- `b-round3-no-js.png` / `b-round3-blocked-site-js.png`：静态状态。
- `b-round3-zip-newer.png`：新版本ZIP页脚反馈。

全部保存在 `/tmp/chengsheng-copy-refinement`，按要求保留。

Questions skipped: 第三轮独立B结果交父代理合并；没有剩余需要新增检查的B问题。
