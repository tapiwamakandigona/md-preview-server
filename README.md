# md-preview-server

A lightweight, zero-dependency CLI tool that serves a local Markdown file as a styled HTML page with automatic live-reload. Built with Node.js and TypeScript.

## Features

- **Live reload** — the browser auto-refreshes every 2 seconds to pick up file changes
- **Styled output** — clean, readable HTML with sensible defaults for headings, code blocks, lists, and blockquotes
- **Zero runtime dependencies** — uses only Node.js built-in modules (`fs`, `http`, `path`)
- **CLI binary** — install globally or use via `npx`

## Installation

```bash
# Clone and build
git clone https://github.com/tapiwamakandigona/md-preview-server.git
cd md-preview-server
npm install
npm run build

# Or install globally via npm link
npm link
```

Requires **Node.js 20+** (see `.nvmrc`).

## Usage

```bash
# Via the built binary
md-preview README.md

# With a custom port
md-preview docs/guide.md 8080

# Or run directly with Node
node dist/index.js README.md
```

The server starts on `http://localhost:3000` by default and logs the URL to the console. Open it in a browser to see the rendered Markdown. Edit the source file and the preview updates automatically.

## Project Structure

```
md-preview-server/
├── src/
│   └── index.ts          # Main CLI entry point and HTTP server
├── dist/                  # Compiled JavaScript output (git-ignored)
├── .github/
│   ├── workflows/ci.yml  # CI pipeline (build + test)
│   └── dependabot.yml    # Automated dependency updates
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project metadata and scripts
├── .prettierrc            # Code formatting config
├── .nvmrc                 # Node.js version pin
├── CHANGELOG.md           # Release history
└── LICENSE                # MIT license
```

## Tech Stack

- **TypeScript** — strict mode, targeting ES2020
- **Node.js** — built-in `http` server, `fs` for file reading
- **GitHub Actions** — CI on push/PR

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run build` | Compile TypeScript to `dist/`      |
| `npm test`      | Run tests (placeholder currently)  |

## License

MIT — see [LICENSE](./LICENSE).
