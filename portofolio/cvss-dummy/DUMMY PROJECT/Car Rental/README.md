# DriveNow Rental - Premium Car Rentals

## 📋 Overview

**DriveNow Rental** is a static front-end website for a premium car rental service. It is a single-page application (SPA) built entirely with vanilla web technologies — no frameworks, no backend, no database.

---

## 🏗️ Architecture

The project follows a **3-tier front-end architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                   index.html                         │
│              (Structure Layer - HTML)                │
│  Defines all content, sections, forms, and layout   │
└────────────────────┬────────────────────────────────┘
                     │ references via <link> & <script>
        ┌────────────┴────────────┐
        ▼                         ▼
┌─────────────────┐   ┌──────────────────────┐
│   styles.css     │   │     script.js         │
│ (Presentation)   │   │   (Behavior Layer)    │
│   CSS3 styling   │   │  JavaScript (ES6+)    │
│   Layout, color  │   │  DOM manipulation,    │
│   animations,    │   │  event handling,      │
│   responsive     │   │  form validation,     │
│   design         │   │  IntersectionObserver │
└─────────────────┘   └──────────────────────┘
```

### Layer Details:

1. **Structure Layer** (`index.html`)
   - HTML5 semantic markup
   - Sections: Navbar, Hero, Booking Search, Car Fleet, Locations, Why Choose Us, Reviews, Pricing, Map, Promo Banner, Footer
   - Google Fonts (Inter) via CDN
   - Google Maps embed iframe

2. **Presentation Layer** (`styles.css`)
   - CSS Custom Properties (variables) for consistent theming
   - Flexbox & CSS Grid for layouts
   - Responsive design via media queries (breakpoints: 768px, 480px)
   - Hover effects with transitions & transforms
   - Backdrop-filter for glassmorphism effects
   - Gradient overlays

3. **Behavior Layer** (`script.js`)
   - Vanilla JavaScript (ES6+)
   - DOMContentLoaded initialization
   - Smooth scrolling for anchor links
   - Form validation for booking search
   - Interactive animations (hover, fade-in, auto-rotate)
   - Intersection Observer API for scroll-based animations
   - Keyboard accessibility enhancements

---

## 🧩 Frameworks & Libraries Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | Standard | Document structure |
| **CSS3** | Standard | All styling and layout |
| **JavaScript (ES6+)** | Standard | Client-side interactivity |
| **Google Fonts - Inter** | CDN | Typography |
| **Google Maps Embed API** | CDN | Embedded map |
| **Unsplash Images** | CDN | Stock photography |

> **No JavaScript frameworks (React, Vue, Angular, etc.)**
> **No CSS frameworks (Bootstrap, Tailwind, etc.)**
> **No build tools (Webpack, Vite, etc.)**
> **No backend or database**

---

## 📁 Folder Structure

```
Car Rental/
├── index.html                # Main HTML page (all sections)
├── styles.css                # Complete CSS stylesheet (~755 lines)
├── script.js                 # JavaScript logic (~250 lines)
├── README.md                 # This documentation file
└── trajectories/             # AI agent trajectory history
    └── trajectory_20260715_210330.json
```

### File Details

| File | Size | Lines | Description |
|------|------|-------|-------------|
| `index.html` | ~15.8 KB | 369 | Complete website structure with 11 sections |
| `styles.css` | ~13.1 KB | 755 | Full styling with responsive design |
| `script.js` | ~8.8 KB | 250 | All interactivity and behavior |
| `trajectories/` | ~16.5 KB | - | AI development artifacts |

---

## 🚀 How to Run

Since this is a **static website**, no build steps or server software are required.

### Option 1: Open Directly in Browser (Simplest)

```bash
# macOS
open "/Users/10969sosho/PROJECT/CVSS/PORTOFOLIO/CVSS dummy/DUMMY PROJECT/Car Rental/index.html"

# Or simply double-click index.html in Finder / File Explorer
```

### Option 2: Python HTTP Server (Recommended for proper asset loading)

```bash
cd "/Users/10969sosho/PROJECT/CVSS/PORTOFOLIO/CVSS dummy/DUMMY PROJECT/Car Rental"

# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Option 3: VS Code Live Server

1. Install the **Live Server** extension by Ritwick Dey
2. Right-click on `index.html`
3. Select **"Open with Live Server"**

### Option 4: Node.js http-server

```bash
# Install globally (one-time)
npm install -g http-server

# Run the server
cd "/Users/10969sosho/PROJECT/CVSS/PORTOFOLIO/CVSS dummy/DUMMY PROJECT/Car Rental"
http-server

# Open http://localhost:8080
```

### Option 5: PHP Built-in Server

```bash
cd "/Users/10969sosho/PROJECT/CVSS/PORTOFOLIO/CVSS dummy/DUMMY PROJECT/Car Rental"
php -S localhost:8000
```

---

## 🎨 Design System

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--dark-gray` | `#111827` | Text, dark backgrounds |
| `--red-accent` | `#EF4444` | Primary CTA, accents |
| `--white` | `#FFFFFF` | Card backgrounds |
| `--light-gray` | `#F3F4F6` | Section backgrounds |
| `--text-gray` | `#6B7280` | Secondary text |
| `--border-gray` | `#E5E7EB` | Borders, dividers |

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

---

## 📄 Sections Breakdown

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Sticky navigation with logo, menu links, CTA button |
| 2 | **Hero** | Full-screen banner with gradient overlay, headline, CTA buttons |
| 3 | **Booking Search** | Floating search form (location, dates, car type) |
| 4 | **Car Fleet** | 3 car cards with specs, pricing, and details button |
| 5 | **Locations** | 4 rental location cards with images |
| 6 | **Why Choose Us** | 4 feature cards with icons |
| 7 | **Customer Reviews** | Testimonial slider with auto-rotation |
| 8 | **Pricing Plans** | 3-tier pricing (Economy, Standard, Luxury) |
| 9 | **Map** | Google Maps iframe + office contact info |
| 10 | **Promo Banner** | 15% off first rental promotion |
| 11 | **Footer** | Links, contact info, copyright |
