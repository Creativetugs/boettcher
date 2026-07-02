/* ===============================================
   Boettcher Supply — concept demo interactions
   =============================================== */

/* --- Product catalog data (drives the Product Finder) --- */
const CATALOG = {
  electrical: {
    label: "Electrical",
    categories: {
      lighting: {
        label: "Lighting & LED",
        products: [
          { name: "LED Tube Retrofit Kits", brand: "Various", desc: "Swap old fluorescent tubes and cut your electric bill." },
          { name: "Shop & High-Bay Fixtures", brand: "Various", desc: "Bright, efficient lighting for warehouses & shops." },
        ],
      },
      wire: {
        label: "Wire, Cable & Conduit",
        products: [
          { name: "THHN Building Wire", brand: "Various", desc: "Copper wire by the foot or spool." },
          { name: "EMT & PVC Conduit", brand: "Various", desc: "Conduit, fittings and straps in stock." },
        ],
      },
      power: {
        label: "Breakers & Panels",
        products: [
          { name: "Circuit Breakers", brand: "Various", desc: "Common residential & commercial amperages." },
          { name: "Load Centers & Panels", brand: "Various", desc: "Panels and accessories for new work." },
        ],
      },
      tools: {
        label: "Power Tools",
        products: [
          { name: 'Milwaukee "Store In a Store"', brand: "Milwaukee", desc: "Come see the full Milwaukee lineup in person." },
          { name: "M18 / M12 Cordless Tools", brand: "Milwaukee", desc: "Drivers, saws, batteries and accessories." },
        ],
      },
    },
  },
  plumbing: {
    label: "Plumbing",
    categories: {
      fittings: {
        label: "Fittings & Connectors",
        products: [
          { name: "SharkBite Fittings", brand: "SharkBite", desc: "Push-to-connect fittings — no torch needed." },
          { name: "Pex-to-Comp Tees", brand: "Various", desc: "Specialty tees we keep on the shelf." },
        ],
      },
      fixtures: {
        label: "Faucets & Fixtures",
        products: [
          { name: "Peerless Faucets", brand: "Peerless", desc: "Kitchen & bath faucets, parts available." },
          { name: "InSinkErator Disposals", brand: "InSinkErator", desc: "Garbage disposals and mounting kits." },
        ],
      },
      heaters: {
        label: "Water Heaters",
        products: [
          { name: "Bradford White Water Heaters", brand: "Bradford White", desc: "Reliable heaters plus replacement parts." },
          { name: "Water Heater Parts", brand: "Bradford White", desc: "Elements, valves and thermostats in stock." },
        ],
      },
    },
  },
  outdoor: {
    label: "Outdoor Power & Small Engine",
    categories: {
      handheld: {
        label: "Blowers, Trimmers & Saws",
        products: [
          { name: "Echo Blowers", brand: "Echo", desc: "Handheld and backpack blowers." },
          { name: "Echo Trimmers & Chainsaws", brand: "Echo", desc: "Trimmers, saws and attachments." },
        ],
      },
      parts: {
        label: "Parts & Consumables",
        products: [
          { name: "Chainsaw Chains", brand: "Various", desc: "Loops cut and sized to your bar." },
          { name: "Mower Blades", brand: "Various", desc: "Replacement blades for common decks." },
          { name: "Bar & Chain Oil", brand: "Various", desc: "Keep your saw running smooth." },
        ],
      },
    },
  },
};

/* --- Element refs --- */
const deptSelect = document.getElementById("deptSelect");
const catSelect = document.getElementById("catSelect");
const searchInput = document.getElementById("searchInput");
const resultsEl = document.getElementById("finderResults");

const tagClass = { electrical: "tag-electrical", plumbing: "tag-plumbing", outdoor: "tag-outdoor" };

/* --- Populate category dropdown when department changes --- */
function loadCategories(dept) {
  catSelect.innerHTML = "";
  if (!dept || !CATALOG[dept]) {
    catSelect.disabled = true;
    catSelect.innerHTML = '<option value="">Choose a department first…</option>';
    return;
  }
  catSelect.disabled = false;
  const cats = CATALOG[dept].categories;
  catSelect.insertAdjacentHTML("beforeend", '<option value="">All categories</option>');
  Object.keys(cats).forEach((key) => {
    catSelect.insertAdjacentHTML("beforeend", `<option value="${key}">${cats[key].label}</option>`);
  });
}

/* --- Build a result card --- */
function card(dept, product, categoryLabel) {
  const label = CATALOG[dept].label;
  return `
    <div class="result-card">
      <span class="result-card__tag ${tagClass[dept]}">${label}</span>
      <h4>${product.name}</h4>
      <p>${product.desc}</p>
      <div class="result-card__foot">
        <span class="result-card__brand">${product.brand !== "Various" ? product.brand : categoryLabel}</span>
        <button class="result-card__add" data-name="${product.name}">Add to quote</button>
      </div>
    </div>`;
}

/* --- Render results based on current filters --- */
function render() {
  const dept = deptSelect.value;
  const cat = catSelect.value;
  const query = searchInput.value.trim().toLowerCase();

  let matches = [];

  const scanDept = (dKey) => {
    const cats = CATALOG[dKey].categories;
    Object.keys(cats).forEach((cKey) => {
      if (dept && cat && dKey === dept && cKey !== cat) return;
      cats[cKey].products.forEach((p) => {
        matches.push({ dept: dKey, product: p, catLabel: cats[cKey].label });
      });
    });
  };

  if (query) {
    Object.keys(CATALOG).forEach(scanDept);
    matches = matches.filter((m) => {
      const hay = `${m.product.name} ${m.product.desc} ${m.product.brand} ${m.catLabel}`.toLowerCase();
      return hay.includes(query);
    });
  } else if (dept) {
    scanDept(dept);
  } else {
    showEmpty();
    return;
  }

  if (matches.length === 0) {
    resultsEl.innerHTML = `
      <div class="finder-empty">
        <p>No matches${query ? ` for “${searchInput.value}”` : ""}. Try another term or call us at
        <strong>1-800-657-5770</strong> — if we don't stock it, we'll help you find it.</p>
      </div>`;
    return;
  }

  const meta = `<p class="result-meta">${matches.length} product${matches.length > 1 ? "s" : ""} found${
    dept && !query ? ` in ${CATALOG[dept].label}` : ""
  }</p>`;
  const grid = `<div class="result-grid">${matches
    .map((m) => card(m.dept, m.product, m.catLabel))
    .join("")}</div>`;
  resultsEl.innerHTML = meta + grid;
}

function showEmpty() {
  resultsEl.innerHTML = `
    <div class="finder-empty">
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5 1.49-1.5-5-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
      <p>Pick a department or search to see matching products.</p>
    </div>`;
}

/* --- Events --- */
deptSelect.addEventListener("change", () => {
  loadCategories(deptSelect.value);
  searchInput.value = "";
  render();
});
catSelect.addEventListener("change", render);
searchInput.addEventListener("input", () => {
  if (searchInput.value.trim()) {
    deptSelect.value = "";
    loadCategories("");
  }
  render();
});

/* Department cards jump straight into the finder */
document.querySelectorAll(".dept-card__link[data-dept]").forEach((link) => {
  link.addEventListener("click", () => {
    const dept = link.dataset.dept;
    deptSelect.value = dept;
    loadCategories(dept);
    searchInput.value = "";
    render();
  });
});

/* --- Cart / quote demo --- */
let cartCount = 0;
const cartCountEl = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

resultsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".result-card__add");
  if (!btn) return;
  cartCount += 1;
  cartCountEl.textContent = cartCount;
  showToast(`Added “${btn.dataset.name}” to your quote`);
});

document.getElementById("cartBtn").addEventListener("click", () => {
  showToast(cartCount ? `${cartCount} item(s) in your quote — log in to check out` : "Your quote is empty");
});

/* --- Mobile nav --- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
});
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  })
);

/* --- Year in footer --- */
document.getElementById("year").textContent = new Date().getFullYear();
