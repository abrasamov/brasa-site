/* ==========================================================
   BRASA · botão de compartilhar (canto superior direito)
   Abre um quadro com os links das redes da BRASA e opções
   para compartilhar a página. Usado em todas as páginas.

   >>> Preencha aqui os endereços das redes da BRASA <<<
   ========================================================== */
const BRASA_REDES = {
  instagram: 'https://www.instagram.com/abrasamov/',
  x:         'https://x.com/abrasamov',
  substack:  'https://abrasamov.substack.com/',
};

(() => {
  const ICON = {
    share: '<path fill="currentColor" d="M176 160a39.9 39.9 0 0 0-28.62 12.09l-46.1-29.63a39.8 39.8 0 0 0 0-28.92l46.1-29.63a40 40 0 1 0-8.66-13.45l-46.1 29.63a40 40 0 1 0 0 55.82l46.1 29.63A40 40 0 1 0 176 160m0-128a24 24 0 1 1-24 24a24 24 0 0 1 24-24M64 152a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112 72a24 24 0 1 1 24-24a24 24 0 0 1-24 24"/>',
    instagram: '<path fill="currentColor" d="M128 80a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m48-136H80a56.06 56.06 0 0 0-56 56v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56m40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40ZM192 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/>',
    x: '<path fill="currentColor" d="m214.75 211.71l-62.6-98.38l61.77-67.950a8 8 0 0 0-11.84-10.76l-58.84 64.72l-40.49-63.63A8 8 0 0 0 96 32H48a8 8 0 0 0-6.75 12.3l62.6 98.37l-61.77 68a8 8 0 1 0 11.84 10.76l58.84-64.72l40.49 63.63A8 8 0 0 0 160 224h48a8 8 0 0 0 6.75-12.29M164.39 208L62.57 48h29l101.86 160Z"/>'.replace('67.950a', '67.95a'),
    substack: '<path fill="currentColor" d="M48 40h160v24H48zm0 40h160v24H48zm0 40h160v104l-80-46l-80 46z"/>',
    link: '<path fill="currentColor" d="M240 88.23a54.43 54.43 0 0 1-16 37L189.25 160a54.27 54.27 0 0 1-38.63 16h-.05A54.63 54.63 0 0 1 96 119.84a8 8 0 0 1 16 .45A38.62 38.62 0 0 0 150.58 160a38.4 38.4 0 0 0 27.31-11.31l34.75-34.75a38.63 38.63 0 0 0-54.63-54.63l-11 11A8 8 0 0 1 135.7 59l11-11a54.65 54.65 0 0 1 77.3 0a54.86 54.86 0 0 1 16 40.23m-131 97.43l-11 11A38.4 38.4 0 0 1 70.6 208a38.63 38.63 0 0 1-27.29-65.94L78 107.31a38.63 38.63 0 0 1 66 28.4a8 8 0 0 0 16 .45A54.86 54.86 0 0 0 144 96a54.65 54.65 0 0 0-77.27 0L32 130.75A54.62 54.62 0 0 0 70.56 224a54.28 54.28 0 0 0 38.64-16l11-11a8 8 0 0 0-11.2-11.34"/>',
    close: '<path fill="currentColor" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/>',
  };
  const svg = (k, size = 20) => `<svg viewBox="0 0 256 256" width="${size}" height="${size}" aria-hidden="true">${ICON[k]}</svg>`;
  const net = (key, name) => {
    const url = BRASA_REDES[key];
    return url
      ? `<a class="share-net" href="${url}" target="_blank" rel="noopener">${svg(key, 22)}<span>${name}</span></a>`
      : `<span class="share-net is-soon" aria-disabled="true">${svg(key, 22)}<span>${name}<small>em breve</small></span></span>`;
  };

  const root = document.createElement('div');
  root.className = 'share-root';
  root.innerHTML = `
    <button class="share-btn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="share-panel" aria-label="Compartilhar e redes da BRASA">${svg('share')}</button>
    <div class="share-panel" id="share-panel" role="dialog" aria-modal="false" aria-labelledby="share-title" hidden>
      <div class="share-head">
        <p id="share-title">Siga a BRASA</p>
        <button class="share-close" type="button" aria-label="Fechar">${svg('close', 18)}</button>
      </div>
      <div class="share-nets">
        ${net('instagram', 'Instagram')}
        ${net('x', 'X')}
        ${net('substack', 'Substack')}
      </div>
      <p class="share-sub">Compartilhar esta página</p>
      <div class="share-actions">
        <button class="share-act" type="button" data-act="copy">${svg('link', 18)}<span>Copiar link</span></button>
        <button class="share-act" type="button" data-act="native" hidden>${svg('share', 18)}<span>Enviar…</span></button>
      </div>
    </div>`;
  document.body.appendChild(root);

  const btn = root.querySelector('.share-btn'), panel = root.querySelector('.share-panel');
  const native = root.querySelector('[data-act=native]');
  if (navigator.share) native.hidden = false;

  const open = () => { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); requestAnimationFrame(() => panel.classList.add('is-open')); (panel.querySelector('a.share-net') || panel.querySelector('.share-act')).focus(); };
  const close = (focusBtn = true) => { panel.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); setTimeout(() => { panel.hidden = true; }, 180); if (focusBtn) btn.focus(); };
  btn.addEventListener('click', () => (panel.hidden ? open() : close()));
  root.querySelector('.share-close').addEventListener('click', () => close());
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });
  document.addEventListener('click', e => { if (!panel.hidden && !root.contains(e.target)) close(false); });

  root.querySelector('[data-act=copy]').addEventListener('click', async e => {
    const label = e.currentTarget.querySelector('span');
    try { await navigator.clipboard.writeText(location.href.split('#')[0]); label.textContent = 'Link copiado!'; }
    catch (err) { label.textContent = 'Não foi possível copiar'; }
    setTimeout(() => { label.textContent = 'Copiar link'; }, 2000);
  });
  native.addEventListener('click', async () => {
    try { await navigator.share({ title: document.title, url: location.href.split('#')[0] }); } catch (e) {}
  });
})();
