# dennismenken.de

Persönliche Website und Logbuch von Dennis Menken.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Server**: [Hono](https://hono.dev) (SSR)
- **Frontend**: React 19 (`renderToString`, kein Client-Router)
- **Styling**: Tailwind CSS v4
- **Build**: Vite 8 (nur Client-Assets)
- **Blog**: Markdown mit gray-matter + unified/remark/rehype
- **3D**: Three.js via @react-three/fiber (nur Startseite)

Alle Seiten werden serverseitig gerendert. Client-JavaScript wird ausschließlich auf der Startseite geladen (Partikeleffekt). Alle anderen Seiten sind reines HTML + CSS.

## Bekannte Einschränkungen

- **`THREE.Clock is deprecated`-Warnung in der Browser-Konsole der Startseite.** Ausgelöst von `@react-three/fiber` 9.x, das intern `new THREE.Clock()` verwendet. three.js hat `Clock` mit r183 zugunsten von `Timer` als veraltet markiert. Ohne Funktionsauswirkung. Behoben wird das erst mit React Three Fiber v10 ([Issue #3741](https://github.com/pmndrs/react-three-fiber/issues/3741)); der additive PR #3773 wurde nicht gemergt. v10 steht derzeit nur als Alpha zur Verfügung und scheidet damit aus: Sie gibt jedem Besucher eine ALPHA-Warnung in der Konsole aus und vergrößert das three-Bundle von 724 KB auf 1,6 MB, weil der WebGPU-Renderer mitgezogen wird. Sobald v10 stabil ist, `@react-three/fiber` anheben und diesen Abschnitt entfernen.

## Voraussetzungen

- [Bun](https://bun.sh) >= 1.0

## Entwicklung

```bash
bun install
bun run dev
```

Der Dev-Server startet auf `http://localhost:3000` mit Vite HMR.

## Build & Production

```bash
bun run build
bun run start
```

`bun run build` kompiliert Client-Assets (CSS, JS) nach `dist/client/`. Der Server läuft direkt aus den TypeScript-Quelldateien (Bun braucht keinen Server-Build).

## Docker

```bash
docker compose up --build
```

Blog-Inhalte (`content/`) werden als Volume gemountet und können ohne Rebuild aktualisiert werden.

## Blog-Beiträge

Markdown-Dateien unter `content/log/` mit Frontmatter:

```markdown
---
date: "2026-03-01T08:00:00+01:00"
description: "Kurzbeschreibung für Meta-Tags, Feed und Übersichtsseite."
---

# Titel des Beitrags

Hier beginnt der Text...
```

- **Slug**: Dateiname ohne `.md`
- **Titel**: Erste H1-Überschrift
- **Datum**: Frontmatter `date` als ISO 8601 mit Zeitzone, zwingend in Anführungszeichen. Ohne Quotes parst YAML den Wert als Timestamp und die lokale Zeitzone geht verloren.
- **Beschreibung**: Frontmatter `description`. Fehlt sie, wird der erste Absatz auf 160 Zeichen gekürzt.

## Lizenz

- **Code**: [MIT](LICENSE)
- **Inhalte**: Alle Rechte vorbehalten ([CONTENT_LICENSE](CONTENT_LICENSE))
