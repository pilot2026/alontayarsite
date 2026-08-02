// רדיו רציף: לחיצה על כפתור הרמקול מתחילה נגינה של רשימת SONGS (ברצף, בלולאה).
// אין כפתורי דילוג קדימה/אחורה בכוונה.
(function () {
  const btn = document.getElementById("radio-toggle");
  if (!btn) return;

  const audio = new Audio();
  let order = [];
  let position = 0;
  let isPlaying = false;

  function shuffledOrder(length) {
    const indexes = Array.from({ length }, (_, i) => i);
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes;
  }

  function playCurrent() {
    const songs = typeof SONGS !== "undefined" ? SONGS : [];
    if (songs.length === 0) return;
    audio.src = songs[order[position]];
    audio.play();
  }

  function playNext() {
    const songs = typeof SONGS !== "undefined" ? SONGS : [];
    if (songs.length === 0) return;
    position = (position + 1) % order.length;
    playCurrent();
  }

  audio.addEventListener("ended", playNext);

  btn.addEventListener("click", function () {
    const songs = typeof SONGS !== "undefined" ? SONGS : [];

    if (songs.length === 0) {
      isPlaying = !isPlaying;
      btn.classList.toggle("is-playing", isPlaying);
      btn.setAttribute("aria-pressed", String(isPlaying));
      return;
    }

    if (!isPlaying) {
      if (order.length === 0) {
        order = shuffledOrder(songs.length);
        position = 0;
      }
      playCurrent();
      isPlaying = true;
    } else {
      audio.pause();
      isPlaying = false;
    }
    btn.classList.toggle("is-playing", isPlaying);
    btn.setAttribute("aria-pressed", String(isPlaying));
  });
})();
