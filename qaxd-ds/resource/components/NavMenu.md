---
description: 侧边导航菜单组件规范。作为系统的全局导航核心，基于语义化 Token 实现，默认匹配浅色主题设计。
usage: 用于 PC 端中后台系统的全局导航。
ai-usage: 必须强制使用“苹方-简” (PingFang SC) 字体。遵循语义化 Token 映射，通过变量切换实现深色模式适配，严禁使用硬编码颜色。
---

# 侧边导航菜单 (NavMenu)

> [!IMPORTANT]
> **语义化优先**：本组件的视觉规范完全依赖于 [variables/_colors.scss](file:///Users/dd/Documents/%E7%8E%8B%E5%BB%BA%E5%AE%87%E7%9A%84%20IDE%20%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4/qaxd-ds/resource/tokens/variables/_colors.scss) 定义的全局 Token。通过切换 `[data-theme]` 属性，组件会自动适配不同的主题外观。

## 布局尺寸 (Layout)

| 属性 | 规范值 | 说明 |
| :--- | :--- | :--- |
| **整体宽度** | 216px / 64px | 展开态与收起态的固定宽度 |
| **Logo 区域高度** | 56px | 顶部品牌展示区 |
| **菜单起始 Y 轴** | 64px | 菜单列表起始偏移量 |
| **菜单项高度** | 40px | 单个导航项的垂直高度 |

## 核心色彩映射 (Color Mapping)

*以下色值仅作为浅色 (Light) 模式下的视觉参考，实际开发应仅引用 Token 变量。*

| 元素 | Token 映射 | 默认色值 (Light) | 说明 |
| :--- | :--- | :--- | :--- |
| **侧栏背景 (Bg)** | `--color-background` | `#FFFFFF` | 容器底色 |
| **激活项背景 (Active)** | `--color-accent` | `#105CF4` | 选中状态填充色 |
| **激活项文字/图标** | `-` | `#FFFFFF` | 强调展示色 |
| **默认项文字/图标** | `--color-text-primary` | `#292D35` | 默认文本色 |
| **二级/三级菜单背景** | `--color-background-sunken` | `#F3F3F4` | 区分层级深度 |

## 结构与交互细节

### 1. 多级导航结构
- **层级逻辑**：子菜单相对于父级通过左内边距 (Padding-left) 进行逻辑缩进。
- **背景差异**：展开的子菜单区域建议应用 `--color-background-sunken` 以形成视觉嵌套感。

### 2. 交互状态
- **默认 (Default)**：无背景。文本图标使用 `--color-text-primary`。
- **悬浮 (Hover)**：背景填充 `--color-fill-hover` (`#ECEDEF`)，呈现 `4px` 圆角。
- **激活 (Active)**：背景填充 `--color-accent`，呈现 `4px` 圆角，文字与图标强制反白 (`#FFFFFF`)。

## 资产说明
- **字体**：强制使用 `PingFang SC` (苹方-简)。
- **间距**：菜单项垂直间距由变量 `--nav-item-gap` 控制。
