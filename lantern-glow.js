(() => {
  const lantern = document.querySelector('#reminder .reminder-lantern');
  const button = document.getElementById('another-benefit');
  if (!lantern || !button) return;
  let timer;
  button.addEventListener('click', () => {
    clearTimeout(timer);
    lantern.classList.remove('is-glowing');
    void lantern.offsetWidth;
    lantern.classList.add('is-glowing');
    timer = setTimeout(() => lantern.classList.remove('is-glowing'), 1200);
  });
})();
