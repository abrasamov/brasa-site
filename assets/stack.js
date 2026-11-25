/* Cards empilhados: entrada ao aparecer na tela e o encolhimento dos cards que ficam para trás. */
(() => {
  const stacks = document.querySelectorAll('.stack');
  if (!stacks.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  stacks.forEach(stack => {
    const cards = [...stack.querySelectorAll('.stack-card')];
    cards.forEach((c, i) => c.style.setProperty('--i', i));
    if (reduce || !('IntersectionObserver' in window)) { cards.forEach(c => c.classList.add('seen')); return; }

    document.documentElement.classList.add('stack-ready');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
    }), { threshold: .2 });
    cards.forEach(c => io.observe(c));

    // quanto o card seguinte já cobriu este (0 a 1); cada card atrás encolhe um pouco mais
    let ticking = false;
    const update = () => {
      ticking = false;
      const peek = parseFloat(getComputedStyle(stack).getPropertyValue('--peek')) || 54;
      const rects = cards.map(c => c.getBoundingClientRect());
      const cover = cards.map((c, i) => {
        if (i === 0) return 0;
        const prev = rects[i - 1], cur = rects[i];
        const far = prev.height + 24;                 // distância quando ainda não encostou
        return Math.min(1, Math.max(0, (far - (cur.top - prev.top)) / (far - peek)));
      });
      cards.forEach((c, i) => {
        let k = 0;
        for (let j = i + 1; j < cards.length; j++) k += cover[j];
        c.style.setProperty('--shrink', (1 - Math.min(k, 4) * .035).toFixed(4));
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true, capture: true });
    addEventListener('resize', onScroll);
    update();
  });
})();
