const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cvesList = document.getElementById("List");
const savedList = document.getElementById("savedList");
const loading = document.querySelector(".loading");

async function searchCVEs() {
  const term = searchInput.value.trim();
  if (!term) {
    alert("Please enter a keyword (e.g. Microsoft)");
    return;
  }

  loading.hidden = false;
  cveslist.innerHTML = "";
  try {
    `/api/cves?keyword=${encodeURIComponent(term)}`;
    const data = await res.json();
    const items = data.vulnerabilities || [];

    items.slice(0, 10).forEach(v => {
      const cve = v.cve;
      const id = cve.id;
      let desc = cve.descriptions?.[0]?.value;
      if (!desc) desc = "No description";
      if (desc.length > 160) desc = desc.slice(0, 157) + "...";

      const itemEl = document.createElement("article");
      itemEl.innerHTML = `
        <h3>${id}</h3>
        <p>${desc}</p>
        <button data-id="${id}" class="save-btn">Save</button>
      `;
      cvesList.appendChild(itemEl);
    });

    document.querySelectorAll(".save-btn").forEach(btn => {
      btn.addEventListener("click", () => saveCVE(btn.dataset.id));
    });
  } catch (err) {
    cvesList.innerHTML = "<p>Could not load CVEs. Try again.</p>";
  } finally {
    loading.hidden = true;
  }
}

async function saveCVE(cve_id) {
  const descEl = cvesList.querySelector(`[data-id="${cve_id}"] p`);
  const desc = descEl ? descEl.textContent : "No description";

  const payload = {
    cve_id: cve_id,
    title: cve_id,
    description: desc
  };

  const res = await fetch("/api/saved", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert(`CVE ${cve_id} saved to your watchlist.`);
    loadSaved();
  } else {
    alert("Save failed. Check the console.");
  }
}

async function loadSaved() {
  const res = await fetch("/api/saved");
  const data = await res.json();
  savedList.innerHTML = "";

  if (data.length === 0) {
    savedList.innerHTML = "<p>You have no saved threats yet.</p>";
    return;
  }

  data.forEach(item => {
    const el = document.createElement("p");
    el.textContent = item.cve_id + " – " + (item.description || "No description");
    savedList.appendChild(el);
  });
}

searchBtn.addEventListener("click", searchCVEs);
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    searchCVEs();
  }
});

if (location.pathname.includes("threats.html")) {
  loadSaved();
}
