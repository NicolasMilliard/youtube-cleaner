# YouTube Essentials

> YouTube, minus the noise.

YouTube Essentials is a lightweight Chrome extension that removes distracting content from YouTube while keeping the core viewing experience intact.

No account. No analytics. No backend. Your preferences stay in your browser.

## Features

- Hide Shorts from navigation and recommendations
- Optionally keep Shorts accessible on creator channel pages
- Hide YouTube Playables from the home feed
- Light, dark, and system themes
- Settings stored locally with `chrome.storage.local`
- No tracking or external requests

## Philosophy

YouTube Essentials is not designed to block YouTube.

It is designed to remove content that is pushed at you, while keeping intentional viewing available.

For example, Shorts can stay hidden from recommendations while remaining accessible when you deliberately visit a creator's channel.

## Development

### Requirements

- [Bun](https://bun.sh/)
- Google Chrome or another Chromium-based browser

### Install dependencies

```bash
bun install
```

### Development

```bash
bun run dev
```

This watches the TypeScript and static files and updates the `dist/` directory.

After changing extension files:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Load `dist/` with **Load unpacked**
4. Reload the extension when necessary
5. Refresh YouTube

### Build

```bash
bun run build
```

### Validate

```bash
bun run check
```

This runs formatting checks, TypeScript validation, and the production build.

## Project structure

```text
.
├── src/
│   ├── assets/
│   │   └── icons/
│   ├── content/
│   │   ├── content.css
│   │   └── index.ts
│   ├── popup/
│   │   ├── popup.css
│   │   ├── popup.html
│   │   └── popup.ts
│   └── storage.ts
├── scripts/
│   └── build.mjs
├── manifest.json
└── tsconfig.json
```

## Privacy

YouTube Essentials does not collect, transmit, sell, or analyze user data.

The extension:

- does not use analytics
- does not communicate with a backend
- does not make external network requests
- does not require an account
- stores preferences locally using Chrome's extension storage

The extension only runs on YouTube pages in order to hide the selected interface elements.

## How it works

YouTube Essentials uses a small content script to apply settings as attributes to the YouTube document.

CSS selectors then hide the corresponding interface elements.

```text
User preference
      ↓
chrome.storage.local
      ↓
Content script
      ↓
data-* attributes
      ↓
CSS
```

This keeps the implementation lightweight and avoids unnecessary DOM polling or content analysis.

## Limitations

YouTube Essentials relies on YouTube's current DOM structure and web components.

YouTube can change its interface without notice, which may occasionally require selectors to be updated.

If something stops being hidden after a YouTube update, feel free to open an issue.

## License

MIT
