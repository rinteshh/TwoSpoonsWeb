/* =========================================================
   Two Spoons — interactivity
   ========================================================= */

const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/* ---------- Menu data ---------- */
const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "savoury", label: "Savoury Bites" },
  { id: "sweet", label: "Sweet Tooth" },
  { id: "bakes", label: "Cookies & Gifting" },
];

const PRODUCTS = [
  // Savoury Bites
  { slug: "korean-cream-cheese-bun", name: "Korean Cream Cheese Bun", price: 99, cat: "savoury", img: "images/korean-cream-cheese-bun.jpg", badge: "Bestseller", desc: "Pillowy bun oozing with sweet-savoury cream cheese." },
  { slug: "tandoori-cheese-fries", name: "Cheese Stuffed Potato Fries", price: 189, cat: "savoury", img: "images/tandoori-cheese-fries.jpg", desc: "Loaded fries drizzled with our smoky tandoori mayo." },
  { slug: "french-fries", name: "French Fries", price: 99, cat: "savoury", img: "images/french-fries.jpg", desc: "Golden, crispy and dangerously snackable." },
  { slug: "peri-peri-fries", name: "Peri Peri French Fries", price: 119, cat: "savoury", img: "images/peri-peri-fries.jpg", badge: "Spicy", desc: "Fries with a fiery peri peri kick." },
  { slug: "mozzarella-buns", name: "Cream Cheese Mozzarella Buns", price: 119, cat: "savoury", img: "images/mozzarella-buns.jpg", desc: "Cheese-pull heaven in a soft, golden bun." },
  { slug: "stuffed-garlic-bread", name: "Stuffed Garlic Bread", price: 139, cat: "savoury", img: "images/stuffed-garlic-bread.jpg", desc: "Buttery garlic bread stuffed to the edges with cheese." },
  { slug: "chilli-cheese-toast", name: "Chili Cheese Toast", price: 99, cat: "savoury", img: "images/chilli-cheese-toast.jpg", desc: "Pack of 2. Crunchy toast, gooey chilli cheese." },
  { slug: "cheese-balls", name: "Cheese Balls", price: 129, cat: "savoury", img: "images/cheese-balls.jpg", desc: "Crispy cheese bites served with tandoori dip." },
  { slug: "milk-honey-bread", name: "Milk & Honey Bread", price: 119, cat: "savoury", img: "images/milk-honey-bread.jpg", desc: "Soft milk loaf kissed with honey." },
  { slug: "garlic-brioche", name: "Cheesy Garlic Brioche Bread", price: 199, cat: "savoury", img: "images/garlic-brioche.jpg", desc: "Rich brioche, loaded garlic butter, molten cheese." },
  { slug: "garlic-rolls", name: "Cheesy Garlic Rolls", price: 89, cat: "savoury", img: "images/garlic-rolls.jpg", desc: "Pull-apart rolls packed with garlicky cheese." },
  { slug: "subway-loaf", name: "Subway Style Loaf", price: 139, cat: "savoury", img: "images/subway-loaf.jpg", desc: "Freshly baked sub-style loaf, soft and hearty." },
  { slug: "kaffir-lime-chicken", name: "Kaffir Lime Hot & Sweet Chicken", price: 289, cat: "savoury", img: "images/kaffir-lime-chicken.jpg", badge: "Boneless", desc: "Boneless chicken glazed hot, sweet & zesty." },

  // Sweet Tooth
  { slug: "belgium-brownie", name: "Belgium Chocolate Brownie", price: 169, cat: "sweet", img: "images/belgium-brownie.jpg", badge: "Bestseller", desc: "Deep, fudgy Belgian chocolate brownie." },
  { slug: "popcorn-churros", name: "Popcorn Churros", price: 149, cat: "sweet", img: "images/popcorn-churros.jpg", desc: "Cinnamon-sugar churros, poppable bite size." },
  { slug: "burnt-cheesecake", name: "Burnt Vanilla Cheesecake", price: 199, cat: "sweet", img: "images/burnt-cheesecake.jpg", desc: "Caramelised Basque-style cheesecake. Slice or cake." },
  { slug: "brookie", name: "Brookie", price: 219, cat: "sweet", img: "images/brookie.jpg", desc: "6 cookies where brownie meets cookie dough." },
  { slug: "fudge-brownie", name: "Fudge Brownie", price: 95, cat: "sweet", img: "images/fudge-brownie.jpg", desc: "Extra-gooey single-serve fudge brownie." },
  { slug: "brownie-tub", name: "Brownie Tub", price: 249, cat: "sweet", img: "images/brownie-tub.jpg", desc: "A tub of warm brownie chunks. Bring a spoon." },
  { slug: "chocochip-cookie", name: "Belgium Mini Chocochip Cookies", price: 299, cat: "sweet", img: "images/chocochip-cookie.jpg", desc: "Bite-size cookies loaded with Belgian chips." },
  { slug: "tiramisu-brownie", name: "Tiramisu Brownie", price: 119, cat: "sweet", img: "images/tiramisu-brownie.jpg", badge: "New", desc: "Coffee-soaked mascarpone meets fudgy brownie." },
  { slug: "custom-cakes", name: "Customized Cakes", price: 449, cat: "sweet", img: "images/custom-cakes.jpg", badge: "Starting", desc: "Made-to-order celebration cakes, your way." },
  { slug: "almond-stick", name: "Almond Stick", price: 199, cat: "sweet", img: "images/almond-stick.jpg", desc: "Crunchy almond-loaded bake for your chai." },
  { slug: "lemon-blueberry-cake", name: "Lemon Blueberry Tea Cake", price: 299, cat: "sweet", img: "images/lemon-blueberry-cake.jpg", desc: "Zesty lemon sponge studded with blueberries." },

  // Cookies & Gifting
  { slug: "dry-fruit-laddu", name: "Dry Fruit Laddu (250g)", price: 399, cat: "bakes", img: "images/dry-fruit-laddu.jpg", badge: "Gifting", desc: "No-sugar-added laddus packed with dry fruits." },
  { slug: "coconut-cookie", name: "Coconut Cookie (200g)", price: 149, cat: "bakes", img: "images/coconut-cookie.jpg", desc: "Buttery, toasty coconut cookies." },
  { slug: "walnut-cookie", name: "Dates & Walnut Cookie (200g)", price: 199, cat: "bakes", img: "images/walnut-cookie.jpg", desc: "Naturally sweet dates with crunchy walnut." },
  { slug: "carrot-halwa", name: "Carrot Halwa (200g)", price: 189, cat: "bakes", img: "images/carrot-halwa.jpg", desc: "Slow-cooked gajar halwa, rich and warming." },
  { slug: "nutella-bomboloni", name: "Nutella Bomboloni", price: 99, cat: "bakes", img: "images/nutella-bomboloni.jpg", badge: "New", desc: "Fluffy doughnut bursting with Nutella." },
  { slug: "cranberry-pistachio-stick", name: "Cranberry Pistachio Stick", price: 199, cat: "bakes", img: "images/cranberry-pistachio-stick.jpg", desc: "Crunchy stick with tart cranberry & pistachio." },
  { slug: "paneer", name: "Fresh Paneer (200g)", price: 125, cat: "bakes", img: "images/paneer.jpg", desc: "Soft, fresh house-made paneer." },
];

const SPECIALS = [
  { name: "Tres Leches (Vanilla)", img: "images/tres-leches.jpg", tag: "Chef's Special", desc: "Three-milk soaked vanilla sponge — melt-in-mouth soft." },
  { name: "White Sauce Pasta", img: "images/white-sauce-pasta.jpg", tag: "Chef's Special", desc: "Creamy, cheesy white sauce pasta made fresh to order." },
  { name: "Gochujang Korean Cheese Bun", img: "images/gochujang-bun.jpg", tag: "New Drop ✨", desc: "Sweet-heat gochujang glaze over a molten cheese bun." },
];

const OFFER_STRINGS = [
  "🌈 10% OFF ON ORDERS ₹800+",
  "✨ FREE HAZELNUT CAPPUCCINO ON ₹600+",
  "★ 5% OFF ON ORDERS ₹500+",
  "🥄 BAKED FRESH EVERY MORNING",
];

const STRIP_WORDS = ["FRESH DAILY", "SMALL BATCH", "MADE WITH LOVE", "GRAB A SPOON", "TWO SPOONS", "STAY GOOEY"];

const REVIEWS = [
  { name: "Aisha R.", text: "The Korean cheese bun is unreal — I order it every single week now. Nothing else comes close." },
  { name: "Rohan M.", text: "That Belgium brownie is the fudgiest thing I've ever had. My whole office is hooked." },
  { name: "Neha K.", text: "Got a custom cake for my daughter's birthday and everyone asked where it was from. 10/10." },
  { name: "Sameer P.", text: "Peri peri fries + free hazelnut cappuccino on my 600 order? Two Spoons gets it." },
  { name: "Divya S.", text: "The dry fruit laddus made the perfect Diwali gift. Fresh, not too sweet, gorgeous packaging." },
  { name: "Karan T.", text: "Tiramisu brownie is a crime it's so good. Please never take it off the menu." },
];

/* ---------- State ---------- */
const cart = new Map(); // slug -> qty
const bySlug = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
let activeCat = "all";

/* ---------- Render: specials ---------- */
function renderSpecials() {
  document.getElementById("specialsGrid").innerHTML = SPECIALS.map((s) => `
    <article class="special">
      <img src="${s.img}" alt="${s.name}" loading="lazy" />
      <div class="special__body">
        <span class="special__tag">${s.tag}</span>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      </div>
    </article>`).join("");
}

/* ---------- Render: menu ---------- */
function renderTabs() {
  document.getElementById("menuTabs").innerHTML = CATEGORIES.map((c) =>
    `<button class="tab ${c.id === activeCat ? "is-active" : ""}" data-cat="${c.id}" role="tab">${c.label}</button>`
  ).join("");
}

function renderMenu() {
  const list = activeCat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat);
  document.getElementById("menuGrid").innerHTML = list.map((p) => `
    <article class="card">
      <div class="card__media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
      </div>
      <div class="card__body">
        <h3 class="card__name">${p.name}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__foot">
          <span class="card__price">${money(p.price)}</span>
          <button class="card__add" data-add="${p.slug}" aria-label="Add ${p.name} to bag">+</button>
        </div>
      </div>
    </article>`).join("");
}

/* ---------- Cart ---------- */
function cartCount() {
  let n = 0;
  cart.forEach((q) => (n += q));
  return n;
}
function subtotal() {
  let s = 0;
  cart.forEach((q, slug) => (s += bySlug[slug].price * q));
  return s;
}
function discountInfo(sub) {
  if (sub >= 800) return { rate: 0.1, label: "10% off (₹800+)" };
  if (sub >= 500) return { rate: 0.05, label: "5% off (₹500+)" };
  return { rate: 0, label: "" };
}

function addToCart(slug) {
  cart.set(slug, (cart.get(slug) || 0) + 1);
  updateCart();
  showToast(`${bySlug[slug].name} added to bag`);
}
function setQty(slug, delta) {
  const q = (cart.get(slug) || 0) + delta;
  if (q <= 0) cart.delete(slug);
  else cart.set(slug, q);
  updateCart();
}

function renderPerks(sub) {
  const perks = [
    { on: sub >= 500, text: "5% off unlocked on ₹500+" },
    { on: sub >= 600, text: "Free hazelnut cappuccino on ₹600+ ☕" },
    { on: sub >= 800, text: "10% off unlocked on ₹800+" },
  ];
  document.getElementById("drawerPerks").innerHTML = perks.map((p) => {
    let hint = "";
    if (!p.on) {
      const need = p.text.includes("500") ? 500 : p.text.includes("600") ? 600 : 800;
      hint = ` — add ${money(need - sub)} more`;
    }
    return `<div class="perk ${p.on ? "perk--on" : "perk--off"}">
      <span>${p.on ? "✅" : "⬜"}</span><span>${p.text}${p.on ? "" : hint}</span></div>`;
  }).join("");
}

function updateCart() {
  const count = cartCount();
  document.getElementById("cartCount").textContent = count;

  const itemsEl = document.getElementById("drawerItems");
  if (count === 0) {
    itemsEl.innerHTML = `<div class="drawer__empty">Your bag is empty.<br />Go add something gooey 🥄</div>`;
  } else {
    itemsEl.innerHTML = [...cart.entries()].map(([slug, q]) => {
      const p = bySlug[slug];
      return `<div class="line">
        <img src="${p.img}" alt="${p.name}" />
        <div>
          <div class="line__name">${p.name}</div>
          <div class="line__price">${money(p.price)}</div>
          <div class="qty">
            <button data-dec="${slug}" aria-label="Decrease">−</button>
            <span>${q}</span>
            <button data-inc="${slug}" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="line__total">${money(p.price * q)}</div>
      </div>`;
    }).join("");
  }

  const sub = subtotal();
  const { rate, label } = discountInfo(sub);
  const disc = Math.round(sub * rate);

  renderPerks(sub);
  document.getElementById("sumSubtotal").textContent = money(sub);
  const rowDisc = document.getElementById("rowDiscount");
  if (disc > 0) {
    rowDisc.hidden = false;
    document.getElementById("discLabel").textContent = label;
    document.getElementById("sumDiscount").textContent = "−" + money(disc);
  } else {
    rowDisc.hidden = true;
  }
  document.getElementById("sumTotal").textContent = money(sub - disc);
}

/* ---------- Drawer ---------- */
const drawer = document.getElementById("drawer");
function openDrawer() { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); }
function closeDrawer() { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); }

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-show"), 1800);
}

/* ---------- Marquees ---------- */
function fillMarquee(id, items, sep = "✦") {
  const inner = items.join(`&nbsp;&nbsp;${sep}&nbsp;&nbsp;`);
  document.getElementById(id).innerHTML = `<span>${inner}&nbsp;&nbsp;${sep}&nbsp;&nbsp;</span><span>${inner}&nbsp;&nbsp;${sep}&nbsp;&nbsp;</span>`;
}

function renderReviews() {
  // Empty placeholder blocks for now.
  const EMPTY_COUNT = 6;
  const card = () => `<div class="review review--empty"></div>`;
  document.getElementById("reviewsTrack").innerHTML =
    Array.from({ length: EMPTY_COUNT * 2 }, card).join("");
}

/* ---------- Events ---------- */
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) return addToCart(add.dataset.add);
  const inc = e.target.closest("[data-inc]");
  if (inc) return setQty(inc.dataset.inc, 1);
  const dec = e.target.closest("[data-dec]");
  if (dec) return setQty(dec.dataset.dec, -1);
  const tab = e.target.closest(".tab");
  if (tab) { activeCat = tab.dataset.cat; renderTabs(); renderMenu(); }
});

document.getElementById("cartBtn").addEventListener("click", openDrawer);
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
document.getElementById("drawerOverlay").addEventListener("click", closeDrawer);
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cartCount() === 0) return showToast("Add something first 🥄");
  showToast("Thanks! This is a demo — no real order placed 💛");
});

/* ---------- Nav overlay (opened by the hamburger) ---------- */
const navmenu = document.getElementById("navmenu");
const burgerBtn = document.getElementById("burgerBtn");
function openMenu() { navmenu.classList.add("is-open"); navmenu.setAttribute("aria-hidden", "false"); burgerBtn.setAttribute("aria-expanded", "true"); }
function closeMenu() { navmenu.classList.remove("is-open"); navmenu.setAttribute("aria-hidden", "true"); burgerBtn.setAttribute("aria-expanded", "false"); }
burgerBtn.addEventListener("click", openMenu);
document.getElementById("navmenuClose").addEventListener("click", closeMenu);
document.getElementById("navmenuOverlay").addEventListener("click", closeMenu);
navmenu.addEventListener("click", (e) => { if (e.target.tagName === "A") closeMenu(); });

document.getElementById("newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsEmail").value.trim();
  if (email) {
    document.getElementById("newsMsg").textContent = "You're in! Check your inbox for 15% off 🎉";
    document.getElementById("newsForm").reset();
  }
});

document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDrawer(); closeMenu(); } });

/* ---------- Header: drop the blue cloud once you scroll ---------- */
const sitehead = document.getElementById("sitehead");
function onScroll() { sitehead.classList.toggle("is-scrolled", window.scrollY > 8); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Init ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
fillMarquee("stripTrack", STRIP_WORDS, "✦");
renderSpecials();
renderTabs();
renderMenu();
renderReviews();
updateCart();
