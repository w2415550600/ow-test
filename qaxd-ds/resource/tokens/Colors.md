---
description: QAXD 颜色系统设计规范。本规范通过语义化 Token 定义了品牌、反馈及中性基础色。
usage: 开发与设计应当严格引用 CSS 变量（Token），严禁硬编码 Hex 值。具体的颜色数值维护在变量文件中。
ai-usage: 生成代码或设计图层时，严禁直接使用 Hex 代码。文本必须引用 --color-text-* 变量；背景元素应根据“沉降/抬升”逻辑引用对应的 background 变量。暗色模式适配应依赖变量自动切换。
---

# 颜色系统 (Colors)

> [!IMPORTANT]
> **SSOT 唯一事实源**：颜色具体的 Hex 数值已迁移至 [variables/_colors.scss](file:///Users/dd/Documents/王建宇的 IDE 工作空间/qaxd-ds/resource/tokens/variables/_colors.scss)。本文档仅负责定义颜色语义及使用准则。

## 1. 颜色分层逻辑

我们采用三层架构管理颜色：
1. **基础色 (Primitive)**：色板中的原始值（如蓝色、绿色），不建议在业务中直接引用。
2. **主题色 (Theme)**：由基础色映射而来的主品牌色。
3. **语义色 (Functional)**：根据业务含义定义的反馈颜色（成功、危险等）。

## 2. 品牌与语义 Token (Brand & Functional)

| 分类 | Token 命名模式 | 说明 |
| :--- | :--- | :--- |
| **强调色** | `--color-accent-[state]` | 包含 hover, active, focus, disabled, foreground, fill, border, text 等。 |
| **成功色** | `--color-success-[state]` | 表达成功、完成、安全开启。 |
| **警示色** | `--color-warning-[state]` | 表达警告、不安全、待处置。 |
| **危险色** | `--color-danger-[state]` | 表达危险操作、严重风险、报错。 |
| **信息色** | `--color-info-[state]` | 表达客观、中立提示信息。 |

## 3. 中性色 Token (Neutral)

中性色是界面的基石，描述了文字、边界以及背景的层次。

| 分类 | Token 名 | 适用场景 |
| :--- | :--- | :--- |
| **文本** | `--color-text-[primary\|secondary\|tertiary\|quaternary]` | 依次代表标题、正文、说明、提示/禁用。 |
| **描边** | `--color-border-[primary\|secondary\|tertiary]` | 依次代表控件描边、容器/分割线、禁用描边。 |
| **填充** | `--color-fill-[primary\|secondary\|hover\|active\|disabled]` | 用于交互元素的背景填充。 |
| **背景** | `--color-background-[accent\|elevated\|overlay\|sunken\|reverse]` | 系统级背景，定义了从沉降到抬升的层级。 |

## 4. 链接与状态色 (Link & State) [NEW]

| 分类 | Token 命名模式 | 说明 |
| :--- | :--- | :--- |
| **链接** | `--color-link-[hover\|active\|visited]` | 用户界面中超链接的专用状态。 |
| **威胁** | `--color-state-threat-[level]` | 用于威胁建模、安全态势等场景（Critical, High, Medium, Low等）。 |
| **攻击** | `--color-state-attack-[result]` | 表达攻击结果（Success, Compromise, Attempt, Failure）。 |
| **任务** | `--color-state-task-[status]` | 表达任务进度（Danger, Progress, Unstarted 等）。 |

## 5. 数据可视化颜色 (Data) [NEW]

我们提供了一套感知均匀的 18 色序色板，严禁在图表以外的 UI 元素中使用这些变量。
- 命名规则：`--color-data-1` 到 `--color-data-18`。

## 6. 使用准则 (Rules)

1. **禁止硬编码**：任何组件的填充、边框、文字颜色必须引用 Token。
2. **暗色模式适配**：所有语义 Token 均已在 SCSS 中完成暗色模式映射。切换 `data-theme='dark'` 即可自动适配。
3. **分层引用**：基础色（Primitive）仅限在变量定义文件中被引用，业务代码应始终引用语义色（Functional）。
