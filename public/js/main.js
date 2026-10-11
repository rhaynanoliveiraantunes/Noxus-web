/**
 * ==========================================================================
 * NOXUS PORTAL - SCRIPT PRINCIPAL
 * Interatividade e animações de entrada com foco em acessibilidade e resiliência
 * ==========================================================================
 */

// Adiciona a classe 'js' ao <html> assim que o script é executado.
// Isso garante que, se o JS falhar ou for desativado, o CSS mantenha todos os
// elementos com .reveal-on-scroll 100% visíveis por padrão.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Se o usuário prefere movimento reduzido ou o navegador não suporta IntersectionObserver,
    // revela imediatamente sem transições.
    revealElements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
