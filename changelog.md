# 更新日志

## V2.0.6 (2025-04-03)

### 新功能
- 新增1×2和2×2歌单服务卡片 [@Zitann](https://github.com/Zitann) ([2292e7f](https://github.com/Edge-Music/Core/commit/2292e7f))
- 为2×2播控卡片增加上一曲和下一曲控制按钮 [@Zitann](https://github.com/Zitann) ([4f2858a](https://github.com/Edge-Music/Core/commit/4f2858a))
- 实现播控卡片直接跳转Playing页面功能，预留卡片跳转其他页面接口 [@Zitann](https://github.com/Zitann) ([f378161](https://github.com/Edge-Music/Core/commit/f378161))
- 优化音乐库音源切换方式，增加选择模式 [@lsbnbdz](https://github.com/lsbnbdz) ([f507796](https://github.com/Edge-Music/Core/commit/f507796))

### 界面优化
- 优化2×2播控卡片图片大小采用百分比方式 [@Zitann](https://github.com/Zitann) ([8a85dc3](https://github.com/Edge-Music/Core/commit/8a85dc3))
- 调整2×4播控卡片播放按钮尺寸及图标类型 [@Zitann](https://github.com/Zitann) ([13cb011](https://github.com/Edge-Music/Core/commit/13cb011))
- 完善底部播控按钮及进度条样式 [@lsbnbdz](https://github.com/lsbnbdz) ([5478ecb](https://github.com/Edge-Music/Core/commit/5478ecb))
- 精细调整底部播控播放按钮尺寸与位置，提升视觉协调性 [@lsbnbdz](https://github.com/lsbnbdz) ([520fd08](https://github.com/Edge-Music/Core/commit/520fd08))
- 优化播控卡片默认封面设计 [@Zitann](https://github.com/Zitann) ([4f87681](https://github.com/Edge-Music/Core/commit/4f87681))

### 错误修复
- 修复歌曲封面主题色提取不准确问题 [@Zitann](https://github.com/Zitann) ([7df441b](https://github.com/Edge-Music/Core/commit/7df441b))
- 解决卡片冷启动一分钟后后台终止的问题 [@Zitann](https://github.com/Zitann) ([19f0ba8](https://github.com/Edge-Music/Core/commit/19f0ba8))
- 优化PC布局，修复列表闪烁问题和标准化歌曲列表提示效果 [@jizhishi](https://github.com/jizhishi) ([97aa959](https://github.com/Edge-Music/Core/commit/97aa959))

### 其他改进
- 恢复原有懒加载机制，修正播放标签页更改 [@lsbnbdz](https://github.com/lsbnbdz) ([424a6ff](https://github.com/Edge-Music/Core/commit/424a6ff))
- 多处界面细节优化与代码质量改进 [@lsbnbdz](https://github.com/lsbnbdz) ([48172cf](https://github.com/Edge-Music/Core/commit/48172cf))

## V2.0.4 (2025-03-31)
### 新功能
- 新增横屏播放器，支持横屏模式下的音乐播放和屏幕常亮 [@jizhishi](https://github.com/jizhishi) ([99fbb52](https://github.com/Edge-Music/Core/commit/99fbb52), [6df7ce8](https://github.com/Edge-Music/Core/commit/6df7ce8), [21ee6aa](https://github.com/Edge-Music/Core/commit/21ee6aa))
### 界面优化
- 搜索页布局优化，搜索框常驻顶层 [@lsbnbdz](https://github.com/lsbnbdz) ([e011681](https://github.com/Edge-Music/Core/commit/e011681))
- 设置界面布局优化，数据源常驻顶层 [@lsbnbdz](https://github.com/lsbnbdz) ([e011681](https://github.com/Edge-Music/Core/commit/e011681))
- 歌单页面布局优化 [@lsbnbdz](https://github.com/lsbnbdz) ([f9ef49b](https://github.com/Edge-Music/Core/commit/f9ef49b), [f303f68](https://github.com/Edge-Music/Core/commit/f303f68))
- 统一设置、主页下拉提示词位置 [@lsbnbdz](https://github.com/lsbnbdz) ([e011681](https://github.com/Edge-Music/Core/commit/e011681))
- 歌单界面与其他界面下拉动画对齐 [@lsbnbdz](https://github.com/lsbnbdz) ([f303f68](https://github.com/Edge-Music/Core/commit/f303f68))

## V2.0.3.5 (2025-03-29)

### 新功能
- 支持专辑搜索和专辑列表显示 [@Zitann](https://github.com/Zitann) ([3edce08](https://github.com/Edge-Music/Core/commit/3edce08))

### 性能优化
- 优化样式，取消Grid布局提升渲染性能 [@Okysu](https://github.com/Okysu) ([974bf28](https://github.com/Edge-Music/Core/commit/974bf28))
- 底部悬浮播控避让 [@Okysu](https://github.com/Okysu) ([8ac6bda](https://github.com/Edge-Music/Core/commit/8ac6bda))

### 界面优化
- 下滑关键节点添加震动反馈，交互体验更加直观 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- NavDestination界面标题栏优化，视觉效果更加统一 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 下拉关键节点提示词修改，操作引导更加清晰 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 主页布局优化，底部避让，内容展示更加合理 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 底部播控组件位置优化，可随布局改变调整位置 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 调整底部播控组件进度条，避免内容被覆盖 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 可滚动界面点击状态栏返回顶部，提升导航便捷性 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 搜索页优化，增加下拉提示和返回动画 [@lsbnbdz](https://github.com/lsbnbdz) ([c3acac4](https://github.com/Edge-Music/Core/commit/c3acac4))
- 主页播控组件与其他界面高度对齐，视觉一致性提升 [@lsbnbdz](https://github.com/lsbnbdz) ([ec8cb47](https://github.com/Edge-Music/Core/commit/ec8cb47))

### 文档
- README文件新增手机/平板的预览图片，直观展示应用效果 [@lsbnbdz](https://github.com/lsbnbdz) ([ec8cb47](https://github.com/Edge-Music/Core/commit/ec8cb47))

## V2.0.3 (2025-03-28)

### 新功能
- 支持定时任务功能，让音乐伴随生活节奏 ([9e8e488](https://github.com/Edge-Music/Core/commit/9e8e488c8ae79ed85ca0e424d8277c6622726b71))
- 多个页面添加悬浮播放控制 ([abc7086](https://github.com/Edge-Music/Core/commit/abc7086cc8165b4296fbd1e2a1edec9dd0ad74de))
- 实现播控红心功能，便于快速收藏喜爱的歌曲 ([b52da25](https://github.com/Edge-Music/Core/commit/b52da256f858ff3cebea8dabecbe9c3ffafecb1f))
- 增加点击图片切换至歌词页功能 ([388f922](https://github.com/Edge-Music/Core/commit/388f922e507f06dab2bcfdc34d17af0c669e54be))
- 持久化播放数据和播放模式，保留您的个性化设置 ([053706c](https://github.com/Edge-Music/Core/commit/053706c96652b65771bfb46e7616190c884e020a))

### 修复问题
- 修复翻译/音译歌词错误合并为上一首内容的问题 ([574ce27](https://github.com/Edge-Music/Core/commit/574ce27b26000450b8065d16ff3d23e0830f0ae3))
- 修复红心状态消失的问题 ([84850de](https://github.com/Edge-Music/Core/commit/84850de4d2313e347bba4c5e8d7622f2a98d2856))

### 其他改进
- 感谢 @科蓝kl 二次修改的icon，提升应用美观度 ([53d9183](https://github.com/Edge-Music/Core/commit/53d918305fdb1ab263b121aa8e654a3b7a8a3d2e))
