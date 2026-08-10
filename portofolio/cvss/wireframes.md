# CV Solusi Surabaya - Website Wireframes

## Homepage Layout Structure

```mermaid
graph TD
    A[Header Navigation] --> B[Hero Section]
    B --> C[Services Overview]
    C --> D[Why Choose Us]
    D --> E[Featured Projects]
    E --> F[Client Testimonials]
    F --> G[Contact CTA]
    G --> H[Footer]
    
    B --> B1[Animated Background]
    B --> B2[Company Logo]
    B --> B3[Tagline Animation]
    B --> B4[CTA Buttons]
    
    C --> C1[Website Dev Card]
    C --> C2[Mobile Apps Card]
    C --> C3[Desktop Software Card]
    C --> C4[E-commerce Card]
```

## Page Flow Architecture

```mermaid
flowchart LR
    Home[Homepage] --> Services[Services Page]
    Home --> Portfolio[Portfolio Page]
    Home --> About[About Page]
    Home --> Contact[Contact Page]
    
    Services --> S1[Website Development]
    Services --> S2[Mobile Applications]
    Services --> S3[Desktop Software]
    Services --> S4[E-commerce Solutions]
    
    Portfolio --> P1[Web Projects]
    Portfolio --> P2[Mobile Apps]
    Portfolio --> P3[Desktop Apps]
    Portfolio --> P4[E-commerce Sites]
    
    Contact --> C1[Contact Form]
    Contact --> C2[Company Info]
    Contact --> C3[Location Map]
```

## Responsive Layout Breakpoints

### Mobile Layout (320px - 767px)
```
┌─────────────────────┐
│      Header         │
├─────────────────────┤
│                     │
│    Hero Section     │
│   (Full Width)      │
│                     │
├─────────────────────┤
│   Service Card 1    │
├─────────────────────┤
│   Service Card 2    │
├─────────────────────┤
│   Service Card 3    │
├─────────────────────┤
│   Service Card 4    │
├─────────────────────┤
│      Footer         │
└─────────────────────┘
```

### Tablet Layout (768px - 991px)
```
┌─────────────────────────────────┐
│           Header                │
├─────────────────────────────────┤
│                                 │
│         Hero Section            │
│        (Full Width)             │
│                                 │
├─────────────────────────────────┤
│  Service 1  │    Service 2      │
├─────────────┼───────────────────┤
│  Service 3  │    Service 4      │
├─────────────────────────────────┤
│            Footer               │
└─────────────────────────────────┘
```

### Desktop Layout (992px+)
```
┌─────────────────────────────────────────────────┐
│                  Header                         │
├─────────────────────────────────────────────────┤
│                                                 │
│              Hero Section                       │
│             (Full Width)                        │
│                                                 │
├─────────────────────────────────────────────────┤
│ Service 1 │ Service 2 │ Service 3 │ Service 4   │
├─────────────────────────────────────────────────┤
│                   Footer                        │
└─────────────────────────────────────────────────┘
```

## Component Wireframes

### Header Component
```
┌─────────────────────────────────────────────────┐
│ [Logo] CV Solusi    [Home][Services][Portfolio] │
│        Surabaya     [About][Contact] [Menu ☰]   │
└─────────────────────────────────────────────────┘
```

### Hero Section
```
┌─────────────────────────────────────────────────┐
│              [Animated Background]              │
│                                                 │
│         CV SOLUSI SURABAYA                      │
│    Solusi Digital Terpercaya Untuk Bisnis      │
│              Anda                               │
│                                                 │
│    [Lihat Layanan]  [Hubungi Kami]            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Service Card Component
```
┌─────────────────────────┐
│      [Icon/Image]       │
│                         │
│    Service Title        │
│                         │
│  Brief description of   │
│  the service offered    │
│                         │
│    [Learn More]         │
└─────────────────────────┘
```

### Portfolio Card Component
```
┌─────────────────────────┐
│                         │
│    [Project Image]      │
│                         │
├─────────────────────────┤
│   Project Title         │
│   Technology Used       │
│   [View Details]        │
└─────────────────────────┘
```

## Animation Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Page
    participant Animations
    
    User->>Page: Loads website
    Page->>Animations: Initialize hero animations
    Animations->>Page: Particle background starts
    Animations->>Page: Typing effect begins
    
    User->>Page: Scrolls down
    Page->>Animations: Trigger scroll animations
    Animations->>Page: Fade in service cards
    Animations->>Page: Stagger animation sequence
    
    User->>Page: Hovers over card
    Page->>Animations: Trigger hover effects
    Animations->>Page: Scale and glow animation
    
    User->>Page: Clicks portfolio item
    Page->>Animations: Modal slide-in
    Animations->>Page: Backdrop fade in
```

## Interactive Elements Map

### Homepage Interactions
1. **Hero Section**
   - Animated typing effect for tagline
   - Particle background animation
   - CTA button hover effects

2. **Services Section**
   - Card hover animations (scale + glow)
   - Stagger animation on scroll
   - Icon animations on hover

3. **Portfolio Preview**
   - Image lazy loading
   - Modal popup on click
   - Filter animations

4. **Contact Section**
   - Form validation animations
   - Success/error feedback
   - Button ripple effects

### Navigation Interactions
1. **Desktop Navigation**
   - Smooth scroll to sections
   - Active state indicators
   - Hover underline animations

2. **Mobile Navigation**
   - Hamburger menu animation
   - Slide-in menu panel
   - Overlay backdrop

## Performance Considerations

### Critical Rendering Path
```mermaid
graph LR
    A[HTML Parse] --> B[CSS Parse]
    B --> C[Layout Calculation]
    C --> D[Paint]
    D --> E[Composite]
    
    F[JavaScript] --> G[DOM Manipulation]
    G --> H[Reflow/Repaint]
    
    I[Images] --> J[Lazy Load]
    J --> K[Progressive Enhancement]
```

### Loading Strategy
1. **Above the fold**: Critical CSS inline
2. **Hero section**: Priority loading
3. **Images**: Lazy loading with placeholders
4. **Animations**: Load after critical content
5. **Third-party**: Defer non-critical scripts

## Accessibility Wireframe Notes

### Keyboard Navigation Flow
```
Header Logo → Nav Menu → Hero CTA → Service Cards → 
Portfolio Items → Contact Form → Footer Links
```

### Screen Reader Structure
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- ARIA labels for interactive elements
- Skip navigation links
- Focus indicators for all interactive elements

### Color Contrast Compliance
- Text on dark background: #ffffff on #0a0a0a (21:1 ratio)
- Accent text: #00d4ff on #0a0a0a (12.6:1 ratio)
- Secondary text: #b3b3b3 on #0a0a0a (9.7:1 ratio)