const iconMap = [
  "./assets/images-upload/icons/trust-ship.png",
  "./assets/images-upload/icons/trust-snow.png",
  "./assets/images-upload/icons/trust-truck.png",
  "./assets/images-upload/icons/trust-shield.png"
];

function normalizeImage(src) {
  if (!src) return "";
  if (/^https?:\/\/.*/.test(src)) return src;
  return src;
}

function renderTrustGrid(promises) {
  const trustGrid = document.getElementById("trust-grid");
  const labels = [
    ["渔民小批量捕捞", "精挑细选"],
    ["顺丰冷链到家", "全程保鲜"],
    ["微信下单更方便", "快速直达"],
    ["品质可溯安心购", "安全放心"]
  ];

  trustGrid.innerHTML = labels
    .map((item, index) => {
      const [title, subtitle] = item;
      return `<article class="trust-item"><img class="trust-item__icon" src="${iconMap[index]}" alt=""><div class="trust-item__title">${title}</div><div class="trust-item__subtitle">${subtitle}</div></article>`;
    })
    .join("");
}

function productCard(item) {
  return `<article class="product-card"><img class="product-card__image" src="${normalizeImage(item.image)}" alt="${item.title}"><div class="product-card__body"><div class="product-card__meta"><span class="product-card__chip">${item.badge}</span><span class="product-card__chip">${item.stockTag}</span></div><div class="product-card__title">${item.title}</div><div class="product-card__subtitle">${item.subtitle}</div><div class="product-card__footer"><div class="product-card__price">¥${item.price}<small style="font-size:16px;font-weight:700;color:#7c8ea0">${item.unit}</small></div><div class="product-card__cta">适合发客户看</div></div></div></article>`;
}

async function boot() {
  const response = await fetch("./data.json");
  const data = await response.json();

  document.getElementById("promo-title").textContent = data.promo.title;
  document.getElementById("promo-text").textContent = data.promo.text;
  document.getElementById("story-title").textContent = data.sourceStory.title;
  document.getElementById("story-text").textContent = data.sourceStory.text;
  document.getElementById("highlight-list").innerHTML = data.highlights
    .map((item) => `<li><strong>${item.title}</strong><div style="margin-top:6px;color:#60758a">${item.text}</div></li>`)
    .join("");

  renderTrustGrid(data.promises);
  document.getElementById("featured-grid").innerHTML = data.featuredProducts.map(productCard).join("");
  document.getElementById("fresh-grid").innerHTML = data.freshProducts.map(productCard).join("");
}

boot().catch((error) => {
  document.body.innerHTML = `<div style="padding:40px;font-family:Arial,sans-serif"><h2>预览页加载失败</h2><p>${error.message}</p></div>`;
});
