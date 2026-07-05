const GALLERY_JSON_PATH = "code/extensions.json";

let allExtensions = [];

async function loadExtensions() {
  const grid = document.getElementById("extension-grid");
  try {
    const res = await fetch(GALLERY_JSON_PATH);
    if (!res.ok) throw new Error("Failed to load " + GALLERY_JSON_PATH);
    allExtensions = await res.json();
    renderGallery(allExtensions);
  } catch (err) {
    grid.innerHTML = `<div class="gallery-empty">Could not load extensions: ${escapeHtml(err.message)}</div>`;
  }
}

function renderGallery(list) {
  const grid = document.getElementById("extension-grid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<div class="gallery-empty">No extensions found.</div>`;
    return;
  }

  for (const ext of list) {
    grid.appendChild(buildCard(ext));
  }
}

function buildCard(ext) {
  const card = document.createElement("div");
  card.className = "extension-card";

  const star = ext.featured ? `<span class="star">★</span>` : "";

  card.innerHTML = `
    <img class="extension-thumb" src="${escapeHtml(ext.image || "")}" alt="${escapeHtml(ext.name)} thumbnail" loading="lazy">
    <div class="extension-body">
      <h2 class="extension-title">${escapeHtml(ext.name)} ${star}</h2>
      <p class="extension-desc">${escapeHtml(ext.description || "")}</p>
      <p class="extension-author">Created by
        ${ext.authorLink
          ? `<a href="${escapeHtml(ext.authorLink)}" target="_blank" rel="noopener">${escapeHtml(ext.author || "Unknown")}</a>`
          : escapeHtml(ext.author || "Unknown")}.
      </p>
      <div class="extension-actions">
        <button class="btn btn-copy" data-link="${escapeHtml(ext.link || "")}">Copy Link</button>
        <button class="btn btn-try" data-link="${escapeHtml(ext.link || "")}">Try it out</button>
      </div>
    </div>
  `;

  card.querySelector(".btn-copy").addEventListener("click", (e) => {
    const link = e.currentTarget.dataset.link;
    navigator.clipboard.writeText(link).then(() => {
      const btn = e.currentTarget;
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = original), 1200);
    });
  });

  card.querySelector(".btn-try").addEventListener("click", (e) => {
    const link = e.currentTarget.dataset.link;
    /
    window.open(`https://penguinmod.com/editor.html?extension=${encodeURIComponent(link)}`, "_blank");
  });

  return card;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function wireSearch() {
  const input = document.getElementById("gallery-search");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = allExtensions.filter(
      (ext) =>
        ext.name.toLowerCase().includes(q) ||
        (ext.description || "").toLowerCase().includes(q) ||
        (ext.author || "").toLowerCase().includes(q)
    );
    renderGallery(filtered);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadExtensions();
  wireSearch();
});
