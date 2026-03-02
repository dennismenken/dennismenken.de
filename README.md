# dennismenken.de

Persönliche Website und Logbuch von Dennis Menken.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Server**: [Hono](https://hono.dev) (SSR)
- **Frontend**: React 19 (`renderToString`, kein Client-Router)
- **Styling**: Tailwind CSS v4
- **Build**: Vite 6 (nur Client-Assets)
- **Blog**: Markdown mit gray-matter + unified/remark/rehype
- **3D**: Three.js via @react-three/fiber (nur Startseite)

Alle Seiten werden serverseitig gerendert. Client-JavaScript wird ausschließlich auf der Startseite geladen (Partikeleffekt). Alle anderen Seiten sind reines HTML + CSS.

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
date: 2026-03-01
---

# Titel des Beitrags

Hier beginnt der Text...
```

- **Slug**: Dateiname ohne `.md`
- **Titel**: Erste H1-Überschrift
- **Datum**: Frontmatter `date` (YYYY-MM-DD)

## Lizenz

- **Code**: [MIT](LICENSE)
- **Inhalte**: Alle Rechte vorbehalten ([CONTENT_LICENSE](CONTENT_LICENSE))
