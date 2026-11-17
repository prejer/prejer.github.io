// =====================================================================
// Polish translations. English text lives directly in the HTML files;
// every element with data-i18n="key" is swapped for pl[key] in Polish.
// =====================================================================
const pl = {
  // nav
  "nav.home": "Start",
  "nav.projects": "Projekty",
  "nav.competitions": "Konkursy",
  "nav.contact": "Kontakt",
  "back.projects": "← Wszystkie projekty",
  "more.project": "Zobacz projekt →",
  "more.timeline": "Zobacz oś czasu →",
  "more.allprojects": "Wszystkie projekty →",

  // home
  "hero.lead": "Maturzysta, który lubi rozumieć, jak coś działa — a potem to zbudować.",
  "hero.tags": "Robotyka · Elektrotechnika · Fizyka · Oprogramowanie",
  "about.title": "O mnie",
  "about.p1": "Jestem w klasie maturalnej, przygotowuję się do matury i biorę udział w kilku olimpiadach naukowych i technicznych. Większość wolnego czasu poświęcam projektom: samodzielnie zaprojektowanemu manipulatorowi trójprzegubowemu oraz narzędziom programistycznym, które rozwiązują realne problemy.",
  "about.p2": "Czym się pasjonuję:",
  "about.i1": "Robotyka i konstrukcje mechaniczne",
  "about.i2": "Elektrotechnika i fizyka",
  "about.i3": "Budowanie produktów — od pomysłu do pitchu",
  "about.i4": "Nauka języków (obecnie francuski)",
  "about.i5": "Nauka o treningu i fizjologia wysiłku",
  "home.featured": "Wyróżnione",
  "skills.title": "Umiejętności",
  "skills.eng": "Inżynieria",
  "skills.eng.list": "Obwody elektryczne · Mechanika i konstrukcja · Robotyka",
  "skills.sw": "Oprogramowanie",
  "skills.sw.list": "Tworzenie stron i aplikacji webowych · Aplikacje do Jiry · LaTeX",
  "skills.biz": "Produkt",
  "skills.biz.list": "Badanie rynku · Pitching · Zamienianie pomysłów w produkty",
  "skills.lang": "Języki",
  "skills.lang.list": "Polski (ojczysty) · Angielski · Francuski (w trakcie nauki)",
  "contact.title": "Kontakt",
  "contact.p": "Chcesz porozmawiać o projekcie, współpracy albo czymkolwiek technicznym? Napisz.",

  // projects
  "projects.title": "Projekty",
  "projects.lead": "Rzeczy, które projektuję, buduję i rozwijam.",
  "orgo.desc": "Aplikacja do Jiry, która daje menedżerom widok całej organizacji jednym kliknięciem. Każde zadanie to kształt — kolor pokazuje status, długość to, jak długo w nim tkwi — a dane są niemal w czasie rzeczywistym dzięki webhookom. Zamiast niekończących się tabel i spóźnionych raportów OrgoMap sygnalizuje problemy jasnym komunikatem i pozwala od razu zareagować.",

  // manipulator
  "manip.title": "Manipulator trójprzegubowy",
  "manip.short": "Ramię robotyczne zaprojektowane i zbudowane od zera — mechanika, elektronika i sterowanie.",
  "manip.desc": "Ramię robotyczne z trzema przegubami, które samodzielnie zaprojektowałem i zbudowałem — mechanika, elektronika i sterowanie. Projekt wciąż się rozwija: ciągle poprawiam konstrukcję i usuwam to, co wychodzi w testach.",
  "f.joints": "Przeguby",
  "f.drive": "Napęd",
  "f.drive.v": "Silniki krokowe, paski",
  "f.base": "Podstawa",
  "f.base.v": "Obrotowa",
  "f.status": "Status",
  "f.status.v": "W trakcie",
  "video.title": "Film",
  "log.title": "Dziennik budowy",
  "log.01": "Pierwszy silnik krokowy zamontowany pod płytą bazową.",
  "log.02": "Przekładnia pasowa — koło pasowe i pasek przenoszą ruch z silnika.",
  "log.03": "Wspornik barku na płycie bazowej; silniki i koła pasowe czekają na montaż.",
  "log.04": "Bark zmontowany: dwa silniki krokowe napędzają przeguby przez paski.",
  "log.05": "Zamontowane pierwsze ramię.",
  "log.06": "Ramię stoi i jest podłączone do płytki sterującej.",
  "log.07": "Pierwsze testy ruchu, sterowanie z laptopa.",
  "log.08": "Nowa płyta bazowa z silnikiem przegubu obrotowego.",
  "log.09": "Pełne ramię z oboma członami.",
  "log.10": "Łożysko obrotowe do obracania całego ramienia.",
  "log.11": "Ramię na obrotowej podstawie — wszystkie trzy przeguby razem.",
  "log.12": "Manipulator na podstawie, sterowany z laptopa.",

  // competitions
  "comp.title": "Olimpiady i konkursy",
  "comp.short": "Fizyka, elektrotechnika i mechanika — na osi czasu.",
  "comp.lead": "Fizyka, elektrotechnika i mechanika.",
  "comp.owt.name": "Olimpiada Wiedzy Technicznej — Inżynieria Mechaniczna",
  "comp.agh.name": "Olimpiada „O Diamentowy Indeks AGH” — fizyka",
  "b.finalist": "Finalista",
  "b.upcoming": "Wkrótce",
  "t.owt2": "Awans do II etapu.",
  "t.euro": "Ogólnopolska olimpiada elektryczna — grupa elektrotechnika.",
  "comp.of.name": "Olimpiada Fizyczna",
  "t.of25": "Awans do II etapu w części teoretycznej i doświadczalnej.",
  "comp.mtf.name": "Międzyszkolny Turniej Fizyczny",
  "t.mtf": "Województwo zachodniopomorskie.",
  "b.stage2": "II etap",
  "b.first": "I miejsce",
  "b.pending": "Czekam na wyniki",

  // programmes
  "prog.title": "Programy",
  "prog.zdolni.when": "2022 – obecnie",
  "prog.zdolni.name": "Fundusz ZDOLNI — stypendysta",
  "prog.up.when": "lipiec – październik 2026",
  "prog.up.desc": "W ramach programu zrealizowałem projekt CNow."
};

// ---------------------------------------------------------------------
// Language switching (English default)
// ---------------------------------------------------------------------
const nodes = document.querySelectorAll("[data-i18n]");
nodes.forEach(n => { n.dataset.en = n.innerHTML; });
const toggle = document.getElementById("lang-toggle");

function setLang(lang) {
  nodes.forEach(n => {
    const key = n.dataset.i18n;
    n.innerHTML = lang === "pl" && pl[key] ? pl[key] : n.dataset.en;
  });
  document.documentElement.lang = lang;
  toggle.textContent = lang === "pl" ? "EN" : "PL";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  // keep language when moving between pages (also works without localStorage)
  document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(a => {
    const url = new URL(a.getAttribute("href"), location.href);
    if (lang === "pl") url.searchParams.set("lang", "pl"); else url.searchParams.delete("lang");
    a.href = url.href;
  });
}

let current = "en";
const urlLang = new URLSearchParams(location.search).get("lang");
if (urlLang === "pl" || urlLang === "en") current = urlLang;
else { try { current = localStorage.getItem("lang") || "en"; } catch (e) {} }
setLang(current);
toggle.addEventListener("click", () => {
  current = current === "en" ? "pl" : "en";
  setLang(current);
});

// ---------------------------------------------------------------------
// Lightbox for images with class="zoom" (arrows + keyboard)
// ---------------------------------------------------------------------
const zoomables = [...document.querySelectorAll("img.zoom")];
zoomables.forEach((img, i) => img.addEventListener("click", () => openBox(i)));

function openBox(start) {
  let i = start;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<img alt=""><div class="cap"></div>' +
    '<button class="prev" aria-label="Previous">‹</button>' +
    '<button class="next" aria-label="Next">›</button>' +
    '<button class="close" aria-label="Close">✕</button>';
  const big = box.querySelector("img"), cap = box.querySelector(".cap");
  const show = () => {
    const el = zoomables[i];
    big.src = el.dataset.full || el.src;
    const p = el.parentElement.querySelector("p");
    cap.textContent = p ? p.textContent : "";
  };
  const move = d => { i = (i + d + zoomables.length) % zoomables.length; show(); };
  const close = () => { box.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = e => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  };
  box.querySelector(".prev").onclick = e => { e.stopPropagation(); move(-1); };
  box.querySelector(".next").onclick = e => { e.stopPropagation(); move(1); };
  box.querySelector(".close").onclick = close;
  box.addEventListener("click", e => { if (e.target === box) close(); });
  document.addEventListener("keydown", onKey);
  document.body.appendChild(box);
  show();
}

document.querySelectorAll(".year").forEach(el => {
  if (el.tagName === "SPAN") el.textContent = new Date().getFullYear();
});
