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
  card.innerHTML = `
    <img class="extension-thumb" src="${escapeHtml(ext.image || "")}" alt="${escapeHtml(ext.name)} thumbnail" loading="lazy">
    <div class="extension-body">
      <h2 class="extension-title">${escapeHtml(ext.name)}</h2>
      <p class="extension-desc">${escapeHtml(ext.description || "")}</p>
      <p class="extension-author">Created by
        ${ext.authorLink
          ? `<a href="${escapeHtml(ext.authorLink)}" target="_blank" rel="noopener">${escapeHtml(ext.author || "Unknown")}</a>`
          : escapeHtml(ext.author || "Unknown")}.
      </p>
      <div class="extension-actions">
        <button class="btn btn-try" data-link="${escapeHtml(ext.link || "")}">Try it Out</button>
        <button class="btn btn-download" data-link="${escapeHtml(ext.link || "")}" data-name="${escapeHtml(ext.name || "extension")}">Download</button>
      </div>
    </div>
  `;

  card.querySelector(".btn-try").addEventListener("click", (e) => {
    const link = e.currentTarget.dataset.link;
    if (!link) return;
    const editorUrl = "https://studio.penguinmod.com/editor.html?extension=" + encodeURIComponent(link);
    window.open(editorUrl, "_blank", "noopener");
  });

  card.querySelector(".btn-download").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const link = btn.dataset.link;
    const name = btn.dataset.name.replace(/[^a-z0-9_-]/gi, "_") + ".js";
    const original = btn.textContent;
    try {
      btn.textContent = "Downloading...";
      const res = await fetch(link);
      if (!res.ok) throw new Error("Failed to fetch file");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      btn.textContent = "Downloaded!";
    } catch (err) {
      window.open(link, "_blank");
      btn.textContent = original;
    } finally {
      setTimeout(function () {
        btn.textContent = original;
      }, 1500);
    }
  });

  return card;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function wireSearch() {
  const input = document.getElementById("gallery-search");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = allExtensions.filter(function (ext) {
      return (
        ext.name.toLowerCase().includes(q) ||
        (ext.description || "").toLowerCase().includes(q) ||
        (ext.author || "").toLowerCase().includes(q)
      );
    });
    renderGallery(filtered);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadExtensions();
  wireSearch();
});
