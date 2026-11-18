# prejer.github.io

Personal website of Paweł Rejer — https://prejer.github.io

Plain HTML/CSS/JS on GitHub Pages. English by default, Polish via the PL button (or `?lang=pl`).

- `index.html` — landing: about, featured, skills, contact
- `projects.html` — list of projects
- `manipulator.html` — three-joint manipulator: facts, video, build log
- `competitions.html` — olympiads timeline (edit instructions in the HTML comment)
- `script.js` — Polish translations, language switch, image lightbox
- `style.css` — styles
- `assets/manipulator/` — photos (full size + `thumbs/`)

## Updating
Before every push run `./bump-version.sh` — it stamps a new version into all pages,
so visitors always get fresh CSS/JS and open pages reload themselves to the newest version.

## Notes
- `notes.html` — list of notes, `notes-euroelektra.html` — EUROELEKTRA notes (Polish)
- Source with LaTeX lives in `_notes/*.src.html` (folders starting with `_` are not published).
  After editing run: `npm i katex@0.16.11 && node _notes/build.js` — formulas are pre-rendered to HTML, so the page needs no external scripts.
