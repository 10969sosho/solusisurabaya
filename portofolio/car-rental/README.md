# Autovista Prestige Motors - Premium Car Dealership Portfolio

## 📋 Overview

**Autovista Prestige Motors** is a premium multi-page static website for a luxury car dealership. Built with vanilla HTML, CSS, and JavaScript — featuring 5 pages, modern dark automotive design, and full interactivity.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│              Multi-Page HTML Structure               │
│  index.html | models.html | model-detail.html        │
│  services.html | contact.html                        │
└────────────────────┬────────────────────────────────┘
                     │ references via <link> & <script>
        ┌────────────┴────────────┐
        ▼                         ▼
┌─────────────────┐   ┌──────────────────────┐
│   styles.css     │   │     script.js         │
│ (Presentation)   │   │   (Behavior Layer)    │
│ Dark slate theme │   │ Car filter, gallery   │
│ Electric blue    │   │ Color selector        │
│ Responsive       │   │ Animated stats        │
└─────────────────┘   └──────────────────────┘
```

---

## 📁 Folder Structure

```
car-rental/
├── index.html          # Homepage: hero, featured cars, testimonials, finance
├── models.html         # Car catalog with filters (12 cars)
├── model-detail.html   # Car detail: gallery, specs, features, test drive form
├── services.html       # 6 service offerings
├── contact.html        # Contact form, 3 locations, hours, WhatsApp
├── styles.css          # Complete CSS (~800 lines, dark automotive theme)
├── script.js           # JavaScript (~300 lines, filter, gallery, animations)
└── README.md           # This documentation
```

---

## 🎨 Design System

| Variable | Value | Usage |
|----------|-------|-------|
| `--dark-slate` | `#0F172A` | Primary background |
| `--silver` | `#94A3B8` | Secondary text |
| `--electric-blue` | `#3B82F6` | Accent color |
| `--white` | `#F8FAFC` | Text on dark |
| `--black` | `#020617` | Darkest background |

**Font:** Inter (Google Fonts)

---

## 📄 Pages

| Page | Sections |
|------|----------|
| **index.html** | Hero, Featured Models (4), Why Choose Us (4), Testimonials (3), Finance Teaser, CTA WhatsApp |
| **models.html** | Filter bar, 12 Car Cards with specs & pricing |
| **model-detail.html** | Image Gallery (5), Specs Table, Features (8), Color Swatches (5), Test Drive Form |
| **services.html** | Sales, Trade-In, Financing, Insurance, Service & Maintenance, Roadside Assistance |
| **contact.html** | Contact Form, 3 Dealer Locations, Operating Hours, WhatsApp Hotline |

---

## 🚀 How to Run

```bash
cd car-rental
python3 -m http.server 8000
# Open http://localhost:8000
```

---

## 🚗 Car Inventory (12 Models)

| Brand | Model | Type | Price |
|-------|-------|------|-------|
| Toyota | Avanza | MPV | Rp 235 Juta |
| Honda | Brio | Hatchback | Rp 220 Juta |
| Honda | CR-V | SUV | Rp 545 Juta |
| Toyota | Camry | Sedan | Rp 580 Juta |
| Honda | Civic | Sedan | Rp 450 Juta |
| Toyota | Fortuner | SUV | Rp 520 Juta |
| Mitsubishi | Pajero Sport | SUV | Rp 510 Juta |
| Toyota | Kijang Innova | MPV | Rp 380 Juta |
| BMW | 320i | Sedan | Rp 1,25 Miliar |
| Mercedes | C200 | Sedan | Rp 1,38 Miliar |
| Porsche | Cayenne | SUV | Rp 1,65 Miliar |
| Mazda | CX-5 | SUV | Rp 530 Juta |

---

## 🏢 Dealer Locations

- **Jakarta** — Jl. Sudirman No. 1
- **Surabaya** — Jl. Basuki Rachmat No. 45
- **Medan** — Jl. Sisingamangaraja No. 12

---

## ✨ Features

- Dark premium automotive design
- Responsive (mobile, tablet, desktop)
- Car filter (brand, type, price)
- Image gallery with thumbnails
- Color swatch selector
- Test drive booking form
- Animated statistics counter
- WhatsApp integration
- Scroll animations
- Mobile hamburger menu
