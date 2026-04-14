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
  var currentResult = null;
  var resultInlineAdLoaded = false;

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
  var relatedGrid = document.getElementById('related-grid');
  var primaryRelatedEmoji = document.getElementById('primary-related-emoji');
  var primaryRelatedTitle = document.getElementById('primary-related-title');
  var primaryRelatedDesc = document.getElementById('primary-related-desc');
  var primaryRelatedCta = document.getElementById('primary-related-cta');
  var primaryRelatedCtaText = document.getElementById('primary-related-cta-text');
  var relatedJumpBtn = document.getElementById('related-jump-btn');
  var resultInlineAd = document.getElementById('result-inline-ad');

  var RECOMMENDATION_MAP = {
    mastermind: ['eq-test', 'blood-type', 'attachment-style', 'mbti-love'],
    charmer: ['attachment-style', 'mbti-love', 'eq-test', 'blood-type'],
    rebel: ['eq-test', 'attachment-style', 'blood-type', 'mbti-love'],
    tyrant: ['blood-type', 'eq-test', 'attachment-style', 'mbti-love'],
    trickster: ['mbti-love', 'attachment-style', 'eq-test', 'blood-type'],
    fallen: ['attachment-style', 'eq-test', 'blood-type', 'mbti-love']
  };

  var NEXT_STEP_COPY = {
    mastermind: {
      title: 'Match Strategy With EQ Test',
      desc: 'You already read the room like a chessboard. See whether your emotional timing is as sharp as your plans.',
      cta: 'Take EQ Test'
    },
    charmer: {
      title: 'See Your Bond Pattern With Attachment Style',
      desc: 'Your power is connection. Find out whether charm turns into closeness or distance.',
      cta: 'Open Attachment Style'
    },
    rebel: {
      title: 'Channel The Fire Into EQ Test',
      desc: 'You move on instinct and conviction. See how emotional control shapes the impact you make.',
      cta: 'Take EQ Test'
    },
    tyrant: {
      title: 'Check What Drives Control With Blood Type',
      desc: 'Your intensity lands fast. Compare that edge with a lighter personality lens and see what stands out.',
      cta: 'Take Blood Type Test'
    },
    trickster: {
      title: 'Turn Chaos Into Chemistry With MBTI Love',
      desc: 'You win by surprise and timing. See which romantic pattern matches your playful side.',
      cta: 'Open MBTI Love'
    },
    fallen: {
      title: 'Decode Your Push-Pull Pattern',
      desc: 'Your result mixes power and old wounds. Attachment Style can show what sits underneath the armor.',
      cta: 'Take Attachment Style'
    }
  };

  // Helper: get i18n text
  function t(key, fallback) {
    if (window.i18n && window.i18n.loaded) {
      return window.i18n.t(key, fallback);
    }
    return fallback || key;
  }

  function trackEvent(name, params) {
    if (typeof gtag !== 'function') {
      return;
    }
    gtag('event', name, params || {});
  }

  function getCurrentLang() {
    if (window.i18n && window.i18n.lang) {
      return window.i18n.lang;
    }
    return document.documentElement.lang || 'ko';
  }

  function getShareUrl() {
    var url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('lang', getCurrentLang());
    return url.toString();
  }

  function prioritizeRelatedCards(archetype) {
    if (!relatedGrid) {
      return;
    }

    var cards = Array.prototype.slice.call(relatedGrid.querySelectorAll('.related-card'));
    var order = RECOMMENDATION_MAP[archetype] || RECOMMENDATION_MAP.mastermind;
    var rankMap = {};

    order.forEach(function(key, index) {
      rankMap[key] = index;
    });

    cards.sort(function(a, b) {
      var aKey = a.getAttribute('data-related-key') || '';
      var bKey = b.getAttribute('data-related-key') || '';
      var aRank = Object.prototype.hasOwnProperty.call(rankMap, aKey) ? rankMap[aKey] : 999;
      var bRank = Object.prototype.hasOwnProperty.call(rankMap, bKey) ? rankMap[bKey] : 999;
      return aRank - bRank;
    });

    cards.forEach(function(card, index) {
      card.classList.toggle('is-featured', index < 2);
      card.setAttribute('data-rank', String(index + 1));
      relatedGrid.appendChild(card);
    });
  }

  function updatePrimaryRecommendation(archetype) {
    if (!relatedGrid || !primaryRelatedTitle || !primaryRelatedDesc || !primaryRelatedCta || !primaryRelatedCtaText || !primaryRelatedEmoji) {
      return;
    }

    var firstCard = relatedGrid.querySelector('.related-card');
    if (!firstCard) {
      return;
    }

    var copy = NEXT_STEP_COPY[archetype] || NEXT_STEP_COPY.mastermind;
    var cardColor = firstCard.style.getPropertyValue('--card-color') || '';
    var nextStepCard = document.getElementById('next-step-card');
    var emojiEl = firstCard.querySelector('.related-emoji');

    primaryRelatedTitle.textContent = copy.title;
    primaryRelatedDesc.textContent = copy.desc;
    primaryRelatedCtaText.textContent = copy.cta;
    primaryRelatedEmoji.textContent = emojiEl ? emojiEl.textContent.trim() : '->';
    primaryRelatedCta.setAttribute('href', firstCard.getAttribute('href') || '#');
    primaryRelatedCta.setAttribute('data-related-key', firstCard.getAttribute('data-related-key') || '');
    primaryRelatedCta.setAttribute('data-related-rank', firstCard.getAttribute('data-rank') || '1');

    if (cardColor) {
      if (nextStepCard) {
        nextStepCard.style.setProperty('--cta-color', cardColor);
      }
      primaryRelatedCta.style.setProperty('--cta-color', cardColor);
    }
  }

  function ensureResultAdLoaded() {
    if (resultInlineAdLoaded || !resultInlineAd) {
      return;
    }

    var adNode = resultInlineAd.querySelector('.adsbygoogle');
    if (!adNode) {
      return;
    }

    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
      resultInlineAdLoaded = true;
    } catch (error) {
      // Ad blockers or delayed AdSense init are non-fatal here.
    }
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
    currentResult = null;
    showScreen(quizScreen);
    renderQuestion();
    trackEvent('quiz_start', {
      event_category: 'villain_type',
      event_label: getCurrentLang(),
      value: QUESTIONS.length
    });
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
        selectOption(opt, idx);
      });
      optionsContainer.appendChild(btn);
    });
  }

  // Select option
  function selectOption(opt, optionIndex) {
    trackEvent('villain_option_select', {
      event_category: 'villain_type',
      event_label: 'q' + (currentQuestion + 1),
      question_number: currentQuestion + 1,
      choice_key: opt.key,
      choice_index: optionIndex + 1,
      value: optionIndex + 1
    });

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
    var percentile = currentResult && currentResult.percentile
      ? currentResult.percentile
      : Math.floor(Math.random() * 15) + 3;

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
    currentResult = {
      archetype: resultArchetype,
      powerPct: powerPct,
      percentile: percentile
    };
    prioritizeRelatedCards(resultArchetype);
    updatePrimaryRecommendation(resultArchetype);
    setTimeout(function() {
      powerMeter.querySelector('.meter-fill').style.width = powerPct + '%';
    }, 300);

    // Percentile stat
    var percentileEl = document.getElementById('percentile-stat');
    if (percentileEl) {
      var pText = t('result.percentileStat', 'Only <strong>{percent}%</strong> of participants share your villain type');
      percentileEl.innerHTML = pText.replace('{percent}', percentile);
    }

    // Score breakdown
    renderScoreBreakdown();

    trackEvent('result_view', {
      event_category: 'villain_type',
      event_label: resultArchetype,
      value: powerPct
    });
    trackEvent('quiz_complete', {
      event_category: 'villain_type',
      event_label: resultArchetype,
      value: powerPct
    });
    ensureResultAdLoaded();
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
    trackEvent('villain_retry_click', {
      event_category: 'villain_type',
      event_label: currentResult ? currentResult.archetype : 'unknown',
      value: currentQuestion
    });
    currentQuestion = 0;
    scores = [0, 0, 0, 0, 0, 0];
    currentResult = null;
    showScreen(introScreen);
    powerMeter.querySelector('.meter-fill').style.width = '0%';
  });

  // Share
  shareBtn.addEventListener('click', function() {
    shareModal.classList.add('active');
    trackEvent('villain_share_open', {
      event_category: 'villain_type',
      event_label: currentResult ? currentResult.archetype : 'unknown'
    });
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

  shareTwitter.addEventListener('click', function() {
    var text = encodeURIComponent(getShareText());
    var url = encodeURIComponent(getShareUrl());
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
    trackEvent('villain_share_click', {
      event_category: 'villain_type',
      event_label: 'twitter',
      result_archetype: currentResult ? currentResult.archetype : resultArchetype
    });
  });

  shareFacebook.addEventListener('click', function() {
    var url = encodeURIComponent(getShareUrl());
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
    trackEvent('villain_share_click', {
      event_category: 'villain_type',
      event_label: 'facebook',
      result_archetype: currentResult ? currentResult.archetype : resultArchetype
    });
  });

  shareCopy.addEventListener('click', function() {
    var text = getShareText() + '\n' + getShareUrl();
    navigator.clipboard.writeText(text).then(function() {
      showToast(t('share.copied', 'Copied!'));
    }).catch(function() {
      showToast(t('share.copyFail', 'Copy failed'));
    });
    trackEvent('villain_share_click', {
      event_category: 'villain_type',
      event_label: 'copy',
      result_archetype: currentResult ? currentResult.archetype : resultArchetype
    });
  });

  if (primaryRelatedCta) {
    primaryRelatedCta.addEventListener('click', function() {
      trackEvent('villain_primary_cta_click', {
        event_category: 'villain_type',
        event_label: this.getAttribute('data-related-key') || this.getAttribute('href'),
        result_archetype: currentResult ? currentResult.archetype : resultArchetype,
        related_rank: this.getAttribute('data-related-rank') || '1'
      });
    });
  }

  if (relatedJumpBtn) {
    relatedJumpBtn.addEventListener('click', function() {
      var relatedSection = document.querySelector('.related-tests');
      if (relatedSection) {
        relatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      trackEvent('villain_related_jump_click', {
        event_category: 'villain_type',
        event_label: currentResult ? currentResult.archetype : resultArchetype
      });
    });
  }

  if (relatedGrid) {
    relatedGrid.addEventListener('click', function(event) {
      var card = event.target.closest('.related-card');
      if (!card) {
        return;
      }
      trackEvent('villain_related_click', {
        event_category: 'villain_type',
        event_label: card.getAttribute('data-related-key') || card.getAttribute('href'),
        result_archetype: currentResult ? currentResult.archetype : resultArchetype,
        related_rank: card.getAttribute('data-rank') || 'unknown'
      });
    });
  }

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

        if (currentResult && currentResult.percentile) {
          var percentileEl = document.getElementById('percentile-stat');
          if (percentileEl) {
            var pText = t('result.percentileStat', 'Only <strong>{percent}%</strong> of participants share your villain type');
            percentileEl.innerHTML = pText.replace('{percent}', currentResult.percentile);
          }
        }

        prioritizeRelatedCards(resultArchetype);
        updatePrimaryRecommendation(resultArchetype);
        renderScoreBreakdown();
      }, 200);
    } else if (quizScreen.classList.contains('active')) {
      renderQuestion();
    }
  });

  // Init
  initTheme();

})();
