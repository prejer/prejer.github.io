// ---------- Manipulator media ----------
// Put files in assets/manipulator/ and list them here.
// Example:
//   { type: "image", src: "assets/manipulator/arm-1.jpg", alt: "Manipulator — front view" },
//   { type: "video", src: "assets/manipulator/demo.mp4", poster: "assets/manipulator/arm-1.jpg" },
const manipulatorMedia = [];

// ---------- Translations (English is the default) ----------
const pl = {
  "nav.about": "O mnie",
  "nav.projects": "Projekty",
  "nav.competitions": "Olimpiady",
  "nav.skills": "Umiejętności",
  "nav.contact": "Kontakt",
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
  "projects.title": "Projekty",
  "manip.title": "Manipulator trójprzegubowy",
  "manip.desc": "Ramię robotyczne z trzema przegubami, które samodzielnie zaprojektowałem i zbudowałem — mechanika, elektronika i sterowanie. Projekt wciąż się rozwija: ciągle poprawiam konstrukcję i usuwam to, co wychodzi w testach.",
  "manip.empty": "Zdjęcia i film już wkrótce.",
  "orgo.desc": "Aplikacja do Jiry, która daje menedżerom widok całej organizacji jednym kliknięciem. Każde zadanie to kształt — kolor pokazuje status, długość to, jak długo w nim tkwi — a dane są niemal w czasie rzeczywistym dzięki webhookom. Zamiast niekończących się tabel i spóźnionych raportów OrgoMap sygnalizuje problemy jasnym komunikatem i pozwala od razu zareagować.",
  "comp.title": "Olimpiady i konkursy",
  "comp.euro.group": "— elektrotechnika",
  "comp.euro.res": "Finalista (2025/26); w 2026/27 startuję ponownie",
  "comp.owt.name": "Olimpiada Wiedzy Technicznej — Inżynieria Mechaniczna (OWT-IM)",
  "comp.owt.res": "2026/27: awans do II etapu (okręgowego)",
  "comp.agh.name": "Olimpiada „O Diamentowy Indeks AGH” — fizyka",
  "comp.agh.res": "Uczestnik 2026/27",
  "comp.swin.name": "Konkurs Chemiczny im. Antoniego Swinarskiego",
  "comp.swin.res": "2026/27: awans do II etapu",
  "comp.edu.res": "Uczestnik 2026/27",
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
  "contact.p": "Chcesz porozmawiać o projekcie, współpracy albo czymkolwiek technicznym? Napisz."
};

// Remember the English text that is already in the HTML
const nodes = document.querySelectorAll("[data-i18n]");
nodes.forEach(n => { n.dataset.en = n.innerHTML; });

function setLang(lang) {
  nodes.forEach(n => {
    const key = n.dataset.i18n;
    n.innerHTML = lang === "pl" && pl[key] ? pl[key] : n.dataset.en;
  });
  document.documentElement.lang = lang;
  document.getElementById("lang-toggle").textContent = lang === "pl" ? "EN" : "PL";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

let current = "en";
const urlLang = new URLSearchParams(location.search).get("lang");
if (urlLang === "pl" || urlLang === "en") current = urlLang;
else { try { current = localStorage.getItem("lang") || "en"; } catch (e) {} }
setLang(current);

document.getElementById("lang-toggle").addEventListener("click", () => {
  current = current === "en" ? "pl" : "en";
  setLang(current);
});

// ---------- Gallery ----------
const gallery = document.getElementById("manip-gallery");
if (manipulatorMedia.length) {
  document.getElementById("manip-empty").hidden = true;
  manipulatorMedia.forEach(m => {
    let el;
    if (m.type === "video") {
      el = document.createElement("video");
      el.src = m.src;
      el.controls = true;
      el.preload = "metadata";
      el.playsInline = true;
      if (m.poster) el.poster = m.poster;
      el.className = "wide";
    } else {
      el = document.createElement("img");
      el.src = m.src;
      el.alt = m.alt || "";
      el.loading = "lazy";
      el.addEventListener("click", () => {
        const box = document.createElement("div");
        box.className = "lightbox";
        const big = document.createElement("img");
        big.src = m.src;
        big.alt = m.alt || "";
        box.appendChild(big);
        box.addEventListener("click", () => box.remove());
        document.body.appendChild(box);
      });
    }
    gallery.appendChild(el);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
