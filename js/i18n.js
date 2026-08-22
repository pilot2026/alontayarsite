document.addEventListener('DOMContentLoaded', () => {
  const strings = {
    he: {
      brand: 'אלון תייר',
      music: 'מוזיקה',
      albumTitle: 'עם כל הלב',
      listen: 'להאזנה',
      copyright: '© כל הזכויות שמורות לאלון תייר 2026'
    },
    en: {
      brand: 'ALON TAYAR',
      music: 'MUSIC',
      albumTitle: 'WITH ALL OF MY HEART',
      listen: 'LISTEN',
      copyright: '© Alon Tayar 2026'
    }
  };

  const getLang = () => localStorage.getItem('lang') || 'he';
  const setLang = (lang) => {
    localStorage.setItem('lang', lang);
    applyLang(lang);
    updateSwitch(lang);
    // notify others
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  };

  const applyLang = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (strings[lang] && strings[lang][key]) el.textContent = strings[lang][key];
    });
  };

  const updateSwitch = (lang) => {
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      const bLang = btn.getAttribute('data-lang');
      if (bLang === lang) btn.classList.add('selected'); else btn.classList.remove('selected');
    });
  };

  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLang(lang);
    });
  });

  // initialize
  const lang = getLang();
  applyLang(lang);
  updateSwitch(lang);
});
