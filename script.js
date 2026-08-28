const screens = ['intro','plan','question','yes','changes','sent'];
// Remplace cette adresse par TON adresse e-mail avant de publier.
const DESTINATION_EMAIL = 'loreaujoe2001@gmail.com';

let currentScreen = 'intro';

function show(id){
  if (id === currentScreen) return;
  const prevEl = document.getElementById(currentScreen);
  const nextEl = document.getElementById(id);

  // Fait disparaître l'écran actuel en douceur
  prevEl.classList.remove('show');

  const switchTo = () => {
    prevEl.classList.remove('active');
    nextEl.classList.add('active');
    window.scrollTo(0, 0);
    // on force un reflow pour être sûr que la transition se déclenche
    void nextEl.offsetWidth;
    requestAnimationFrame(() => nextEl.classList.add('show'));
    currentScreen = id;
  };

  // On attend la fin du fondu de sortie avant de basculer (avec un filet de sécurité)
  let done = false;
  const onEnd = () => { if(done) return; done = true; switchTo(); };
  prevEl.addEventListener('transitionend', onEnd, {once:true});
  setTimeout(onEnd, 260);
}

// Petit fondu d'entrée sur l'écran de départ, comme pour les autres transitions
requestAnimationFrame(() => document.getElementById(currentScreen).classList.add('show'));

document.getElementById('openPlan').onclick = () => show('plan');
document.getElementById('backIntro').onclick = () => show('intro');
document.getElementById('questionBtn').onclick = () => show('question');
document.getElementById('yesBtn').onclick = () => show('yes');
document.getElementById('noBtn').onclick = () => show('changes');
document.getElementById('backQuestion').onclick = () => show('question');
document.getElementById('backPlan').onclick = () => show('plan');

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.day').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('day' + btn.dataset.day).classList.add('active');
  });
});

function openMail(subject, body){
  const to = encodeURIComponent(DESTINATION_EMAIL);
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  window.location.href = `mailto:${decodeURIComponent(to)}?subject=${s}&body=${b}`;
}

document.getElementById('emailYes').onclick = () => {
  openMail(
    '✅ Programme Séoul validé',
    'Coucou !\n\nJe valide le programme des 29 et 30 août à Séoul 🐾🇰🇷\n\nÀ bientôt !'
  );
};

function getSelectedChanges(){
  const selected = [...document.querySelectorAll('.choices input:checked')].map(x => x.value);
  const custom = document.getElementById('customText').value.trim();
  return { selected, custom };
}

function escapeHTML(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.getElementById('sendChanges').onclick = () => {
  const { selected, custom } = getSelectedChanges();
  const box = document.getElementById('selected');
  const lines = selected.map(v => `<div>✓ ${escapeHTML(v)}</div>`);
  if (custom) lines.push(`<div>💬 ${escapeHTML(custom)}</div>`);
  box.innerHTML = lines.length
    ? lines.join('')
    : '<div>♡ Aucun changement — on garde le programme.</div>';
  show('sent');
};

document.getElementById('emailChanges').onclick = () => {
  const { selected, custom } = getSelectedChanges();
  const lines = selected.map(v => `- ${v}`);
  if (custom) lines.push(`- ${custom}`);
  const changes = lines.length ? lines.join('\n') : '- Aucun changement';
  openMail(
    '📝 Changements pour le programme Séoul',
    `Coucou !\n\nVoici ce que je voudrais changer dans le programme :\n\n${changes}\n\nMerci 🐱`
  );
};
