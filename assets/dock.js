/* BRASA · abas do rodapé
   - a aba clicada fica verde (aria-current="page");
   - em páginas com seções, a aba acompanha a rolagem: a seção que
     ocupa o meio da tela é a que fica com a aba verde. */
(() => {
  const tabs = [...document.querySelectorAll('.dock-nav .dock-tab')];
  if (!tabs.length) return;

  const setActive = tab => tabs.forEach(t => {
    if (t === tab) t.setAttribute('aria-current', 'page');
    else t.removeAttribute('aria-current');
  });
  tabs.forEach(tab => tab.addEventListener('click', () => setActive(tab)));

  // liga cada aba à sua seção nesta página (links "#id")
  const pairs = tabs.map(tab => {
    const url = new URL(tab.getAttribute('href'), location.href);
    const samePage = url.pathname === location.pathname;
    const el = samePage && url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
    return el ? { tab, el } : null;
  }).filter(Boolean);
  if (!pairs.length || !('IntersectionObserver' in window)) return;

  const visible = new Map();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => visible.set(e.target, e.isIntersecting));
    // a última seção (na ordem da página) que cruza a linha do meio vence
    const current = pairs.filter(p => visible.get(p.el)).pop();
    if (current) setActive(current.tab);
  }, { rootMargin: '-45% 0px -50% 0px' });
  pairs.forEach(p => io.observe(p.el));
})();
