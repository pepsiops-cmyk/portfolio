// Placeholder bot art: varied gradients + simple silhouettes, generated per card.
(function () {
  var PAL = {
    trend: [318, 345], fant: [120, 170], hor: [345, 372], sci: [195, 240], new: [32, 52]
  };
  function rng(seed) {
    var s = (seed * 2654435761) % 4294967296;
    return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  }
  function genreOf(el) {
    if (el.dataset.genre) return el.dataset.genre;
    var map = { 'g-trend': 'trend', 'g-fant': 'fant', 'g-hor': 'hor', 'g-sci': 'sci', 'g-new': 'new', 'same': 'trend' };
    for (var k in map) if (el.closest('.' + k)) return map[k];
    if (el.closest('.c')) return 'fant';
    return 'trend';
  }
  function prop(g, r, light) {
    var x = 15 + r() * 60;
    if (g === 'fant') {
      var mx = 30 + r() * 40;
      return '<path d="M0 98 L' + (mx - 25) + ' 72 L' + (mx - 8) + ' 88 L' + mx + ' 62 L' + (mx + 30) + ' 96 L100 82 V125 H0Z" fill="' + light + '" opacity=".35"/>' +
        '<path d="M' + x + ' 82 h5 v-10 h3 v5 h3 v-5 h3 v5 h3 v-5 h3 v10 h-1 v30 h-18 v-30z" fill="' + light + '" opacity=".45"/>';
    }
    if (g === 'hor') {
      var my = 18 + r() * 14;
      return '<circle cx="' + x + '" cy="' + my + '" r="' + (9 + r() * 5) + '" fill="#f3e6d6" opacity=".55"/>' +
        '<path d="M' + (100 - x) + ' 125 V70 M' + (100 - x) + ' 85 l-10 -9 M' + (100 - x) + ' 78 l9 -10 M' + (100 - x) + ' 92 l8 -5" stroke="' + light + '" stroke-width="2.4" opacity=".4" fill="none"/>';
    }
    if (g === 'sci') {
      var py = 22 + r() * 18, pr = 10 + r() * 8, s = '';
      for (var i = 0; i < 9; i++) s += '<circle cx="' + (r() * 100).toFixed(1) + '" cy="' + (r() * 70).toFixed(1) + '" r="' + (0.5 + r() * 0.8).toFixed(2) + '" fill="#fff" opacity="' + (0.4 + r() * 0.5).toFixed(2) + '"/>';
      return s + '<circle cx="' + x + '" cy="' + py + '" r="' + pr + '" fill="' + light + '" opacity=".55"/>' +
        '<ellipse cx="' + x + '" cy="' + py + '" rx="' + (pr * 1.7) + '" ry="' + (pr * 0.4) + '" stroke="#fff" stroke-width="1" opacity=".45" fill="none" transform="rotate(-15 ' + x + ' ' + py + ')"/>';
    }
    // trend / new: soft bokeh lights
    var b = '';
    for (var j = 0; j < 6; j++) b += '<circle cx="' + (r() * 100).toFixed(1) + '" cy="' + (10 + r() * 60).toFixed(1) + '" r="' + (3 + r() * 7).toFixed(1) + '" fill="' + light + '" opacity="' + (0.15 + r() * 0.3).toFixed(2) + '"/>';
    return b;
  }
  function paint(el, i) {
    var g = genreOf(el), p = PAL[g] || PAL.trend;
    var r = rng((el.dataset.seed ? +el.dataset.seed : i * 7 + 3) + g.length * 101);
    var h1 = p[0] + r() * (p[1] - p[0]), h2 = h1 + (r() * 40 - 20);
    var light = 'hsl(' + h1.toFixed(0) + ',70%,72%)';
    var dark = 'hsl(' + h2.toFixed(0) + ',45%,7%)';
    el.style.background =
      'radial-gradient(circle at ' + (15 + r() * 70).toFixed(0) + '% ' + (10 + r() * 40).toFixed(0) + '%, hsla(' + h1.toFixed(0) + ',58%,55%,.75), transparent 55%),' +
      'radial-gradient(circle at ' + (r() * 100).toFixed(0) + '% ' + (50 + r() * 50).toFixed(0) + '%, hsla(' + h2.toFixed(0) + ',50%,38%,.65), transparent 60%),' +
      'linear-gradient(' + (140 + r() * 60).toFixed(0) + 'deg, hsl(' + h1.toFixed(0) + ',35%,22%), hsl(' + h2.toFixed(0) + ',40%,9%))';
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.style.overflow = 'hidden';
    var dx = (r() * 30 - 15).toFixed(1), sc = (0.85 + r() * 0.3).toFixed(2);
    var bust = '<g transform="translate(' + dx + ' 0) translate(50 125) scale(' + sc + ') translate(-50 -125)">' +
      '<circle cx="50" cy="76" r="13" fill="' + dark + '"/>' +
      '<path d="M18 125 C20 101 34 92 50 92 C66 92 80 101 82 125Z" fill="' + dark + '"/></g>';
    var svg = '<svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;display:block">' +
      prop(g, r, light) + bust + '</svg>';
    el.insertAdjacentHTML('afterbegin', svg);
  }
  document.querySelectorAll('.art, .art-ph').forEach(paint);
})();
