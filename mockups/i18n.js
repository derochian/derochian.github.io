/* ─────────────────────────────────────────────────────────────────────
   Kolben homepage — language toggle (EN ↔ français du Québec).

   Approach: walk every visible text node on init, snapshot the English
   originals, and translate by exact-match lookup against the FR dictionary
   below. Returning to EN restores from the snapshot. This avoids having
   to tag every element with data-i18n attributes and keeps embedded markup
   (em, br, spans) intact.

   FR copy follows OQLF (Office québécois de la langue française)
   conventions — proper accents, French technical terms, and avoidance of
   common anglicisms (e.g. "parc de véhicules" over "flotte", "esthétique"
   over "détailing", "sports motorisés" over "motorsport").
   ───────────────────────────────────────────────────────────────────── */
(function () {
  const FR = {
    // ── Utility bar ─────────────────────────────────────────────────
    "Find a Distributor":                                                     "Trouver un distributeur",
    "Compliance & SDS":                                                       "Conformité et FDS",

    // ── Nav ─────────────────────────────────────────────────────────
    "Home":                                                                   "Accueil",
    "Products":                                                               "Produits",
    "Industries":                                                             "Industries",
    "About":                                                                  "À propos",
    "News":                                                                   "Nouvelles",
    "Contact":                                                                "Contact",

    // ── Header CTAs ─────────────────────────────────────────────────
    "Where to Buy":                                                           "Où acheter",
    "Become a Distributor":                                                   "Devenir distributeur",

    // ── Mega menu · Featured ────────────────────────────────────────
    "Featured Categories":                                                    "Catégories en vedette",
    "Brake Cleaners":                                                         "Nettoyants à freins",
    "Fast-dry, non-chlorinated & high-pressure formulations":                 "Formules à séchage rapide, non chlorées et à haute pression",
    "Engine Additives":                                                       "Additifs pour moteur",
    "Flushes, system cleaners, top-end conditioners":                         "Rinçages, nettoyants de système, conditionneurs de haut moteur",
    "Fuel Additives":                                                         "Additifs pour carburant",
    "Diesel & petrol injector cleaners, performance boosters":                "Nettoyants d’injecteurs diesel et essence, optimisateurs de performance",
    "Lubricants & Grease":                                                    "Lubrifiants et graisses",
    "Synthetic greases, penetrating oils, dry lubes":                         "Graisses synthétiques, huiles pénétrantes, lubrifiants secs",

    // ── Mega menu · All categories ──────────────────────────────────
    "All Categories":                                                         "Toutes les catégories",
    "Oils & Fluids":                                                          "Huiles et liquides",
    "Engine, ATF, brake, coolant":                                            "Moteur, ATF, frein, liquide de refroidissement",
    "Maintenance Sprays":                                                     "Aérosols d’entretien",
    "Contact cleaner, throttle body, electronic":                             "Nettoyants à contacts, corps de papillon, électronique",
    "Sealants & Stop Leaks":                                                  "Scellants et anti-fuites",
    "Cooling, transmission, power steering":                                  "Refroidissement, transmission, direction assistée",
    "Car Care":                                                               "Entretien automobile",
    "Detailing, interior, exterior":                                          "Esthétique, intérieur, extérieur",
    "All products A–Z":                                                       "Tous les produits de A à Z",
    "Browse the complete catalog":                                            "Parcourir le catalogue complet",

    // ── Hero ────────────────────────────────────────────────────────
    "German Engineering":                                                     "Ingénierie allemande",
    "Since 2006":                                                             "Depuis 2006",
    "Toughest chemicals.":                                                    "Produits chimiques sans compromis.",
    "OEM-grade":                                                              "Calibre OEM",
    "performance.":                                                           "performance.",
    "Premium automotive chemicals, additives, and lubricants — engineered in Hannover, OEM-certified, distributed across Canada by professional shops, fleets, and parts retailers.":
                                                                              "Produits chimiques, additifs et lubrifiants automobiles haut de gamme — conçus à Hanovre, certifiés OEM, distribués partout au Canada par des ateliers professionnels, des parcs de véhicules et des détaillants de pièces.",
    "Explore Products":                                                       "Explorer les produits",

    // ── Spec strip (two-line labels — each line is its own text node) ─
    "Years of":                                                               "Années",
    "Engineering":                                                            "d’ingénierie",
    "Bottles":                                                                "Bouteilles",
    "Annual Capacity":                                                        "Capacité annuelle",
    "Global":                                                                 "Clients",
    "Customers":                                                              "à l’échelle mondiale",
    "ft²":                                                                    "pi²",
    "Facility":                                                               "Installations",

    // ── Ticker ──────────────────────────────────────────────────────
    "German Engineered":                                                      "Ingénierie allemande",
    "OEM Certified":                                                          "Certifié OEM",
    "Canadian Distribution":                                                  "Distribution canadienne",
    "SGS Verified":                                                           "Vérifié SGS",
    "Power · Performance · Kolben":                                           "Puissance · Performance · Kolben",

    // ── Tackle section ──────────────────────────────────────────────
    "Solutions":                                                              "Solutions",
    // section-title nodes: "Tackle your " + <em>"toughest"</em> + " jobs."
    "Tackle your":                                                            "Affrontez les tâches les plus",
    "toughest":                                                               "exigeantes",
    "jobs.":                                                                  ".",
    "View Full Catalog":                                                      "Voir le catalogue complet",
    "Brake Service":                                                          "Entretien des freins",
    "Engine Cleaning":                                                        "Nettoyage du moteur",
    "Fuel System":                                                            "Système de carburant",
    "Lubricants":                                                             "Lubrifiants",
    "Transmission":                                                           "Transmission",
    "Cooling & Radiator":                                                     "Refroidissement et radiateur",
    "Electrical Contact":                                                     "Contacts électriques",
    "Detailing & Care":                                                       "Esthétique et entretien",
    "12 SKUs":                                                                "12 produits",
    "8 SKUs":                                                                 "8 produits",
    "14 SKUs":                                                                "14 produits",
    "22 SKUs":                                                                "22 produits",
    "9 SKUs":                                                                 "9 produits",
    "7 SKUs":                                                                 "7 produits",
    "6 SKUs":                                                                 "6 produits",
    "11 SKUs":                                                                "11 produits",

    // ── Industry section ────────────────────────────────────────────
    "For Professionals":                                                      "Pour les professionnels",
    // section-title nodes: "Browse by " + <em>"industry"</em> + "."
    "Browse by":                                                              "Parcourir par",
    "industry":                                                               "industrie",
    "All Industries":                                                         "Toutes les industries",
    "Automotive Repair":                                                      "Réparation automobile",
    "Heavy Truck & Fleet":                                                    "Camions lourds et parcs",
    "Industrial & Mfg":                                                       "Industriel et fabrication",
    "Marine":                                                                 "Marine",
    "Motorsport":                                                             "Sports motorisés",
    "Aviation":                                                               "Aviation",
    "Parts Retailers":                                                        "Détaillants de pièces",
    "Mining & Heavy":                                                         "Mines et machinerie lourde",
    "Agriculture":                                                            "Agriculture",
    "Distributors":                                                           "Distributeurs",

    // ── Carousel captions ───────────────────────────────────────────
    "KB-210 · MAINTENANCE":                                                   "KB-210 · ENTRETIEN",
    "Brake Cleaner":                                                          "Nettoyant à freins",
    "400 g · AEROSOL · GERMAN ENGINEERED":                                              "400 g · AÉROSOL · ALLEMANDE",
    "KB-340 · ENGINE":                                                        "KB-340 · MOTEUR",
    "Engine Flush":                                                           "Rinçage de moteur",
    "300 mL · LIQUID · GERMAN ENGINEERED":                                              "300 mL · LIQUIDE · ALLEMANDE",
    "KB-512 · FUEL":                                                          "KB-512 · CARBURANT",
    "Diesel Injector Cleaner":                                                "Nettoyant d’injecteurs diesel",
    "250 mL · LIQUID · GERMAN ENGINEERED":                                              "250 mL · LIQUIDE · ALLEMANDE",
    "KB-088 · LUBE":                                                          "KB-088 · LUBRIFIANT",
    "Synthetic Chain Lube":                                                   "Lubrifiant synthétique pour chaîne"
  };

  // Cache of every translatable text node + its original (English) value
  let snapshot = null;

  function collectTextNodes() {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.textContent.trim()) return NodeFilter.FILTER_REJECT;
        const parent = n.parentNode;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        // skip the lang toggles themselves so EN/FR labels never get translated
        if (parent.classList && parent.classList.contains('util__lang')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = walker.nextNode())) out.push(n);
    return out;
  }

  function apply(lang) {
    if (!snapshot) {
      snapshot = collectTextNodes().map(function (n) { return { node: n, original: n.textContent }; });
    }
    snapshot.forEach(function (entry) {
      const original = entry.original;
      if (lang === 'en') {
        entry.node.textContent = original;
        return;
      }
      const trimmed = original.trim();
      const translated = FR[trimmed];
      if (!translated) return; // leave untranslated strings (codes, numbers) alone
      // preserve any whitespace that bordered the original text node
      const lead  = original.match(/^\s*/)[0];
      const trail = original.match(/\s*$/)[0];
      entry.node.textContent = lead + translated + trail;
    });

    document.documentElement.lang = (lang === 'fr') ? 'fr-CA' : 'en';

    // sync the EN / FR toggle pills
    document.querySelectorAll('.util__lang').forEach(function (el) {
      const isMatch = el.textContent.trim().toLowerCase() === lang.toLowerCase();
      el.classList.toggle('active', isMatch);
      el.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    try { localStorage.setItem('kolbenLang', lang); } catch (e) { /* private mode */ }
  }

  function init() {
    const pills = document.querySelectorAll('.util__lang');
    pills.forEach(function (el) {
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      const code = el.textContent.trim().toLowerCase(); // 'en' or 'fr'
      el.addEventListener('click', function () { apply(code); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); apply(code); }
      });
    });

    let saved = 'en';
    try { saved = localStorage.getItem('kolbenLang') || 'en'; } catch (e) {}
    if (saved !== 'en') apply(saved);
    else apply('en'); // still wire active state
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
