# UI/UX
- 偏好精确的布局控制，严格遵循位置规则：按钮居标题下左侧、筛选器居右、表格与容器间距16px、翻页器居表格下右侧等，且必须保持表格与按钮等组件间的正常间距，避免间距丢失。
- 偏好Stack模式下卡片向右侧依次叠加（类似扑克牌摊开效果），并增大卡片向屏幕纵深的倾斜透视感。
- 偏好保持每个页面顶部导航的同步与全局一致性。
- 偏好使用Spell UI的Words Stagger组件，实现文字逐个错落出现而非同时显示的动画效果。
- 偏好3D圆环布局的固定配置参数（cards=40, radius=445, TILT=22, speed=40, rotate=90），交互上禁止滚轮和拖拽主动旋转，但需确保圆环的自动旋转效果正常，仅保留hover单卡向上浮动40px及鼠标跟随倾斜效果。
- 偏好将3D圆环布局中的景深衰减和透明度效果置于圆环的最上方（最后面），而非默认的左侧。
- 偏好3D圆环布局的出场动画：圆环初始TILT为80度，cards数量从1丝滑增加至40，动画结束后TILT丝滑过渡至22度。
- 偏好圆环与详情模式间的切换过渡动画自然无缝，避免出现中间状态（如横排卡片）的闪烁与卡顿，且详情需展示图片原始比例。
- 偏好默认使用浅色模式进行UI设计，除非提示词明确指定深色模式。
- 偏好文本强调时使用加粗的“链接蓝”色，并保持与其它模块形式一致，不单独写token。
- 偏好基于 QAX-design.md 设计规范文档进行UI页面和组件的开发。

# Development Tools
- 偏好使用 google-labs-code/stitch-skills 仓库的 design-md 技能来辅助设计与开发工作。
- 偏好配置并使用名为wiki-qax的streamableHttp类型MCP服务器(https://mcpx.qianxin-inc.cn/wiki-qax/09f4434b221b4daab8965c02daae22f3)。
- 偏好配置并使用shadcn MCP服务器以辅助UI组件的开发与集成。
- 偏好使用 Unicorn Studio (SDK v2.1.12) 集成 WebGL 场景，配置上倾向于启用 lazyLoad 延迟加载和 production CDN 缓存，容器需设置显式宽高，且需隐藏或去除默认的'Made with Unicorn.studio'品牌按钮。

# Communication Style
- 用户不懂代码，偏好使用通俗易懂的非技术语言解释方案和概念，避免使用代码和专业术语。

# Architecture
- 偏好使用无框架的原生代码实现，不封装为React等特定框架的组件。

# Design Tokens
- 偏好使用特定层级的背景色设计变量，明确浅色与深色模式下的色值映射及各层级（reverse, accent, elevated, overlay, background, sunken）的使用场景。
- 深色运营卡片应使用默认Token颜色（深色描边变色+卡片底色），避免使用自定义渐变玻璃表面效果。
