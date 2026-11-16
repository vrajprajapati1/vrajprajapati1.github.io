// Click-to-expand lightbox and case-insensitive image extension fallback.
function tryNextExt(img) {
  var exts = ['.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
  var step = parseInt(img.dataset.step || '0', 10);
  if (step < exts.length) {
    img.dataset.step = step + 1;
    img.src = img.src.replace(/\.[^.]+$/, exts[step]);
  }
}

(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.hidden = true;

  var img = document.createElement('img');
  overlay.appendChild(img);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close image');
  closeBtn.textContent = '\u00d7';
  closeBtn.hidden = true;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(overlay);
    document.body.appendChild(closeBtn);

    function openLightbox(src, alt) {
      img.src = src;
      img.alt = alt || '';
      overlay.hidden = false;
      closeBtn.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      overlay.hidden = true;
      closeBtn.hidden = true;
      img.src = '';
      document.body.style.overflow = '';
    }

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeLightbox();
    });

    var selector = '.hero-fig img, .shot-row img, .gallery img, .compare img';
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('click', function () {
        openLightbox(el.currentSrc || el.src, el.alt);
      });
    });
  });
})();