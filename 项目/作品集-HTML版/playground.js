// Playground — Orbit + Stack modes with ScrollTrigger auto-switch
document.addEventListener('DOMContentLoaded', () => {
  const images = [
    './assets/playground@1x.png',
    './assets/Qianxin Qaxgpt Experience Design.png',
    './assets/QAX Design System.png',
    './assets/QAX New Style.png',
    './assets/Qax-gpt Brand Design.png',
    './assets/Qax-AI Motion Design.png',
    './assets/QAX-AI Guidline.png'
  ];

  // 复制图片数组，让 Stack 模式有足够卡片铺满屏幕宽度
  const stackImages = [...images, ...images];

  const container = document.getElementById('ring-container');
  const stage = document.querySelector('.playground-stage');
  const bounds = container.getBoundingClientRect();
  let RADIUS = Math.min(bounds.width, 980) / 3;
  const ORBIT_COUNT = images.length;       // 7 张用于 Orbit
  const TOTAL_COUNT = stackImages.length;  // 14 张用于 Stack
  let center = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };

  let currentMode = 'orbit';
  let isTransitioning = false;

  const ORBIT_SIZE = 256;
  const STACK_SIZE = 260;

  // ========================================
  // 创建所有卡片（前 7 张用于 orbit，全部 14 张用于 stack）
  // ========================================
  const items = [];
  const wrapper = document.createElement('div');
  wrapper.className = 'ring-wrapper';
  container.appendChild(wrapper);

  stackImages.forEach((src, i) => {
    const el = document.createElement('div');
    el.className = 'ring-item';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `item-${i}`;
    el.appendChild(img);
    wrapper.appendChild(el);
    items.push(el);

    // 前 7 张正常显示（orbit），后 7 张初始隐藏
    if (i >= ORBIT_COUNT) {
      gsap.set(el, { autoAlpha: 0, scale: 0, width: ORBIT_SIZE, height: ORBIT_SIZE });
    } else {
      gsap.set(el, { scale: 1, width: ORBIT_SIZE, height: ORBIT_SIZE });
    }

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(src, `作品 ${(i % ORBIT_COUNT) + 1}`, '这是一个作品简介，演示放大展示。');
    });
  });

  // ========================================
  // ORBIT MODE — 椭圆轨道旋转
  // ========================================
  function positionItems(angleOffset = 0) {
    const rect = container.getBoundingClientRect();
    RADIUS = Math.min(rect.width, 1033) / 3;
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const el = items[i];
      const angle = (i / ORBIT_COUNT) * Math.PI * 2 + angleOffset;
      const x = rect.width / 2 + Math.cos(angle) * RADIUS;
      const y = rect.height / 2 + Math.sin(angle) * (RADIUS * 0.35);
      const halfCard = ORBIT_SIZE / 2;
      gsap.to(el, {
        x: x - rect.width / 2 - halfCard,
        y: y - rect.height / 2 - halfCard,
        z: Math.round(Math.sin(angle) * 200),
        duration: 0.5, ease: 'power3.out', overwrite: false
      });
      el.style.zIndex = Math.round(500 + Math.sin(angle) * 100);
    }
  }

  // Orbit 鼠标交互
  let hoveredIndex = null;

  function handleOrbitMouseMove(e) {
    if (currentMode !== 'orbit') return;
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(wrapper, { x: px * 60, y: py * 21, rotationY: px * 2, duration: 0.35, ease: 'power3.out' });

    let nearest = null, nearestDist = Infinity;
    for (let idx = 0; idx < ORBIT_COUNT; idx++) {
      const r = items[idx].getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < nearestDist) { nearestDist = d; nearest = idx; }
    }

    if (nearestDist <= 140) {
      if (hoveredIndex !== nearest) {
        if (hoveredIndex !== null) {
          gsap.killTweensOf(items[hoveredIndex]);
          gsap.to(items[hoveredIndex], { scale: 1, rotationX: 0, rotationY: 0, duration: 0, overwrite: true });
        }
        hoveredIndex = nearest;
        const el = items[hoveredIndex];
        const r = el.getBoundingClientRect();
        gsap.killTweensOf(el);
        gsap.to(el, {
          scale: 1.18,
          rotationY: ((e.clientX - r.left) / r.width - 0.5) * 18,
          rotationX: -((e.clientY - r.top) / r.height - 0.5) * 12,
          duration: 0.12, ease: 'power3.out', overwrite: true
        });
      } else if (hoveredIndex !== null) {
        const el = items[hoveredIndex];
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          rotationY: ((e.clientX - r.left) / r.width - 0.5) * 18,
          rotationX: -((e.clientY - r.top) / r.height - 0.5) * 12,
          duration: 0.12, ease: 'power3.out', overwrite: true
        });
      }
    } else if (hoveredIndex !== null) {
      gsap.killTweensOf(items[hoveredIndex]);
      gsap.to(items[hoveredIndex], { scale: 1, rotationX: 0, rotationY: 0, duration: 0, overwrite: true });
      hoveredIndex = null;
    }
  }

  // ========================================
  // STACK MODE — 水平扇形展开 + 鼠标滑动浏览
  // ========================================
  //
  // ★ 可调参数速查表（按功能分组）
  // ─────────────────────────────────────
  // 【卡片尺寸】
  //   STACK_SIZE = 260          — 卡片宽高（px）
  //
  // 【卡片布局 — getStackPositions()】
  //   spacing = 150             — 相邻卡片水平间距（px），越大铺得越开
  //   rotY = -norm * 65         — Y轴旋转系数，控制左右透视翻转角度（度）
  //   rotZ = norm * 12          — Z轴旋转系数，控制左右倾斜角度（度）
  //   rotX = Math.abs(norm)*10  — X轴旋转系数，控制上下透视翻转角度（度）
  //   zOffset = -|norm| * 100   — Z轴纵深偏移系数，边缘卡片往屏幕里缩（px）
  //   yOffset = |norm| * 40     — Y轴下垂偏移系数，边缘卡片向下坠（px）
  //   scaleVal = 1 - |norm|*0.1 — 缩放系数，边缘卡片缩小比例
  //   zIndex = 600 - |norm|*100 — 层叠顺序，中间卡片在前
  //
  // 【入场动画 — enterStackMode()】
  //   duration: 0.8             — 每张卡片入场动画时长（秒）
  //   ease: 'power3.inOut'      — 入场缓动函数
  //   stagger: 0.04 * i        — 每张卡片之间的延迟（秒），0.04 为间隔系数
  //   wrapper duration: 0.4     — wrapper 归位动画时长
  //
  // 【退场动画 — exitStackMode()】
  //   额外卡片 duration: 0.3    — 多余卡片消失时长
  //   orbit 卡片 duration: 0.5  — 原始卡片回归时长
  //   orbit 卡片 stagger: 0.03  — 原始卡片间延迟系数
  //
  // 【鼠标平移浏览 — handleStackMouseMove()】
  //   panRange                  — 由 spacing 和 STACK_SIZE 自动计算
  //   wrapper y偏移 = py * 10   — 垂直视差强度（px）
  //   wrapper rotationX = -py*2 — 垂直视差旋转强度（度）
  //   wrapper duration: 0.8     — 平移跟随鼠标的动画时长
  //
  // 【卡片悬浮 — liftStackCard / resetStackCard】
  //   悬浮检测距离: 160          — 鼠标距卡片多近触发悬浮（px）
  //   lift y偏移: pos.y - 50    — 悬浮时向上抬起距离（px）
  //   lift z偏移: 80             — 悬浮时向前凸出距离（px）
  //   lift scale: 1.12           — 悬浮时放大比例
  //   lift duration: 0.4         — 悬浮动画时长
  //   lift ease: 'back.out(1.4)' — 悬浮缓动（1.4 为回弹强度）
  //   悬浮倾斜 rotationY 系数: 12 — 水平倾斜强度（度）
  //   悬浮倾斜 rotationX 系数: 8  — 垂直倾斜强度（度）
  //   悬浮倾斜 duration: 0.25     — 倾斜跟随鼠标动画时长
  //   reset duration: 0.4         — 归位动画时长
  //   reset ease: 'power3.out'    — 归位缓动
  // ─────────────────────────────────────

  let stackHoveredIndex = null;
  // 鼠标驱动的水平平移量
  let stackPanX = 0;

  /**
   * 计算所有卡片在 Stack 模式下的位置和变换参数
   * ★ 这是核心布局函数，调整扇形展开效果的参数都在这里
   */
  function getStackPositions() {
    const halfCard = STACK_SIZE / 2;
    const totalCards = TOTAL_COUNT;
    const mid = (totalCards - 1) / 2;  // 中间卡片的索引（用于归一化）
    const spacing = 170;               // ★ 相邻卡片水平间距（px），越大铺得越开
    const positions = [];

    for (let i = 0; i < totalCards; i++) {
      // norm: -1（最左）~ 0（中间）~ +1（最右），用于对称变换
      const norm = mid === 0 ? 0 : (i - mid) / mid;

      // ★ offsetX: 水平位置，由 spacing 控制间距
      const offsetX = (i - mid) * spacing;

      // ★ 以下为各轴旋转和偏移参数，均基于 norm 对称分布
      const rotY = -norm * 65;                    // ★ Y轴旋转（度），左右透视翻转，65° 为最大角度
      const rotZ = norm * 12;                     // ★ Z轴旋转（度），左右倾斜，12° 为最大角度
      const rotX = Math.abs(norm) * 10;           // ★ X轴旋转（度），上下透视，10° 为最大角度
      const zOffset = -(Math.abs(norm) * 100);    // ★ Z轴纵深（px），边缘卡片往屏幕里缩，100 为最大深度
      const yOffset = Math.abs(norm) * 40;        // ★ Y轴下垂（px），边缘卡片向下坠，40 为最大下垂量
      const scaleVal = 1 - Math.abs(norm) * 0.1;  // ★ 缩放，边缘卡片缩小，0.1 为缩小系数
      const zIndex = 600 - Math.round(Math.abs(norm) * 100);  // ★ 层叠顺序，中间高边缘低

      positions.push({
        x: offsetX - halfCard,  // 水平位置（减去半张卡片宽度居中）
        y: yOffset - halfCard,  // 垂直位置（下垂 + 居中）
        z: zOffset,             // 纵深
        rotationY: rotY,        // Y轴旋转
        rotationX: rotX,        // X轴旋转
        rotation: rotZ,         // Z轴旋转
        scale: scaleVal,        // 缩放
        zIndex: zIndex          // 层叠
      });
    }
    return positions;
  }

  /**
   * 计算卡片总展开宽度和可平移范围
   * 当卡片总宽度超过视口时，鼠标可驱动水平平移浏览
   */
  function getStackPanRange() {
    const totalCards = TOTAL_COUNT;
    const mid = (totalCards - 1) / 2;
    const spacing = 150;  // ★ 需与 getStackPositions() 中的 spacing 保持一致
    const totalSpread = (totalCards - 1) * spacing + STACK_SIZE;
    const viewW = window.innerWidth;
    const overflow = Math.max(0, totalSpread - viewW);
    return overflow / 2;  // 单侧最大平移量
  }

  /**
   * ★ 进入 Stack 模式 — 从 Orbit 过渡到扇形展开
   * 所有卡片从轨道位置动画到各自的 stack 位置
   */
  function enterStackMode() {
    if (isTransitioning || currentMode === 'stack') return;
    isTransitioning = true;

    // 停止 orbit 旋转
    if (orbitTickerId !== null) {
      gsap.ticker.remove(orbitTickerFn);
      orbitTickerId = null;
    }

    // 清除残留的 orbit hover 状态
    if (hoveredIndex !== null) {
      gsap.killTweensOf(items[hoveredIndex]);
      gsap.set(items[hoveredIndex], { scale: 1, rotationX: 0, rotationY: 0 });
      hoveredIndex = null;
    }

    // 先 kill 所有卡片上的残留 tweens，避免和过渡动画冲突
    items.forEach(el => gsap.killTweensOf(el));
    gsap.killTweensOf(wrapper);

    // 添加样式类
    stage.classList.add('stack-active');
    items.forEach(el => el.classList.add('stack-mode'));

    // 更新按钮状态
    document.querySelectorAll('.pg-mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === 'stack');
    });

    const positions = getStackPositions();
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning = false;
        currentMode = 'stack';
        stackPanX = 0;
      }
    });

    // ★ 重置 wrapper 位置（清除 orbit 的鼠标偏移）
    tl.to(wrapper, { x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 0.4, ease: 'power3.out' }, 0);

    // ★ 显示所有卡片并动画到各自的 stack 位置
    items.forEach((el, i) => {
      const pos = positions[i];
      if (i >= ORBIT_COUNT) {
        // 额外卡片（后7张）初始隐藏
        gsap.set(el, { autoAlpha: 0, scale: 0 });
      }
      tl.to(el, {
        x: pos.x, y: pos.y, z: pos.z,
        rotation: pos.rotation,
        rotationX: pos.rotationX,
        rotationY: pos.rotationY,
        scale: pos.scale,
        autoAlpha: 1,
        width: STACK_SIZE, height: STACK_SIZE,
        duration: 0.8,             // ★ 入场动画时长（秒）
        ease: 'power3.inOut',      // ★ 入场缓动函数
        onStart: () => { el.style.zIndex = pos.zIndex; }
      }, 0.04 * i);  // ★ stagger 延迟，0.04秒/张，越大入场越慢
    });
  }

  /**
   * ★ 退出 Stack 模式 — 从扇形展开回归 Orbit 轨道
   */
  function exitStackMode() {
    if (isTransitioning || currentMode === 'orbit') return;
    isTransitioning = true;

    // 清除残留的 stack hover 状态
    if (stackHoveredIndex !== null) {
      stackHoveredIndex = null;
    }

    // 先 kill 所有卡片和 wrapper 上的残留 tweens
    items.forEach(el => gsap.killTweensOf(el));
    gsap.killTweensOf(wrapper);

    // 立即重置 wrapper 位置（避免 stack 模式的 panX 残留导致偏移）
    gsap.set(wrapper, { x: 0, y: 0, rotationY: 0, rotationX: 0 });

    stage.classList.remove('stack-active');
    items.forEach(el => el.classList.remove('stack-mode'));

    document.querySelectorAll('.pg-mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === 'orbit');
    });

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning = false;
        currentMode = 'orbit';
        // 重置 wrapper 确保干净状态
        gsap.set(wrapper, { x: 0, y: 0, rotationY: 0, rotationX: 0 });
        startOrbitRotation();
      }
    });

    // ★ 隐藏额外卡片（后7张）
    items.forEach((el, i) => {
      if (i >= ORBIT_COUNT) {
        tl.to(el, { autoAlpha: 0, scale: 0, duration: 0.3, ease: 'power3.in' }, 0);  // ★ 额外卡片消失时长
      } else {
        // ★ orbit 卡片回归原始大小，清除所有 stack transforms
        tl.to(el, {
          width: ORBIT_SIZE, height: ORBIT_SIZE,
          rotation: 0, rotationX: 0, rotationY: 0,
          x: 0, y: 0, z: 0, scale: 1,
          duration: 0.5,           // ★ 回归动画时长
          ease: 'power3.inOut'     // ★ 回归缓动
        }, i * 0.03);  // ★ stagger 延迟，0.03秒/张
      }
    });
  }

  /**
   * ★ Stack 模式鼠标交互 — 水平平移浏览 + 卡片悬浮抬起
   * 鼠标左右移动 → 整体水平平移浏览超出视口的卡片
   * 鼠标悬停卡片 → 卡片抬起 + 倾斜跟随
   */
  function handleStackMouseMove(e) {
    if (currentMode !== 'stack' || isTransitioning) return;

    const viewW = window.innerWidth;
    // 鼠标 X 位置映射到水平平移（左→右滑，右→左滑）
    const mouseNorm = (e.clientX / viewW - 0.5) * -2; // -1(右移) ~ +1(左移)
    const panRange = getStackPanRange();
    const targetPanX = mouseNorm * panRange;

    // ★ 垂直视差
    const rect = container.getBoundingClientRect();
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(wrapper, {
      x: targetPanX,
      y: py * 10,              // ★ 垂直视差偏移（px），10 为强度
      rotationX: -py * 2,      // ★ 垂直视差旋转（度），2 为强度
      duration: 0.8,           // ★ 平移跟随鼠标的动画时长
      ease: 'power3.out'
    });

    // 查找最近卡片做悬浮效果
    let nearest = null, nearestDist = Infinity;
    for (let idx = 0; idx < TOTAL_COUNT; idx++) {
      const r = items[idx].getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < nearestDist) { nearestDist = d; nearest = idx; }
    }

    if (nearestDist <= 160) {  // ★ 悬浮触发距离（px），鼠标距卡片中心多近触发
      if (stackHoveredIndex !== nearest) {
        if (stackHoveredIndex !== null) resetStackCard(stackHoveredIndex);
        stackHoveredIndex = nearest;
        liftStackCard(stackHoveredIndex);
      }
      // ★ 悬浮时实时更新卡片倾斜角度
      if (stackHoveredIndex !== null) {
        const el = items[stackHoveredIndex];
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          rotationY: ((e.clientX - r.left) / r.width - 0.5) * 12,   // ★ 水平倾斜系数（度）
          rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8,   // ★ 垂直倾斜系数（度）
          duration: 0.25,            // ★ 倾斜跟随鼠标动画时长
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    } else if (stackHoveredIndex !== null) {
      resetStackCard(stackHoveredIndex);
      stackHoveredIndex = null;
    }
  }

  /**
   * ★ 悬浮抬起卡片 — 向上抬起 + 向前凸出 + 放大
   */
  function liftStackCard(index) {
    const pos = getStackPositions()[index];
    items[index].style.zIndex = 800;  // 悬浮卡片提到最前层
    gsap.to(items[index], {
      y: pos.y - 50,          // ★ 向上抬起距离（px），50 为抬起量
      z: 80,                  // ★ 向前凸出距离（px）
      scale: 1.12,            // ★ 悬浮放大比例
      duration: 0.4,          // ★ 悬浮动画时长
      ease: 'back.out(1.4)',  // ★ 悬浮缓动，1.4 为回弹强度，越大弹得越猛
      overwrite: 'auto'
    });
  }

  /**
   * ★ 归位卡片 — 悬浮结束后回到原始 stack 位置
   */
  function resetStackCard(index) {
    const pos = getStackPositions()[index];
    items[index].style.zIndex = pos.zIndex;
    gsap.to(items[index], {
      x: pos.x, y: pos.y, z: pos.z,
      scale: pos.scale, rotationX: pos.rotationX,
      rotationY: pos.rotationY, rotation: pos.rotation,
      duration: 0.4,           // ★ 归位动画时长
      ease: 'power3.out',      // ★ 归位缓动
      overwrite: 'auto'
    });
  }

  // ========================================
  // 事件委托（过渡期间完全禁用鼠标交互）
  // ========================================
  container.addEventListener('mousemove', (e) => {
    if (isTransitioning) return; // 过渡动画期间禁止所有交互
    if (currentMode === 'orbit') handleOrbitMouseMove(e);
    else if (currentMode === 'stack') handleStackMouseMove(e);
  });

  container.addEventListener('mouseleave', () => {
    if (isTransitioning) return; // 过渡动画期间不处理
    if (currentMode === 'orbit') {
      gsap.to(wrapper, { x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 0.35, ease: 'power3.out' });
      if (hoveredIndex !== null) {
        gsap.killTweensOf(items[hoveredIndex]);
        gsap.to(items[hoveredIndex], { scale: 1, rotationX: 0, rotationY: 0, duration: 0, overwrite: true });
        hoveredIndex = null;
      }
    }
    if (currentMode === 'stack') {
      gsap.to(wrapper, { x: 0, y: 0, rotationX: 0, duration: 0.6, ease: 'power3.out' });
      if (stackHoveredIndex !== null) {
        resetStackCard(stackHoveredIndex);
        stackHoveredIndex = null;
      }
    }
  });

  // 点击
  container.addEventListener('click', (e) => {
    const count = currentMode === 'orbit' ? ORBIT_COUNT : TOTAL_COUNT;
    let nearest = null, nearestDist = Infinity;
    for (let idx = 0; idx < count; idx++) {
      const r = items[idx].getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < nearestDist) { nearestDist = d; nearest = idx; }
    }
    if (nearest !== null && nearestDist <= 200) {
      openModal(stackImages[nearest], `作品 ${(nearest % ORBIT_COUNT) + 1}`, '这是一个作品简介，演示放大展示。');
    }
  });

  // ========================================
  // Orbit 旋转
  // ========================================
  let rot = 0;
  let orbitTickerId = null;
  const orbitTickerFn = () => { rot += 0.0015; positionItems(rot); };

  function startOrbitRotation() {
    if (orbitTickerId !== null) return;
    orbitTickerId = 1;
    gsap.ticker.add(orbitTickerFn);
  }
  startOrbitRotation();

  // ========================================
  // 手动切换按钮
  // ========================================
  document.querySelectorAll('.pg-mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mode = btn.dataset.mode;
      if (mode === currentMode || isTransitioning) return;
      if (mode === 'stack') enterStackMode();
      else exitStackMode();
    });
  });

  // ========================================
  // ScrollTrigger 自动切换
  // 当 ring-container 滚动到视口中心时自动切换为 Stack
  // ========================================
  ScrollTrigger.create({
    trigger: container,
    start: 'center center',  // 容器中心到达视口中心
    end: 'center 30%',       // 容器中心到达视口 30% 位置
    onEnter: () => {
      if (currentMode === 'orbit' && !isTransitioning) enterStackMode();
    },
    onLeaveBack: () => {
      if (currentMode === 'stack' && !isTransitioning) exitStackMode();
    },
    // markers: true  // 调试时可开启
  });

  // ========================================
  // Modal
  // ========================================
  const modal = document.getElementById('pg-modal');
  const modalImg = document.getElementById('pg-modal-img');
  const modalTitle = document.getElementById('pg-modal-title');
  const modalText = document.getElementById('pg-modal-text');
  const modalClose = document.getElementById('pg-modal-close');

  function openModal(src, title, text) {
    modalImg.src = src;
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.setAttribute('aria-hidden', 'false');
    gsap.to(modal, { autoAlpha: 1, duration: 0.3 });
    gsap.fromTo('.pg-modal-content', { y: 40, scale: 0.98 }, { y: 0, scale: 1, duration: 0.45, ease: 'power3.out' });
  }

  function closeModal() {
    gsap.to(modal, { autoAlpha: 0, duration: 0.25, onComplete: () => modal.setAttribute('aria-hidden', 'true') });
  }
  modalClose.addEventListener('click', closeModal);
  modal.querySelector('.pg-modal-backdrop').addEventListener('click', closeModal);

  // Responsive
  window.addEventListener('resize', () => {
    RADIUS = Math.min(window.innerWidth, 1200) / 3;
    if (currentMode === 'stack' && !isTransitioning) {
      const positions = getStackPositions();
      items.forEach((el, i) => {
        const pos = positions[i];
        el.style.zIndex = pos.zIndex;
        gsap.to(el, { x: pos.x, y: pos.y, z: pos.z, rotationY: pos.rotationY, rotation: pos.rotation, duration: 0.3, ease: 'power3.out' });
      });
    }
  });
});
