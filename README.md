# CV Builder

**A modern, privacy-focused resume builder developed with React.**

CV Builder allows users to create professional-grade resumes effortlessly. It features a responsive editing interface, real-time preview, and high-quality PDF export—all without requiring user registration.

## Features

- **Real-time Preview:** Instantly see changes as you edit your information.
- **One-click Export:** Generate print-ready PDF files immediately.
- **Customizable Design:** Choose from curated color schemes and professional fonts.
- **Privacy First:** No sign-up required. Your data lives in your browser session.
- **Responsive Interface:** Full editing capabilities on desktop and mobile devices.

## Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Modern CSS3 (Grid/Flexbox)
- **Icons:** Lucide React
- **PDF Generation:** html2pdf.js

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blitz-flex/CV-Builder.git
   cd CV-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

## Project Structure

- `src/components/` - React components for the Form and Preview.
- `src/styles/` - Modular CSS files organized by page (Editor/Welcome).
- `src/utils/` - Helper functions for PDF generation.

##  Live Site

[ 📝 CV Bulder](https://cv-builds.netlify.app/)
