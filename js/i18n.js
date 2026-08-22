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
    updateToggle(lang);
  };

  const applyLang = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (strings[lang] && strings[lang][key]) el.textContent = strings[lang][key];
    });
    // update album listen href remains same; album title is static element
  };

  const updateToggle = (lang) => {
    document.querySelectorAll('#lang-toggle').forEach((btn) => {
      btn.textContent = (lang === 'he') ? 'EN' : 'HEB';
    });
  };

  document.querySelectorAll('#lang-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = getLang() === 'he' ? 'en' : 'he';
      setLang(lang);
    });
  });

  // initialize
  const lang = getLang();
  applyLang(lang);
  updateToggle(lang);
});
