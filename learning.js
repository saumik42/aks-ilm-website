(() => {
  const el = id => document.getElementById(id);
  const shuffled = items => {
    const deck = [...items];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  let termDeck = [], benefitDeck = [], lastTerm = null, lastBenefit = null;
  function draw(items, deck, last) {
    if (!deck.length) {
      deck.push(...shuffled(items));
      if (deck.length > 1 && deck[deck.length - 1] === last)
        [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
    }
    return deck.pop();
  }
  const termSelect = el('term-select');
  function renderTerm(t) {
    lastTerm = t;
    el('term-name').textContent = t[0];
    el('term-arabic').textContent = t[1];
    el('term-meaning').textContent = t[2];
    el('term-simple').textContent = t[3];
    el('term-reference').innerHTML = t[4];
    document.querySelector('.term-source').open = false;
    if (termSelect) termSelect.value = String(terms.indexOf(t));
  }
  function showTerm() {
    let t = draw(terms, termDeck, lastTerm);
    // A manually chosen term may be next in the deck; count it as seen
    // and continue without immediately showing it again.
    if (terms.length > 1 && t === lastTerm)
      t = draw(terms, termDeck, lastTerm);
    renderTerm(t);
  }
  if (termSelect) {
    const sortName = name => name.normalize('NFD').replace(/[\u0300-\u036fʿʾ]/g, '');
    terms.map((term, index) => ({ term, index }))
      .sort((a, b) => sortName(a.term[0]).localeCompare(sortName(b.term[0]), 'en'))
      .forEach(({ term, index }) => {
        const option = document.createElement('option');
        option.value = String(index);
        option.textContent = term[0] + ' — ' + term[1];
        termSelect.appendChild(option);
      });
    termSelect.addEventListener('change', () => {
      const index = Number(termSelect.value);
      if (Number.isInteger(index) && terms[index]) renderTerm(terms[index]);
    });
    el('term-picker').hidden = false;
  }
  function showBenefit() {
    const b = draw(benefits, benefitDeck, lastBenefit);
    lastBenefit = b;
    el('benefit-arabic').textContent = b.arabic || '';
    el('benefit-arabic').hidden = !b.arabic;
    el('benefit-text').textContent = b.text;
    const source = el('benefit-source');
    source.replaceChildren();
    if (b.url) {
      const link = document.createElement('a');
      link.href = b.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = b.source;
      link.style.color = 'inherit';
      link.style.textDecoration = 'underline';
      link.style.textUnderlineOffset = '3px';
      source.appendChild(link);
    } else {
      source.textContent = b.source;
    }
    el('benefit-note').textContent = b.note || '';
  }
  el('another-term').addEventListener('click', showTerm);
  el('another-benefit').addEventListener('click', showBenefit);
  showTerm();
  showBenefit();
})();
