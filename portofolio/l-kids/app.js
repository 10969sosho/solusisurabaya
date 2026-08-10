const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const DATA = {
  brand: "L Kids Official",
  collections: [
    {
      id: "essentials",
      title: "ESSENTIALS",
      season: "CURATED",
      heroImage: "./img/banner.png",
      description:
        "A timeless everyday collection featuring oversized tees, relaxed joggers, soft cotton sets, and clean neutral tones designed for comfort and effortless daily movement.",
      products: [
        {
          id: "essential-oversized-tee",
          name: "ESSENTIAL OVERSIZED TEE",
          category: "ESSENTIALS",
          image: "./img/WhatsApp Image 2026-05-07 at 21.10.57.jpeg",
          shortDescription:
            "Minimal oversized kidswear designed with soft breathable cotton for effortless everyday comfort.",
          longDescription:
            "The Essential Oversized Tee is designed as a relaxed everyday staple for children who need comfort, softness, and flexibility throughout daily movement.\n\nMade using lightweight premium cotton with a clean oversized silhouette, this piece balances modern minimalist styling with practical daily wear.\n\nThe neutral color palette allows easy layering and effortless matching with joggers, shorts, sneakers, and outerwear. Suitable for indoor activities, casual outings, travel, or calm weekend routines.",
          details: [
            "PREMIUM SOFT COTTON",
            "RELAXED OVERSIZED FIT",
            "BREATHABLE MATERIAL",
            "UNISEX DESIGN",
            "LIGHTWEIGHT FEEL",
            "MINIMAL EVERYDAY STYLE",
          ],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tokopedia: "https://tokopedia.com/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
        {
          id: "relaxed-jogger",
          name: "RELAXED JOGGER",
          category: "ESSENTIALS",
          image: "./img/WhatsApp Image 2026-05-07 at 21.12.05.jpeg",
          shortDescription:
            "Relaxed-fit joggers with a clean silhouette—made for movement, play, and calm everyday styling.",
          longDescription:
            "A minimal jogger designed to move with kids. Soft structure, easy styling, and an elevated fit that feels premium without trying too hard.",
          details: ["RELAXED FIT", "SOFT TOUCH", "EASY WAIST", "DAILYWEAR READY"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tokopedia: "https://tokopedia.com/",
          },
        },
        {
          id: "soft-cotton-set",
          name: "SOFT COTTON SET",
          category: "ESSENTIALS",
          image: "./img/WhatsApp Image 2026-05-07 at 21.12.30.jpeg",
          shortDescription:
            "An easy matching set designed for softness, breathability, and effortless everyday comfort.",
          longDescription:
            "Lounge-ready and outing-ready. A calm minimal set that keeps kids comfortable while staying clean and modern in every frame.",
          details: ["BREATHABLE", "SOFT FEEL", "EASY MATCH", "MINIMAL PALETTE"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
      ],
    },
    {
      id: "mono-series",
      title: "MONO SERIES",
      season: "CURATED",
      heroImage: "./img/WhatsApp Image 2026-05-07 at 21.09.02.jpeg",
      description:
        "A monochrome-focused collection inspired by editorial fashion photography and minimalist styling for modern children.",
      products: [
        {
          id: "mono-oversized-tee",
          name: "MONO OVERSIZED TEE",
          category: "MONO SERIES",
          image: "./img/WhatsApp Image 2026-05-07 at 21.11.44.jpeg",
          shortDescription:
            "A monochrome essential with an editorial silhouette—clean, calm, and easy to style.",
          longDescription:
            "Minimal fit, modern proportion, and a neutral palette that feels elevated in every photo.",
          details: ["MONOCHROME", "RELAXED FIT", "SOFT FEEL", "EDITORIAL LOOK"],
          marketplaces: {
            tokopedia: "https://tokopedia.com/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
        {
          id: "mono-relaxed-pants",
          name: "MONO RELAXED PANTS",
          category: "MONO SERIES",
          image: "./img/WhatsApp Image 2026-05-07 at 21.12.55.jpeg",
          shortDescription:
            "Relaxed pants with a premium silhouette—minimal, comfortable, and quietly confident.",
          longDescription:
            "Designed for daily wear with an editorial proportion. Easy movement, clean styling, calm monochrome tone.",
          details: ["RELAXED CUT", "BREATHABLE", "EASY TO STYLE", "DAILY COMFORT"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tokopedia: "https://tokopedia.com/",
          },
        },
        {
          id: "mono-set",
          name: "MONO SET",
          category: "MONO SERIES",
          image: "./img/WhatsApp Image 2026-05-07 at 21.13.27.jpeg",
          shortDescription:
            "A clean matching set designed for minimal styling and all-day ease.",
          longDescription:
            "Monochrome simplicity made practical—easy layering, calm tones, premium feel for everyday routines.",
          details: ["MATCHING SET", "SOFT TOUCH", "MINIMAL PALETTE", "EASY LAYERING"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
      ],
    },
    {
      id: "soft-dailywear",
      title: "SOFT DAILYWEAR",
      season: "CURATED",
      heroImage: "./img/WhatsApp Image 2026-05-07 at 21.09.19.jpeg",
      description:
        "Breathable lightweight pieces made for active routines, indoor comfort, and calm daily moments.",
      products: [
        {
          id: "soft-daily-tee",
          name: "SOFT DAILY TEE",
          category: "SOFT DAILYWEAR",
          image: "./img/WhatsApp Image 2026-05-07 at 21.10.41.jpeg",
          shortDescription:
            "Breathable everyday tee designed for comfort, softness, and easy movement.",
          longDescription:
            "Lightweight and calm—made for active routines, indoor comfort, and gentle daily moments.",
          details: ["BREATHABLE", "SOFT FEEL", "EASY MOVE", "DAILY READY"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
        {
          id: "breathable-shorts",
          name: "BREATHABLE SHORTS",
          category: "SOFT DAILYWEAR",
          image: "./img/WhatsApp Image 2026-05-07 at 21.11.24.jpeg",
          shortDescription:
            "Lightweight shorts made for play—clean lines, calm tones, effortless styling.",
          longDescription:
            "An easy essential for warm days and indoor comfort. Designed to feel soft and look polished.",
          details: ["LIGHTWEIGHT", "SOFT TOUCH", "EASY WAIST", "MINIMAL LOOK"],
          marketplaces: {
            tokopedia: "https://tokopedia.com/",
          },
        },
        {
          id: "lightweight-set",
          name: "LIGHTWEIGHT SET",
          category: "SOFT DAILYWEAR",
          image: "./img/WhatsApp Image 2026-05-07 at 21.08.38.jpeg",
          shortDescription:
            "A breathable set designed for calm daily routines and soft minimal styling.",
          longDescription:
            "Easy matching, effortless layering, and a premium feel—made for everyday comfort that still looks curated.",
          details: ["BREATHABLE", "EASY MATCH", "SOFT FEEL", "CALM PALETTE"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tokopedia: "https://tokopedia.com/",
          },
        },
      ],
    },
    {
      id: "weekend-studio",
      title: "WEEKEND STUDIO",
      season: "CURATED",
      heroImage: "./img/WhatsApp Image 2026-05-07 at 21.09.54.jpeg",
      description:
        "Relaxed silhouettes and layered essentials inspired by slow weekends, soft natural lighting, and modern studio aesthetics.",
      products: [
        {
          id: "weekend-hoodie",
          name: "WEEKEND HOODIE",
          category: "WEEKEND STUDIO",
          image: "./img/WhatsApp Image 2026-05-07 at 21.12.55.jpeg",
          shortDescription:
            "A relaxed hoodie designed for layering—soft structure, calm tones, and modern comfort.",
          longDescription:
            "Made for slow weekends and studio moments. Minimal silhouette with an elevated everyday feel.",
          details: ["LAYER READY", "RELAXED FIT", "SOFT TOUCH", "CALM TONE"],
          marketplaces: {
            tokopedia: "https://tokopedia.com/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
        {
          id: "layered-vest",
          name: "LAYERED VEST",
          category: "WEEKEND STUDIO",
          image: "./img/WhatsApp Image 2026-05-07 at 21.11.44.jpeg",
          shortDescription:
            "A minimal layering piece for an editorial look—easy to style, light to wear.",
          longDescription:
            "Designed for modern kids styling with a calm palette and clean proportion.",
          details: ["LIGHTWEIGHT", "EASY LAYERING", "EDITORIAL FIT", "MINIMAL"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
          },
        },
        {
          id: "studio-jogger",
          name: "STUDIO JOGGER",
          category: "WEEKEND STUDIO",
          image: "./img/WhatsApp Image 2026-05-07 at 21.12.30.jpeg",
          shortDescription:
            "Relaxed joggers for studio-to-weekend routines—clean, comfortable, premium feel.",
          longDescription:
            "A staple made for movement and calm styling. Easy to pair with tees, hoodies, and outer layers.",
          details: ["RELAXED CUT", "SOFT FEEL", "EASY STYLE", "DAILY COMFORT"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tokopedia: "https://tokopedia.com/",
          },
        },
      ],
    },
    {
      id: "natural-tones",
      title: "NATURAL TONES",
      season: "CURATED",
      heroImage: "./img/WhatsApp Image 2026-05-07 at 21.08.38.jpeg",
      description:
        "Warm earthy palettes inspired by minimal interiors, modern architecture, and timeless Scandinavian styling.",
      products: [
        {
          id: "earth-tone-tee",
          name: "EARTH TONE TEE",
          category: "NATURAL TONES",
          image: "./img/WhatsApp Image 2026-05-07 at 21.10.41.jpeg",
          shortDescription:
            "A warm-toned tee with a clean silhouette—minimal, modern, and easy to style.",
          longDescription:
            "Inspired by natural interiors and calm daily moments. Designed for comfort and timeless wear.",
          details: ["WARM PALETTE", "SOFT TOUCH", "EASY MATCH", "TIMELESS"],
          marketplaces: {
            tokopedia: "https://tokopedia.com/",
          },
        },
        {
          id: "warm-linen-set",
          name: "WARM LINEN SET",
          category: "NATURAL TONES",
          image: "./img/WhatsApp Image 2026-05-07 at 21.11.24.jpeg",
          shortDescription:
            "A calm matching set in earthy tones—made to feel light, breathable, and premium.",
          longDescription:
            "A minimal set for everyday wear with a soft texture and timeless styling direction.",
          details: ["BREATHABLE", "EARTH TONES", "EASY LAYERING", "MINIMAL"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tiktok: "https://www.tiktok.com/shop",
          },
        },
        {
          id: "neutral-outer",
          name: "NEUTRAL OUTER",
          category: "NATURAL TONES",
          image: "./img/WhatsApp Image 2026-05-07 at 21.12.05.jpeg",
          shortDescription:
            "A lightweight outer layer for everyday styling—clean lines, calm color, premium finish.",
          longDescription:
            "Designed for layering across seasons with a modern silhouette and quiet confidence.",
          details: ["LIGHT LAYER", "CLEAN LINES", "CALM COLOR", "PREMIUM FINISH"],
          marketplaces: {
            shopee: "https://shopee.co.id/",
            tokopedia: "https://tokopedia.com/",
          },
        },
      ],
    },
  ],
};

const state = {
  menuOpen: false,
};

function esc(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function assetUrl(path) {
  return encodeURI(path);
}

function formatMarketplaceKey(key) {
  const map = {
    shopee: "Shopee",
    tokopedia: "Tokopedia",
    tiktok: "TikTok Shop",
    partner: "Partner",
    website: "Website",
  };
  return map[key] || key.toUpperCase();
}

function setMenu(open) {
  state.menuOpen = open;
  const sidebar = $("#sidebarLeft");
  const overlay = $("#overlay");
  const btn = $("#menuBtn");
  const labelBtn = $("#menuLabelBtn");

  if (!sidebar || !overlay || !btn || !labelBtn) return;

  sidebar.classList.toggle("is-open", open);
  overlay.hidden = !open;
  overlay.classList.toggle("is-open", open);
  sidebar.setAttribute("aria-hidden", open ? "false" : "true");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  labelBtn.setAttribute("aria-expanded", open ? "true" : "false");

  if (open) {
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      const first = $(".menu__item", sidebar);
      if (first) first.focus();
    }, 50);
  } else {
    document.body.style.overflow = "";
    btn.focus();
  }
}

function buildHero() {
  const latest = DATA.collections[0];
  return `
    <section class="hero" id="latest" data-section="latest">
      <div class="hero__banner" aria-label="Banner">
        <div class="hero__media" style="background-image:
          linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.58)),
          url('${esc(assetUrl(latest.heroImage))}')"></div>
        <div class="hero__grain" aria-hidden="true"></div>
        <div class="hero__bannerInner wrap">
          <div class="mini fade" style="color:rgba(245,245,243,.86)">MINIMAL / MODERN / COMFORT / EDITORIAL</div>
        </div>
      </div>

      <div class="hero__titleBlock">
        <div class="wrap">
          <h1 class="hero__brand fade">L KIDS OFFICIAL</h1>
          <p class="hero__subtitle fade">Minimal kidswear curated for modern little ones.</p>
          <p class="hero__desc fade">A calm everyday wardrobe designed with comfort, softness, and timeless simplicity.</p>
          <p class="hero__desc fade">
            L Kids Official presents a curated catalog experience inspired by editorial fashion and modern family lifestyle. Every collection focuses on clean silhouettes, neutral palettes, breathable materials, and effortless styling for everyday children’s wear.
            <br /><br />
            Rather than overwhelming visuals and crowded shopping experiences, this platform was designed to feel calm, spacious, and intentional — allowing each product and collection to speak naturally through photography, composition, and minimal presentation.
          </p>
          <div class="hero__below fade">
            <a class="link" href="#/collections">VIEW COLLECTIONS →</a>
            <a class="link" href="#/lookbook">EXPLORE LOOKBOOK →</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildCollectionCards() {
  const cards = DATA.collections
    .map((c) => {
      return `
        <a class="card fade" href="#/collection/${encodeURIComponent(c.id)}" aria-label="Open collection ${esc(c.title)}">
          <div class="card__media" aria-hidden="true"></div>
          <img class="card__img" src="${esc(assetUrl(c.heroImage))}" alt="${esc(c.title)}" loading="lazy" decoding="async" />
          <div class="card__content">
            <p class="card__desc">${esc(c.description)}</p>
            <h3 class="card__title">${esc(c.title)}</h3>
            <span class="link">OPEN COLLECTION →</span>
          </div>
        </a>
      `;
    })
    .join("");

  return `
    <section class="section" id="previous" data-section="previous">
      <div class="wrap">
        <div class="headline">
          <h2 class="h fade">COLLECTIONS</h2>
          <p class="sub fade">Curated collections inspired by minimal childhood moments, modern silhouettes, and calm everyday styling.</p>
        </div>
        <div class="grid">${cards}</div>
      </div>
    </section>
  `;
}

function buildAbout() {
  return `
    <section class="section" id="about" data-section="about">
      <div class="wrap">
        <div class="headline">
          <h2 class="h fade">ABOUT</h2>
          <p class="sub fade">L Kids Official is a curated premium kidswear catalog designed around calm visuals, timeless silhouettes, and modern everyday comfort.</p>
        </div>
        <div class="rule"></div>
        <div class="copy fade">
          <p class="sub">L Kids Official was created with the idea that children’s clothing can feel both practical and beautifully curated at the same time.</p>
          <p class="sub">Inspired by minimalist fashion editorials, modern architecture, soft natural lighting, and calm everyday moments, our collections focus on simplicity without losing warmth and personality.</p>
          <p class="sub">Every piece inside our catalog is selected to support movement, comfort, softness, and confidence for children throughout their daily activities. Oversized silhouettes, neutral palettes, breathable fabrics, and timeless cuts become the foundation of our visual direction.</p>
          <p class="sub">We believe kidswear should not feel overly loud, complicated, or trend-driven. Instead, we focus on creating a slower, calmer, and more intentional visual shopping experience where parents can explore collections naturally.</p>
          <p class="sub">This platform acts as an editorial-style catalog. Once users find products they love, they can continue shopping through our official marketplace partners including Shopee, Tokopedia, TikTok Shop, and selected external platforms.</p>
        </div>
        <div class="rule"></div>
        <div class="values">
          <div class="value fade">
            <div class="value__title">TIMELESS DESIGN</div>
            <div class="value__copy">Simple silhouettes and neutral colors designed to stay wearable across seasons.</div>
          </div>
          <div class="value fade">
            <div class="value__title">COMFORT FIRST</div>
            <div class="value__copy">Soft breathable materials selected for movement, comfort, and everyday use.</div>
          </div>
          <div class="value fade">
            <div class="value__title">EDITORIAL PRESENTATION</div>
            <div class="value__copy">Collections displayed through clean visual storytelling inspired by modern fashion galleries.</div>
          </div>
          <div class="value fade">
            <div class="value__title">CURATED SELECTION</div>
            <div class="value__copy">Only selected pieces and collections are presented inside the catalog.</div>
          </div>
        </div>
        <div class="rule"></div>
        <div class="ending fade">
          <div class="ending__line">Modern essentials for little ones.</div>
          <div class="ending__line">Minimal pieces designed for calm everyday moments.</div>
        </div>
      </div>
    </section>
  `;
}

function buildFilms() {
  const stills = [
    "./img/WhatsApp Image 2026-05-07 at 21.10.41.jpeg",
    "./img/WhatsApp Image 2026-05-07 at 21.10.57.jpeg",
    "./img/WhatsApp Image 2026-05-07 at 21.11.24.jpeg",
  ];
  return `
    <section class="section" id="films" data-section="films">
      <div class="wrap">
        <div class="headline">
          <h2 class="h fade">FILMS</h2>
          <p class="sub fade">Short visual stories inspired by childhood movement, quiet daily routines, and timeless minimal living.</p>
        </div>
        <div class="rule"></div>
        <p class="sub fade" style="max-width:72ch">
          The Films section presents moving visuals designed to capture atmosphere, emotion, and simplicity.
          <br /><br />
          Rather than traditional product advertisements, these short films focus on natural movement, soft lighting, quiet interactions, and modern everyday moments.
          <br /><br />
          The goal is to create a slower visual experience that reflects the calm and minimal direction behind every L Kids Official collection.
        </p>
        <div class="grid" style="margin-top:26px">
          ${stills.map((src, idx) => `
            <a class="card fade" href="#/films" aria-label="Watch film ${idx + 1}">
              <div class="card__media" aria-hidden="true"></div>
              <img class="card__img" src="${esc(assetUrl(src))}" alt="Film still ${idx + 1}" loading="lazy" decoding="async" />
              <div class="card__content">
                <p class="card__desc">STILL ${idx + 1} — CINEMATIC</p>
                <h3 class="card__title">FILM STUDY</h3>
                <span class="link">WATCH FILM →</span>
              </div>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function buildHome() {
  return `${buildHero()}${buildCollectionCards()}${buildAbout()}${buildFilms()}`;
}

function findCollection(id) {
  return DATA.collections.find((c) => c.id === id) || null;
}

function findProduct(collection, productId) {
  if (!collection) return null;
  return collection.products.find((p) => p.id === productId) || null;
}

function buildCollectionDetail(collection) {
  const products = collection.products
    .map((p) => {
      return `
        <a class="p fade" href="#/collection/${encodeURIComponent(collection.id)}/product/${encodeURIComponent(p.id)}" aria-label="Open product ${esc(p.name)}">
          <div class="p__imgWrap">
            <img class="p__img" src="${esc(assetUrl(p.image))}" alt="${esc(p.name)}" loading="lazy" decoding="async" />
          </div>
          <div class="p__meta">
            <p class="p__name">${esc(p.name)}</p>
            <p class="p__cat">${esc(p.category)}</p>
            <div class="p__actions">
              <span class="link">SHOP NOW →</span>
            </div>
          </div>
        </a>
      `;
    })
    .join("");

  return `
    <section class="section">
      <div class="wrap">
        <div class="collection">
          <div>
            <div class="kicker fade">${esc(collection.season)}</div>
            <h1 class="collection__name fade">${esc(collection.title)}</h1>
          </div>
          <div class="collection__right">
            <div class="kicker fade">COLLECTION NOTE</div>
            <p class="collection__desc fade">${esc(collection.description)}</p>
            <div class="rule"></div>
            <a class="link fade" href="#/collections">BACK TO COLLECTIONS →</a>
          </div>
        </div>

        <div class="products">
          <div class="headline">
            <h2 class="h fade">PRODUCTS</h2>
            <p class="sub fade">Open a product for details, then choose your preferred external marketplace.</p>
          </div>
          <div class="pgrid">${products}</div>
        </div>
      </div>
    </section>
  `;
}

function buildProductDetail(collection, product) {
  const shops = Object.entries(product.marketplaces || {})
    .map(([k, url]) => {
      return `<a class="link fade" href="${esc(url)}" target="_blank" rel="noopener noreferrer">SHOP NOW → <span class="mini">${esc(formatMarketplaceKey(k))}</span></a>`;
    })
    .join("");

  const detailItems = (product.details || []).map((d) => `<div>${esc(d)}</div>`).join("");
  const shortDescription = product.shortDescription || product.copy || "";
  const longDescription = product.longDescription || "";

  return `
    <section class="section">
      <div class="wrap">
        <div class="detail">
          <div class="detail__media">
            <img class="detail__img fade" src="${esc(assetUrl(product.image))}" alt="${esc(product.name)}" loading="lazy" decoding="async" />
          </div>
          <div class="detail__info">
            <div class="kicker fade">${esc(collection.title)} — ${esc(collection.season)}</div>
            <h1 class="detail__title fade">${esc(product.name)}</h1>
            <div class="kicker fade">${esc(product.category)}</div>
            <p class="detail__copy fade">${esc(shortDescription)}</p>
            ${longDescription ? `<p class="detail__copy fade">${esc(longDescription).replaceAll("\n", "<br />")}</p>` : ""}
            ${detailItems ? `<div class="detail__spec fade">${detailItems}</div>` : ""}
            <div class="shops">
              <div class="mini fade">Continue securely to our official marketplace partner for pricing, stock, checkout, shipping, and promotions.</div>
              ${shops || `<span class="mini fade">Marketplace link is not available yet.</span>`}
              <div class="rule"></div>
              <a class="link fade" href="#/collection/${encodeURIComponent(collection.id)}">BACK TO COLLECTION →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildSimplePage(title, copy) {
  return `
    <section class="section">
      <div class="wrap">
        <div class="headline">
          <h1 class="h fade">${esc(title)}</h1>
          <p class="sub fade">${esc(copy)}</p>
        </div>
        <div class="rule"></div>
        <a class="link fade" href="#/">BACK HOME →</a>
      </div>
    </section>
  `;
}

function buildShopPage() {
  return `
    <section class="section">
      <div class="wrap">
        <div class="headline">
          <h1 class="h fade">SHOP</h1>
          <p class="sub fade">Browse our curated collections and continue shopping through official marketplace partners.</p>
        </div>
        <div class="rule"></div>
        <div class="copy fade">
          <p class="sub">L Kids Official is designed as a premium visual catalog rather than a traditional online storefront.</p>
          <p class="sub">Every collection page focuses on storytelling, styling, and product presentation first — creating a calm browsing experience inspired by fashion editorials and modern lookbooks.</p>
          <p class="sub">When you are ready to purchase, the “Shop Now” button will redirect you securely to our official marketplace partners such as Shopee, Tokopedia, TikTok Shop, or selected external stores.</p>
          <p class="sub">Product pricing, stock availability, promotions, checkout, shipping, and payment methods are handled directly through each marketplace platform.</p>
        </div>
        <div class="rule"></div>
        <div class="detail__spec fade">
          <div>OFFICIAL MARKETPLACE LINKS</div>
          <div>FAST PRODUCT BROWSING</div>
          <div>CURATED COLLECTIONS</div>
          <div>EDITORIAL VISUAL EXPERIENCE</div>
          <div>SECURE EXTERNAL CHECKOUT</div>
          <div>MOBILE FRIENDLY EXPERIENCE</div>
        </div>
        <div class="rule"></div>
        <div class="mini fade">Available on selected marketplace partners:</div>
        <div class="mini fade">Shopee</div>
        <div class="mini fade">Tokopedia</div>
        <div class="mini fade">TikTok Shop</div>
        <div class="mini fade">Website Store Partners</div>
        <div class="rule"></div>
        <a class="link fade" href="#/collections">OPEN COLLECTIONS →</a>
      </div>
    </section>
  `;
}

function buildLookbookPage() {
  return `
    <section class="section">
      <div class="wrap">
        <div class="headline">
          <h1 class="h fade">LOOKBOOK</h1>
          <p class="sub fade">A visual collection of calm childhood moments captured through natural lighting, minimal styling, soft movement, and modern editorial direction.</p>
        </div>
        <div class="rule"></div>
        <div class="copy fade">
          <p class="sub">Our lookbook focuses on simplicity, movement, and atmosphere rather than loud styling.</p>
          <p class="sub">Inspired by modern architecture, Scandinavian interiors, editorial photography, and everyday family routines, each visual story is designed to feel quiet, spacious, and emotionally warm.</p>
          <p class="sub">Through oversized silhouettes, neutral tones, and soft textures, the collections naturally blend into calm daily environments while still maintaining a premium modern aesthetic.</p>
        </div>
        <div class="rule"></div>
        <div class="hero__below fade" style="justify-content:flex-start">
          <span class="mini">EDITORIAL</span>
          <span class="mini">MINIMAL</span>
          <span class="mini">MODERN</span>
          <span class="mini">SOFT LIGHTING</span>
          <span class="mini">DAILYWEAR</span>
        </div>
      </div>
    </section>
  `;
}

function buildContactPage() {
  return `
    <section class="section">
      <div class="wrap">
        <div class="headline">
          <h1 class="h fade">CONTACT</h1>
          <p class="sub fade">For collaborations, marketplace partnerships, product inquiries, or general support, please contact us through the channels below.</p>
        </div>
        <div class="rule"></div>
        <div class="contact fade">
          <div class="contact__row">
            <div class="contact__label">EMAIL</div>
            <div class="contact__value">hello@lkidsofficial.com</div>
          </div>
          <div class="contact__row">
            <div class="contact__label">INSTAGRAM</div>
            <div class="contact__value">@lkidsofficial</div>
          </div>
          <div class="contact__row">
            <div class="contact__label">TIKTOK</div>
            <div class="contact__value">@lkidsofficial</div>
          </div>
          <div class="contact__row">
            <div class="contact__label">MARKETPLACE</div>
            <div class="contact__value">Shopee / Tokopedia / TikTok Shop</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildFooter() {
  return `
    <footer class="footer">
      <div class="wrap footer__inner">
        <div class="footer__brand">
          <div class="footer__title">L Kids Official</div>
          <div class="footer__desc">L Kids Official is a curated modern kidswear catalog focused on calm visuals, timeless styling, and comfortable everyday essentials.</div>
        </div>
        <nav class="footer__links" aria-label="Footer">
          <a href="#/">HOME</a>
          <a href="#/shop">SHOP</a>
          <a href="#/collections">COLLECTIONS</a>
          <a href="#/lookbook">LOOKBOOK</a>
          <a href="#/about">ABOUT</a>
          <a href="#/films">FILMS</a>
          <a href="#/contact">CONTACT</a>
        </nav>
      </div>
      <div class="wrap footer__bottom">
        <div>© 2026 L Kids Official. All rights reserved.</div>
      </div>
    </footer>
  `;
}

function buildLoginPage() {
  return buildSimplePage(
    "LOGIN",
    "Account access is coming soon. For now, browse the catalog and use “Shop Now” to purchase through our official marketplace partners."
  );
}

function parseRoute() {
  const raw = location.hash.replace(/^#/, "");
  const path = raw.startsWith("/") ? raw.slice(1) : raw;
  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
  return parts;
}

function updateNavSolid() {
  const nav = $(".nav");
  if (!nav) return;
  const parts = parseRoute();
  const onHome = parts.length === 0;
  const solid = !onHome || window.scrollY > 12;
  nav.classList.toggle("is-solid", solid);
}

function render() {
  const app = $("#app");
  if (!app) return;

  const parts = parseRoute();
  let html = "";

  if (parts.length === 0) {
    html = buildHome();
  } else if (parts[0] === "collection" && parts[1]) {
    const collection = findCollection(parts[1]);
    if (!collection) {
      html = buildSimplePage("NOT FOUND", "Collection not found.");
    } else if (parts[2] === "product" && parts[3]) {
      const product = findProduct(collection, parts[3]);
      if (!product) {
        html = buildSimplePage("NOT FOUND", "Product not found.");
      } else {
        html = buildProductDetail(collection, product);
      }
    } else {
      html = buildCollectionDetail(collection);
    }
  } else if (parts[0] === "collections") {
    html = buildCollectionCards();
  } else if (parts[0] === "shop") {
    html = buildShopPage();
  } else if (parts[0] === "lookbook") {
    html = buildLookbookPage();
  } else if (parts[0] === "login") {
    html = buildLoginPage();
  } else if (parts[0] === "about") {
    html = buildAbout();
  } else if (parts[0] === "films") {
    html = buildFilms();
  } else if (parts[0] === "contact") {
    html = buildContactPage();
  } else {
    html = buildSimplePage(parts[0].toUpperCase(), "This page is a placeholder. Browse collections and open products to continue to external checkout.");
  }

  app.innerHTML = `${html}${buildFooter()}`;
  app.focus();
  setMenu(false);
  wireInView();
  updateSideNavActive();
  updateNavSolid();
}

function wireInView() {
  const els = $$(".fade");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

function updateSideNavActive() {
  const items = $$(".side-nav__item");
  const sections = $$("[data-section]");
  if (!items.length || !sections.length) return;

  const active = sections
    .map((s) => {
      const r = s.getBoundingClientRect();
      const score = Math.abs(r.top - 120);
      return { id: s.getAttribute("data-section"), score, top: r.top };
    })
    .filter((x) => x.id && x.top < window.innerHeight)
    .sort((a, b) => a.score - b.score)[0];

  const activeId = active?.id;
  items.forEach((a) => a.classList.toggle("is-active", a.dataset.target === activeId));
}

function setupSideNavScroll() {
  const nav = $(".side-nav");
  if (!nav) return;
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const id = a.getAttribute("href")?.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupMenu() {
  const btn = $("#menuBtn");
  const labelBtn = $("#menuLabelBtn");
  const closeBtn = $("#menuCloseBtn");
  const overlay = $("#overlay");
  const sidebar = $("#sidebarLeft");
  if (!btn || !labelBtn || !closeBtn || !overlay || !sidebar) return;

  const open = () => setMenu(true);
  const close = () => setMenu(false);

  btn.addEventListener("click", () => setMenu(!state.menuOpen));
  labelBtn.addEventListener("click", () => setMenu(!state.menuOpen));
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  sidebar.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.menuOpen) close();
  });
}

function setupHeroParallax() {
  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      const media = $(".hero__media");
      if (!media) return;
      const y = Math.min(180, Math.max(-60, window.scrollY * 0.08));
      media.style.transform = `translate3d(0, ${y}px, 0) scale(1.04)`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupCursor() {
  const cursor = $("#cursor");
  if (!cursor) return;
  let raf = 0;
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;

  const tick = () => {
    raf = 0;
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    cursor.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0)`;
    if (Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2) raf = requestAnimationFrame(tick);
  };

  const move = (e) => {
    cursor.style.opacity = "1";
    tx = e.clientX;
    ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const leave = () => {
    cursor.style.opacity = "0";
  };

  window.addEventListener("mousemove", move, { passive: true });
  window.addEventListener("mouseleave", leave);

  const hover = (on) => cursor.classList.toggle("is-hover", on);
  window.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.closest("a,button")) hover(true);
    },
    { passive: true }
  );
  window.addEventListener(
    "mouseout",
    (e) => {
      if (e.target.closest("a,button")) hover(false);
    },
    { passive: true }
  );
}

function setupGlobal() {
  setupMenu();
  setupSideNavScroll();
  setupHeroParallax();
  setupCursor();

  window.addEventListener("scroll", updateSideNavActive, { passive: true });
  window.addEventListener("scroll", updateNavSolid, { passive: true });
  window.addEventListener("hashchange", render);
  render();
}

document.addEventListener("DOMContentLoaded", setupGlobal);
