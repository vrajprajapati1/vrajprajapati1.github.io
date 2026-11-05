// Click-to-expand lightbox for project photos. Videos are left alone (they already have controls).
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
  closeBtn.textContent = '×';
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
      if (e.key === 'Escape') closeLightbox();
    });

    var selector = '.hero-fig img, .shot-row img, .gallery img, .compare img';
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('click', function () {
        openLightbox(el.currentSrc || el.src, el.alt);
      });
    });
  });
})();
