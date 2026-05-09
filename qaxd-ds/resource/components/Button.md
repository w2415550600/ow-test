---
description: 按钮组件 (Button) 规范。系统的基础属性组件，提供主要、默认、文字、虚线、幽灵及危险等多种变体。
usage: 用于触发特定业务逻辑或页面导航的操作点。
ai-usage: 必须强制使用“苹方-简” (PingFang SC) 字体。遵循语义化 Token 映射，确保在 L/M/S 三种尺寸下内边距与字号的比例协调。支持按钮组 (Button Group) 的圆角合并逻辑。
---

# 按钮 (Button)

> [!IMPORTANT]
> **单一事实源 (SSOT)**：所有按钮样式必须对接 [variables/_colors.scss](file:///Users/dd/Documents/%E7%8E%8B%E5%BB%BA%E5%AE%87%E7%9A%84%20IDE%20%E5%B7%A5%E4%BD%9C%E7%A9%BA%E9%97%B4/qaxd-ds/resource/tokens/variables/_colors.scss) 中的语义 Token（如 `--color-accent`）。禁止在组件内部声明具体的 Hex 颜色值。

## 按钮类型 (Types)

| 类型 | 视觉特征 | Token 演示 (Light) | 说明 |
| :--- | :--- | :--- | :--- |
| **主要 (Primary)** | 自定义背景填充 | `--color-accent` | 页面内的核心行动点 (Call to Action) |
| **默认 (Default)** | 边框 + 白底 | `--color-border-primary` / `--color-background` | 常规业务操作，次要优先级 |
| **文字 (Text)** | 无背景无边框 | `--color-text-primary` | 低优先级操作，常用于表格行内或列表 |
| **虚线 (Dashed)** | 虚线边框 | `--color-border-secondary` | 用于引导添加、导入等辅助性操作 |
| **幽灵 (Ghost)** | 透明背景 + 主色边框 | `--color-accent` | 用于深色或彩色背景上的操作 |
| **危险 (Danger)** | 红色视觉表现 | `--color-danger` | 警示、删除等具有不可逆后果的操作 |

## 尺寸规范 (Sizes)

| 尺寸名称 | 属性值 | 高度 (Height) | 内边距 (Padding) | 字号 (Font) |
| :--- | :--- | :--- | :--- | :--- |
| **中 (Medium)** | `medium` | **40px** | 左右 16px | 14px |
| **小 (Small)** | `small / default` | **32px** | 左右 12px | 14px |
| **迷你 (Mini)** | `mini` | **24px** | 左右 8px | 12px |

## 交互状态 (States)

所有状态跳转必须通过颜色 Token 的 Hover/Active 变体实现：
- **悬浮 (Hover)**：背景填充 `--color-fill-hover` 或主色加亮。
- **激活 (Active)**：背景填充 `--color-fill-active` 或主色加深。
- **禁用 (Disabled)**：透明度衰减至 `40%`，指针状态 `not-allowed`。
- **加载中 (Loading)**：图标前置旋转，状态变更为不可点击。

## 按钮组 (Button Group)

多个按钮并列显示时，遵循以下合并逻辑：
1. **间距**：按钮间距为 `0px`，边框通过 `margin-left: -1px` 进行重叠。
2. **圆角合并**：
   - 首个按钮：仅保留左侧圆角 (`4px 0 0 4px`)。
   - 中间按钮：圆角为 `0`。
   - 末尾按钮：仅保留右侧圆角 (`0 4px 4px 0`)。

## 资产说明
- **字体**：强制使用 `PingFang SC` (苹方-简)。
- **图标**：支持 `prefix-icon` 和 `suffix-icon`，图标与文字间距固定为 `8px`。
