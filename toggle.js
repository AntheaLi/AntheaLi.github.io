document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.toggle-tab');

  // Card visibility + order per mode
  var modeConfigs = {
    multimodal: {
      'card-mmsim':      { order: 1, visible: true },
      'card-mmz':        { order: 2, visible: true },
      'card-awm':        { order: 3, visible: false },
      'card-eses':       { order: 4, visible: false },
      'card-projective': { order: 5, visible: false },
      'card-hardware':   { order: 6, visible: false }
    },
    rl: {
      'card-awm':        { order: 1, visible: true },
      'card-eses':       { order: 2, visible: true },
      'card-mmsim':      { order: 3, visible: false },
      'card-mmz':        { order: 4, visible: false },
      'card-projective': { order: 5, visible: false },
      'card-hardware':   { order: 6, visible: false }
    },
    architecture: {
      'card-projective': { order: 1, visible: true },
      'card-hardware':   { order: 2, visible: true },
      'card-mmsim':      { order: 3, visible: false },
      'card-mmz':        { order: 4, visible: false },
      'card-awm':        { order: 5, visible: false },
      'card-eses':       { order: 6, visible: false }
    }
  };

  function normalizeMode(mode) {
    if (mode === 'genai') return 'multimodal';
    if (mode === 'arch') return 'architecture';
    return modeConfigs[mode] ? mode : 'multimodal';
  }

  function setMode(mode, animate) {
    tabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    var wrapper = document.getElementById('toggle-content');
    if (animate) {
      wrapper.style.opacity = '0';
      setTimeout(function () {
        applyMode(mode);
        wrapper.style.opacity = '1';
      }, 200);
    } else {
      applyMode(mode);
    }

    history.replaceState(null, '', '#' + mode);
  }

  function applyMode(mode) {
    // Reorder + show/hide cards
    var config = modeConfigs[normalizeMode(mode)];
    Object.keys(config).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.order   = config[id].order;
      el.style.display = config[id].visible ? '' : 'none';
    });
  }

  // Tab click handlers
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (!tab.classList.contains('active')) {
        setMode(tab.dataset.mode, true);
      }
    });
  });

  // ── Publication tag filter ──────────────────────────────
  var filterBtns = document.querySelectorAll('.tag-filter');
  var pubRows = document.querySelectorAll('#publication tbody tr[data-tags]');

  function filterPubs(tag) {
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.filter === tag);
    });
    pubRows.forEach(function (row) {
      if (tag === 'all') {
        row.classList.remove('tag-hidden');
      } else {
        var tags = row.getAttribute('data-tags').split(' ');
        row.classList.toggle('tag-hidden', tags.indexOf(tag) === -1);
      }
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterPubs(btn.dataset.filter);
    });
  });

  // Initialise from URL hash
  var hash = window.location.hash.replace('#', '');
  setMode(normalizeMode(hash), false);
});
