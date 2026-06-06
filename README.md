# CV Builder

**A modern, privacy-focused resume builder built with React.**

Create professional, print-ready CVs entirely in your browser — no account, no backend, no data leaving your device.


## Overview

CV Builder takes you from template selection to a finished PDF in a single flow. The editor mirrors your input in a live A4 preview, persists drafts locally as you type, and scales cleanly from desktop to mobile.

## Features

- **Template gallery** — Five curated layouts (single-column, two-column, executive header, and more), each with dedicated typography and accent styling.
- **Structured editor** — Nine guided sections: personal info, profile summary, work experience, education, skills, software, languages, training, and projects.
- **Live preview** — Every edit updates a print-accurate preview in real time.
- **Design controls** — Adjust accent color and font family without leaving the editor.
- **PDF export** — Download a print-ready document in one click.
- **Auto-save** — Drafts are written to `localStorage` with debounced saves and a 30-day retention window.
- **Privacy-first** — No sign-up and no server-side storage; your CV data stays on your device.
- **Responsive UI** — Full editing workflow on desktop and mobile, with touch-friendly navigation.

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19 |
| Routing | React Router 7 |
| Build | Vite 6 |
| Styling | CSS (Grid, Flexbox, custom properties) |
| Icons | Lucide React |
| PDF | html2pdf.js |

## Project Structure

```
src/
├── components/
│   ├── form/          # Section editors (PersonalInfo, WorkExperience, …)
│   ├── preview/       # Live CV preview (header, columns, document shell)
│   ├── shared/        # Reusable UI (section cards, nav pills, form layout)
│   ├── CVForm.jsx     # Main editor page
│   ├── TemplatePicker.jsx
│   └── Welcome.jsx    # Landing page
├── config/
│   ├── cvTemplates.js # Template definitions (layout, font, accent)
│   ├── formSections.js
│   ├── formTemplates.js
│   ├── colors.js
│   └── fonts.js
├── hooks/             # useFormData, useDebouncedSave, useMediaQuery, …
├── styles/
│   ├── cv/            # Document and template theme styles
│   ├── editor/        # Form and preview panel styles
│   ├── templates/     # Template picker styles
│   └── welcome/       # Landing page styles
└── utils/
    ├── pdfGenerator.js
    ├── storage.js     # localStorage draft persistence
    └── cvHelpers.js
```

## How It Works

1. **Welcome** (`/`) — Landing page and entry point.
2. **Templates** (`/templates`) — Choose a layout and visual style.
3. **Editor** (`/create`) — Complete each section; preview and draft update as you type.
4. **Export** — Download the finished CV as a PDF.

---

