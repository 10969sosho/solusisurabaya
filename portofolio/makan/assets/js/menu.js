/* === MENU.JS - Menu Filtering & Tab Switching === */

document.addEventListener('DOMContentLoaded', () => {
  initMenuTabs();
  initGalleryFilters();
  initTestimonialDrag();
});

/* Menu Tab Filtering */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      cards.forEach((card, index) => {
        card.style.transition = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.display = 'none';

        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';

          setTimeout(() => {
            card.style.transition = 'opacity 0.5s cubic-bezier(.19, 1, .22, 1), transform 0.5s cubic-bezier(.19, 1, .22, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 50);
        }
      });
    });
  });
}

/* Gallery Filter */
function initGalleryFilters() {
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-item');

  if (!filters.length || !items.length) return;

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.getAttribute('data-filter');

      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';

        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';

          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 60);
        } else {
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* Testimonial Drag Slider */
function initTestimonialDrag() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  track.style.cursor = 'grab';

  /* Touch support */
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
}
