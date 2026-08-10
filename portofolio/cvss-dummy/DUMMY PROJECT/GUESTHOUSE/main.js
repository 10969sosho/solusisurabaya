const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false

function splitWords(el) {
  if (!el) return []
  if (el.querySelector(".split-word")) return Array.from(el.querySelectorAll(".split-word"))

  const raw = (el.textContent || "").trim()
  if (!raw) return []

  const words = raw.split(/\s+/g)
  el.textContent = ""

  for (let i = 0; i < words.length; i += 1) {
    const span = document.createElement("span")
    span.className = "split-word"
    span.textContent = words[i]
    el.appendChild(span)
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "))
  }

  return Array.from(el.querySelectorAll(".split-word"))
}

function ensureHeroVisible() {
  const hero = document.querySelector(".hero")
  if (!hero) return

  const nodes = Array.from(hero.querySelectorAll("[data-animate]"))
  nodes.forEach((el) => el.classList.add("is-in"))

  const forceVisible = (el) => {
    const s = window.getComputedStyle(el)
    const isHidden = Number.parseFloat(s.opacity || "1") < 0.15
    if (!isHidden) return
    el.style.opacity = "1"
    el.style.transform = "none"
  }

  nodes.forEach(forceVisible)
  Array.from(hero.querySelectorAll(".split-word")).forEach((el) => {
    el.style.opacity = "1"
    el.style.transform = "none"
  })
}

function setupRevealFallback() {
  const items = Array.from(document.querySelectorAll("[data-animate]"))
  if (items.length === 0) return

  const markIn = (el) => el.classList.add("is-in")

  if (!("IntersectionObserver" in window)) {
    items.forEach(markIn)
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          markIn(entry.target)
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  )

  items.forEach((el) => io.observe(el))
}

function createSlider(root, { autoplayMs = 6200 } = {}) {
  const track = root.querySelector("[data-slider-track]")
  const slides = Array.from(root.querySelectorAll("[data-slide]"))
  const dotsRoot = root.querySelector("[data-slider-dots]")
  const btnPrev = root.querySelector("[data-slider-prev]")
  const btnNext = root.querySelector("[data-slider-next]")

  if (!track || slides.length === 0) return null

  const dotButtons = []
  let index = 0
  let timerId = null
  let pointerDown = false
  let startX = 0
  let deltaX = 0

  function setActiveClass() {
    Array.from(root.classList)
      .filter((c) => c.startsWith("is-active-slide-"))
      .forEach((c) => root.classList.remove(c))
    root.classList.add(`is-active-slide-${index}`)
  }

  function render() {
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`
    dotButtons.forEach((btn, i) => btn.classList.toggle("is-active", i === index))
    setActiveClass()
  }

  function setIndex(nextIndex) {
    const max = slides.length
    index = ((nextIndex % max) + max) % max
    render()
  }

  function next() {
    setIndex(index + 1)
  }

  function prev() {
    setIndex(index - 1)
  }

  function stopAutoplay() {
    if (timerId) window.clearInterval(timerId)
    timerId = null
  }

  function startAutoplay() {
    if (prefersReducedMotion) return
    stopAutoplay()
    if (autoplayMs <= 0) return
    timerId = window.setInterval(next, autoplayMs)
  }

  if (dotsRoot) {
    dotsRoot.innerHTML = ""
    for (let i = 0; i < slides.length; i += 1) {
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "slider__dot"
      btn.setAttribute("aria-label", `Slide ${i + 1}`)
      btn.addEventListener(
        "click",
        () => {
          setIndex(i)
          startAutoplay()
        },
        { passive: true }
      )
      dotsRoot.appendChild(btn)
      dotButtons.push(btn)
    }
  }

  btnNext?.addEventListener("click", () => {
    next()
    startAutoplay()
  })
  btnPrev?.addEventListener("click", () => {
    prev()
    startAutoplay()
  })

  const viewport = root.querySelector(".slider__viewport") || root

  viewport.addEventListener("pointerdown", (e) => {
    pointerDown = true
    startX = e.clientX
    deltaX = 0
    stopAutoplay()
    viewport.setPointerCapture?.(e.pointerId)
  })

  viewport.addEventListener("pointermove", (e) => {
    if (!pointerDown) return
    deltaX = e.clientX - startX
  })

  function endPointer() {
    if (!pointerDown) return
    pointerDown = false
    const threshold = 46
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) next()
      else prev()
    }
    startAutoplay()
  }

  viewport.addEventListener("pointerup", endPointer)
  viewport.addEventListener("pointercancel", endPointer)

  root.addEventListener("mouseenter", stopAutoplay)
  root.addEventListener("mouseleave", startAutoplay)

  render()
  startAutoplay()

  return { next, prev, setIndex, stopAutoplay, startAutoplay }
}

function initSliders() {
  const sliders = Array.from(document.querySelectorAll("[data-slider]"))
  sliders.forEach((el) => {
    const name = el.getAttribute("data-slider")
    const autoplayMs = name === "testi" ? 5200 : 6400
    createSlider(el, { autoplayMs })
  })
}

function initLenis() {
  if (prefersReducedMotion) return null
  if (!window.Lenis) return null

  const lenis = new window.Lenis({
    lerp: 0.095,
    wheelMultiplier: 0.95,
    smoothWheel: true,
    smoothTouch: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  if (window.gsap?.ticker) {
    window.gsap.ticker.add((t) => {
      lenis.raf(t * 1000)
    })
    window.gsap.ticker.lagSmoothing(0)
  }

  return lenis
}

function initScrollRevealGsap() {
  if (prefersReducedMotion) return false
  if (!window.gsap || !window.ScrollTrigger) return false

  const gsap = window.gsap
  gsap.registerPlugin(window.ScrollTrigger)

  const animated = Array.from(document.querySelectorAll("[data-animate]")).filter(
    (el) => !el.closest(".hero") && !el.closest("[data-loader]")
  )

  gsap.set(animated, { opacity: 0, y: 40 })

  const groups = Array.from(document.querySelectorAll("[data-stagger]"))

  const grouped = new Set()
  const getItemsForGroup = (groupEl) =>
    Array.from(groupEl.querySelectorAll("[data-animate]")).filter((el) => el.closest("[data-stagger]") === groupEl)

  groups.forEach((group) => {
    const items = getItemsForGroup(group)
    if (items.length === 0) return
    items.forEach((el) => grouped.add(el))

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: group,
        start: "top 82%",
        toggleActions: "play none none none",
      },
      onComplete: () => items.forEach((el) => el.classList.add("is-in")),
    })
  })

  animated
    .filter((el) => !grouped.has(el))
    .forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          toggleActions: "play none none none",
        },
        onComplete: () => el.classList.add("is-in"),
      })
    })

  const roomInfo = document.querySelector("[data-room-info]")
  if (roomInfo) {
    gsap.fromTo(
      roomInfo,
      { x: 22, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: roomInfo,
          start: "top 84%",
          toggleActions: "play none none none",
        },
      }
    )
  }

  window.ScrollTrigger.refresh()
  return true
}

function initHorizontalScrollGsap() {
  if (prefersReducedMotion) return false
  if (!window.gsap || !window.ScrollTrigger) return false
  if (window.innerWidth < 860) return false

  const gsap = window.gsap
  gsap.registerPlugin(window.ScrollTrigger)

  const pins = Array.from(document.querySelectorAll("[data-horizontal]"))
  pins.forEach((pin) => {
    const section = pin.closest(".experience")
    const scroller = pin.querySelector("[data-hscroll]")
    const track = pin.querySelector("[data-htrack]")
    const bar = pin.querySelector("[data-hprogress]")
    if (!scroller || !track) return

    section?.classList.add("is-enhanced")

    gsap.set(bar, { scaleX: 0, transformOrigin: "0 50%" })
    const cards = Array.from(track.querySelectorAll(".hcard"))
    if (cards.length) gsap.set(cards, { opacity: 0, y: 26 })

    const tween = gsap.to(track, {
      x: () => {
        const dist = track.scrollWidth - scroller.clientWidth
        return -Math.max(0, dist)
      },
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => {
          const dist = track.scrollWidth - scroller.clientWidth
          return `+=${Math.max(0, dist)}`
        },
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress })
        },
      },
    })

    const imgs = Array.from(track.querySelectorAll("img"))
    if (imgs.length) {
      gsap.to(imgs, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: tween.scrollTrigger,
      })
    }

    if (cards.length) {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pin,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }
  })

  window.ScrollTrigger.refresh()
  return true
}

function initGsapAnimations() {
  if (prefersReducedMotion) return { ran: false }
  if (!window.gsap) return { ran: false }

  const loader = document.querySelector("[data-loader]")
  const page = document.querySelector("[data-page]")
  const title = document.querySelector("[data-loader-title]")
  const subtitle = document.querySelector("[data-loader-subtitle]")
  const line = document.querySelector("[data-loader-line]")
  const heroBgImg = document.querySelector("[data-hero-bg] img")
  const heroText = document.querySelector("[data-hero-text]")
  const heroOverlay = document.querySelector(".hero__overlay")

  const tl = window.gsap.timeline({
    defaults: { ease: "power3.out" },
  })

  tl.set(page, { opacity: 1 })
  tl.set([title, subtitle], { opacity: 0, y: 20 })
  tl.set(line, { scaleX: 0 })

  tl.to(title, { opacity: 1, y: 0, duration: 0.55 }, 0.15)
  tl.to(subtitle, { opacity: 1, y: 0, duration: 0.55 }, 0.25)
  tl.to(
    title,
    {
      letterSpacing: "0.18em",
      duration: 1.1,
      ease: "power3.out",
    },
    0.25
  )
  tl.to(line, { scaleX: 1, duration: 1.35 }, 0.55)
  tl.to(
    loader,
    {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.55,
      pointerEvents: "none",
    },
    2.1
  )
  tl.add(() => {
    document.documentElement.classList.add("is-ready")
    loader?.remove()
  })

  if (heroBgImg) {
    tl.to(
      heroBgImg,
      {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      2.25
    )
  }

  if (heroText) {
    const eyebrow = heroText.querySelector(".hero__eyebrow")
    const heroTitle = heroText.querySelector("[data-split]")
    const words = splitWords(heroTitle)
    const heroSubtitle = heroText.querySelector(".hero__subtitle")
    const heroLine = heroText.querySelector(".hero__line")
    const actions = heroText.querySelector(".hero__actions")
    const indicator = heroText.querySelector(".scroll-indicator")

    tl.set([eyebrow, heroTitle, heroSubtitle, heroLine, actions, indicator], { opacity: 0, y: 46 })
    if (words.length) tl.set(words, { opacity: 0, y: 64, rotateX: 22, transformOrigin: "50% 100%" })

    if (heroOverlay) tl.fromTo(heroOverlay, { opacity: 0.25 }, { opacity: 1, duration: 1.1 }, 2.24)

    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55 }, 2.32)

    if (words.length) {
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.06,
        },
        2.42
      )
      tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.01 }, 2.42)
    } else {
      tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.75 }, 2.42)
    }

    tl.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.7 }, 2.64)
    tl.fromTo(heroLine, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.75 }, 2.72)
    tl.to(actions, { opacity: 1, y: 0, duration: 0.7 }, 2.82)
    tl.to(indicator, { opacity: 1, y: 0, duration: 0.7 }, 2.95)
    tl.add(() => {
      heroText.querySelectorAll("[data-animate]").forEach((el) => el.classList.add("is-in"))
    }, 3.02)
  }

  if (window.gsap?.registerPlugin && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger)

    if (heroBgImg) {
      window.gsap.to(heroBgImg, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: document.querySelector("[data-hero]"),
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      })
    }

    window.ScrollTrigger.refresh()
  }

  initScrollRevealGsap()
  initHorizontalScrollGsap()

  tl.eventCallback("onComplete", () => {
    ensureHeroVisible()
  })

  return { ran: true }
}

function initBasicNoGsap() {
  const loader = document.querySelector("[data-loader]")
  const page = document.querySelector("[data-page]")
  const title = document.querySelector("[data-loader-title]")
  const subtitle = document.querySelector("[data-loader-subtitle]")
  const line = document.querySelector("[data-loader-line]")

  if (page) page.style.opacity = "1"

  if (title) {
    title.style.opacity = "1"
    title.style.transform = "translateY(0)"
  }
  if (subtitle) {
    subtitle.style.opacity = "1"
    subtitle.style.transform = "translateY(0)"
  }
  if (line) line.style.transform = "scaleX(1)"

  window.setTimeout(() => {
    document.documentElement.classList.add("is-ready")
    if (loader) {
      loader.style.opacity = "0"
      loader.style.filter = "blur(10px)"
      loader.style.pointerEvents = "none"
      window.setTimeout(() => loader.remove(), 500)
    }
    ensureHeroVisible()
  }, 2400)
}

function main() {
  const hasGsap = Boolean(window.gsap)
  const hasScrollTrigger = Boolean(window.ScrollTrigger)
  if (!hasGsap || !hasScrollTrigger || prefersReducedMotion) setupRevealFallback()
  initSliders()
  initLenis()

  const { ran } = initGsapAnimations()
  if (!ran) initBasicNoGsap()

  window.setTimeout(() => {
    ensureHeroVisible()
  }, 3600)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main, { once: true })
} else {
  main()
}
