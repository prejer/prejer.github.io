// ---------------------------------------------------------------------
// Always show the newest version: re-download this page bypassing the
// browser cache; if the version stamp changed, reload once.
// ---------------------------------------------------------------------
(function () {
  const meta = document.querySelector('meta[name="site-version"]');
  if (!meta || location.protocol === "file:") return;
  fetch(location.href, { cache: "reload" })
    .then(r => r.text())
    .then(html => {
      const m = html.match(/name="site-version" content="(\d+)"/);
      if (!m || m[1] === meta.content) return;
      const key = "reloaded-" + m[1];
      try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "1"); } catch (e) {}
      location.reload();
    })
    .catch(() => {});
})();

// =====================================================================
// Polish translations. English text lives directly in the HTML files;
// every element with data-i18n="key" is swapped for pl[key] in Polish.
// =====================================================================
const pl = {
  // nav / links
  "nav.home": "Start",
  "nav.projects": "Projekty",
  "nav.competitions": "Osiągnięcia",
  "nav.contact": "Kontakt",
  "crumb.manip": "Manipulator",
  "more.project": "Zobacz case study →",
  "more.timeline": "Pełna oś czasu →",
  "more.allprojects": "Przeglądaj projekty →",
  "more.all.t": "Wszystkie projekty",
  "more.all.d": "Szczegóły, technologie i postęp wszystkiego, nad czym pracuję.",

  // hero
  "hero.eyebrow": "Robotyka · Elektrotechnika · Fizyka",
  "hero.lead": "Projektuję i buduję rzeczy, które się ruszają — od ramion robotycznych po produkty software'owe. Finalista olimpiad z elektrotechniki i fizyki.",
  "hero.cta1": "Zobacz projekty →",
  "hero.cta2": "Skontaktuj się",
  "hero.tag.t2": "Aktualnie buduję",
  "hero.tag.d2": "Manipulator trójprzegubowy →",
  "hero.tag.t": "Manipulator trójprzegubowy",
  "hero.tag.d": "Zaprojektowany, zbudowany i zaprogramowany od zera",

  // stats
  "st.1.t": "Finalista",
  "st.1.d": "EUROELEKTRA — ogólnopolska olimpiada wiedzy elektrycznej i elektronicznej",
  "st.2.t": "Finalista",
  "st.2.d": "Olimpiada „O Diamentowy Indeks AGH” — fizyka",
  "st.3.t": "I miejsce",
  "st.3.d": "Międzyszkolny Turniej Fizyczny, woj. zachodniopomorskie",
  "st.4.t": "Stypendysta od 2022",
  "st.4.d": "Fundusz ZDOLNI",

  // about
  "about.title": "O mnie",
  "about.p1": "Jestem maturzystą, który lubi rozumieć, jak coś działa — a potem to zbudować.",
  "about.p2": "Startuję w olimpiadach z fizyki, elektrotechniki i mechaniki, a większość wolnego czasu poświęcam projektom: samodzielnie zaprojektowanemu manipulatorowi trójprzegubowemu oraz narzędziom programistycznym, które rozwiązują realne problemy zespołów.",
  "about.i1": "Robotyka",
  "about.i2": "Konstrukcje mechaniczne",
  "about.i3": "Elektrotechnika",
  "about.i4": "Fizyka",
  "about.i5": "Budowanie produktów",
  "about.i7": "Języki obce",

  // projects
  "projects.title": "Projekty",
  "projects.lead": "Sprzęt i oprogramowanie, które projektuję, buduję i rozwijam — od początku do końca.",
  "feat.label": "Wyróżniony · Robotyka",
  "feat.label2": "Robotyka · 2026",
  "chip.steppers": "Silniki krokowe",
  "chip.belts": "Przekładnie pasowe",
  "chip.kin": "Kinematyka",
  "chip.3d": "Wizualizacja 3D",

  // manipulator
  "manip.title": "Manipulator trójprzegubowy",
  "manip.short": "Ramię robotyczne zaprojektowane i zbudowane od zera — mechanika, elektronika i sterowanie. Sterowane z mojej aplikacji w Pythonie z wizualizacją 3D na żywo, komunikującej się z firmware'em na Arduino.",
  "manip.desc": "Ramię robotyczne z trzema przegubami, które samodzielnie zaprojektowałem i zbudowałem — mechanika, elektronika i oprogramowanie sterujące. Steruję nim z własnej aplikacji w Pythonie z modelem 3D ramienia na żywo, która wysyła polecenia do firmware'u na Arduino obsługującego silniki krokowe.",
  "f.joints": "Stopnie swobody",
  "f.drive": "Napęd",
  "f.drive.v": "Silniki krokowe + paski",
  "f.ctrl": "Sterowanie",
  "f.status": "Status",
  "f.status.v": "Aktywnie rozwijany",
  "demo.label": "Demo",
  "demo.title": "Ramię podąża za swoim cyfrowym bliźniakiem",
  "demo.p": "Na filmie fizyczne ramię porusza się razem ze swoim modelem 3D w mojej aplikacji sterującej. Aplikacja pokazuje na bieżąco kąt każdego przegubu i położenie końcówki.",
  "demo.l1": "Model 3D ramienia i jego przestrzeni roboczej na żywo",
  "demo.l2": "Kąty przegubów i pozycja końcówki na ekranie",
  "demo.l3": "Sterowanie z klawiatury, połączenie ze sterownikiem przez USB",
  "tech.label": "Opis techniczny",
  "tech.title": "Jak to działa",
  "tech.lead": "System dzieli się na aplikację wysokiego poziomu na komputerze i niskopoziomowy firmware na mikrokontrolerze.",
  "p1.t": "Aplikacja sterująca",
  "p1.d": "Aplikacja w Pythonie: obsługa użytkownika, model 3D ramienia, wyznaczanie kątów przegubów z geometrii ramienia.",
  "p2.t": "Komunikacja",
  "p2.d": "Docelowe kąty przegubów trafiają do mikrokontrolera przez port szeregowy USB.",
  "p3.t": "Firmware",
  "p3.d": "Firmware na Arduino zamienia kąty na sekwencje kroków i steruje driverami silników krokowych.",
  "p4.t": "Mechanika",
  "p4.d": "Silniki krokowe poruszają przegubami przez przekładnie pasowe; całe ramię obraca się na łożysku obrotowym.",
  "s1.t": "Konstrukcja mechaniczna",
  "s1.1": "3 przeguby obrotowe",
  "s1.2": "Redukcja pasowa",
  "s1.3": "Obrotowa podstawa",
  "s1.4": "Własne części",
  "s2.t": "Elektronika",
  "s2.1": "Płytka z mikrokontrolerem",
  "s2.2": "Drivery silników krokowych",
  "s2.3": "Osobny zasilacz",
  "s3.t": "Oprogramowanie",
  "s3.1": "Kinematyka",
  "s3.2": "Wizualizacja 3D",
  "log.label": "Proces",
  "log.title": "Dziennik budowy",
  "log.lead": "Od pierwszego mocowania silnika do działającego ramienia — kliknij zdjęcie, żeby je powiększyć.",
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

  // note stand
  "stand.crumb": "Stojak na notatki",
  "stand.title": "Stojak na notatki",
  "stand.label": "Projektowanie produktu · 2026",
  "stand.short": "Stojak na biurko na wielorazowe magnetyczne notatki suchościeralne — zaprojektowany w Fusion 360, wydrukowany w 3D i doprowadzony od prototypu do gotowego produktu.",
  "stand.desc": "Stojak na biurko na wielorazowe notatki: magnetyczne kartki z powłoką suchościeralną, na których piszesz, ścierasz i przyczepiasz z powrotem do stojaka. Moja druga próba wprowadzenia fizycznego produktu na rynek — zamodelowałem części w Fusion 360, wydrukowałem je w 3D, połączyłem ze stalowym słupkiem i ramionami pokrytymi filcem oraz przygotowałem materiały i opakowania pod małą serię.",
  "stand.loglead": "Od materiałów i wydruków testowych do gotowego stojaka — kliknij zdjęcie, żeby je powiększyć.",
  "chip.3dp": "Druk 3D",
  "chip.cad": "Projektowanie produktu",
  "chip.proto": "Prototypowanie",
  "chip.assembly": "Montaż",
  "sf.when": "Kiedy",
  "sf.when.v": "Kwiecień 2026",
  "sf.mat": "Materiały",
  "sf.mat.v": "Wydruki, stal, filc, arkusze magnetyczne",
  "sf.role": "Moja rola",
  "sf.role.v": "Od projektu do montażu",
  "sf.status.v": "Ukończony",
  "stand.l1": "Materiały pod małą serię: filc, arkusze magnetyczne i kartony wysyłkowe.",
  "stand.l2": "Dobieranie ustawień druku — porównanie jakości powierzchni dwóch wydrukowanych ramion.",
  "stand.l3": "Pierwszy montaż: stalowy słupek, drukowana podstawa i ramiona pokryte filcem.",
  "stand.l4": "Arkusze magnetyczne z powłoką suchościeralną — wielorazowe notatki.",
  "stand.l5": "Warstwa filcu naklejona na wydrukowane ramię.",
  "stand.l6": "Drukowana tuleja łącząca ramiona ze stalowym słupkiem.",
  "stand.l7": "Klejenie podstawy wokół słupka, ściśniętej na czas schnięcia.",
  "stand.l8": "Gotowy stojak: notatki na ramionach, marker suchościeralny w rowku podstawy.",

  // autocam
  "ac.label": "Robotyka · 2025",
  "ac.short": "Robot z kamerą na kołach mecanum, który miał śledzić twarz i jeździć za Tobą — podwozie, napęd, wieżyczka i firmware na ESP32 zbudowane od zera w pięć dni.",
  "ac.desc": "Robot z kamerą, który miał śledzić twarz człowieka i jeździć za nim. Zaprojektowałem i zbudowałem go w pięć dni — podwozie ze sklejki z drukowanymi częściami, wielokierunkowy napęd na kołach mecanum, obrotowa wieżyczka z ramieniem na serwie i ESP32 z moim własnym programem.",
  "ac.c1": "Koła mecanum",
  "ac.c4": "Śledzenie twarzy",
  "ac.glabel2": "Cel i efekt",
  "ac.gtitle2": "Co miał robić",
  "ac.glead": "Ambitna budowa w pięć dni: robot, który sam utrzymuje człowieka w kadrze, bez operatora.",
  "ac.s1.t": "Cel",
  "ac.s1.d": "Wykrywać i śledzić twarz człowieka, a potem jechać za nim tak, żeby kamera cały czas miała go w kadrze.",
  "ac.s2.t": "Zbudowane w 5 dni",
  "ac.s2.d": "Kompletne podwozie i napęd mecanum, obrotowa wieżyczka z ramieniem na serwie, elektronika i firmware na ESP32.",
  "ac.s3.t": "Następny krok",
  "ac.s3.d": "Pełnego śledzenia twarzy i jazdy za człowiekiem nie udało się dokończyć w tym czasie — platforma jest gotowa na tę warstwę.",
  "ac.c2": "Napęd wielokierunkowy",
  "ac.c3": "Serwo",
  "ac.when": "Wrzesień 2025",
  "ac.time": "Czas budowy",
  "ac.time.v": "5 dni",
  "ac.mat.v": "Sklejka, wydruki 3D",
  "ac.drive": "Napęd",
  "ac.drive.v": "4 × koła mecanum",
  "ac.glabel": "Zdjęcia",
  "ac.gtitle": "Robot",
  "log.lead2": "Kliknij zdjęcie, żeby je powiększyć.",
  "ac.p1": "Zmontowany robot: podwozie na kołach mecanum z obrotową wieżyczką i ramieniem na serwie.",
  "ac.p2": "Schowek na elektronikę pod zdejmowanym blatem.",
  "ac.p3": "Montaż elektroniki w warsztacie — mikrokontroler ESP32, przetwornica i płytki prototypowe.",
  "ac.p4": "Podwozie spakowane do transportu, obok na stanowisku moduł wieżyczki.",

  // slabaxis
  "sx.label": "SaaS · 2026",
  "sx.short": "Mój pierwszy SaaS B2C — układasz komponenty w przeglądarce i dostajesz płytkę do druku 3D: gotowe „pseudo-PCB” z opisami i grafiką.",
  "sx.desc": "Mój pierwszy SaaS B2C: platforma internetowa do budowania prostej elektroniki bez projektowania PCB. Układało się komponenty w przeglądarce, a platforma generowała model 3D płytki montażowej — wystarczyło ją wydrukować, włożyć elementy i było gotowe „pseudo-PCB” z wbudowanymi opisami i grafiką. Projekt jest już zamknięty, nie rozwijam go dalej.",
  "sx.c1": "Aplikacja webowa",
  "sx.c2": "Generowanie modeli 3D",
  "sx.c3": "Elektronika",
  "sx.when": "2026",
  "sx.type": "Typ",
  "sx.type.v": "SaaS B2C",
  "sx.out": "Efekt",
  "sx.out.v": "Płytka do druku 3D",
  "sx.role.v": "Założyciel · produkt",
  "sx.status.v": "Projekt zamknięty",
  "sx.lead": "Od pomysłu do działającego układu bez zamawiania PCB i lutowania na płytce uniwersalnej.",
  "sx.s1.t": "Ułóż",
  "sx.s1.d": "Wybierz komponenty z biblioteki i rozmieść je na płytce w edytorze w przeglądarce; dodaj tekst i logo.",
  "sx.s2.t": "Wygeneruj",
  "sx.s2.d": "Platforma generuje model 3D płytki z otworami i gniazdami na każdy element, gotowy do eksportu.",
  "sx.s3.t": "Wydrukuj i złóż",
  "sx.s3.d": "Wydrukuj płytkę, włóż elementy i połącz je — gotowe urządzenie z grafiką od razu na miejscu.",
  "sx.glabel": "Efekty",
  "sx.gtitle": "Płytki zrobione w Slabaxis",
  "sx.p1": "Z edytora do rzeczywistości: płytka zaprojektowana na platformie obok wydrukowanego efektu.",
  "sx.p2": "Wskaźnik temperatury: termistor, dioda LED i Arduino Nano na wydrukowanej płytce z opisem i grafiką.",
  "sx.p3": "PiezoPAD: trzy czujniki piezo sterujące diodami przez tranzystory, z przełącznikiem — wszystko trzymane przez wydrukowaną płytkę.",

  // projects timeline
  "feat.cat.robo": "Robotyka",
  "feat.cat.saas": "SaaS",
  "feat.cat.prod": "Projektowanie produktu",
  "manip.date": "Lis 2026",
  "sx.date": "Cze 2026",
  "stand.date": "Kwi 2026",
  "ac.date": "Wrz 2025",
  "manip.tl": "Ramię robotyczne zbudowane od zera, sterowane z mojej aplikacji w Pythonie z modelem 3D na żywo i firmware'em na Arduino.",
  "sx.tl": "Mój pierwszy SaaS B2C — układasz komponenty w przeglądarce, dostajesz „pseudo-PCB” do druku 3D.",
  "stand.tl": "Stojak na magnetyczne notatki suchościeralne — od modelu w Fusion 360 do gotowego produktu.",
  "ac.tl": "Robot z kamerą na kołach mecanum, który miał śledzić twarz — zbudowany w pięć dni na ESP32.",

  // achievements
  "comp.title": "Osiągnięcia",
  "comp.homelead": "Olimpiady i konkursy z fizyki, elektrotechniki i mechaniki.",
  "comp.lead": "Olimpiady i konkursy z fizyki, elektrotechniki i mechaniki.",
  "ach.1.t": "EUROELEKTRA — finalista",
  "ach.1.d": "Ogólnopolska olimpiada wiedzy elektrycznej i elektronicznej · 2025/26",
  "ach.2.t": "Diamentowy Indeks AGH — finalista",
  "ach.2.d": "Fizyka · 2025/26",
  "ach.3.t": "Olimpiada Fizyczna — II etap",
  "ach.3.d": "Część teoretyczna i doświadczalna · 2025/26",
  "ach.4.t": "Międzyszkolny Turniej Fizyczny — I miejsce",
  "ach.4.d": "Województwo zachodniopomorskie · 2025/26",
  "comp.owt.name": "Olimpiada Wiedzy Technicznej — Inżynieria Mechaniczna",
  "comp.agh.name": "Olimpiada „O Diamentowy Indeks AGH” — fizyka",
  "comp.of.name": "Olimpiada Fizyczna",
  "comp.mtf.name": "Międzyszkolny Turniej Fizyczny",
  "b.finalist": "Finalista",
  "b.upcoming": "Wkrótce",
  "b.pending": "Czekam na wyniki",
  "b.stage2": "II etap",
  "b.first": "I miejsce",
  "t.euro": "Ogólnopolska olimpiada wiedzy elektrycznej i elektronicznej — grupa elektrotechnika.",
  "t.of25": "Awans do II etapu w części teoretycznej i doświadczalnej.",
  "t.mtf": "Województwo zachodniopomorskie.",
  "t.owt2": "Awans do II etapu.",

  // programmes
  "prog.title": "Programy",
  "prog.lead": "Programy i stypendia, w których biorę udział.",
  "prog.zdolni.when": "2022 – obecnie",
  "prog.zdolni.name": "Fundusz ZDOLNI",
  "prog.zdolni.desc": "Stypendysta funduszu wspierającego uzdolnionych uczniów.",
  "prog.up.when": "lipiec – październik 2026",
  "prog.up.desc": "W ramach programu zrealizowałem projekt CNow.",

  // skills
  "skills.title": "Umiejętności",
  "skills.lead": "Z czym pracuję.",
  "skills.eng": "Inżynieria",
  "skills.sw": "Oprogramowanie",
  "skills.biz": "Produkt",
  "skills.lang": "Języki",
  "sk.e1": "Obwody elektryczne",
  "sk.e2": "Konstrukcje mechaniczne",
  "sk.e3": "Robotyka",
  "sk.e4": "Sterowanie silnikami krokowymi",
  "sk.s3": "Tworzenie stron www",
  "sk.b1": "Badanie rynku",
  "sk.b2": "Pitching",
  "sk.b3": "Od pomysłu do produktu",
  "sk.l1": "Polski — ojczysty",
  "sk.l2": "Angielski",
  "sk.l3": "Francuski — w trakcie nauki",

  // contact
  "contact.title": "Porozmawiajmy",
  "contact.p": "Chętnie porozmawiam o projektach, współpracy i możliwościach w inżynierii i technologii."
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
  // keep the language when moving between pages
  document.querySelectorAll('a[href*=".html"]').forEach(a => {
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
    const fc = el.closest("figure")?.querySelector("figcaption [data-i18n]");
    cap.textContent = fc ? fc.textContent : "";
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

document.querySelectorAll("span.year").forEach(el => { el.textContent = new Date().getFullYear(); });
