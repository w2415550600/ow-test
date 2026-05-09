# 图标系统规范 (Q-GPT 安全机器人图标库)

## 基础信息
- **NPM 包名**: `@store.bizicon/skyeye-qgpt`
- **当前版本**: `51.0.0`
- **组件前缀**: `i-` (例如：`<i-search />`)
- **渲染技术**: 线性 SVG 渲染，支持动态配置。

---

## 快速使用 (Vue)

### 1. 安装与引入
```javascript
import Icons from '@store.bizicon/skyeye-qgpt';
import '@store.bizicon/skyeye-qgpt/index.css';

Vue.use(Icons);
```

### 2. 基础调用
```html
<!-- 默认样式 -->
<i-add-session />

<!-- 自定义颜色与大小 -->
<i-log-retrieval style="color: #0081FF; font-size: 20px" />
```

### 3. 多风格配置
通过 `currentStyle` 属性切换图标表现形式：
- `outline` (线性 - 默认)
- `filled` (填充)
- `twoTone` (双色)
- `multiColor` (多色)

示例：
```html
<i-alarm currentStyle="filled" />
```

---

## 图标索引 (部分摘录)

| 分类 | 中文语义 | 技术 Key (用于标签) |
| :--- | :--- | :--- |
| **智能问答** | 新增会话 / 智能助手 / 提示词 | `add-session`, `dialogue-assistant`, `prompt` |
| **智能体** | 人物设定 / 思考路径 / 任务目标 | `character-setting`, `thinking-path`, `task-objective` |
| **工作流** | 分支路由 / 循环路由 / 开始节点 | `branch-routing`, `loop-routing`, `start-node` |
| **攻击路径** | 主机 / 攻击者 / 病毒查杀 / 全量路径 | `host`, `attacker`, `virus-detection`, `attack-path` |
| **通用运维** | 检索 / 告警 / 资产 / 巡检 / 设置 | `search`, `alarm`, `asset`, `policeman`, `set-up` |
| **文档格式** | PDF / DOC / CSV / XLSX | `pdf`, `doc`, `csv`, `xlsx` |

> [!NOTE]
> 完整的图标清单（共 270+ 项）已同步记录在同级目录的 `icons-library.json` 中，编写 UI 代码时请以此为准。
