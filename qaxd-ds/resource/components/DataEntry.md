---
description: 数据录入组件库（表单、输入框、选择器）的设计规范，用于定义用户交互、视觉表现与数据验证逻辑。
usage: 在所有需要用户手动输入或选择数据的页面（如配置页、筛选栏、登录注册页）中使用。
ai-usage: AI 必须优先通过 `q-form` 的 `size` 属性批量控制内部组件尺寸；严禁在 MD 之外硬编码 px 值；所有状态（Hover/Focus）必须映射至全局语义 Token。
---

# 数据录入组件规范 (Data Entry Components)

本规范整合了奇安信设计系统中“数据录入”分类下的核心组件：**Input (输入框)**、**Select (选择器)** 及 **Form (表单)**。旨在建立统一的录入类组件视觉标准与工程实现逻辑。

> [!IMPORTANT]
> **SSOT 唯一事实源说明**：
> 1. **颜色系统**：参考 [Colors.md](file:///Users/dd/Documents/王建宇的%20IDE%20工作空间/qaxd-ds/resource/tokens/Colors.md)。
> 2. **布局参数**：参考 [SpacingLayout.md](file:///Users/dd/Documents/王建宇的%20IDE%20工作空间/qaxd-ds/resource/tokens/SpacingLayout.md)。
> 3. **AI 约束**：生成代码时应始终使用变量名，禁止使用硬编码 Hex 或 Px。



## 1. 通用尺寸规范 (Control Sizing)

所有数据录入类控件（包括输入框、选择项、按钮）必须遵循统一的高度阶梯。

| 尺寸名称 | 对应高度 | 适用场景示例 | 对应 Token |
| :--- | :--- | :--- | :--- |
| **大 (Large)** | 40px | 品牌展示页、核心配置大项 | `--sizing-control-height-large` |
| **中 (Default)** | 32px | 常规功能页面（默认值） | `--sizing-control-height` |
| **小 (Small)** | 24px | 侧边栏筛选、表格内行内编辑 | `--sizing-control-height-small` |

## 2. 交互状态映射 (Semantic State Mapping)

| 状态 | 表现逻辑 | 对应 Token |
| :--- | :--- | :--- |
| **Default (默认)** | 边框：中性浅灰色；背景：白色 | `--color-border-standard` |
| **Hover (悬浮)** | 边框：向主色（Accent）过渡 | `--color-accent-hover` |
| **Focus (焦点)** | 边框：主色高亮；发光：扩散阴影 | `--color-accent-focus` |
| **Disabled (禁用)** | 背景：浅灰色；文字：暗淡；禁用光标 | `--color-accent-disabled` |
| **Error (错误)** | 边框：红色提示；文字：错误描述颜色 | `--color-danger` |

---

## 3. Input 输入框 (Input)

输入框是数据录入最基础的单元，支持文字输入、密码录入及自适应统计。

### 核心特性
- **图标辅助**：支持 `prefix-icon`（前缀）和 `suffix-icon`（后缀），图标颜色应遵循 `--color-text-placeholder`。
- **清空能力**：`clearable` 属性触发时，在 `suffix` 位置显示清除按钮。
- **字数控制**：当开启 `show-word-limit` 时，统计文字需使用 `--font-size-small` 且位于底部或右侧。

---

## 4. Select 选择器 (Select)

当选项超过 5 个或需要通过列表减少用户输入负担时使用。

### 核心特性
- **单选/多选**：多选模式下，选中值以 `Tag` 形式展示。
- **多选 Tag 策略**：
  - Tag 高度应比外层 Input 低 6-8px，以维持视觉平衡。
  - 支持 `collapse-tags`，在有限空间内只显式展示 N 个 Tag，其余以数字计。
- **下拉列表**：悬浮层背景使用 `--color-bg-popover`，选中项文字使用 `--color-accent`。

---

## 5. Form 表单 (Form)

表单用于将输入控件进行逻辑分组，并提供校验机制。

### 布局与对齐 (Layout)
| 属性 | 说明 | 适用场景 |
| :--- | :--- | :--- |
| **Right Align (右对齐)** | Label 在容器右侧，靠近输入框 | 默认首选，阅读链最短 |
| **Left Align (左对齐)** | Label 在左侧边界对齐 | 表单项较长且 Label 字数差异大时 |
| **Top Align (顶部对齐)** | Label 在输入框上方 | 紧凑型移动端布局或强引导场景 |

### 尺寸继承 (Size Inheritance)
- **批量控制**：在 `q-form` 上设置 `size` 后，其内部所有派生输入控件（Input, Select, DatePicker）应自动同步。
- **禁止混合使用**：严禁在一个表单中混合使用不同高度的录入组件。

---

## 使用建议
1. **反馈及时性**：错误校验（Error）应在失去焦点（blur）后立即反馈。
2. **默认填充**：利用 Placeholder 定义输入预期，防止用户迷失。
3. **性能优化**：对于超长 Select 列表，建议开启虚拟滚动。
