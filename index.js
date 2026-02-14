let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const exportBtn = document.getElementById("export-btn");

const ulEl = document.getElementById("ul-el");
const countEl = document.getElementById("count-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
} else {
  render(myLeads);
}

function normalizeUrl(value) {
  const v = (value || "").trim();
  if (!v) return "";

  // If user types "google.com" without protocol, add https://
  if (!/^https?:\/\//i.test(v) && /^[\w-]+\.[\w.-]+/.test(v)) {
    return "https://" + v;
  }
  return v;
}

function saveAndRender() {
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs?.[0]?.url || "";
    if (!url) return;

    myLeads.push(url);
    saveAndRender();
  });
});

inputBtn.addEventListener("click", function () {
  const url = normalizeUrl(inputEl.value);
  if (!url) return;

  myLeads.push(url);
  inputEl.value = "";
  saveAndRender();
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    const safeText = String(leads[i])
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

    listItems += `
      <li>
        <a target="_blank" rel="noopener noreferrer" href="${safeText}">
          ${safeText}
        </a>
      </li>
    `;
  }

  ulEl.innerHTML = listItems;
  if (countEl) countEl.textContent = String(leads.length);
}

/**
 * EXPORT PDF approach (simple + reliable):
 * - Open a new tab with a clean printable HTML page of the saved links.
 * - Trigger the browser print dialog.
 * - User chooses "Save as PDF".
 */
exportBtn.addEventListener("click", function () {
  const leads = JSON.parse(localStorage.getItem("myLeads")) || [];
  const dateStr = new Date().toLocaleString();

  const itemsHtml = leads.length
    ? leads
        .map((u) => {
          const safe = String(u)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
          return `<li><a href="${safe}">${safe}</a></li>`;
        })
        .join("")
    : `<li class="empty">No saved links yet.</li>`;

  const printHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Leads Export</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #111; }
    h1 { margin: 0 0 6px; font-size: 20px; }
    .meta { color: #555; font-size: 12px; margin-bottom: 16px; }
    ul { padding-left: 18px; }
    li { margin: 8px 0; }
    a { color: #0b6b3a; text-decoration: none; word-break: break-word; }
    a:hover { text-decoration: underline; }
    .empty { color: #666; }
    @media print { .meta { color: #333; } }
  </style>
</head>
<body>
  <h1>Leads Tracker Export</h1>
  <div class="meta">Generated: ${dateStr} • Total links: ${leads.length}</div>
  <ul>${itemsHtml}</ul>

  <script>
    window.onload = () => {
      window.print();
    };
  </script>
</body>
</html>`;

  const blob = new Blob([printHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
});
