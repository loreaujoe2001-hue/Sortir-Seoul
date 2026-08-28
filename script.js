const screens = ['intro','plan','question','yes','changes','sent'];
// Remplace cette adresse par TON adresse e-mail avant de publier.
const DESTINATION_EMAIL = 'loreaujoe2001@gmail.com';

function show(id){
  screens.forEach(s => document.getElementById(s).classList.toggle('active', s === id));
  window.scrollTo({top:0, behavior:'smooth'});
}

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

document.getElementById('sendChanges').onclick = () => {
  const selected = [...document.querySelectorAll('.choices input:checked')].map(x => x.value);
  const box = document.getElementById('selected');
  box.innerHTML = selected.length
    ? selected.map(v => `<div>✓ ${v}</div>`).join('')
    : '<div>♡ Aucun changement — on garde le programme.</div>';
  show('sent');
};

document.getElementById('emailChanges').onclick = () => {
  const selected = [...document.querySelectorAll('.choices input:checked')].map(x => x.value);
  const changes = selected.length ? selected.map(v => `- ${v}`).join('\n') : '- Aucun changement';
  openMail(
    '📝 Changements pour le programme Séoul',
    `Coucou !\n\nVoici ce que je voudrais changer dans le programme :\n\n${changes}\n\nMerci 🐱`
  );
};
