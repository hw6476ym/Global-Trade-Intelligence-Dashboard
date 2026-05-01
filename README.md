# Company Supply Chain Intelligence Dashboard

This is a separate project from the earlier country-level Global Trade Intelligence Dashboard.

## What this dashboard tracks

This dashboard focuses on companies and their supply-chain exposure, not country trade totals. It is designed to help compare large companies by:

- Supplier concentration risk
- Region exposure
- Critical input dependency
- Logistics risk
- Inventory buffer strength
- Overall supply-chain risk score
- Company-to-supplier network relationships

## Important distinction

The older dashboard answers questions like:

> Which countries are leading in imports, exports, trade balance, and trade turnover?

This project answers questions like:

> Which companies are more exposed to supplier disruption, China/Taiwan risk, logistics bottlenecks, or critical input shortages?

## Current version

The current version is a static HTML/CSS/JavaScript prototype. It uses a simulated dataset so it can run immediately in a browser without a backend.

## Files

- `index.html` — dashboard page structure
- `styles.css` — visual styling
- `app.js` — company dataset, calculations, charts, and filtering logic
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow
- `.nojekyll` — tells GitHub Pages to serve static files directly

## Run locally

Open `index.html` in a browser.

## Deploy with GitHub Pages

1. Go to the repository on GitHub.
2. Click **Settings** → **Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Go to **Actions** → **Deploy static company supply-chain dashboard**.
5. Click **Run workflow**.
6. When it turns green, open the GitHub Pages URL shown in the workflow summary.
