// --- CONFIGURATION ---
const CONFIG = {
    duration: 3.5, // Total loading time approx
    colors: {
        light: 0xffffff,
        ambient: 0x404040,
        spot: 0x8a2be2 // Blue/Purple accent light
    }
};

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance opt
document.getElementById('canvas-container').appendChild(renderer.domElement);

// --- LIGHTING ---
// Ambient light base
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lebih netral
scene.add(ambientLight);

// Main Key Light (Warm/Neutral)
const spotLight = new THREE.SpotLight(0xffffff, 50); // Boost intensity
spotLight.position.set(10, 10, 10);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 1;
scene.add(spotLight);

// Rim Light (Accent - Blue/Purple) - Biar objek "pop" dari background
const rimLight = new THREE.DirectionalLight(0x4444ff, 5);
rimLight.position.set(-5, 5, -5); // Backlight position
scene.add(rimLight);

// Fill Light (Cool)
const fillLight = new THREE.PointLight(0x00aaff, 2, 100);
fillLight.position.set(-10, 0, 10);
scene.add(fillLight);

// --- 3D OBJECT (The "Center Object") ---
// Using an Icosahedron for that "Abstract geometry" feel
const geometry = new THREE.IcosahedronGeometry(1, 0); // Low poly (detail level 0)
const material = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a, // Lighter grey instead of near-black
    roughness: 0.2, // Sedikit lebih kasar biar nangkep cahaya
    metalness: 0.9, // Sangat metalik untuk pantulan
    flatShading: true,
    transparent: true,
    opacity: 1
});

const mainObject = new THREE.Mesh(geometry, material);
scene.add(mainObject);

// Global Array for Particles (so animate() can access them)
const nodes = [];
const idle = { mix: 1 };

let useMainTarget = false;
const mainTarget = {
    px: 0,
    py: 0,
    pz: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    sx: 1,
    sy: 1,
    sz: 1
};

function syncMainTargetFromObject() {
    mainTarget.px = mainObject.position.x;
    mainTarget.py = mainObject.position.y;
    mainTarget.pz = mainObject.position.z;
    mainTarget.rx = mainObject.rotation.x;
    mainTarget.ry = mainObject.rotation.y;
    mainTarget.rz = mainObject.rotation.z;
    mainTarget.sx = mainObject.scale.x;
    mainTarget.sy = mainObject.scale.y;
    mainTarget.sz = mainObject.scale.z;
}

function lerpAngle(current, target, alpha) {
    let delta = (target - current) % (Math.PI * 2);
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    return current + delta * alpha;
}

const _tmpVec3 = new THREE.Vector3();

// Add a wireframe overlay for extra "tech" feel
const wireGeo = new THREE.IcosahedronGeometry(1.01, 0);
const wireMat = new THREE.MeshBasicMaterial({ 
    color: 0x88ccff, // Terangin wireframenya (cyan)
    wireframe: true, 
    transparent: true, 
    opacity: 0.15 // Tapi lebih tipis biar elegan
});
const wireframe = new THREE.Mesh(wireGeo, wireMat);
mainObject.add(wireframe);

// Initial State
camera.position.z = 5;
mainObject.scale.set(0, 0, 0); // Start hidden for animation

// --- RESIZE HANDLER ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- LENIS SETUP (Smooth Scroll) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

// Stop Lenis initially (Prevent scroll during loading)
lenis.stop();

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

function normalizeIndoNumber(value) {
    const digits = String(value || '').replace(/[^\d]/g, '');
    if (!digits) return '';
    if (digits.startsWith('62')) return digits;
    if (digits.startsWith('0')) return `62${digits.slice(1)}`;
    if (digits.startsWith('8')) return `62${digits}`;
    return digits;
}

function buildWhatsAppMessage({ name, wa, company, business }) {
    return `Halo Solusi Surabaya,

Saya ${name || '-'} dari ${company || '-'} (${business || '-'}).

Saya tertarik dengan layanan pembuatan website / sistem digital. Mohon info lebih lanjut dan penawaran terbaiknya.

Terima kasih.`;
}

function setupSmoothAnchors() {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchors.forEach((a) => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const rawProgress = target.dataset.scrollProgress;
            if (rawProgress && typeof ScrollTrigger !== 'undefined') {
                const trigger = ScrollTrigger.getById('who-we-are-pin');
                if (trigger) {
                    const progress = Math.min(1, Math.max(0, Number(rawProgress)));
                    const y = trigger.start + (trigger.end - trigger.start) * progress;
                    lenis.scrollTo(y);
                    return;
                }
            }

            lenis.scrollTo(target, { offset: -90 });
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = String(formData.get('name') || '').trim();
        const wa = normalizeIndoNumber(String(formData.get('wa') || '').trim());
        const company = String(formData.get('company') || '').trim();
        const business = String(formData.get('business') || '').trim();

        if (!name || !wa) return;

        const target = normalizeIndoNumber(form.dataset.waTarget || '');
        if (!target) return;

        const message = buildWhatsAppMessage({ name, wa, company, business });
        const url = `https://wa.me/${encodeURIComponent(target)}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    });
}

function setupClientLogoRotator() {
    // Static client display - no rotation needed, real names are in HTML
    const row = document.querySelector('#trusted-by .logo-row');
    if (!row) return;
    // Simply ensure all pills are visible
    const pills = Array.from(row.querySelectorAll('.logo-pill'));
    pills.forEach(p => { p.style.opacity = '1'; });
}

function setupWhyChooseCarousel() {
    const carousel = document.querySelector('#why-choose-us [data-carousel="why"]');
    if (!carousel) return;

    const viewport = carousel.querySelector('.carousel-viewport');
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-track > .feature'));
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    if (!viewport || !track || slides.length === 0 || !prevBtn || !nextBtn) return;

    let index = 0;

    function perView() {
        return window.innerWidth <= 980 ? 1 : 2;
    }

    function stepPx() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap || '0') || 0;
        return slideWidth + gap;
    }

    function clampIndex(nextIndex) {
        const maxIndex = Math.max(0, slides.length - perView());
        return Math.min(maxIndex, Math.max(0, nextIndex));
    }

    function update() {
        index = clampIndex(index);
        track.style.transform = `translate3d(${-index * stepPx()}px, 0, 0)`;
    }

    prevBtn.addEventListener('click', () => {
        if (index <= 0) {
            index = Math.max(0, slides.length - perView());
        } else {
            index -= 1;
        }
        update();
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, slides.length - perView());
        if (index >= maxIndex) {
            index = 0;
        } else {
            index += 1;
        }
        update();
    });

    window.addEventListener('resize', () => {
        update();
    });

    update();
}

function setupTestimonialRotator() {
    const rotator = document.querySelector('[data-testimonial-rotator]');
    if (!rotator) return;
    if (rotator.dataset.rotatorInit === '1') return;
    rotator.dataset.rotatorInit = '1';

    const slides = Array.from(rotator.querySelectorAll('.quote-card'));
    if (slides.length === 0) return;

    slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === 0);
    });

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion) return;

    let index = 0;
    window.setInterval(() => {
        slides[index]?.classList.remove('is-active');
        index = (index + 1) % slides.length;
        slides[index]?.classList.add('is-active');
    }, 2000);
}

function setupNavbarScrollBehavior() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const items = Array.from(header.querySelectorAll('.brand, .nav-links a, .nav-cta'));
    const letters = [];

    items.forEach((el) => {
        if (el.dataset.splitDone === '1') return;
        const text = (el.textContent || '').trim();
        if (!text) return;

        el.dataset.splitDone = '1';
        el.setAttribute('aria-label', text);

        const frag = document.createDocumentFragment();
        Array.from(text).forEach((ch) => {
            const span = document.createElement('span');
            span.setAttribute('aria-hidden', 'true');
            span.style.display = 'inline-block';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            frag.appendChild(span);
            letters.push(span);
        });
        el.textContent = '';
        el.appendChild(frag);
    });

    const animateLettersIn = () => {
        if (letters.length === 0) return;
        gsap.fromTo(
            letters,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', stagger: 0.004, overwrite: true }
        );
    };

    gsap.set(header, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
    animateLettersIn();

    let visible = true;
    const hide = () => {
        if (!visible) return;
        visible = false;
        gsap.to(header, { autoAlpha: 0, y: -14, filter: 'blur(10px)', duration: 0.35, ease: 'power2.out', overwrite: true });
    };
    const show = () => {
        if (visible) return;
        visible = true;
        gsap.to(header, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
            onStart: animateLettersIn
        });
    };

    ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
            const y = window.scrollY || 0;
            if (y < 24) {
                show();
                return;
            }
            if (self.direction === 1) hide();
            else show();
        }
    });
}

function setupFloatingWhatsApp() {
    const widget = document.querySelector('.whatsapp-float');
    if (!widget) return;

    const form = document.getElementById('contact-form');
    const target = normalizeIndoNumber(form?.dataset?.waTarget || '');
    if (!target) return;

    const baseMessage = 'Halo Solusi Surabaya, saya tertarik dengan layanan pembuatan website / sistem digital. Mohon info lebih lanjut.';
    const url = `https://wa.me/${encodeURIComponent(target)}?text=${encodeURIComponent(baseMessage)}`;
    widget.setAttribute('href', url);
}

setupSmoothAnchors();
setupContactForm();
setupClientLogoRotator();
setupWhyChooseCarousel();
setupTestimonialRotator();


// --- SCROLL ANIMATION WRAPPER ---
// We wrap this in a function to initialize ONLY after loading is complete
// This prevents conflict between initial animation positions and scroll start positions
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    useMainTarget = true;
    syncMainTargetFromObject();
    gsap.to(idle, { mix: 0, duration: 1.2, ease: "power2.out", overwrite: true });

    setupNavbarScrollBehavior();
    setupFloatingWhatsApp();

    // Hero Pinning & Animation
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=100%", // Pin for 1 screen height
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            // markers: true // Debugging
        }
    });

    // 1. 3D Object Movement on Scroll
    // Rotate & Move to side (Depth)
    heroTimeline.to(mainTarget, {
        ry: "+=" + (Math.PI * 2), // Full rotation
        rx: "+=" + (Math.PI * 0.5),
        ease: "none"
    }, 0);

    heroTimeline.to(mainTarget, {
        px: 5, // Move further right
        pz: -2, // Push back slightly
        ease: "none"
    }, 0);

    // 2. Text Fade Out & Scale Down
    heroTimeline.to(".hero-content", {
        opacity: 0,
        scale: 0.9,
        y: -50,
        ease: "power1.inOut"
    }, 0);

    // 3. Vignette intensifies
    heroTimeline.to(".vignette", {
        opacity: 1,
        duration: 0.5 // Happen earlier
    }, 0);


    // --- SECTION: WHO WE ARE (Storytelling) ---
    const storyTimeline = gsap.timeline({
        scrollTrigger: {
            id: "who-we-are-pin",
            trigger: "#who-we-are",
            start: "top top",
            end: "+=900%",
            scrub: 1, // Smooth scrub
            pin: true,
            // markers: true
        }
    });

    const whoObjectTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#who-we-are",
            start: "top top",
            end: "+=700%",
            scrub: 1
        }
    });

    whoObjectTimeline
        .to(mainTarget, { px: 1.8, pz: -0.6, duration: 1, ease: "none" }, 0)
        .to(mainTarget, { ry: "+=" + (Math.PI * 1.2), rx: "+=" + (Math.PI * 0.15), duration: 1, ease: "none" }, 0)
        .to(wireframe.rotation, { x: "+=0.6", y: "+=0.8", duration: 1, ease: "none" }, 0)
        .to(mainTarget, { px: -1.4, pz: 0.1, duration: 1, ease: "none" })
        .to(mainTarget, { ry: "+=" + (Math.PI * 1.2), rx: "+=" + (Math.PI * 0.15), duration: 1, ease: "none" }, "<")
        .to(wireframe.rotation, { x: "+=0.6", y: "+=0.8", duration: 1, ease: "none" }, "<")
        .to(mainTarget, { px: -2.6, py: -1.2, pz: 0.8, duration: 1, ease: "none" })
        .to(mainTarget, { sx: 0.55, sy: 0.55, sz: 0.55, duration: 1, ease: "none" }, "<")
        .to(mainTarget, { ry: "+=" + (Math.PI * 1.2), rx: "+=" + (Math.PI * 0.15), duration: 1, ease: "none" }, "<")
        .to(wireframe.rotation, { x: "+=0.6", y: "+=0.8", duration: 1, ease: "none" }, "<");

    const bridgeHeroToWho = gsap.timeline({
        scrollTrigger: {
            trigger: "#who-we-are",
            start: "top bottom",
            end: "top top",
            scrub: 1
        }
    });
    bridgeHeroToWho
        .to(mainTarget, { px: 0.8, pz: -0.2, ease: "none" }, 0)
        .to(mainTarget, { ry: "+=" + (Math.PI * 0.6), rx: "+=" + (Math.PI * 0.08), ease: "none" }, 0);

    storyTimeline
        .to(".scene-1", { autoAlpha: 1, y: 0, duration: 1 })
        .to(wireframe.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 1 }, "<")
        .to(".scene-1", { autoAlpha: 0, y: -20, duration: 0.6 }, "+=1.1");

    storyTimeline
        .to(".scene-2", { autoAlpha: 1, y: 0, duration: 1 })
        .to(".scene-2", { autoAlpha: 0, y: -20, duration: 0.6 }, "+=1.1");

    storyTimeline
        .to(".scene-3", { autoAlpha: 1, y: 0, duration: 1 })
        .to(wireframe.scale, { x: 1.01, y: 1.01, z: 1.01, duration: 1 }, "<") // Merge back
        .to({}, { duration: 1.2 })
        .to(".scene-3", { autoAlpha: 0, y: -20, duration: 0.6 });
    
    // Refresh to ensure everything is calculated correctly
    ScrollTrigger.refresh();

    // --- SECTION: DIGITAL SYSTEM (REWORKED) ---
    // Create the Node System dynamically
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);
    nodeGroup.visible = false; // Initially hidden

    const nodeCount = 50;
    // nodes is global now
    nodes.length = 0; 
    
    const structurePositions = [];
    
    // Geometry for nodes
    const nodeGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.6 });

    // Generate Nodes & Positions
    for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeGroup.add(mesh);
        nodes.push(mesh);

        // Chaos: Random scatter
        const cx = (Math.random() - 0.5) * 10;
        const cy = (Math.random() - 0.5) * 10;
        const cz = (Math.random() - 0.5) * 5;

        // Structure: Sphere Surface (Fibonacci Sphere)
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        const radius = 2.5;
        
        structurePositions.push({
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi)
        });

        // Setup UserData for "Base Position" (controlled by GSAP) + Wandering
        mesh.userData = { 
            x: cx, 
            y: cy, 
            z: cz,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.5
        };

        // Set initial pos
        mesh.position.set(cx, cy, cz);
    }

    // Lines (Dynamic)
    // We create a Lines object but only show it in Scene 2
    // For simplicity, let's make a wireframe sphere for "Structure" state
    const structureWireGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const structureWireMat = new THREE.MeshBasicMaterial({ 
        color: 0x88ccff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0 
    });
    const structureWire = new THREE.Mesh(structureWireGeo, structureWireMat);
    nodeGroup.add(structureWire);

    // Timeline
    const systemTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: "#digital-system",
            start: "top top",
            end: "+=900%", // jauh lebih panjang
            scrub: 0.2, // lebih responsif
            pin: true,
            anticipatePin: 1,
            onEnter: () => { 
                nodeGroup.visible = true; 
                // Pastikan object kembali visible saat masuk dari bawah
                if (mainObject) {
                    mainObject.visible = true;
                }
            },
            onLeaveBack: () => { 
                nodeGroup.visible = false; 
                // Pulihkan object saat scroll balik ke atas
                if (mainObject) {
                    mainObject.visible = true;
                    if (mainObject.material) mainObject.material.opacity = 1;
                }
            }
        }
    });

    const bridgeWhoToDigital = gsap.timeline({
        scrollTrigger: {
            trigger: "#digital-system",
            start: "top bottom",
            end: "top top",
            scrub: 1
        }
    });
    bridgeWhoToDigital
        .to(mainTarget, { sx: 0.7, sy: 0.7, sz: 0.7, ease: "none" }, 0)
        .to(mainTarget, { ry: "+=" + Math.PI, rx: 0, rz: 0, ease: "none" }, 0)
        .to(mainTarget, { px: 0, pz: 0, ease: "none" }, 0);

    // SCENE 1: CHAOS ("Digital Without Direction")
    // Main Object fades out, Nodes appear in Chaos
    systemTimeline
        .to(mainObject.material, { opacity: 0, duration: 1.0 }, 0)
        .to(mainTarget, { sx: 0, sy: 0, sz: 0, duration: 1.6 }, 0.1) // Hide previous object
        .set(mainObject, { visible: false })
        .to(wireframe.material, { opacity: 0, duration: 1.0 }, "<")
        .to(".sys-scene-1", { opacity: 1, duration: 1.5 }, "<")
        .to(nodeGroup.rotation, { y: 0.5, duration: 8 }, "<") // Slow rotation of chaos
        .to(".sys-scene-1", { opacity: 0, duration: 1.2 }, "+=1.6");

    // SCENE 2: STRUCTURE ("Structure Creates Control")
    // Nodes move to Structure positions
    systemTimeline
        .to(".sys-scene-2", { opacity: 1, duration: 1.6 })
        // Tween all nodes to structure positions
        .to(nodes.map(n => n.userData), {
            x: (i) => structurePositions[i].x,
            y: (i) => structurePositions[i].y,
            z: (i) => structurePositions[i].z,
            duration: 4.5
        }, "<")
        .to(structureWire.material, { opacity: 0.1, duration: 4.0 }, "<") // Fade in grid
        .to(nodeGroup.rotation, { y: Math.PI, duration: 4.0 }, "<") // Rotate to align
        .to({}, { duration: 1.5 })
        .to(".sys-scene-2", { opacity: 0, duration: 1.2 })
        .to(camera.position, { z: 1.1, duration: 2.0 }, "<+=0.2")
        .to(nodeGroup.scale, { x: 10, y: 10, z: 10, duration: 2.0 }, "<")
        .to(nodeMat, { opacity: 0, duration: 1.8 }, "<")
        .to(structureWire.material, { opacity: 0, duration: 1.8 }, "<")
        .to("#canvas-container", { opacity: 0, duration: 2.4 }, "<+=0.4")
        .to("body", { "--bg-accent": "#2b0f4a", "--bg-dark": "#02000a", duration: 2.0 }, "<")
        .to({}, { duration: 2.0 }); // hold lebih lama sebelum rilis pin

    // Bridge panjang menuju PROCESS (konten mulai terlihat smooth)
    const bridgeDigitalToProcess = gsap.timeline({
        scrollTrigger: {
            trigger: "#process",
            start: "top bottom",
            end: "top top",
            scrub: 0.6
        }
    });
    bridgeDigitalToProcess
        .to("body", { "--bg-accent": "#23083e", duration: 1 }, 0)
        .to("#canvas-container", { opacity: 0, duration: 1 }, 0); // ensure tetap 0

    const portfolioSection = document.querySelector('#portfolio.horizontal-work');
    if (portfolioSection) {
        const viewport = portfolioSection.querySelector('.work-viewport');
        const track = portfolioSection.querySelector('.work-track');
        if (viewport && track) {
            gsap.to(track, {
                x: () => {
                    const maxShift = track.scrollWidth - viewport.clientWidth;
                    return -Math.max(0, maxShift);
                },
                ease: "none",
                scrollTrigger: {
                    trigger: portfolioSection,
                    start: "top top",
                    end: "+=600%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });
        }
    }

    ScrollTrigger.refresh();

}

// --- ANIMATION LOOP (Idle + Micro Movement) ---
function animate() {
    requestAnimationFrame(animate);
    
    const time = performance.now() * 0.001;

    if (!useMainTarget) {
        mainObject.rotation.y += 0.005;
        mainObject.rotation.x += 0.002;
    } else {
        const bobY = Math.sin(time * 0.9) * 0.12 * idle.mix;
        const rotX = Math.sin(time * 0.7) * 0.12 * idle.mix;
        const rotY = Math.cos(time * 0.7) * 0.18 * idle.mix;

        _tmpVec3.set(mainTarget.px, mainTarget.py + bobY, mainTarget.pz);
        mainObject.position.lerp(_tmpVec3, 0.12);

        mainObject.scale.x += (mainTarget.sx - mainObject.scale.x) * 0.14;
        mainObject.scale.y += (mainTarget.sy - mainObject.scale.y) * 0.14;
        mainObject.scale.z += (mainTarget.sz - mainObject.scale.z) * 0.14;

        mainObject.rotation.x = lerpAngle(mainObject.rotation.x, mainTarget.rx + rotX, 0.14);
        mainObject.rotation.y = lerpAngle(mainObject.rotation.y, mainTarget.ry + rotY, 0.14);
        mainObject.rotation.z = lerpAngle(mainObject.rotation.z, mainTarget.rz, 0.14);
    }

    // Particle Wandering
    if (nodes.length > 0) {
        nodes.forEach(node => {
            // Read base position from userData (managed by GSAP)
            const baseX = node.userData.x;
            const baseY = node.userData.y;
            const baseZ = node.userData.z;

            // Add wandering
            const wanderX = Math.sin(time * node.userData.speed + node.userData.phase) * 0.2; 
            const wanderY = Math.cos(time * node.userData.speed + node.userData.phase) * 0.2;
            const wanderZ = Math.sin(time * node.userData.speed * 0.5 + node.userData.phase) * 0.1;

            node.position.set(
                baseX + wanderX,
                baseY + wanderY,
                baseZ + wanderZ
            );
        });
    }

    renderer.render(scene, camera);
}
animate();

// --- GSAP TIMELINE (The Cinematic Loading) ---
const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
});

const textElement = document.getElementById('loader-text');

// 0. Continuous Camera Micro-Movement (Dolly In)
// This runs parallel to the main timeline
gsap.to(camera.position, {
    z: 4.5, // Subtle move from 5 to 4.5
    duration: CONFIG.duration + 1, // Lasts through the whole loading
    ease: "sine.inOut" // Very smooth
});

// 1. Intro: Scale Object & Fade In
tl.to(mainObject.scale, {
    x: 1, y: 1, z: 1,
    duration: 1.5,
    ease: "power3.out",
    overwrite: true // Overwrite the previous one
}, 0);


// 2. Text Sequence
const texts = ["INIT SYSTEM", "BUILDING EXPERIENCE", "READY"];

// Create a nested timeline for text to manage it independently if needed, 
// but here we sync it with the main timeline
const textDuration = 0.8;
const stayDuration = 0.6;
const exitDuration = 0.4;

texts.forEach((text, index) => {
    // 1. Set the text content (initially invisible)
    tl.call(() => {
        textElement.innerText = text;
    });

    // 2. Fade In + Blur Out + Slide Up (Micro)
    tl.fromTo(textElement, 
        { 
            opacity: 0, 
            filter: "blur(10px)",
            y: 20 // Start slightly below
        }, 
        { 
            opacity: 1, 
            filter: "blur(0px)", 
            y: 0, // Slide to position
            duration: textDuration, 
            ease: "power2.out" 
        }
    );

    // 3. Stay visible (unless it's the last one)
    if (index < texts.length - 1) {
        tl.to(textElement, {
            opacity: 0,
            filter: "blur(10px)",
            y: -20, // Slide up on exit
            duration: exitDuration,
            ease: "power2.in"
        }, `+=${stayDuration}`);
    } else {
        // Last text "READY" stays a bit longer before transition
        tl.to({}, { duration: 0.5 }); 
    }
});

// 3. Transition to Hero (Seamless)
// "Object loading = object hero" -> Move object to side, zoom camera
tl.to(textElement, {
    opacity: 0,
    y: -20, // Consistent exit slide
    duration: 0.5,
    onComplete: () => {
        document.getElementById('loader').style.display = 'none';
    }
}, "+=0.2");

// Camera Zoom In (Aggressive)
tl.to(camera.position, {
    z: 3, // Zoom in
    duration: 1.5,
    ease: "power2.inOut",
    overwrite: true // Important: Overwrite the micro-movement
}, "transition");

// Vignette breathing effect during transition
tl.to(".vignette", {
    opacity: 0, // Clear vignette for hero
    duration: 1.5,
    ease: "power2.inOut"
}, "transition");

// Background Color Transition (Loading -> Hero)
// Loading: Radial Gradient (CSS managed) -> Hero: Slightly Darker/Different
// Since CSS gradients are hard to tween perfectly, we tween the --bg-accent variable
tl.to("body", {
    "--bg-accent": "#0f0518", // Darker purple/blue for Hero (example change)
    "--bg-dark": "#000000", // Pure black for depth
    duration: 2.5, // Long smooth transition
    ease: "power2.inOut"
}, "transition");

tl.to(mainObject.position, {
    x: 2, // Move to right side for Hero layout
    duration: 1.5,
    ease: "power2.inOut"
}, "transition");

tl.to("#hero", {
    autoAlpha: 1, // GSAP handles opacity + visibility
    duration: 1
}, "transition+=0.5");

// Hero elements stagger
tl.from(".hero-content > *", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8
}, "transition+=0.8");

// INITIALIZE SCROLL ANIMATIONS AFTER TRANSITION
// Ensures object is fully at x:2 before ScrollTrigger calculates positions
tl.call(() => {
    window.scrollTo(0, 0); // Force scroll to top
    document.body.classList.remove('is-loading'); // Enable Scroll (CSS)
    lenis.start(); // Enable Scroll (Lenis)
    lenis.scrollTo(0, { immediate: true }); // Ensure Lenis also knows we are at top
    initScrollAnimations();
}, null, "transition+=1.5");
