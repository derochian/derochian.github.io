/* ─────────────────────────────────────────────────────────────────────
   Kolben — shared site-footer translator (EN ↔ Quebec French).

   Self-contained so the footer renders bilingual on every page
   regardless of which i18n system that page already uses:

     • homepage-v2.html  — i18n.js (string-match text-node walker)
     • everything else   — local I18N dict + data-i18n attributes

   Both systems mutate <html lang="…"> when the user clicks EN/FR. We
   observe that attribute and re-translate footer elements tagged with
   `data-ft-i18n="key"` (innerHTML) or `data-ft-i18n-placeholder="key"`
   (input placeholder). Keys live in FOOTER_FR below.

   FR copy follows OQLF conventions — accents in place, RPCC/RPD/TMD
   instead of CCCR/HPR/TDG. Address, phone, email and standards codes
   stay as-is in both languages.
   ───────────────────────────────────────────────────────────────────── */
(function () {
  const FOOTER_FR = {
    /* Tier 1 — value band */
    'band.compliance.h':  'Conformité canadienne',
    'band.compliance.p':  'Chaque référence livrée avec étiquettes et FDS bilingues EN/FR — RPCC, RPD et TMD comme minimum.',
    'band.bilingual.h':   'Service bilingue',
    'band.bilingual.p':   'Acheteurs, partenaires et questions techniques joignent une personne — en anglais ou en français — sous un jour ouvré.',
    'band.supply.h':      'Approvisionnement fiable',
    'band.supply.p':      'Deux entrepôts de stockage et expédition 48 H sur les références en stock, partout au Canada.',

    /* Tier 2 — column headings */
    'col.products':       'Produits',
    'col.industries':     'Industries',
    'col.company':        'Société',
    'col.contact':        'Nous joindre',

    /* Tier 2 — Products column */
    'link.brake':         'Nettoyants à freins',
    'link.engine':        'Additifs moteur',
    'link.fuel':          'Additifs carburant',
    'link.oils':          'Huiles et fluides',
    'link.allProducts':   'Tous les produits →',

    /* Tier 2 — Industries column */
    'link.heavy':         'Camions lourds et parcs',
    'link.auto':          'Réparation automobile',
    'link.agri':          'Agriculture',
    'link.marine':        'Marine',
    'link.allInd':        'Toutes les industries →',

    /* Tier 2 — Company column */
    'link.about':         'À propos de Kolben',
    'link.compliance':    'Conformité et FDS',
    'link.where':         'Où acheter',
    'link.distributor':   'Devenir distributeur',
    'link.contact':       'Contact',

    /* Tier 2 — newsletter */
    'news.placeholder':   'Courriel pour mises à jour partenaires',
    'news.btn':           'S’abonner',

    /* Tier 3 — bottom bar */
    'base.copy':          '© 2026 Kolben Chemicals Canada.',
    'base.privacy':       'Confidentialité',
    'base.terms':         'Conditions',
    'base.tag':           'Puissance · Performance · Kolben'
  };

  // Snapshot of each tagged node's original English innerHTML / placeholder,
  // captured the first time we run apply() so EN restores cleanly.
  let snapshot = null;
  function captureSnapshot() {
    snapshot = { html: new Map(), ph: new Map() };
    document.querySelectorAll('.site-footer [data-ft-i18n]').forEach(function (el) {
      snapshot.html.set(el, el.innerHTML);
    });
    document.querySelectorAll('.site-footer [data-ft-i18n-placeholder]').forEach(function (el) {
      snapshot.ph.set(el, el.getAttribute('placeholder') || '');
    });
  }

  function apply(lang) {
    if (!document.querySelector('.site-footer')) return;
    if (!snapshot) captureSnapshot();

    const isFr = String(lang || '').toLowerCase().indexOf('fr') === 0;

    snapshot.html.forEach(function (original, el) {
      const key = el.getAttribute('data-ft-i18n');
      if (isFr && FOOTER_FR[key] != null) {
        el.innerHTML = FOOTER_FR[key];
      } else {
        el.innerHTML = original;
      }
    });

    snapshot.ph.forEach(function (original, el) {
      const key = el.getAttribute('data-ft-i18n-placeholder');
      if (isFr && FOOTER_FR[key] != null) {
        el.setAttribute('placeholder', FOOTER_FR[key]);
      } else {
        el.setAttribute('placeholder', original);
      }
    });
  }

  function currentLang() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  function init() {
    apply(currentLang());

    // Re-translate whenever the page-level i18n flips <html lang>.
    new MutationObserver(function () { apply(currentLang()); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    // Stub the newsletter form so a submit doesn't navigate.
    const form = document.querySelector('.site-footer .ft-nav__news');
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
