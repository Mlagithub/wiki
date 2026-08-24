
# 开发日志一

1️⃣ 卡片管理器：显示全部卡片 + 调研 SuperMemo 管理机制（693b4e0）

调研结论（落档 doc/research/supermemo-card-management.md）：SuperMemo 靠三件套管理全部元素——Contents 知识树（全量、树是强制归属结构，故"全部"天然等于"树里全部"）、Browser（任意子集的平铺列表，可排序/勾选/批量/联动预览）、Find elements（搜索定义子集），核心是"一切以 subset 为语言"。

根因：原管理器按"牌组过滤器命中"组织树，而牌组是动态过滤器——卡一旦 Done 就脱离所有牌组，手动散卡也永远进不了树 → 已读/散卡隐形，计数与显示不一致。

修复（重构 card-manager.ts）：

* 卡片收集全量化：tidme.kind / tidme.parent / ? . 标签 / FSRS 字段（含手动建卡，排除文档页）
* 三种组织方式：按文档（默认，全量稳定）/ 按牌组（新增「未入组」兜底分支）/ 列表（Browser 式：表头排序、全选、点行底部预览联动）
* 顺带修了两个隐藏 bug：视图计数全部显示同一数字、批量"删除"按钮实际无效


2️⃣ 阅读卡顶部条栏：两行布局 + 风格统一 + 即时刷新（693b4e0）

重构 section.ts：

* 第一行：面包屑 · 位置 X/Y · 本书剩 N 张待学 · 已读状态
* 第二行：全部按钮（统一 tm-sec-btn 风格，语义色仅修饰 ✔已读 / ↩重新加入 / 🗑删除）
* 即时刷新：refresh() 检测本文档任何卡 / 本卡 / 续读点变化 → 重建条栏；doc-resume 进度与已读区同步
已读卡按钮行改为「↩ 重新加入」按钮（替代静态文案）


3️⃣ "Again/Hard/Good 都显示 8 小时" —— 时区 bug（019314a）

不合理，是真 bug。根因：TiddlyWiki 日期字符串约定为 UTC，但 Tidme 日期工具用本地时区编码 → 评分后 due 被 relativedate 按 UTC 解析，凭空多出 8 小时（时区偏移），分钟级间隔全显示成 "8 hours from now"。

修复：scheduler.ts / schema.ts / fsrs.ts 的日期转换全部统一为 UTC 语义。修复后实测：Again ~1 分钟 / Hard 4 分钟 / Good 9 分钟 / Easy 5 天（此前全是 8 小时）。顺带修了 tw2fsrsDate 把 TW 串解析成 Invalid Date 的问题。

额外收获

实现过程中踩坑并解决：TW 过滤器 + 前缀是交集而非并集（改用空格分隔）；fake DOM 的 textContent="" 需实现清空语义；TW 变量/属性的测试构造格式（{value:...} / {type:"string"}）