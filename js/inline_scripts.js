
      (function () {
        var _lastClick = 0;
        document.addEventListener('click', function () { _lastClick = Date.now(); }, true);
        var _realReload = location.reload.bind(location);
        location.reload = function () {
          if (Date.now() - _lastClick < 600) {
            _realReload();
          }
        };
      })();
    

/* ===== INLINE JAVASCRIPT ===== */


      (function () {
        var sel = '#lovable-badge,[id*="lovable"],[class*="lovable-badge"],[id*="gpteng"],a[href*="lovable.app"],a[href*="gpteng.co"]';
        function removeBadge() {
          document.querySelectorAll(sel).forEach(function (el) { el.remove(); });
        }
        var obs = new MutationObserver(removeBadge);
        document.addEventListener('DOMContentLoaded', function () {
          removeBadge();
          obs.observe(document.body, { childList: true, subtree: true });
        });
      })();
    

/* ===== INLINE JAVASCRIPT ===== */


    (function () {
      // Do not run on iOS — the window-size heuristic fires false positives there
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

      // 1. debugger timing — open DevTools pauses execution here noticeably
      setInterval(function () {
        var start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        var elapsed = performance.now() - start;
        if (elapsed > 100) {
          document.body.innerHTML = '<center style="font-family:sans-serif;margin-top:20vh;color:#e11d48"><h2>DevTools detected.</h2><p>Please close DevTools and refresh the page.</p></center>';
          setTimeout(function () { location.reload(); }, 3000);
        }
      }, 1000);

      // 2. window size — detached DevTools panel widens the outer window
      setInterval(function () {
        var threshold = 160;
        if (
          window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold
        ) {
          document.body.innerHTML = '<center style="font-family:sans-serif;margin-top:20vh;color:#e11d48"><h2>Simply close DevTools \uD83D\uDDFF</h2></center>';
        }
      }, 500);

      // 3. Eruda (mobile DevTools replacement) detection
      (function checkEruda() {
        if (typeof eruda !== 'undefined') {
          document.body.innerHTML = '<center style="font-family:sans-serif;margin-top:20vh;color:#e11d48"><h2>Inspect tools are not allowed here.</h2></center>';
        } else {
          setTimeout(checkEruda, 1000);
        }
      })();
    })();
    