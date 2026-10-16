(() => {
  "use strict";
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2800);
  }
  async function shareCard() {
    const data = {
      title: 'Rando & Pesca Shop',
      text: 'Carte électronique de Rando & Pesca Shop : randonnée, pêche et aventure à Sousse, Jawhara.',
      url: window.location.href.split('#')[0]
    };
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(data.url);
      } else {
        const input = document.createElement('textarea');
        input.value = data.url;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const ok = document.execCommand('copy');
        input.remove();
        if (!ok) throw new Error('Copy unavailable');
      }
      showToast('Lien de la carte copié !');
    } catch {
      showToast('Partagez cette page depuis votre navigateur.');
    }
  }
  ['shareTop', 'shareBottom'].forEach(id => document.getElementById(id)?.addEventListener('click', shareCard));
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
