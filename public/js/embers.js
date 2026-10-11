/**
 * ==========================================================================
 * NOXUS EMBERS CANVAS
 * Partículas e brasas ascendentes de baixo impacto para performance
 * ==========================================================================
 */
(function () {
  'use strict';

  // Respeito à preferência de redução de movimento do usuário
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    return;
  }

  const canvas = document.getElementById('embers-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Garante os atributos de acessibilidade
  canvas.setAttribute('aria-hidden', 'true');

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let isTabActive = true;

  // Paleta de cores das brasas (carmesim brilhante, fogo e bronze incandescente)
  const emberColors = [
    'rgba(196, 32, 46, ',   // Carmesim brilhante
    'rgba(235, 75, 45, ',   // Fogo alaranjado
    'rgba(176, 141, 87, ',  // Bronze incandescente
    'rgba(255, 90, 95, '    // Brasa viva
  ];

  let particles = [];

  function getParticleCount() {
    // Reduz partículas em telas menores (mobile first / performance)
    return window.innerWidth < 768 ? 16 : 45;
  }

  function resizeCanvas() {
    // Limita o devicePixelRatio a 2 para evitar peso excessivo em telas Retina/4K
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 20;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.7 + 0.35;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.colorBase = emberColors[Math.floor(Math.random() * emberColors.length)];
      this.maxAlpha = Math.random() * 0.65 + 0.25;
      this.alpha = 0;
      this.fadingIn = true;
      this.fadeSpeed = Math.random() * 0.01 + 0.005;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.y -= this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.3;

      if (this.fadingIn) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= this.maxAlpha) {
          this.alpha = this.maxAlpha;
          this.fadingIn = false;
        }
      } else {
        // Desvanece ao subir
        this.alpha -= 0.0025;
      }

      // Reinicia ao sair do topo ou perder transparência
      if (this.y < -10 || this.alpha <= 0) {
        this.reset(false);
      }
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + Math.max(0, this.alpha) + ')';
      ctx.shadowColor = 'rgba(196, 32, 46, 0.6)';
      ctx.shadowBlur = this.size * 3;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = getParticleCount();
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Ember());
    }
  }

  function animate() {
    if (!isTabActive) return;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Monitora visibilidade da aba para pausar e economizar recursos
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isTabActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      isTabActive = true;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
  });

  // Reajuste responsivo com debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 200);
  });

  // Inicialização
  resizeCanvas();
  initParticles();
  animationFrameId = requestAnimationFrame(animate);
})();
