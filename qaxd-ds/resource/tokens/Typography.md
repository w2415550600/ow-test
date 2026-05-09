---
description: 字体排版设计规范，用于定义界面文本的视觉层次、易读性和一致性。
usage: 在设计和开发 UI 界面时，根据内容的层级（如标题、正文、标签等）选择对应的字体变量。
ai-usage: 设计字体必须强制使用“苹方-简” (PingFang SC)。文本层级必须分明，严禁混合使用字号。对于表格数据、仪表盘数字，必须显式声明 --font-variant-numeric: tabular-nums 以确保视觉对齐。
---

# 字体排版设计规范 (Typography)

> [!IMPORTANT]
> **SSOT 唯一事实源**：字号、行高等数值已迁移至 [variables/_typography.scss](file:///Users/dd/Documents/王建宇的 IDE 工作空间/qaxd-ds/resource/tokens/variables/_typography.scss)。请查阅代码变量库获取基准值。

## 使用建议

1. **层次清晰**：严格遵守标题字号层级，通过字号和字重的差异化来引导用户的注意力。
2. **易读性优先**：正文内容建议使用 `--font-size-body` 和对应的 `--line-height-body`，确保长文本阅读不疲劳。
3. **数字对比**：在处理报表、监控等需要纵向对比数字的场景时，务必开启 `tabular-nums` 特性以保证视觉对齐。

## 变量定义

### 字体家族 (Font Family)
| Token 名 | 声明 | 适用场景示例 |
| :--- | :--- | :--- |
| `--font-family` | 默认字体家族 | 界面所有文本内容 |
| `--font-variant-numeric` | 等宽数字设置 | 表格、计数器、纵向对比的数字 |

### 字号 (Font Size)
| Token 名 | 声明 | 适用场景示例 |
| :--- | :--- | :--- |
| `--font-size-heading-1` | 一级标题字号 | 页面大标题 |
| `--font-size-heading-2` | 二级标题字号 | 模块标题 |
| `--font-size-heading-3` | 三级标题字号 | 子模块标题 |
| `--font-size-heading-4` | 四级标题字号 | 容器标题 |
| `--font-size-heading-5` | 五级标题字号 | 小标题 |
| `--font-size-heading-6` | 六级标题字号 | 侧栏标题、引导文字 |
| `--font-size-body` | 常规文本字号 | 正文内容、表单标签 |

### 行高 (Line Height)
行高依据设计系统定义的基准原则进行扩展，以确保文本段落的舒适阅读感。

| Token 名 | 声明 | 适用场景示例 |
| :--- | :--- | :--- |
| `--line-height-heading-1` | 一级标题行高 | 配合一级标题使用 |
| `--line-height-heading-2` | 二级标题行高 | 配合二级标题使用 |
| `--line-height-heading-3` | 三级标题行高 | 配合三级标题使用 |
| `--line-height-heading-4` | 四级标题行高 | 配合四级标题使用 |
| `--line-height-heading-5` | 五级标题行高 | 配合五级标题使用 |
| `--line-height-heading-6` | 六级标题行高 | 配合六级标题使用 |
| `--line-height-body` | 常规文本行高 | 配合正文使用 |

### 字重 (Font Weight)
| Token 名 | 声明 | 适用场景示例 |
| :--- | :--- | :--- |
| `--font-weight-bold` | 字重-加粗 | 强调标题、关键数值 |
| `--font-weight` | 字重-常规 | 普通正文、描述文字 |
| `--font-weight-thin` | 字重-细 | 辅助说明性文字 |
