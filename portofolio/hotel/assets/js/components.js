(function () {
    'use strict';

    var currentPage = document.body.getAttribute('data-page') || 'home';

    var pageTitles = {
        home: 'Azura Resort & Spa | Bali\'s Coastal Luxury',
        rooms: 'Rooms & Suites | Azura Resort & Spa',
        experience: 'Curated Experiences | Azura Resort & Spa',
        story: 'Cerita Kami | Azura Resort & Spa',
        gallery: 'Galeri & Atmosfer | Azura Resort & Spa',
        dining: 'Santapan & Wine | Azura Resort & Spa',
        contact: 'Kontak & Lokasi | Azura Resort & Spa'
    };

    if (pageTitles[currentPage]) {
        document.title = pageTitles[currentPage];
    }

    var navHTML =
        '<nav class="nav-floating" id="navbar">' +
        '    <div class="nav-inner">' +
        '        <a href="index.html" class="nav-logo">' +
        '            <span class="logo-text">AZURA</span>' +
        '            <span class="logo-sub">Resort & Spa</span>' +
        '        </a>' +
        '        <ul class="nav-links">' +
        '            <li><a href="rooms.html" class="nav-link" data-page="rooms">Kamar</a></li>' +
        '            <li><a href="experience.html" class="nav-link" data-page="experience">Pengalaman</a></li>' +
        '            <li><a href="story.html" class="nav-link" data-page="story">Cerita</a></li>' +
        '            <li><a href="gallery.html" class="nav-link" data-page="gallery">Galeri</a></li>' +
        '            <li><a href="dining.html" class="nav-link" data-page="dining">Santapan</a></li>' +
        '            <li><a href="contact.html" class="nav-link" data-page="contact">Kontak</a></li>' +
        '        </ul>' +
        '        <div class="nav-actions">' +
        '            <button class="nav-icon-btn" aria-label="Cari">' +
        '                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
        '                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>' +
        '                </svg>' +
        '            </button>' +
        '            <button class="nav-lang">ID</button>' +
        '            <a href="contact.html#booking" class="btn-book-nav">Pesan</a>' +
        '        </div>' +
        '        <button class="nav-mobile-toggle" id="mobileToggle" aria-label="Menu">' +
        '            <span></span>' +
        '            <span></span>' +
        '        </button>' +
        '    </div>' +
        '</nav>' +
        '<div class="mobile-menu" id="mobileMenu">' +
        '    <div class="mobile-menu-inner">' +
        '        <ul>' +
        '            <li><a href="rooms.html" class="mobile-link">Rooms & Suites</a></li>' +
        '            <li><a href="experience.html" class="mobile-link">Pengalaman</a></li>' +
        '            <li><a href="story.html" class="mobile-link">Our Story</a></li>' +
        '            <li><a href="gallery.html" class="mobile-link">Galeri</a></li>' +
        '            <li><a href="dining.html" class="mobile-link">Santapan</a></li>' +
        '            <li><a href="contact.html" class="mobile-link">Kontak</a></li>' +
        '            <li><a href="contact.html#booking" class="mobile-link mobile-link-gold">Pesan</a></li>' +
        '        </ul>' +
        '    </div>' +
        '</div>';

    var footerHTML =
        '<footer class="footer-premium">' +
        '    <div class="footer-noise"></div>' +
        '    <div class="footer-watermark">AZURA</div>' +
        '    <div class="footer-grid">' +
        '        <div class="footer-brand">' +
        '            <div class="footer-logo">' +
        '                <a href="index.html" class="nav-logo" style="display:inline-flex;flex-direction:column;align-items:flex-start;">' +
        '                    <span class="logo-text">AZURA</span>' +
        '                    <span class="logo-sub">Resort & Spa</span>' +
        '                </a>' +
        '            </div>' +
        '            <p class="footer-desc">' +
        '                Sebuah tempat peristirahatan mewah di pesisir Bali yang memadukan keanggunan abadi dengan kenyamanan modern. Setiap kunjungan adalah perjalanan indra yang terkurasi.' +
        '            </p>' +
        '            <div class="footer-social">' +
        '                <a href="#" class="social-link">Instagram</a>' +
        '                <a href="#" class="social-link">Facebook</a>' +
        '                <a href="#" class="social-link">Twitter</a>' +
        '                <a href="#" class="social-link">LinkedIn</a>' +
        '            </div>' +
        '        </div>' +
        '        <div class="footer-nav">' +
        '            <h4>Navigasi</h4>' +
        '            <ul>' +
        '                <li><a href="rooms.html">Rooms & Suites</a></li>' +
        '                <li><a href="experience.html">Pengalaman</a></li>' +
        '                <li><a href="story.html">Our Story</a></li>' +
        '                <li><a href="gallery.html">Galeri</a></li>' +
        '                <li><a href="dining.html">Santapan</a></li>' +
        '            </ul>' +
        '        </div>' +
        '        <div class="footer-nav">' +
        '            <h4>Lainnya</h4>' +
        '            <ul>' +
        '                <li><a href="#">Spa & Kebugaran</a></li>' +
        '                <li><a href="#">Pernikahan & Acara</a></li>' +
        '                <li><a href="#">Retret Korporat</a></li>' +
        '                <li><a href="#">Pers & Media</a></li>' +
        '                <li><a href="#">Karir</a></li>' +
        '            </ul>' +
        '        </div>' +
        '        <div class="footer-newsletter">' +
        '            <h4>Buletin</h4>' +
        '            <p>Dapatkan penawaran eksklusif dan cerita dari Azura.</p>' +
        '            <form class="newsletter-form">' +
        '                <input type="email" placeholder="Alamat email Anda" required>' +
        '                <button type="submit" class="newsletter-btn">' +
        '                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
        '                </button>' +
        '            </form>' +
        '        </div>' +
        '        <div class="footer-opening">' +
        '            <h4>Jam Operasional</h4>' +
        '            <div class="opening-item"><span class="opening-label">Resepsionis</span><span>24 Jam</span></div>' +
        '            <div class="opening-item"><span class="opening-label">Spa</span><span>09:00 — 21:00</span></div>' +
        '            <div class="opening-item"><span class="opening-label">Restoran</span><span>07:00 — 23:00</span></div>' +
        '            <div class="opening-item"><span class="opening-label">Kolam</span><span>06:00 — 22:00</span></div>' +
        '        </div>' +
        '    </div>' +
        '    <div class="footer-divider"></div>' +
        '    <div class="footer-bottom">' +
        '        <span>&copy; 2026 Azura Resort & Spa. Hak cipta dilindungi undang-undang.</span>' +
        '        <div class="footer-legal">' +
        '            <a href="#">Kebijakan Privasi</a>' +
        '            <a href="#">Ketentuan Layanan</a>' +
        '            <a href="#">Kebijakan Cookie</a>' +
        '        </div>' +
        '    </div>' +
        '</footer>';

    var navPlaceholder = document.getElementById('nav-placeholder');
    var footerPlaceholder = document.getElementById('footer-placeholder');

    if (navPlaceholder) {
        navPlaceholder.innerHTML = navHTML;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    /* ===== ACTIVE NAV LINK ===== */
    function highlightActiveLink() {
        document.querySelectorAll('.nav-link').forEach(function (link) {
            if (link.getAttribute('data-page') === currentPage) {
                link.style.color = '#C6A969';
            }
        });
    }
    highlightActiveLink();

    /* ===== NAVBAR SCROLL BEHAVIOR ===== */
    var lastScrollY = 0;
    var scrollTimeout;
    window.addEventListener('scroll', function () {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;
        var scrollY = window.scrollY;
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(function () {
            scrollTimeout = null;
            if (scrollY < 100) { navbar.classList.remove('hidden'); lastScrollY = scrollY; return; }
            if (scrollY > lastScrollY + 10) { navbar.classList.add('hidden'); }
            else if (scrollY < lastScrollY - 10) { navbar.classList.remove('hidden'); }
            lastScrollY = scrollY;
        }, 50);
    }, { passive: true });

    /* ===== MOBILE MENU — EVENT DELEGATION ===== */
    document.addEventListener('click', function (e) {
        var toggle = document.getElementById('mobileToggle');
        var menu = document.getElementById('mobileMenu');

        if (!toggle || !menu) return;

        var clickedToggle = e.target.closest('#mobileToggle');

        if (clickedToggle) {
            e.preventDefault();
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
            return;
        }

        var clickedMobileLink = e.target.closest('.mobile-link');
        if (clickedMobileLink) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* ===== NEWSLETTER FORM ===== */
    document.addEventListener('submit', function (e) {
        var form = e.target;
        if (form.classList.contains('newsletter-form')) {
            e.preventDefault();
            var input = form.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                input.value = '';
                input.placeholder = 'Berlangganan! Terima kasih.';
                setTimeout(function () {
                    input.placeholder = 'Alamat email Anda';
                }, 3000);
            }
        }
    });
})();
