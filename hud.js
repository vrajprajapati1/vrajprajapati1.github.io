// Shared Phase 2 HUD telemetry bar, signature stamp, and scroll-driven mechanics.
(function () {
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Global Scroll-Depth Bar & Corner Signature Stamp
    var scrollBar = document.createElement('div');
    scrollBar.className = 'hud-scroll-bar';
    document.body.appendChild(scrollBar);

    var stamp = document.createElement('div');
    stamp.className = 'hud-corner-stamp';
    stamp.setAttribute('aria-hidden', 'true');
    stamp.innerHTML = 'SYS // <span>VRAJ R. PRAJAPATI</span>';
    document.body.appendChild(stamp);

    // 2. Page-specific interactive elements
    var trajSteps = document.querySelectorAll('.traj-step');
    var gearA = document.querySelector('.gear-a');
    var gearB = document.querySelector('.gear-b');
    var gearReadout = document.getElementById('gear-deg');
    var caliperTicks = document.querySelector('.caliper-ticks');
    var caliperReadout = document.getElementById('caliper-val');
    var moireLayer2 = document.querySelector('.moire-layer.layer-2');
    var horizonPitch = document.getElementById('horizon-pitch');

    // Capstone CAD X-Ray / Physical Photo Toggle
    var xrayBtn = document.getElementById('xray-toggle');
    if (xrayBtn) {
      var showingCad = false;
      xrayBtn.addEventListener('click', function () {
        showingCad = !showingCad;
        var physEl = document.getElementById('gearbox-phys-card');
        var cadEl = document.getElementById('gearbox-cad-card');
        if (physEl && cadEl) {
          physEl.hidden = showingCad;
          cadEl.hidden = !showingCad;
        }
        xrayBtn.textContent = showingCad ? 'Switch to Physical Build' : 'Switch to CAD X-Ray';
      });
    }

    // Skills Discipline Filter
    var filterBtns = document.querySelectorAll('.filter-btn');
    var skillCards = document.querySelectorAll('#skills-grid > div');
    if (filterBtns.length && skillCards.length) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var cat = btn.getAttribute('data-filter');
          filterBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          skillCards.forEach(function (card) {
            var match = cat === 'all' || card.getAttribute('data-category') === cat;
            card.classList.toggle('is-hidden', !match);
          });
        });
      });
    }

    function updateOnScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var progress = Math.min(1, Math.max(0, scrollTop / docHeight));

      scrollBar.style.width = (progress * 100).toFixed(1) + '%';

      if (trajSteps.length) {
        var activeIdx = Math.min(trajSteps.length - 1, Math.floor(progress * trajSteps.length));
        trajSteps.forEach(function (step, idx) {
          step.classList.toggle('active', idx <= activeIdx);
        });
      }

      if (!reducedMotion) {
        if (gearA && gearB) {
          var deg = (scrollTop * 0.25) % 360;
          gearA.style.transform = 'rotate(' + deg.toFixed(1) + 'deg)';
          gearB.style.transform = 'rotate(' + (-deg).toFixed(1) + 'deg)';
          if (gearReadout) gearReadout.textContent = Math.round(deg) + '\u00b0';
        }
        if (caliperTicks) {
          var shift = (scrollTop * 0.15) % 48;
          caliperTicks.style.transform = 'translateX(' + (-shift).toFixed(1) + 'px)';
          if (caliperReadout) {
            var thou = ((scrollTop * 0.0005) % 0.25).toFixed(4);
            caliperReadout.textContent = '+' + thou + '"';
          }
        }
        if (moireLayer2) {
          var phaseShift = (scrollTop * 0.08) % 24;
          moireLayer2.style.transform = 'translateX(' + phaseShift.toFixed(1) + 'px)';
        }
        if (horizonPitch) {
          var pitchOffset = Math.sin(scrollTop * 0.006) * 4;
          horizonPitch.setAttribute('transform', 'translate(0,' + pitchOffset.toFixed(1) + ')');
        }
      }
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });
    updateOnScroll();
  });
})();