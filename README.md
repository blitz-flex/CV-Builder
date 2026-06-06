

# CV Builder

**A modern, privacy-focused resume builder built with React.**

Create professional, print-ready CVs entirely in your browser — no account, no backend, no data leaving your device.

![CV Builder — landing page](https://res.cloudinary.com/dwtm0oy63/image/upload/f_auto,q_auto/hero_y7yhsu)


## Overview

CV Builder is a single-page application that guides users from a landing page through template selection to a full CV editor with live preview and PDF export. All state lives in the browser: drafts are auto-saved to `localStorage`, and nothing is sent to a server.

The editor is built around nine structured form sections, five layout variants, and real-time A4 preview rendering. The UI adapts to desktop (side-by-side form + preview) and mobile (stacked form with swipeable preview panel).


## Features

| Feature | Description |
|---------|-------------|
| **Template gallery** | Five curated layouts with distinct typography, accent colors, and column structures |
| **Structured editor** | Nine guided sections with hints, collapsible cards, and array fields (jobs, education, etc.) |
| **Live preview** | Print-accurate A4 document updated on every keystroke |
| **Design controls** | Switch accent color and font family without leaving the editor |
| **PDF export** | One-click download via `html2pdf.js` |
| **Auto-save** | Debounced writes to `localStorage` (500 ms delay) |
| **Draft recovery** | Resume an in-progress CV on return; drafts expire after 30 days |
| **Progress tracking** | Section completion indicators and navigation pills |
| **Responsive UI** | Desktop split layout; mobile preview overlay with focus trap |
| **Privacy-first** | No sign-up, no API calls for CV data, photos not persisted |



## Templates

| ID | Name | Layout | Font | Accent |
|----|------|--------|------|--------|
| `tech-bw-professional` | Tech | Single column (`simple`) | Inter | `#0a0a0a` |
| `corporate-blue-white` | Corporate | Header band (`executive`) | Roboto | `#2563eb` |
| `corporate-bw-classic` | Classic | Two column (`classic`) | Merriweather | `#171717` |
| `beige-simple-a4` | Beige | Warm grid (`stacked`) | Lato | `#78716c` |
| `blue-minimalist-cv` | Minimal | Accent header (`creative`) | Poppins | `#2563eb` |

Default template: `corporate-blue-white`

Templates are defined in `src/config/cvTemplates.js`. Each template sets `layoutVariant`, which maps to CSS classes in `src/styles/cv/CVLayoutVariants.css` and `CVTemplateThemes.css`.


## User Flow

```
/  →  /templates  →  /create?template=<id>  →  PDF download
```

1. **Welcome** (`/`) — Landing page with call-to-action.
2. **Template picker** (`/templates`) — Browse and select a layout.
3. **Editor** (`/create?template=…`) — Fill sections; preview and draft update in real time.
4. **Export** — Download the finished CV as a PDF from the editor toolbar.

On editor load, the app hydrates state in this order:
- URL `?template=` parameter (if present)
- Saved `localStorage` draft (if meaningful content exists)
- Empty form with the selected template defaults




## Project Structure

```
CV-Builder/
├── public/                   # Static assets (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── form/             # Section editors (9 components)
│   │   ├── preview/          # Live CV document rendering
│   │   ├── shared/           # Form layout, nav pills, section cards
│   │   ├── CVForm.jsx        # Main editor page
│   │   ├── TemplatePicker.jsx
│   │   └── Welcome.jsx
│   ├── config/
│   │   ├── cvTemplates.js    # Template definitions
│   │   ├── formSections.js   # Section metadata & icons
│   │   ├── formTemplates.js  # Default field shapes
│   │   ├── colors.js
│   │   └── fonts.js
│   ├── hooks/
│   │   ├── useFormData.js    # Form state & array mutations
│   │   ├── useDebouncedSave.js
│   │   ├── useMediaQuery.js
│   │   ├── useFocusTrap.js
│   │   ├── useProgressiveReveal.js
│   │   └── useSwipeDismiss.js
│   ├── styles/
│   │   ├── cv/               # Document, layout variants, themes
│   │   ├── editor/           # Form, preview panel, controls
│   │   ├── templates/      # Template picker
│   │   ├── welcome/          # Landing page
│   │   └── base/             # Mobile utilities
│   ├── utils/
│   │   ├── pdfGenerator.js   # html2pdf wrapper
│   │   ├── storage.js        # localStorage draft CRUD
│   │   ├── cvHelpers.js      # Completion & emptiness checks
│   │   ├── cvLayoutHelpers.js
│   │   └── scroll.js
│   ├── App.jsx               # Route definitions
│   ├── main.jsx
│   └── index.css             # Global tokens & resets
├── index.html
├── vite.config.js
└── package.json
```

## Architecture

### State management

No external state library. The editor uses React hooks:

- **`useFormData`** — Centralizes `formData` and `collapsed` section state, plus handlers for scalar fields, array items, and section toggling.
- **`useDebouncedSave`** — Triggers `saveDraft()` 500 ms after the last change once hydration is complete.
- **`useIsDesktop`** — Breakpoint hook that switches between split and mobile layouts.

### Preview rendering

`CVPreview` → `CVPreviewDocument` composes `CVHeader`, `CVLeftColumn`, and `CVRightColumn`. Layout is driven by the active template's `layoutVariant` class on the document root.

### PDF generation

`generatePDF()` in `src/utils/pdfGenerator.js` captures the preview DOM node via `html2pdf.js` and triggers a browser download. The preview element is referenced through a `ref` on `CVForm`.

### Routing

| Path | Component |
|------|-----------|
| `/` | `Welcome` |
| `/templates` | `TemplatePicker` |
| `/create` | `CVForm` (accepts `?template=<id>`) |


## Data & Privacy

| Item | Behavior |
|------|----------|
| Storage key | `cv-builder-draft` in `localStorage` |
| Draft version | `5` (auto-migrated on load) |
| Retention | 30 days, then auto-deleted |
| Photo field | Stripped before save (`photo: null`) |
| Server | None — fully client-side |

Clearing browser data or using private browsing will prevent draft recovery. Quota errors fail silently.



