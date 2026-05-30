// Playground — 使用 3D环形卡片组件 (RingCarousel)
document.addEventListener('DOMContentLoaded', () => {
  try {
  // 安全措施：确保ScrollTrigger已注册（防止main.js报错导致未注册）
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Creative Work 图片路径（16张循环使用，覆盖40张卡片）
  const cwImages = [];
  for (let i = 1; i <= 16; i++) {
    cwImages.push(`./assets/creativework/cw-${String(i).padStart(2, '0')}.png`);
  }

  // 卡片标题与描述
  const titles = [
    'AI Guidline', 'E2 LinkedMall', 'LAMBOSS Brand', 'Abstract Canvas',
    'Hi! Typography', 'Color Field', 'Subtle & Pervasive', 'Earth 3D Icon',
    'BackRoom SCP', 'Monmonkey IP', 'Shopify Editions', 'Gradient Wave',
    'Vitasilix Capsule', 'Microsoft Hub', 'Flowbite AI', 'Cloud Grid',
  ];

  const descriptions = [
    'AI产品设计准则，规范了人工智能场景下的交互模式、透明度要求和信任构建策略。',
    '电商平台体验重塑，从信息架构到交互细节的全链路设计优化。',
    'LAMBOSS品牌视觉体系，从Logo延展到完整的应用场景与数字媒体模板。',
    '抽象画布实验，探索色彩、纹理与构图的即兴碰撞。',
    '字体排版实验，挑战传统排版规则，探索字母的视觉表现力。',
    '色彩场域研究，通过大面积色块与微妙渐变构建视觉空间感。',
    '细微而普遍的设计哲学，在极简中寻找丰富的感官体验。',
    '3D地球图标设计，融合低多边形风格与精致光影。',
    '密室SCP故事可视化，用氛围渲染与叙事设计构建沉浸体验。',
    'Monmonkey IP角色设计，从概念草图到完整角色设定与表情系统。',
    'Shopify版本发布视觉，年度活动的品牌与信息设计。',
    '渐变波浪实验，探索流体色彩与动态曲线的视觉韵律。',
    'Vitasilix胶囊胃镜产品，医疗科技的友好视觉与交互设计。',
    'Microsoft Office Hub界面设计，工具集合的信息架构与导航优化。',
    'Flowbite AI构建器，AI驱动的设计工具交互与界面设计。',
    '云网格可视化，数据网络拓扑的视觉表达与交互探索。',
  ];

  // 生成40张卡片数据：16张图片循环
  const cardData = [];
  for (let i = 0; i < 40; i++) {
    const idx = i % 16;
    cardData.push({
      title: titles[idx],
      image: cwImages[idx],
      desc: descriptions[idx],
    });
  }

  // 初始化 RingCarousel — 参数与 demo 完全一致
  const carousel = new RingCarousel('#ring-container', {
    data: cardData,
    radius: 445,
    speed: 0.40,
    tilt: 22,
    cardRotate: 90,
    autoSpeed: 0.08,
    cardWidth: 120,
    cardHeight: 160,
    accent: '#4a90d9',
  });

  // ========================================
  // Creative Work 角标打乱解码动画
  // 滚动进入视口时，角标文字从随机字符快速跳动还原为正常数字
  // ========================================
  const SCRAMBLE_POOL = '0123456789█▓▒░◇◆□■△▽⊕⊗';

  function getRandomDigit() {
    return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
  }

  const badges = document.querySelectorAll('.cw-badge[data-badge]');
  if (badges.length > 0) {
    // 为每个角标包裹单个字符 span
    badges.forEach(badge => {
      const original = badge.getAttribute('data-badge');
      badge.innerHTML = '';
      for (let i = 0; i < original.length; i++) {
        const span = document.createElement('span');
        span.className = 'cw-badge-char';
        span.textContent = original[i];
        span.dataset.original = original[i];
        badge.appendChild(span);
      }
    });

    // 每个角标独立触发：滚动到可视区域时才播放打乱解码动画
    badges.forEach(badge => {
      const chars = badge.querySelectorAll('.cw-badge-char');
      ScrollTrigger.create({
        trigger: badge,
        start: 'top 95%',
        onEnter: () => {
          chars.forEach((span, idx) => {
            const original = span.dataset.original;
            // 逐字错开启动
            setTimeout(() => {
              let elapsed = 0;
              const duration = 2000;
              const interval = 60;
              const timer = setInterval(() => {
                elapsed += interval;
                if (elapsed >= duration) {
                  clearInterval(timer);
                  span.textContent = original;
                } else {
                  span.textContent = getRandomDigit();
                }
              }, interval);
            }, idx * 25);
          });
        },
        once: true
      });
    });
  }
  } catch (e) {
    console.error('[playground.js] Error:', e);
  }
});
