const express = require("express");
const cors = require("cors");

const app = express();

// Serve static files from the public folder
app.use(express.static("public"));

// Parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// NVD API route
app.get("/api/cves", async (req, res) => {
  const { keyword } = req.query;

  try {
    const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(keyword || "software")}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CVEs" });
  }
});

// Saved threats (in‑memory, no DB)
app.get("/api/saved", (req, res) => {
  res.json([]);
});

app.post("/api/saved", (req, res) => {
  console.log("Saving:", req.body);
  res.status(201).json(req.body);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});