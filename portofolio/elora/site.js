/* ÉLORA demo: shared navigation, cart, and cinematic GSAP motion.
   Plugins: ScrollTrigger, ScrollSmoother, SplitText, ScrambleText, CustomEase,
   ScrollTo, Observer, Draggable + Inertia, Flip. */
(function () {
  'use strict';

  const products = {
    renewal: { id: 'renewal', name: 'Renewal Serum', category: 'Treatment', price: 88, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=82' },
    cream: { id: 'cream', name: 'Hydrating Cream', category: 'Hydration', price: 72, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=82' },
    oil: { id: 'oil', name: 'Cleansing Oil', category: 'Cleanse', price: 54, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=82' },
    essence: { id: 'essence', name: 'Brightening Essence', category: 'Treatment', price: 62, image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=500&q=82' },
    night: { id: 'night', name: 'Night Recovery', category: 'Treatment', price: 96, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee38d3?auto=format&fit=crop&w=500&q=82' },
    eye: { id: 'eye', name: 'Eye Contour', category: 'Treatment', price: 68, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=82' },
    lip: { id: 'lip', name: 'Lip Treatment', category: 'Treatment', price: 28, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=82' },
    veil: { id: 'veil', name: 'Daily Veil SPF', category: 'Protection', price: 48, image: 'https://images.unsplash.com/photo-1556228852-80a5b7fcb9cc?auto=format&fit=crop&w=500&q=82' }
  };
  const storageKey = 'elora-bag';
  const getBag = () => JSON.parse(localStorage.getItem(storageKey) || '[]');
  const saveBag = (bag) => localStorage.setItem(storageKey, JSON.stringify(bag));
  const money = (value) => `$${value.toFixed(2)}`;
  window.__eloraProgress = 0;

  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const pluginList = hasGSAP
    ? [window.ScrollTrigger, window.ScrollSmoother, window.SplitText, window.CustomEase, window.ScrambleTextPlugin, window.ScrollToPlugin, window.Observer, window.Draggable, window.InertiaPlugin, window.Flip].filter(Boolean)
    : [];
  if (hasGSAP) gsap.registerPlugin(...pluginList);
  const eloraOut = hasGSAP && window.CustomEase
    ? CustomEase.create('eloraOut', 'M0,0 C0.14,0.48 0.24,0.82 0.46,0.94 0.66,1.05 0.86,1 1,1')
    : 'power4.out';

  if (hasGSAP) gsap.set('.page-wipe', { scaleY: 1 });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hasGSAP && reduceMotion) gsap.set('.page-wipe', { scaleY: 0 });

  const footer = document.querySelector('[data-site-footer]');
  if (footer) footer.innerHTML = `<footer class="site-footer"><a href="index.html" class="footer-brand">ÉLORA<span class="brand-dot">.</span></a><nav class="footer-nav" aria-label="Footer navigation"><a href="shop.html">Shop collection</a><a href="about.html">Our philosophy</a><a href="journal.html">Journal</a><a href="cart.html">Your bag</a></nav><div class="footer-end"><p>New York · Paris · Everywhere</p><p>© 2024 ÉLORA Studio</p></div></footer>`;

  const makeOverlay = (type) => {
    const target = document.querySelector(`[data-${type}]`);
    if (!target) return null;
    target.className = `overlay-panel ${type}-panel`;
    target.innerHTML = type === 'bag' ? `<div class="overlay-backdrop" data-close-overlay></div><aside class="overlay-surface"><div class="drag-grip" aria-hidden="true"></div><div class="overlay-head"><span class="eyebrow">Your selection</span><button class="overlay-close" type="button" data-close-overlay aria-label="Close">×</button></div><h2 class="overlay-title">Your bag <span class="bag-count">0</span></h2><div class="bag-items"></div><div class="bag-summary"><div class="bag-total"><span>Subtotal</span><strong>$0.00</strong></div><a class="button button-dark" href="cart.html">View bag <span>↗</span></a></div></aside>` : type === 'menu' ? `<div class="overlay-backdrop" data-close-overlay></div><aside class="overlay-surface menu-surface"><div class="overlay-head"><a class="brand-mark" href="index.html">ÉLORA<span class="brand-dot">.</span></a><button class="overlay-close" type="button" data-close-overlay aria-label="Close">×</button></div><nav class="menu-links"><a href="shop.html">Shop</a><a href="about.html">About</a><a href="journal.html">Journal</a><a href="cart.html">Bag</a></nav><div class="menu-footer"><span>New York / Paris</span><span>Est. 2024</span></div></aside>` : `<div class="overlay-backdrop" data-close-overlay></div><aside class="overlay-surface search-surface"><div class="overlay-head"><span class="eyebrow">Search ÉLORA</span><button class="overlay-close" type="button" data-close-overlay aria-label="Close">×</button></div><form class="search-form" data-search-form><label class="sr-only" for="site-search">Search</label><input id="site-search" type="search" placeholder="Search the ritual"><button type="submit">↗</button></form></aside>`;
    return target;
  };
  const overlays = { bag: makeOverlay('bag'), menu: makeOverlay('menu'), search: makeOverlay('search') };
  let bagDraggable = null;

  const openOverlay = (type) => {
    const el = overlays[type]; if (!el) return;
    el.classList.add('is-open'); document.body.classList.add(`${type}-open`);
    const surface = el.querySelector('.overlay-surface'); const backdrop = el.querySelector('.overlay-backdrop');
    if (window.gsap) {
      gsap.killTweensOf([surface, backdrop]);
      if (type === 'search') {
        gsap.set(surface, { transformOrigin: 'center top' });
        gsap.timeline()
          .to(backdrop, { autoAlpha: 1, duration: .3, ease: 'power2.out' })
          .fromTo(surface, { y: -26, scaleY: .94, autoAlpha: 0 }, { y: 0, scaleY: 1, autoAlpha: 1, duration: .55, ease: eloraOut }, 0);
        setTimeout(() => el.querySelector('input')?.focus(), 380);
      } else {
        gsap.timeline()
          .to(backdrop, { autoAlpha: 1, duration: .3, ease: 'power2.out' })
          .to(surface, { x: 0, duration: .65, ease: eloraOut }, 0);
      }
    }
    if (type === 'bag') { renderBag(); if (bagDraggable) bagDraggable.enable(); }
  };
  const closeOverlay = (type) => {
    const el = overlays[type]; if (!el || !el.classList.contains('is-open')) return;
    if (type === 'bag' && bagDraggable) bagDraggable.disable();
    const surface = el.querySelector('.overlay-surface'); const backdrop = el.querySelector('.overlay-backdrop');
    const onDone = () => { el.classList.remove('is-open'); document.body.classList.remove(`${type}-open`); if (type === 'menu') document.querySelector('.menu-trigger')?.classList.remove('is-open'); };
    if (window.gsap) {
      const tween = gsap.timeline({ onComplete: onDone });
      tween.to(backdrop, { autoAlpha: 0, duration: .25 }, 0)
        .to(surface, type === 'search' ? { y: '-100%', scaleY: .98, duration: .45, ease: 'power3.in' } : { x: '100%', duration: .45, ease: 'power3.in' }, 0);
    } else onDone();
  };

  function flyToBag(source) {
    if (!source || !window.Flip) return;
    const target = document.querySelector('.bag-trigger .bag-count') || document.querySelector('.bag-trigger');
    if (!target) return;
    const clone = source.cloneNode(true);
    const rect = source.getBoundingClientRect();
    clone.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;z-index:120;pointer-events:none;overflow:hidden;margin:0;`;
    document.body.appendChild(clone);
    const state = Flip.getState(clone);
    const tRect = target.getBoundingClientRect();
    clone.style.left = `${tRect.left + tRect.width / 2}px`;
    clone.style.top = `${tRect.top + tRect.height / 2}px`;
    clone.style.width = '16px';
    clone.style.height = '16px';
    clone.style.opacity = '0.4';
    Flip.from(state, { duration: .85, ease: 'power3.inOut', scale: true, onComplete: () => clone.remove() });
    gsap.fromTo('.bag-trigger .bag-count, .bag-count', { scale: 1 }, { scale: 1.5, duration: .28, yoyo: true, repeat: 1, ease: 'power2.inOut' });
  }

  document.addEventListener('click', (event) => {
    const open = event.target.closest('[data-open-bag]'); if (open) openOverlay('bag');
    const search = event.target.closest('.search-trigger'); if (search) openOverlay('search');
    const menu = event.target.closest('.menu-trigger'); if (menu) { const isOpen = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!isOpen)); if (isOpen) closeOverlay('menu'); else { menu.classList.add('is-open'); openOverlay('menu'); } }
    const close = event.target.closest('[data-close-overlay]'); if (close) Object.keys(overlays).forEach(closeOverlay);
    const add = event.target.closest('[data-add-product]'); if (add) { const source = add.closest('.product-tile')?.querySelector('img') || add.closest('.product-detail-hero')?.querySelector('.detail-visual img'); addToBag(add.dataset.addProduct, Number(add.dataset.quantity || 1), source); }
    const remove = event.target.closest('[data-remove-product]'); if (remove) removeFromBag(remove.dataset.removeProduct);
  });
  document.addEventListener('submit', (event) => {
    if (event.target.matches('.newsletter-form')) { event.preventDefault(); const button = event.target.querySelector('button'); button.textContent = '✓'; event.target.reset(); }
    if (event.target.matches('[data-search-form]')) { event.preventDefault(); const value = event.target.querySelector('input').value.trim(); if (value) window.location.href = `shop.html?search=${encodeURIComponent(value)}`; }
  });
  function addToBag(id, quantity, source) {
    const product = products[id]; if (!product) return;
    const bag = getBag();
    const existing = bag.find(item => item.id === id);
    if (existing) existing.quantity += quantity; else bag.push({ ...product, quantity });
    saveBag(bag); updateBagCount();
    if (overlays.bag) { flyToBag(source); gsap.delayedCall(.45, () => openOverlay('bag')); }
  }
  function removeFromBag(id) { saveBag(getBag().filter(item => item.id !== id)); updateBagCount(); renderBag(); renderCartPage(); }
  function updateQuantity(id, amount) { const bag = getBag(); const item = bag.find(entry => entry.id === id); if (!item) return; item.quantity = Math.max(1, item.quantity + amount); saveBag(bag); updateBagCount(); renderBag(); renderCartPage(); }
  function updateBagCount() { const count = getBag().reduce((sum, item) => sum + item.quantity, 0); document.querySelectorAll('.bag-count').forEach(el => el.textContent = count); }
  function renderBag() { const root = document.querySelector('.bag-items'); if (!root) return; const bag = getBag(); root.innerHTML = bag.length ? bag.map(item => `<div class="bag-item"><div class="bag-item-image"><img src="${item.image}" alt="${item.name}"></div><div><h3>${item.name}</h3><p>${item.quantity} × ${money(item.price)}</p></div><button class="bag-item-remove" data-remove-product="${item.id}" aria-label="Remove ${item.name}">×</button></div>`).join('') : '<p class="bag-empty">Your ritual is waiting.</p>'; const total = bag.reduce((sum, item) => sum + item.price * item.quantity, 0); document.querySelectorAll('.bag-total strong').forEach(el => el.textContent = money(total)); }
  function renderCartPage() { const root = document.querySelector('[data-cart-lines]'); if (!root) return; const bag = getBag(); root.innerHTML = bag.length ? bag.map(item => `<article class="cart-line"><div class="cart-line-image"><img src="${item.image}" alt="${item.name}"></div><div><p>${item.category}</p><h2>${item.name}</h2><div class="quantity-control"><button data-quantity-change="${item.id}" data-change="-1">−</button><span>${item.quantity}</span><button data-quantity-change="${item.id}" data-change="1">+</button></div></div><div><strong>${money(item.price * item.quantity)}</strong><br><button class="remove-link" data-remove-product="${item.id}">Remove</button></div></article>`).join('') : '<p class="bag-empty">Your bag is currently empty.<br><a class="underlink" href="shop.html">Explore the collection <span>↗</span></a></p>'; const total = bag.reduce((sum, item) => sum + item.price * item.quantity, 0); document.querySelectorAll('[data-cart-total]').forEach(totalEl => totalEl.textContent = money(total)); }
  document.addEventListener('click', (event) => { const control = event.target.closest('[data-quantity-change]'); if (control) updateQuantity(control.dataset.quantityChange, Number(control.dataset.change)); });
  updateBagCount(); renderCartPage();

  function setupMotion() {
    if (!hasGSAP) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { gsap.set('.page-wipe', { scaleY: 0 }); return; }

    let smoother = null;
    if (window.ScrollSmoother) {
      const setSpeed = (selector, speed, lag) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (speed) el.dataset.speed = speed;
          if (lag) el.dataset.lag = lag;
        });
      };
      setSpeed('.hero-media', '1.08');
      setSpeed('.hero-title', '0.9');
      setSpeed('.ingredient-image', '1.06');
      setSpeed('.about-image-band', '1.08');
      setSpeed('.detail-story-image', '1.05');
      setSpeed('.journal-image', '1.05');
      setSpeed('.philosophy-quote', null, '0.4');
      setSpeed('.story-caption', null, '0.5');
      setSpeed('.ghost-word', '0.85', '0.2');
      const wrapper = document.createElement('div');
      wrapper.id = 'smooth-wrapper';
      const content = document.createElement('div');
      content.id = 'smooth-content';
      const body = document.body;
      const fixedSelectors = ['.site-header', '.page-wipe', '[data-menu]', '[data-bag]', '[data-search]'];
      const fixedEls = fixedSelectors.map((sel) => document.querySelector(sel)).filter(Boolean);
      fixedEls.forEach((el) => wrapper.appendChild(el));
      Array.from(body.children).filter((el) => el.tagName !== 'SCRIPT').forEach((el) => content.appendChild(el));
      wrapper.appendChild(content);
      body.appendChild(wrapper);
      smoother = ScrollSmoother.create({ wrapper, content, smooth: 1.05, effects: true, smoothTouch: false });
    }

    gsap.to('.page-wipe', { scaleY: 0, duration: 1.05, ease: eloraOut, transformOrigin: 'top' });

    const hero = document.querySelector('.hero-home');
    if (hero && window.SplitText) {
      const title = hero.querySelector('.hero-title');
      const split = SplitText.create(title, { type: 'chars', smartWrap: true, charsClass: 'split-char' });
      title.classList.add('is-split');
      const eyebrow = hero.querySelector('.hero-eyebrow');
      const eyebrowText = eyebrow.textContent;
      const tl = gsap.timeline({ defaults: { ease: eloraOut } });
      tl.addLabel('open', 0)
        .fromTo('.hero-media', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0% 0% 0% 0)', duration: 1.5, ease: eloraOut }, 'open+=0.08')
        .fromTo('.hero-media img', { scale: 1.35 }, { scale: 1.06, duration: 2.3, ease: eloraOut }, 'open+=0.08')
        .from(split.chars, { y: 110, rotation: 6, autoAlpha: 0, duration: 1.35, stagger: { each: 0.02, from: 'start' } }, 'open+=0.55')
        .from(eyebrow, { duration: 1, scrambleText: { text: eyebrowText, chars: 'AEIOUSTUDYNSK/0123456789', speed: 0.45, revealDelay: 0.25 } }, 'open+=0.3')
        .from('.hero-bottom', { y: 34, autoAlpha: 0, duration: .9 }, 'open+=1.2')
        .from('.scroll-cue', { autoAlpha: 0, duration: .6 }, 'open+=1.6');
    }

    document.querySelectorAll('.display-lg, .display-md, .page-intro h1, .about-hero h1, .detail-info h1').forEach((el) => {
      if (!window.SplitText || el.closest('.hero-home') || el.closest('[data-newsletter]')) return;
      const split = SplitText.create(el, { type: 'chars', smartWrap: true, charsClass: 'split-char' });
      el.classList.add('is-split');
      gsap.from(split.chars, { y: 82, rotation: 4, autoAlpha: 0, duration: 1.15, ease: eloraOut, stagger: { each: 0.016, from: 'start' }, scrollTrigger: { trigger: el, start: 'top 76%', once: true } });
    });

    gsap.utils.toArray('.reveal-up').forEach((element) => {
      gsap.from(element, { y: 60, autoAlpha: 0, duration: 1.1, ease: eloraOut, scrollTrigger: { trigger: element, start: 'top 78%', once: true } });
    });

    gsap.utils.toArray('.reveal-image, .ingredient-image, .journal-image, .detail-visual').forEach((container) => {
      if (container.closest('.hero-home') || container.closest('.about-hero')) return;
      const img = container.querySelector('img');
      if (!img) return;
      gsap.timeline({ scrollTrigger: { trigger: container, start: 'top 76%', once: true } })
        .fromTo(container, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0% 0% 0% 0)', duration: 1.25, ease: eloraOut, clearProps: 'clipPath' })
        .fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.7, ease: eloraOut, clearProps: 'transform' }, 0);
    });

    document.querySelectorAll('.section-kicker span:first-child, .story-index').forEach((el) => {
      const original = el.textContent;
      gsap.from(el, { duration: 1, scrambleText: { text: original, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', speed: 0.5, revealDelay: 0.2 }, scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    });

    const intro = document.querySelector('.intro');
    if (intro && !document.querySelector('.marquee')) {
      const words = ['Renewal', 'Radiance', 'Ritual', 'Balance', 'ÉLORA'];
      const groupHTML = words.map((word) => `<span class="marquee-word">${word}</span><span class="marquee-sep">✳</span>`).join('');
      intro.insertAdjacentHTML('afterend', `<section class="marquee" aria-hidden="true"><div class="marquee-track"><div class="marquee-group">${groupHTML}</div><div class="marquee-group">${groupHTML}</div></div></section>`);
      gsap.to('.marquee-group', { xPercent: -100, duration: 30, ease: 'none', repeat: -1 });
      const track = document.querySelector('.marquee-track');
      const skewTo = gsap.quickTo(track, 'skewX', { duration: .5, ease: 'power3' });
      ScrollTrigger.create({ onUpdate: (self) => skewTo(gsap.utils.clamp(-9, 9, self.getVelocity() / -70)) });
    }

    const story = document.querySelector('.story-section');
    if (story) {
      ScrollTrigger.create({ trigger: story, start: 'top bottom', end: 'bottom top', onUpdate: (self) => { window.__eloraProgress = self.progress; } });
      gsap.from('.story-product', { rotation: -14, scale: .66, y: 80, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: story, start: 'top 72%', end: 'center center', scrub: 1 } });
      gsap.to('.story-orbit', { rotation: '+=40', ease: 'none', scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.from('.story-caption', { autoAlpha: 0, y: 26, scrollTrigger: { trigger: story, start: 'center 68%', once: true } });
    }

    document.querySelectorAll('[data-horizontal]').forEach((wrap) => {
      const track = wrap.querySelector('.horizontal-track');
      const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
      const tween = gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 52%', end: () => `+=${distance() + window.innerHeight * 0.55}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      if (window.Observer) {
        Observer.create({
          target: wrap,
          type: 'wheel',
          tolerance: 8,
          onChangeY: (self) => {
            const skew = gsap.utils.clamp(-3, 3, self.deltaY * -0.015);
            gsap.to(track, { skewX: skew, duration: .28, ease: 'power2.out', overwrite: true, onComplete: () => gsap.to(track, { skewX: 0, duration: .45, ease: 'power3.out' }) });
          }
        });
      }
    });

    document.querySelectorAll('.about-hero-image img').forEach((img) => {
      gsap.to(img, { scale: 1.12, duration: 18, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (finePointer) {
      const cursor = document.createElement('div');
      cursor.className = 'cursor';
      cursor.innerHTML = '<span class="cursor-dot"></span><span class="cursor-ring"></span>';
      document.body.appendChild(cursor);
      const dot = cursor.querySelector('.cursor-dot');
      const ring = cursor.querySelector('.cursor-ring');
      const dotX = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power3' });
      const dotY = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power3' });
      const ringX = gsap.quickTo(ring, 'x', { duration: .4, ease: 'power3' });
      const ringY = gsap.quickTo(ring, 'y', { duration: .4, ease: 'power3' });
      window.addEventListener('pointermove', (e) => { dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY); });
      document.querySelectorAll('a, button, .product-image, .journal-image, .collection-image').forEach((el) => {
        el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 1.9, borderColor: '#d9a73f', duration: .35, ease: 'power2.out' }));
        el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, borderColor: 'rgba(31,36,33,.28)', duration: .35, ease: 'power2.out' }));
      });
      document.querySelectorAll('.button, .bag-trigger, .underlink, .menu-trigger').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: .4, ease: 'power3' });
        const yTo = gsap.quickTo(btn, 'y', { duration: .4, ease: 'power3' });
        btn.addEventListener('pointermove', (e) => {
          const rect = btn.getBoundingClientRect();
          xTo((e.clientX - (rect.left + rect.width / 2)) * 0.22);
          yTo((e.clientY - (rect.top + rect.height / 2)) * 0.32);
        });
        btn.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
      });
    }

    if (window.Draggable && window.InertiaPlugin && overlays.bag) {
      const surface = overlays.bag.querySelector('.overlay-surface');
      bagDraggable = Draggable.create(surface, {
        type: 'x',
        edgeResistance: 0.9,
        inertia: true,
        bounds: { minX: 0, maxX: 120 },
        onDragEnd() { handleSheetDragEnd(this); },
        onThrowComplete() { if (this.x > 90) { this.disable(); closeOverlay('bag'); } else gsap.to(surface, { x: 0, duration: .6, ease: 'elastic.out(1, .55)' }); }
      })[0];
      function handleSheetDragEnd(self) {
        const velocity = self.getVelocity('x');
        if (self.x > 120 || velocity > 0.45) { if (self.tween) self.tween.kill(); self.disable(); closeOverlay('bag'); }
        else { if (self.tween) self.tween.kill(); gsap.to(surface, { x: 0, duration: .7, ease: 'elastic.out(1, .55)' }); }
      }
      bagDraggable.disable();
    }

    const header = document.querySelector('.site-header');
    if (header) ScrollTrigger.create({ start: 'top -40', onUpdate: (self) => header.classList.toggle('is-solid', self.scroll() > 40) });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download') || link.href.startsWith('mailto:') || link.href.includes('#') || link.origin !== window.location.origin || !window.gsap) return;
    if (reduceMotion) { window.location.href = link.href; return; }
    event.preventDefault();
    gsap.to('.page-wipe', { scaleY: 1, duration: .55, ease: 'power4.inOut', transformOrigin: 'bottom', onComplete: () => { window.location.href = link.href; } });
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setupMotion); else setupMotion();
})();
