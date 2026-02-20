/* Villain Type Quiz App */
(function() {
  'use strict';

  // Archetype keys
  var ARCHETYPES = ['mastermind', 'charmer', 'rebel', 'tyrant', 'trickster', 'fallen'];
  var ARCHETYPE_ICONS = {
    mastermind: '\u265F', // chess pawn (brain)
    charmer: '\u2661',    // heart
    rebel: '\u2622',      // fire/radiation
    tyrant: '\u2655',     // crown/chess queen
    trickster: '\u2660',  // spade
    fallen: '\u2694'      // swords
  };

  // Questions with scoring per archetype
  // Each option awards points: [mastermind, charmer, rebel, tyrant, trickster, fallen]
  var QUESTIONS = [
    {
      key: 'q1',
      options: [
        { key: 'a', scores: [3, 0, 0, 1, 0, 1] }, // mastermind
        { key: 'b', scores: [0, 3, 0, 0, 1, 1] }, // charmer
        { key: 'c', scores: [0, 0, 3, 1, 1, 0] }, // rebel
        { key: 'd', scores: [1, 0, 0, 3, 0, 1] }  // tyrant
      ]
    },
    {
      key: 'q2',
      options: [
        { key: 'a', scores: [1, 0, 0, 0, 3, 1] }, // trickster
        { key: 'b', scores: [3, 1, 0, 0, 0, 1] }, // mastermind
        { key: 'c', scores: [0, 0, 1, 0, 1, 3] }, // fallen
        { key: 'd', scores: [0, 3, 1, 0, 1, 0] }  // charmer
      ]
    },
    {
      key: 'q3',
      options: [
        { key: 'a', scores: [0, 0, 1, 3, 0, 1] }, // tyrant
        { key: 'b', scores: [1, 3, 0, 0, 1, 0] }, // charmer
        { key: 'c', scores: [0, 0, 3, 0, 1, 1] }, // rebel
        { key: 'd', scores: [3, 0, 0, 1, 1, 0] }  // mastermind
      ]
    },
    {
      key: 'q4',
      options: [
        { key: 'a', scores: [0, 1, 0, 0, 3, 1] }, // trickster
        { key: 'b', scores: [0, 0, 1, 0, 1, 3] }, // fallen
        { key: 'c', scores: [1, 0, 0, 3, 0, 1] }, // tyrant
        { key: 'd', scores: [3, 1, 0, 0, 0, 1] }  // mastermind
      ]
    },
    {
      key: 'q5',
      options: [
        { key: 'a', scores: [0, 3, 1, 0, 0, 1] }, // charmer
        { key: 'b', scores: [0, 0, 3, 1, 1, 0] }, // rebel
        { key: 'c', scores: [1, 0, 0, 0, 3, 1] }, // trickster
        { key: 'd', scores: [0, 1, 0, 1, 0, 3] }  // fallen
      ]
    },
    {
      key: 'q6',
      options: [
        { key: 'a', scores: [3, 0, 1, 1, 0, 0] }, // mastermind
        { key: 'b', scores: [0, 0, 0, 3, 1, 1] }, // tyrant
        { key: 'c', scores: [0, 3, 0, 0, 1, 1] }, // charmer
        { key: 'd', scores: [0, 0, 3, 0, 1, 1] }  // rebel
      ]
    },
    {
      key: 'q7',
      options: [
        { key: 'a', scores: [0, 1, 0, 0, 3, 1] }, // trickster
        { key: 'b', scores: [0, 0, 1, 3, 0, 1] }, // tyrant
        { key: 'c', scores: [1, 0, 0, 0, 1, 3] }, // fallen
        { key: 'd', scores: [3, 1, 0, 0, 0, 1] }  // mastermind
      ]
    },
    {
      key: 'q8',
      options: [
        { key: 'a', scores: [0, 3, 0, 1, 1, 0] }, // charmer
        { key: 'b', scores: [1, 0, 3, 0, 0, 1] }, // rebel
        { key: 'c', scores: [3, 0, 0, 1, 1, 0] }, // mastermind
        { key: 'd', scores: [0, 0, 1, 0, 1, 3] }  // fallen
      ]
    },
    {
      key: 'q9',
      options: [
        { key: 'a', scores: [0, 0, 0, 3, 1, 1] }, // tyrant
        { key: 'b', scores: [0, 1, 0, 0, 3, 1] }, // trickster
        { key: 'c', scores: [0, 3, 1, 0, 0, 1] }, // charmer
        { key: 'd', scores: [1, 0, 3, 1, 0, 0] }  // rebel
      ]
    },
    {
      key: 'q10',
      options: [
        { key: 'a', scores: [0, 0, 1, 0, 0, 3] }, // fallen
        { key: 'b', scores: [3, 1, 0, 0, 1, 0] }, // mastermind
        { key: 'c', scores: [0, 0, 0, 3, 0, 1] }, // tyrant
        { key: 'd', scores: [0, 1, 0, 0, 3, 1] }  // trickster
      ]
    }
  ];

  // State
  var currentQuestion = 0;
  var scores = [0, 0, 0, 0, 0, 0]; // per archetype
  var resultArchetype = '';

  // DOM elements
  var introScreen = document.getElementById('intro');
  var quizScreen = document.getElementById('quiz');
  var resultScreen = document.getElementById('result');
  var startBtn = document.getElementById('startBtn');
  var progressFill = document.getElementById('progressFill');
  var progressText = document.getElementById('progressText');
  var questionText = document.getElementById('questionText');
  var optionsContainer = document.getElementById('optionsContainer');
  var resultType = document.getElementById('resultType');
  var resultTitle = document.getElementById('resultTitle');
  var resultDescription = document.getElementById('resultDescription');
  var resultTraits = document.getElementById('resultTraits');
  var villainQuote = document.getElementById('villainQuote');
  var archetypeIcon = document.getElementById('archetypeIcon');
  var powerMeter = document.getElementById('powerMeter');
  var scoreBreakdown = document.getElementById('scoreBreakdown');
  var shareBtn = document.getElementById('shareBtn');
  var retryBtn = document.getElementById('retryBtn');
  var shareModal = document.getElementById('shareModal');
  var shareClose = document.getElementById('shareClose');
  var shareTwitter = document.getElementById('shareTwitter');
  var shareFacebook = document.getElementById('shareFacebook');
  var shareCopy = document.getElementById('shareCopy');
  var themeToggle = document.getElementById('themeToggle');

  // Helper: get i18n text
  function t(key, fallback) {
    if (window.i18n && window.i18n.loaded) {
      return window.i18n.t(key, fallback);
    }
    return fallback || key;
  }

  // Theme toggle
  function initTheme() {
    var saved = localStorage.getItem('villain-type-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  themeToggle.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('villain-type-theme', next);
  });

  // Screen transitions
  function showScreen(screen) {
    [introScreen, quizScreen, resultScreen].forEach(function(s) {
      s.classList.remove('active');
    });
    screen.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Start quiz
  startBtn.addEventListener('click', function() {
    currentQuestion = 0;
    scores = [0, 0, 0, 0, 0, 0];
    showScreen(quizScreen);
    renderQuestion();

    // GA4 event
    if (typeof gtag === 'function') {
      gtag('event', 'quiz_start', { event_category: 'villain_type' });
    }
  });

  // Render question
  function renderQuestion() {
    var q = QUESTIONS[currentQuestion];
    var qKey = 'quiz.' + q.key;

    // Update progress
    var pct = ((currentQuestion) / QUESTIONS.length) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = (currentQuestion + 1) + ' / ' + QUESTIONS.length;

    // Question text
    questionText.textContent = t(qKey + '.question', 'Question ' + (currentQuestion + 1));

    // Options
    optionsContainer.innerHTML = '';
    q.options.forEach(function(opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = t(qKey + '.' + opt.key, 'Option ' + (idx + 1));
      btn.addEventListener('click', function() {
        selectOption(opt);
      });
      optionsContainer.appendChild(btn);
    });
  }

  // Select option
  function selectOption(opt) {
    // Add scores
    for (var i = 0; i < 6; i++) {
      scores[i] += opt.scores[i];
    }

    currentQuestion++;

    if (currentQuestion >= QUESTIONS.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  // Calculate result
  function getResult() {
    var maxScore = 0;
    var maxIdx = 0;
    for (var i = 0; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
        maxIdx = i;
      }
    }
    return ARCHETYPES[maxIdx];
  }

  // Show result
  function showResult() {
    resultArchetype = getResult();
    var archKey = 'results.' + resultArchetype;

    // Progress bar full
    progressFill.style.width = '100%';

    // Show result screen
    showScreen(resultScreen);

    // Archetype icon
    archetypeIcon.className = 'archetype-icon ' + resultArchetype;
    archetypeIcon.textContent = ARCHETYPE_ICONS[resultArchetype] || '\u2620';

    // Type label
    resultType.textContent = t('result.yourType', 'YOUR VILLAIN TYPE');

    // Title
    resultTitle.textContent = t(archKey + '.name', resultArchetype);

    // Description
    resultDescription.textContent = t(archKey + '.description', '');

    // Traits
    resultTraits.innerHTML = '';
    var traits = [];
    if (window.i18n && window.i18n.loaded) {
      var traitsData = window.i18n.t(archKey + '.traits');
      if (Array.isArray(traitsData)) traits = traitsData;
    }
    traits.forEach(function(trait) {
      var tag = document.createElement('span');
      tag.className = 'trait-tag';
      tag.textContent = trait;
      resultTraits.appendChild(tag);
    });

    // Quote
    villainQuote.textContent = '"' + t(archKey + '.quote', '') + '"';

    // Power meter animation
    var totalMax = QUESTIONS.length * 3; // max possible score per archetype
    var maxScore = Math.max.apply(null, scores);
    var powerPct = Math.min(Math.round((maxScore / totalMax) * 100) + 20, 100);
    setTimeout(function() {
      powerMeter.querySelector('.meter-fill').style.width = powerPct + '%';
    }, 300);

    // Score breakdown
    renderScoreBreakdown();

    // GA4 event
    if (typeof gtag === 'function') {
      gtag('event', 'quiz_complete', {
        event_category: 'villain_type',
        event_label: resultArchetype
      });
    }
  }

  // Render score breakdown
  function renderScoreBreakdown() {
    var totalMax = QUESTIONS.length * 3;
    var html = '<h4>' + t('result.breakdown', 'Score Breakdown') + '</h4>';

    ARCHETYPES.forEach(function(arch, idx) {
      var pct = Math.round((scores[idx] / totalMax) * 100);
      var name = t('results.' + arch + '.name', arch);
      html += '<div class="score-bar-container">' +
        '<span class="score-label">' + name + '</span>' +
        '<div class="score-bar-track"><div class="score-bar-value ' + arch + '" style="width: 0%"></div></div>' +
        '</div>';
    });

    scoreBreakdown.innerHTML = html;

    // Animate bars
    setTimeout(function() {
      var bars = scoreBreakdown.querySelectorAll('.score-bar-value');
      ARCHETYPES.forEach(function(arch, idx) {
        var pct = Math.round((scores[idx] / totalMax) * 100);
        if (bars[idx]) bars[idx].style.width = pct + '%';
      });
    }, 400);
  }

  // Retry
  retryBtn.addEventListener('click', function() {
    currentQuestion = 0;
    scores = [0, 0, 0, 0, 0, 0];
    showScreen(introScreen);
    powerMeter.querySelector('.meter-fill').style.width = '0%';
  });

  // Share
  shareBtn.addEventListener('click', function() {
    shareModal.classList.add('active');
  });

  shareClose.addEventListener('click', function() {
    shareModal.classList.remove('active');
  });

  shareModal.addEventListener('click', function(e) {
    if (e.target === shareModal) {
      shareModal.classList.remove('active');
    }
  });

  function getShareText() {
    var name = t('results.' + resultArchetype + '.name', resultArchetype);
    var shareText = t('share.text', 'My villain type is: {type}!');
    return shareText.replace('{type}', name);
  }

  function getShareUrl() {
    return 'https://dopabrain.com/villain-type/';
  }

  shareTwitter.addEventListener('click', function() {
    var text = encodeURIComponent(getShareText());
    var url = encodeURIComponent(getShareUrl());
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
    if (typeof gtag === 'function') {
      gtag('event', 'share', { method: 'twitter', content_type: 'quiz_result' });
    }
  });

  shareFacebook.addEventListener('click', function() {
    var url = encodeURIComponent(getShareUrl());
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
    if (typeof gtag === 'function') {
      gtag('event', 'share', { method: 'facebook', content_type: 'quiz_result' });
    }
  });

  shareCopy.addEventListener('click', function() {
    var text = getShareText() + '\n' + getShareUrl();
    navigator.clipboard.writeText(text).then(function() {
      showToast(t('share.copied', 'Copied!'));
    }).catch(function() {
      showToast(t('share.copyFail', 'Copy failed'));
    });
    if (typeof gtag === 'function') {
      gtag('event', 'share', { method: 'copy', content_type: 'quiz_result' });
    }
  });

  // Toast
  function showToast(msg) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
      toast.classList.add('show');
    });

    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() { toast.remove(); }, 300);
    }, 2000);
  }

  // Listen for language change to re-render current state
  window.addEventListener('langchange', function() {
    if (resultScreen.classList.contains('active') && resultArchetype) {
      // Re-render result
      setTimeout(function() {
        var archKey = 'results.' + resultArchetype;
        resultType.textContent = t('result.yourType', 'YOUR VILLAIN TYPE');
        resultTitle.textContent = t(archKey + '.name', resultArchetype);
        resultDescription.textContent = t(archKey + '.description', '');
        villainQuote.textContent = '"' + t(archKey + '.quote', '') + '"';

        resultTraits.innerHTML = '';
        var traits = [];
        var traitsData = window.i18n.t(archKey + '.traits');
        if (Array.isArray(traitsData)) traits = traitsData;
        traits.forEach(function(trait) {
          var tag = document.createElement('span');
          tag.className = 'trait-tag';
          tag.textContent = trait;
          resultTraits.appendChild(tag);
        });

        renderScoreBreakdown();
      }, 200);
    } else if (quizScreen.classList.contains('active')) {
      renderQuestion();
    }
  });

  // Init
  initTheme();

})();
