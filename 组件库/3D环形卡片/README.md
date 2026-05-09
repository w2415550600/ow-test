# RingCarousel 3D 环形交互卡片组件

纯原生 JavaScript 实现的 3D 环形卡片轮播组件，无框架依赖，可在任何 HTML 页面中使用。

## 快速开始

### 1. 引入文件

```html
<!-- 组件样式 -->
<link rel="stylesheet" href="ring-carousel.css">

<!-- GSAP 依赖（组件前置依赖，必须先加载） -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Observer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>

<!-- 组件脚本 -->
<script src="ring-carousel.js"></script>
```

### 2. 准备容器

容器必须设置明确的宽高：

```html
<div id="my-carousel" style="width: 100vw; height: 100vh;"></div>
```

### 3. 初始化组件

```javascript
var carousel = new RingCarousel('#my-carousel', {
  // 卡片数据（必传）
  data: [
    { title: '项目名称', image: './image.jpg', desc: '项目描述文字...' },
    { title: '另一个项目', image: './another.png', desc: '更多描述...' },
  ],
});
```

## 配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | Array | `[]` | **必传**，卡片数据数组，每项包含 `title`、`image`、`desc` |
| `radius` | Number | `445` | 圆环半径 |
| `speed` | Number | `0.40` | 滚轮/拖拽旋转速度倍率 |
| `tilt` | Number | `22` | 圆环倾斜角度（度） |
| `cardRotate` | Number | `90` | 卡片自身旋转角度 |
| `autoSpeed` | Number | `0.08` | 自动旋转速度 |
| `cardWidth` | Number | `120` | 卡片宽度（px） |
| `cardHeight` | Number | `160` | 卡片高度（px） |
| `detailWidth` | Number | `384` | 详情卡片宽度（px） |
| `detailHeight` | Number | `528` | 详情卡片高度（px） |
| `detailGap` | Number | `56` | 详情卡片与信息面板间距（px） |
| `detailInfoWidth` | Number | `340` | 详情信息面板最大宽度（px） |
| `accent` | String | `'#4a90d9'` | 主题色 |
| `entranceTilt` | Number | `80` | 出场动画起始倾斜角 |
| `entranceDuration` | Number | `2.5` | 出场动画卡片增长时长（秒） |
| `tiltDuration` | Number | `1.5` | 出场动画倾斜过渡时长（秒） |
| `autoDelay` | Number | `4000` | 停止操作后多久恢复自动旋转（毫秒） |

## 公共方法

| 方法 | 说明 |
|------|------|
| `next()` | 旋转到下一张卡片 |
| `prev()` | 旋转到上一张卡片 |
| `openDetail(idx)` | 打开指定索引卡片的详情 |
| `closeDetail()` | 关闭详情模式 |
| `getActiveIndex()` | 获取当前激活的卡片索引 |
| `isDetailMode()` | 获取当前是否处于详情模式 |
| `updateData(newData)` | 动态更新卡片数据 |
| `updateConfig(newConfig)` | 动态更新配置参数 |
| `destroy()` | 销毁组件，清理 DOM、事件和动画 |

## 交互功能

- **滚轮**：滚动旋转圆环
- **拖拽**：鼠标拖拽旋转圆环
- **键盘**：左右方向键逐张切换，ESC 关闭详情
- **触摸**：手指滑动旋转圆环
- **鼠标跟随**：圆环随鼠标位置微幅倾斜
- **悬停**：卡片上浮 40px 并显示标题
- **点击**：卡片飞出到屏幕中央展示详情
- **详情翻页**：左右箭头按钮或键盘方向键切换

## 自定义样式

组件所有样式通过 `.ring-carousel` 作用域隔离，可通过 CSS 变量覆盖：

```css
#my-carousel {
  --rc-card-w: 140px;    /* 卡片宽度 */
  --rc-card-h: 180px;    /* 卡片高度 */
  --rc-accent: #e74c3c;  /* 主题色 */
}
```

也可以直接覆盖组件内部的 class 样式（需更高优先级选择器）。

## 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的 3D 环形画廊</title>
  <link rel="stylesheet" href="ring-carousel.css">
  <style>
    body { margin: 0; overflow: hidden; }
    #gallery { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="gallery"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Observer.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>
  <script src="ring-carousel.js"></script>

  <script>
    var carousel = new RingCarousel('#gallery', {
      data: [
        { title: '风景', image: './images/landscape.jpg', desc: '美丽的自然风光' },
        { title: '建筑', image: './images/architecture.jpg', desc: '现代建筑设计' },
        { title: '人像', image: './images/portrait.jpg', desc: '光影人像摄影' },
      ],
      radius: 400,
      tilt: 20,
      accent: '#ff6b6b',
    });
  </script>
</body>
</html>
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `ring-carousel.js` | 组件核心逻辑 |
| `ring-carousel.css` | 组件样式 |
| `demo.html` | 使用演示页面 |
| `standalone.html` | 原始独立版本（未封装） |
