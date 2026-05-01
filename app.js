const companies = [
  {
    ticker: "AAPL",
    name: "Apple",
    sector: "Consumer Electronics",
    riskScore: 78,
    supplierConcentration: 82,
    chinaTaiwanExposure: 88,
    criticalInputRisk: 74,
    logisticsRisk: 67,
    inventoryBuffer: 52,
    criticalInputs: ["advanced chips", "display panels", "camera modules", "lithium batteries", "rare earth magnets"],
    regions: { "North America": 18, "China/Taiwan": 48, "Southeast Asia": 17, "Europe": 7, "Other": 10 },
    suppliers: ["Foxconn", "TSMC", "Pegatron", "Luxshare", "Murata", "Samsung Display"]
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    sector: "Automotive / Energy",
    riskScore: 73,
    supplierConcentration: 68,
    chinaTaiwanExposure: 54,
    criticalInputRisk: 86,
    logisticsRisk: 65,
    inventoryBuffer: 49,
    criticalInputs: ["lithium", "nickel", "battery cells", "power electronics", "semiconductors"],
    regions: { "North America": 41, "China/Taiwan": 28, "Southeast Asia": 8, "Europe": 18, "Other": 5 },
    suppliers: ["Panasonic", "CATL", "LG Energy Solution", "Vale", "Glencore", "STMicroelectronics"]
  },
  {
    ticker: "NVDA",
    name: "Nvidia",
    sector: "Semiconductors / AI",
    riskScore: 86,
    supplierConcentration: 90,
    chinaTaiwanExposure: 92,
    criticalInputRisk: 88,
    logisticsRisk: 63,
    inventoryBuffer: 45,
    criticalInputs: ["advanced wafers", "HBM memory", "CoWoS packaging", "substrates", "EUV capacity"],
    regions: { "North America": 24, "China/Taiwan": 52, "Southeast Asia": 12, "Europe": 5, "Other": 7 },
    suppliers: ["TSMC", "SK Hynix", "Samsung", "Micron", "ASE", "Amkor"]
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    sector: "Cloud / Software",
    riskScore: 61,
    supplierConcentration: 58,
    chinaTaiwanExposure: 42,
    criticalInputRisk: 72,
    logisticsRisk: 48,
    inventoryBuffer: 62,
    criticalInputs: ["AI accelerators", "servers", "network equipment", "data center power gear", "cooling systems"],
    regions: { "North America": 46, "China/Taiwan": 24, "Southeast Asia": 8, "Europe": 17, "Other": 5 },
    suppliers: ["Nvidia", "Dell", "Supermicro", "Arista", "Schneider Electric", "Vertiv"]
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    sector: "E-commerce / Cloud",
    riskScore: 66,
    supplierConcentration: 55,
    chinaTaiwanExposure: 39,
    criticalInputRisk: 70,
    logisticsRisk: 78,
    inventoryBuffer: 57,
    criticalInputs: ["warehouse automation", "delivery capacity", "servers", "packaging", "fuel"],
    regions: { "North America": 55, "China/Taiwan": 18, "Southeast Asia": 7, "Europe": 15, "Other": 5 },
    suppliers: ["Rivian", "Nvidia", "Quanta", "Jabil", "UPS", "FedEx"]
  },
  {
    ticker: "WMT",
    name: "Walmart",
    sector: "Retail",
    riskScore: 58,
    supplierConcentration: 44,
    chinaTaiwanExposure: 31,
    criticalInputRisk: 49,
    logisticsRisk: 76,
    inventoryBuffer: 64,
    criticalInputs: ["consumer goods", "food distribution", "ocean freight", "trucking", "warehouse labor"],
    regions: { "North America": 62, "China/Taiwan": 19, "Southeast Asia": 9, "Europe": 3, "Other": 7 },
    suppliers: ["Procter & Gamble", "Unilever", "Tyson", "Coca-Cola", "Maersk", "J.B. Hunt"]
  },
  {
    ticker: "BA",
    name: "Boeing",
    sector: "Aerospace",
    riskScore: 81,
    supplierConcentration: 76,
    chinaTaiwanExposure: 25,
    criticalInputRisk: 90,
    logisticsRisk: 70,
    inventoryBuffer: 41,
    criticalInputs: ["jet engines", "titanium", "avionics", "carbon fiber", "precision castings"],
    regions: { "North America": 68, "China/Taiwan": 6, "Southeast Asia": 5, "Europe": 18, "Other": 3 },
    suppliers: ["GE Aerospace", "Spirit AeroSystems", "RTX", "Safran", "Honeywell", "Hexcel"]
  },
  {
    ticker: "NKE",
    name: "Nike",
    sector: "Apparel",
    riskScore: 64,
    supplierConcentration: 57,
    chinaTaiwanExposure: 36,
    criticalInputRisk: 52,
    logisticsRisk: 74,
    inventoryBuffer: 55,
    criticalInputs: ["footwear factories", "synthetic textiles", "rubber", "labor availability", "ocean freight"],
    regions: { "North America": 10, "China/Taiwan": 22, "Southeast Asia": 56, "Europe": 4, "Other": 8 },
    suppliers: ["Pou Chen", "Feng Tay", "Eclat", "Shenzhou", "Maersk", "DHL"]
  }
];

const metrics = [
  ["supplierConcentration", "Supplier concentration"],
  ["chinaTaiwanExposure", "China/Taiwan exposure"],
  ["criticalInputRisk", "Critical input risk"],
  ["logisticsRisk", "Logistics risk"],
  ["inventoryWeakness", "Inventory weakness"]
];

const els = {
  companySelect: document.getElementById("companySelect"),
  sectorSelect: document.getElementById("sectorSelect"),
  riskMetricSelect: document.getElementById("riskMetricSelect"),
  kpiRisk: document.getElementById("kpiRisk"),
  kpiRiskLabel: document.getElementById("kpiRiskLabel"),
  kpiSupplier: document.getElementById("kpiSupplier"),
  kpiRegion: document.getElementById("kpiRegion"),
  kpiInventory: document.getElementById("kpiInventory"),
  companyTitle: document.getElementById("companyTitle"),
  companyMeta: document.getElementById("companyMeta"),
  inputsList: document.getElementById("inputsList"),
  companyTable: document.getElementById("companyTable")
};

function withDerived(company) {
  return {
    ...company,
    inventoryWeakness: 100 - company.inventoryBuffer
  };
}

function riskClass(score) {
  if (score >= 75) return "risk-high";
  if (score >= 60) return "risk-medium";
  return "risk-low";
}

function riskLabel(score) {
  if (score >= 75) return "High risk";
  if (score >= 60) return "Medium risk";
  return "Lower risk";
}

function filteredCompanies() {
  const sector = els.sectorSelect.value;
  return companies.map(withDerived).filter(c => sector === "All" || c.sector === sector);
}

function selectedCompany() {
  return withDerived(companies.find(c => c.ticker === els.companySelect.value) || companies[0]);
}

function populateControls() {
  companies.forEach(c => {
    const option = document.createElement("option");
    option.value = c.ticker;
    option.textContent = `${c.name} (${c.ticker})`;
    els.companySelect.appendChild(option);
  });

  const sectors = ["All", ...new Set(companies.map(c => c.sector))];
  sectors.forEach(sector => {
    const option = document.createElement("option");
    option.value = sector;
    option.textContent = sector;
    els.sectorSelect.appendChild(option);
  });
}

function renderProfile() {
  const company = selectedCompany();
  els.companyTitle.textContent = `${company.name} (${company.ticker})`;
  els.companyMeta.textContent = `${company.sector} • Main risk story: ${riskLabel(company.riskScore).toLowerCase()} from supplier, region, and input dependencies.`;

  els.kpiRisk.textContent = company.riskScore;
  els.kpiRisk.className = riskClass(company.riskScore);
  els.kpiRiskLabel.textContent = riskLabel(company.riskScore);
  els.kpiSupplier.textContent = company.supplierConcentration;
  els.kpiRegion.textContent = company.chinaTaiwanExposure;
  els.kpiInventory.textContent = company.inventoryBuffer;

  els.inputsList.innerHTML = company.criticalInputs.map(input => `<span class="pill">${input}</span>`).join("");

  drawRadar(company);
  drawRegions(company);
  drawNetwork(company);
  renderTable();
}

function drawRadar(company) {
  const values = metrics.map(([key]) => company[key]);
  const labels = metrics.map(([, label]) => label);
  Plotly.newPlot("riskRadar", [{
    type: "scatterpolar",
    r: [...values, values[0]],
    theta: [...labels, labels[0]],
    fill: "toself",
    name: company.ticker
  }], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 35, r: 35, t: 20, b: 20 },
    polar: {
      bgcolor: "rgba(0,0,0,0)",
      radialaxis: { visible: true, range: [0, 100], color: "#93a4b8", gridcolor: "#20344f" },
      angularaxis: { color: "#dbeafe", gridcolor: "#20344f" }
    },
    showlegend: false
  }, { displayModeBar: false, responsive: true });
}

function drawRanking() {
  const metric = els.riskMetricSelect.value;
  const data = filteredCompanies().sort((a, b) => b[metric] - a[metric]);

  Plotly.newPlot("rankingChart", [{
    type: "bar",
    orientation: "h",
    y: data.map(c => c.ticker).reverse(),
    x: data.map(c => c[metric]).reverse(),
    text: data.map(c => c.name).reverse(),
    hovertemplate: "%{text}<br>Score: %{x}<extra></extra>"
  }], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 55, r: 25, t: 12, b: 45 },
    xaxis: { range: [0, 100], color: "#cbd5e1", title: "Risk score" },
    yaxis: { color: "#cbd5e1" }
  }, { displayModeBar: false, responsive: true });
}

function drawRegions(company) {
  const entries = Object.entries(company.regions);
  Plotly.newPlot("regionChart", [{
    type: "bar",
    labels: entries.map(([region]) => region),
    values: entries.map(([, value]) => value),
    x: entries.map(([region]) => region),
    y: entries.map(([, value]) => value),
    hovertemplate: "%{x}<br>%{y}% exposure<extra></extra>"
  }], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 45, r: 20, t: 12, b: 75 },
    xaxis: { color: "#cbd5e1", tickangle: -25 },
    yaxis: { color: "#cbd5e1", title: "% exposure", range: [0, 75] }
  }, { displayModeBar: false, responsive: true });
}

function drawNetwork(company) {
  const nodes = [company.ticker, ...company.suppliers];
  const x = [0.5, 0.12, 0.25, 0.38, 0.62, 0.75, 0.88];
  const y = [0.58, 0.78, 0.35, 0.88, 0.24, 0.82, 0.42];

  const edgeX = [];
  const edgeY = [];
  for (let i = 1; i < nodes.length; i++) {
    edgeX.push(x[0], x[i], null);
    edgeY.push(y[0], y[i], null);
  }

  Plotly.newPlot("networkChart", [
    {
      type: "scatter",
      mode: "lines",
      x: edgeX,
      y: edgeY,
      line: { width: 1.6, color: "#29415f" },
      hoverinfo: "none"
    },
    {
      type: "scatter",
      mode: "markers+text",
      x,
      y,
      text: nodes,
      textposition: "bottom center",
      marker: {
        size: nodes.map((_, i) => i === 0 ? 42 : 27),
        color: nodes.map((_, i) => i === 0 ? company.riskScore : 45 + i * 7),
        colorscale: "YlOrRd",
        cmin: 0,
        cmax: 100,
        line: { color: "#dbeafe", width: 1 }
      },
      hovertemplate: "%{text}<extra></extra>"
    }
  ], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 15, r: 15, t: 15, b: 25 },
    xaxis: { visible: false, range: [0, 1] },
    yaxis: { visible: false, range: [0, 1] },
    showlegend: false
  }, { displayModeBar: false, responsive: true });
}

function renderTable() {
  const rows = filteredCompanies()
    .sort((a, b) => b.riskScore - a.riskScore)
    .map(c => `
      <tr>
        <td><strong>${c.name}</strong><br><span>${c.ticker}</span></td>
        <td>${c.sector}</td>
        <td class="${riskClass(c.riskScore)}"><strong>${c.riskScore}</strong></td>
        <td>${c.supplierConcentration}</td>
        <td>${c.chinaTaiwanExposure}</td>
        <td>${c.criticalInputRisk}</td>
        <td>${c.inventoryBuffer}</td>
      </tr>
    `).join("");

  els.companyTable.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Sector</th>
          <th>Risk</th>
          <th>Supplier</th>
          <th>Region</th>
          <th>Inputs</th>
          <th>Inventory</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function refreshAll() {
  renderProfile();
  drawRanking();
}

populateControls();
refreshAll();

els.companySelect.addEventListener("change", renderProfile);
els.sectorSelect.addEventListener("change", () => {
  drawRanking();
  renderTable();
});
els.riskMetricSelect.addEventListener("change", drawRanking);
