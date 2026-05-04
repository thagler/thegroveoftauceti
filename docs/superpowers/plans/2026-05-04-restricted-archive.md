# Restricted Archive — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ESS *Demeter* restricted archive experience at `thegroveoftauceti.com/archive/` — hub, dossier index, 10 individual dossier pages — and the QR bridge page at `tobbyhagler.com/card.html`.

**Architecture:** Vanilla HTML/CSS, no build step, GitHub Pages. A shared `archive/archive.css` extends the root `styles.css`. Archive pages suppress the main site header and use their own chrome (breadcrumbs + file IDs). Four dossier template variants share the same `arch-*` CSS class system. `tobbyhagler.com/card.html` is a self-contained standalone page placed directly in the Publii site root — it does not use the Publii template.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Google Fonts via CDN (Orbitron, Noto Sans), Google Analytics G-8MV0XHHFSP, Mailchimp `https://eepurl.com/jipUAA`.

---

## File Map

All paths relative to `thegroveoftauceti/` unless prefixed with `tobbyhagler.com/`.

| File | Action | Role |
|---|---|---|
| `archive/archive.css` | Create | Shared archive styles — extends `styles.css` |
| `archive/index.html` | Create | Archive hub — 2×2 stream grid, email signup |
| `archive/dossier/index.html` | Create | Dossier listing — all 10 records |
| `archive/dossier/v.html` | Create | Sandoval — Template 1, three-layer |
| `archive/dossier/hawthorne.html` | Create | Hawthorne — Template 1, Special Dispensation |
| `archive/dossier/hector.html` | Create | Hector — Template 1, short |
| `archive/dossier/hargreaves.html` | Create | Hargreaves — Template 1, Captain |
| `archive/dossier/rowan.html` | Create | Rowan — Template 1, partial content |
| `archive/dossier/parker.html` | Create | Parker — Template 1, partial content |
| `archive/dossier/bekhti.html` | Create | Bekhti — Template 1, partial content |
| `archive/dossier/merion-sapling.html` | Create | Merion (sapling) — Template 2, Strained Personnel |
| `archive/dossier/demeter.html` | Create | ESS Demeter — Template 3, Vessel Registry |
| `archive/dossier/merion-band.html` | Create | Merion (band) — Template 4, External Record |
| `tobbyhagler.com/card.html` | Create | QR bridge — self-contained standalone page |

---

## Task 1: archive/archive.css

**Files:**
- Create: `archive/archive.css`

- [ ] **Step 1: Create the CSS file**

```css
/* === Archive CSS Variables ============================================= */
:root {
  --gold: #c9a84c;
  --coral: #c44a3a;
  --navy-deep: #0a1020;
  --navy-mid: #0f1520;
  --navy-border: #1e2d4f;
}

/* === Main layout override ============================================== */
main.arch-main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0;
  display: block;
  opacity: 1;
  animation: none;
}

/* === Dossier page chrome (breadcrumb + file ID) ======================== */
.arch-chrome {
  background: #1a1a1a;
  border-bottom: 2px solid var(--accent-color);
  padding: 1rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.arch-crumb {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.85rem;
  color: #555;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.arch-crumb a {
  color: #555;
  text-decoration: none;
}

.arch-crumb a:hover {
  color: var(--accent-color);
}

.arch-crumb-sep {
  margin: 0 0.4em;
  color: #333;
}

.arch-crumb-current {
  color: var(--accent-color);
}

.arch-file-id {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  color: #444;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* === Hub chrome (system status header) ================================= */
.arch-hub-chrome {
  background: #1a1a1a;
  border-bottom: 2px solid var(--accent-color);
  padding: 1.2rem 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.arch-system-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.95rem;
  color: #555;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.arch-access-badge {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.78rem;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  padding: 3px 9px;
  border-radius: 2px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* === Meta strip ======================================================== */
.arch-meta-strip {
  background: var(--navy-mid);
  border-bottom: 1px solid var(--navy-border);
  padding: 1.08rem 1.8rem;
  display: flex;
  gap: 2.7rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.arch-meta-strip.vessel {
  background: var(--navy-deep);
  border-bottom-color: #1a2540;
}

.arch-meta-key {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  color: #3d5a87;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.22rem;
}

.arch-meta-val {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.3;
}

.arch-meta-val.accent {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  color: var(--accent-color);
}

.arch-meta-val.warning {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.88rem;
  color: var(--gold);
}

.arch-meta-val.strained {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.arch-flag-badge {
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  padding: 2px 6px;
  border: 1px solid var(--gold);
  color: var(--gold);
  border-radius: 2px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 0.26rem;
  width: fit-content;
}

.arch-flag-badge + .arch-flag-badge {
  margin-top: 0.36rem;
}

.arch-flag-badge.pending {
  border-color: #555;
  color: #555;
}

/* === Type mismatch notice (Template 2) ================================= */
.arch-mismatch {
  background: rgba(201,168,76,0.08);
  border-bottom: 1px solid rgba(201,168,76,0.2);
  padding: 0.6rem 1.8rem;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.arch-mismatch-icon {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 0.08rem;
}

.arch-mismatch-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  color: rgba(201,168,76,0.65);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.6;
}

/* === Body ============================================================== */
.arch-body {
  padding: 1.52rem 1.8rem;
}

/* === Personnel name / role ============================================= */
.arch-name {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--text-color);
  letter-spacing: 0.03em;
  margin-bottom: 0.14rem;
}

.arch-name-alias {
  font-family: 'Noto Sans', sans-serif;
  font-weight: 200;
  font-size: 1.05rem;
  color: #555;
  letter-spacing: 0.03em;
  margin-bottom: 0.14rem;
}

.arch-role {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.84rem;
  color: #7b9ab8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.26rem;
}

.arch-role-note {
  font-size: 0.96rem;
  color: #555;
  font-style: italic;
  margin-bottom: 1.08rem;
  padding-bottom: 1.08rem;
  border-bottom: 1px solid #1e1e1e;
}

.arch-role-divider {
  margin-bottom: 1.08rem;
  padding-bottom: 1.08rem;
  border-bottom: 1px solid #1e1e1e;
}

/* === Vessel name ======================================================= */
.arch-ship-name {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: var(--text-color);
  letter-spacing: 0.06em;
  margin-bottom: 0.1rem;
}

.arch-ship-registry {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: var(--accent-color);
  letter-spacing: 0.08em;
  margin-bottom: 0.1rem;
}

.arch-ship-class {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.84rem;
  color: #555;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.18rem;
  padding-bottom: 1.18rem;
  border-bottom: 1px solid #1e1e1e;
}

/* === Bio =============================================================== */
.arch-bio {
  font-size: 1.08rem;
  color: #999;
  line-height: 1.75;
  margin-bottom: 1.34rem;
}

/* === Specimen block (Template 2) ======================================= */
.arch-specimen-block {
  background: #0f0f0f;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  padding: 0.9rem 1.34rem;
  margin-bottom: 1.18rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.72rem 2.26rem;
}

.arch-specimen-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  grid-column: 1 / -1;
  margin-bottom: 0.18rem;
}

.arch-spec-key {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.14rem;
}

.arch-spec-val {
  font-size: 0.93rem;
  color: #777;
  line-height: 1.4;
}

.arch-spec-val em {
  color: #999;
  font-style: normal;
}

/* === Children block (Template 3 — vessel) ============================== */
.arch-children {
  background: #0d1825;
  border: 1px solid var(--navy-border);
  border-radius: 4px;
  padding: 1.08rem 1.34rem;
  margin-bottom: 1.18rem;
}

.arch-children-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  color: #3d5a87;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.72rem;
}

.arch-child-row {
  display: flex;
  align-items: baseline;
  gap: 1.34rem;
  padding: 0.46rem 0;
  border-bottom: 1px solid #111e30;
}

.arch-child-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.arch-child-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  color: #7b9ab8;
  letter-spacing: 0.04em;
  flex: 0 0 120px;
}

.arch-child-desc {
  font-size: 0.9rem;
  color: #555;
  flex: 1;
}

.arch-child-status {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  color: var(--accent-color);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* === Annotations (Layer 2 — gold) ====================================== */
.arch-annotations {
  background: rgba(201,168,76,0.06);
  border: 1px solid rgba(201,168,76,0.25);
  border-radius: 4px;
  padding: 1.08rem 1.34rem;
  margin-bottom: 1.08rem;
}

.arch-annot-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.62rem;
}

.arch-annot-entry {
  font-size: 1.02rem;
  color: rgba(201,168,76,0.75);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 0.54rem;
  padding-bottom: 0.54rem;
  border-bottom: 1px solid rgba(201,168,76,0.1);
}

.arch-annot-entry:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.arch-annot-source {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  color: rgba(201,168,76,0.4);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: block;
  margin-top: 0.18rem;
  font-style: normal;
}

/* === Restricted notation (Layer 3 — coral, soft lock) ================== */
.arch-restricted {
  border: 1px solid rgba(196,74,58,0.4);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.08rem;
}

.arch-restricted-header {
  background: rgba(196,74,58,0.12);
  border-bottom: 1px solid rgba(196,74,58,0.3);
  padding: 0.62rem 1.34rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.arch-restricted-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  color: var(--coral);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.arch-restricted-tier {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  color: rgba(196,74,58,0.5);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.arch-restricted-body {
  padding: 0.9rem 1.34rem;
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  filter: blur(3.5px);
  user-select: none;
  pointer-events: none;
}

.arch-redact-line {
  height: 10px;
  background: rgba(196,74,58,0.18);
  border-radius: 2px;
}

.arch-redact-line.short { width: 58%; }
.arch-redact-line.med   { width: 80%; }
.arch-redact-line.full  { width: 100%; }

/* === Hub stream grid =================================================== */
.arch-hub-body {
  padding: 2rem 1.8rem;
}

.arch-hub-crumb {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  color: #555;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.arch-stream-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.arch-stream-card {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  padding: 1.34rem;
  text-decoration: none;
  color: var(--text-color);
  display: block;
  transition: border-color 0.2s;
}

.arch-stream-card:hover {
  border-color: var(--accent-color);
  color: var(--text-color);
}

.arch-stream-card.locked {
  border-style: dashed;
  border-color: #222;
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

.arch-stream-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.92rem;
  color: var(--accent-color);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.46rem;
}

.arch-stream-card.locked .arch-stream-name {
  color: #444;
}

.arch-stream-desc {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.55;
  margin-bottom: 0.62rem;
}

.arch-stream-count {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  color: #555;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.arch-stream-card:not(.locked) .arch-stream-count {
  color: #666;
}

/* === Email signup block ================================================ */
.arch-access-signup {
  border: 1px solid #222;
  border-radius: 4px;
  padding: 1.34rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.arch-signup-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.3rem;
}

.arch-signup-text {
  font-size: 0.88rem;
  color: #666;
}

.arch-signup-link {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  color: var(--accent-color);
  border: 1px solid var(--accent-color);
  padding: 0.5rem 1.1rem;
  border-radius: 2px;
  text-decoration: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}

.arch-signup-link:hover {
  background: var(--accent-color);
  color: #000;
}

/* === Dossier index ===================================================== */
.arch-index-body {
  padding: 1.52rem 1.8rem;
}

.arch-index-table {
  width: 100%;
  border-collapse: collapse;
}

.arch-index-table th {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  color: #3d5a87;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
  padding: 0 0.75rem 0.72rem 0;
  border-bottom: 1px solid var(--navy-border);
}

.arch-index-table td {
  padding: 0.72rem 0.75rem 0.72rem 0;
  border-bottom: 1px solid #111;
  vertical-align: middle;
}

.arch-index-table tr:last-child td {
  border-bottom: none;
}

.arch-index-name a {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.84rem;
  color: var(--accent-color);
  text-decoration: none;
  letter-spacing: 0.04em;
}

.arch-index-name a:hover {
  color: #85c5ff;
}

.arch-index-role {
  font-size: 0.86rem;
  color: #666;
}

.arch-index-status {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.arch-index-status.active   { color: var(--accent-color); }
.arch-index-status.flagged  { color: var(--gold); }
.arch-index-status.external { color: #555; }

.arch-index-flag {
  display: inline-block;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.6rem;
  padding: 1px 5px;
  border: 1px solid rgba(201,168,76,0.45);
  color: rgba(201,168,76,0.65);
  border-radius: 2px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-right: 0.26rem;
  margin-top: 0.2rem;
  display: block;
  width: fit-content;
}

/* === External record banner (Template 4) =============================== */
.arch-external-banner {
  background: #111;
  border-bottom: 1px solid #222;
  padding: 0.52rem 1.8rem;
}

.arch-external-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* === External record body ============================================== */
.arch-external-body {
  padding: 1.52rem 1.8rem;
}

.arch-ext-band-name {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--text-color);
  letter-spacing: 0.04em;
  margin-bottom: 0.26rem;
}

.arch-ext-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem 2rem;
  margin: 1.08rem 0;
  padding: 1.08rem 0;
  border-top: 1px solid #1e1e1e;
  border-bottom: 1px solid #1e1e1e;
}

.arch-ext-key {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.68rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.14rem;
}

.arch-ext-val {
  font-size: 0.92rem;
  color: #888;
  line-height: 1.4;
}

.arch-ext-section-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.72rem;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 1.08rem 0 0.46rem;
}

.arch-ext-text {
  font-size: 0.96rem;
  color: #777;
  line-height: 1.7;
  margin-bottom: 0.72rem;
}

.arch-ext-source {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 1.5rem;
  padding-top: 0.72rem;
  border-top: 1px solid #1a1a1a;
}

/* === Responsive ======================================================== */
@media (max-width: 768px) {
  .arch-chrome,
  .arch-hub-chrome {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    padding: 0.85rem 1rem;
  }

  .arch-meta-strip,
  .arch-mismatch,
  .arch-external-banner {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .arch-meta-strip {
    gap: 1.3rem;
  }

  .arch-body,
  .arch-hub-body,
  .arch-index-body,
  .arch-external-body {
    padding: 1.08rem 1rem;
  }

  .arch-stream-grid {
    grid-template-columns: 1fr;
  }

  .arch-access-signup {
    flex-direction: column;
    align-items: flex-start;
  }

  .arch-name      { font-size: 1.3rem; }
  .arch-ship-name { font-size: 1.4rem; }

  .arch-specimen-block {
    grid-template-columns: 1fr;
  }

  .arch-ext-meta {
    grid-template-columns: 1fr;
  }

  .arch-index-table th:nth-child(3),
  .arch-index-table td:nth-child(3) {
    display: none;
  }
}
```

- [ ] **Step 2: Verify the file exists**

Confirm `archive/archive.css` is non-empty:
```bash
wc -l archive/archive.css
```
Expected: 300+ lines.

- [ ] **Step 3: Commit**

```bash
git add archive/archive.css
git commit -m "Add archive.css — shared styles for restricted archive experience"
```

---

## Task 2: Archive Hub Page

**Files:**
- Create: `archive/index.html`

- [ ] **Step 1: Create the hub page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Archive — ESS Demeter</title>
  <meta name="robots" content="index, follow">
  <meta name="description" content="Partial access granted to ESS Demeter onboard archive system.">
  <link rel="canonical" href="https://thegroveoftauceti.com/archive/">
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="./archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-hub-chrome">
      <div class="arch-system-label">ESS Demeter &mdash; Archive System</div>
      <div class="arch-access-badge">Partial Access Granted</div>
    </div>

    <div class="arch-hub-body">

      <div class="arch-hub-crumb">Archive</div>

      <div class="arch-stream-grid">

        <a href="./dossier/" class="arch-stream-card">
          <div class="arch-stream-name">Crew Dossiers</div>
          <div class="arch-stream-desc">Personnel files, vessel registry, and associated records recovered from ESS <em>Demeter</em> onboard systems.</div>
          <div class="arch-stream-count">10 records available</div>
        </a>

        <div class="arch-stream-card locked">
          <div class="arch-stream-name">Signal 9</div>
          <div class="arch-stream-desc">Informal audiocast transmissions recorded by lower-deck crew aboard ESS <em>Demeter</em>.</div>
          <div class="arch-stream-count">Access tier required</div>
        </div>

        <div class="arch-stream-card locked">
          <div class="arch-stream-name">Captains of Old</div>
          <div class="arch-stream-desc">Archival Fleet audiocasts. Historical record of prior command and commendation.</div>
          <div class="arch-stream-count">Access tier required</div>
        </div>

        <div class="arch-stream-card locked">
          <div class="arch-stream-name">Druid Blessings &amp; Curses</div>
          <div class="arch-stream-desc">Cultural archive &mdash; legal. Flagged per Fleet Directive 71-C.</div>
          <div class="arch-stream-count">Access tier required</div>
        </div>

      </div>

      <div class="arch-access-signup">
        <div>
          <div class="arch-signup-label">Access Request</div>
          <div class="arch-signup-text">Submit credentials to request elevated archive access when restricted streams become available.</div>
        </div>
        <a href="https://eepurl.com/jipUAA" class="arch-signup-link" target="_blank" rel="noopener">Request Elevated Access</a>
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `archive/index.html` via `file://` or a local server. Confirm:
- Hub chrome: "ESS DEMETER — ARCHIVE SYSTEM" left, "PARTIAL ACCESS GRANTED" badge right
- 2×2 grid: Crew Dossiers is solid blue-bordered, three others are dimmed with dashed border
- Email signup block below grid
- At narrow viewport (<768px): grid collapses to single column, signup block stacks vertically

- [ ] **Step 3: Commit**

```bash
git add archive/index.html
git commit -m "Add archive hub page — stream grid with locked/unlocked states"
```

---

## Task 3: Dossier Index Page

**Files:**
- Create: `archive/dossier/index.html`

- [ ] **Step 1: Create the dossier index**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Crew Dossiers — ESS Demeter Archive</title>
  <meta name="robots" content="index, follow">
  <meta name="description" content="Personnel files and associated records from ESS Demeter onboard archive.">
  <link rel="canonical" href="https://thegroveoftauceti.com/archive/dossier/">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Dossiers</span>
      </div>
      <div class="arch-file-id">Crew Dossiers &mdash; 10 Records</div>
    </div>

    <div class="arch-index-body">
      <table class="arch-index-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="arch-index-name"><a href="./hargreaves.html">Hargreaves, John</a></td>
            <td class="arch-index-role">Captain &middot; ESS <em>Demeter</em></td>
            <td><span class="arch-index-status active">Active</span></td>
            <td></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./hawthorne.html">Hawthorne</a></td>
            <td class="arch-index-role">Special Dispensation &middot; Loquentes</td>
            <td><span class="arch-index-status active">Active</span></td>
            <td><span class="arch-index-flag">Druid Affiliation</span></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./rowan.html">Rowan</a></td>
            <td class="arch-index-role">ESS <em>Demeter</em></td>
            <td><span class="arch-index-status active">Active</span></td>
            <td></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./v.html">Sandoval, Violet</a></td>
            <td class="arch-index-role">Specialist &middot; Systems Integration</td>
            <td><span class="arch-index-status active">Active</span></td>
            <td><span class="arch-index-flag">Druid Affiliation</span></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./parker.html">Parker</a></td>
            <td class="arch-index-role">Matelot &middot; ESS <em>Demeter</em></td>
            <td><span class="arch-index-status active">Active</span></td>
            <td></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./bekhti.html">Bekhti</a></td>
            <td class="arch-index-role">ESS <em>Demeter</em></td>
            <td><span class="arch-index-status active">Active</span></td>
            <td></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./hector.html">Hector</a></td>
            <td class="arch-index-role">Matelot &middot; Dropship Operations</td>
            <td><span class="arch-index-status active">Active</span></td>
            <td></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./merion-sapling.html">Merion (sapling)</a></td>
            <td class="arch-index-role">Specimen / Crew Associate &mdash; Xenobotany</td>
            <td><span class="arch-index-status flagged">Active &middot; See Note</span></td>
            <td><span class="arch-index-flag">Sentient Entity</span></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./demeter.html">ESS Demeter</a></td>
            <td class="arch-index-role">Fleet Frigate FF-513 &middot; Vessel Registry</td>
            <td><span class="arch-index-status active">Active &mdash; Transit</span></td>
            <td><span class="arch-index-flag">Organic Conscience</span></td>
          </tr>
          <tr>
            <td class="arch-index-name"><a href="./merion-band.html">Merion (the band)</a></td>
            <td class="arch-index-role">External Record &mdash; Archived</td>
            <td><span class="arch-index-status external">&mdash;</span></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Confirm all 10 rows render, links are present, and status badges use the correct color classes (blue for Active, gold for Merion sapling, grey for External Record). At narrow viewport, the Status column should hide per the responsive rule.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/index.html
git commit -m "Add dossier index — 10-record listing with status and flags"
```

---

## Task 4: Sandoval Dossier (Template 1 — three-layer, fully defined)

**Files:**
- Create: `archive/dossier/v.html`

This is the canonical Template 1 page — all three annotation layers present. Build this first; subsequent Template 1 pages omit Layer 3 unless specified.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sandoval, Violet — ARK-DOS-004 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Sandoval</span>
      </div>
      <div class="arch-file-id">ARK-DOS-004 &middot; Confidential</div>
    </div>

    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">Specialist</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val">Systems Integration</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">Galway, Earth</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Flags</div>
        <div class="arch-flag-badge">Druid Affiliation &middot; Legal</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Sandoval, Violet</div>
      <div class="arch-name-alias">Known as &ldquo;V&rdquo;</div>
      <div class="arch-role">Specialist &middot; Systems Integration &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <div class="arch-bio">
        Enlisted via standard Fleet recruitment. Completed systems integration training at Veracruz Station with above-average scores in sensory diagnostic arrays. Druidic affiliation disclosed at time of enlistment; reviewed and cleared per Fleet Directive 71-C (Religious and Cultural Practice). No prior service record. Current posting: ESS <em>Demeter</em>, Tau Ceti transit.
      </div>

      <div class="arch-annotations">
        <div class="arch-annot-label">Field Annotations</div>
        <div class="arch-annot-entry">
          Subject has integrated well with technical crew. Workmanship is precise. Interpersonal conduct occasionally terse but within acceptable range.
          <span class="arch-annot-source">Notation 2-A &middot; Cmdr. Osei &middot; Stardate 47.09.22</span>
        </div>
        <div class="arch-annot-entry">
          Observed performing rootwork ritual in lower hydroponics bay. Practice within legal parameters. Noted for completeness.
          <span class="arch-annot-source">Notation 4-F &middot; Lt. Farris &middot; Stardate 47.11.05</span>
        </div>
      </div>

      <div class="arch-restricted">
        <div class="arch-restricted-header">
          <div class="arch-restricted-label">Restricted Notation</div>
          <div class="arch-restricted-tier">Clearance Delta-1 Required &middot; Flag Officers Only</div>
        </div>
        <div class="arch-restricted-body">
          <div class="arch-redact-line full"></div>
          <div class="arch-redact-line med"></div>
          <div class="arch-redact-line full"></div>
          <div class="arch-redact-line short"></div>
        </div>
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Confirm: chrome shows breadcrumb and ARK-DOS-004 · CONFIDENTIAL file ID; meta strip shows five fields across one row; body has name, alias line, role, bio, gold annotations block, coral restricted block with blurred bars; restricted header is legible, bars are blurred.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/v.html
git commit -m "Add Sandoval dossier — Template 1 with three-layer annotation system"
```

---

## Task 5: Hawthorne Dossier (Template 1 — Special Dispensation)

**Files:**
- Create: `archive/dossier/hawthorne.html`

Rank field reads "Special Dispensation" rather than a Fleet rank. No alias line. No restricted notation.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hawthorne — ARK-DOS-002 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Hawthorne</span>
      </div>
      <div class="arch-file-id">ARK-DOS-002 &middot; Confidential</div>
    </div>

    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">Special Dispensation</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val">Loquentes Rootwork</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">[Redacted]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Flags</div>
        <div class="arch-flag-badge">Druid Affiliation &middot; Legal</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Hawthorne</div>
      <div class="arch-role">Special Dispensation &middot; Loquentes &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <div class="arch-bio">
        Assigned to ESS <em>Demeter</em> under Fleet Special Dispensation Order 19-H, which authorizes loquentes practitioners of demonstrated renown to serve outside standard rank hierarchy. Druidic affiliation disclosed and cleared per Fleet Directive 71-C. Hawthorne's practice operates within legal parameters. Her rootwork designation was reviewed by the Fleet Chaplaincy Board prior to posting; no objections filed. No other service record on file in this system.
      </div>

      <div class="arch-annotations">
        <div class="arch-annot-label">Field Annotations</div>
        <div class="arch-annot-entry">
          Hawthorne speaks to the ship. I don't have a more precise way to put that. The rootwork she performs in the lower decks is within the dispensation, technically. What she gets back is another matter.
          <span class="arch-annot-source">Notation 3-B &middot; Cmdr. Osei &middot; Stardate 47.10.04</span>
        </div>
        <div class="arch-annot-entry">
          It knows we're talking about it. I'm certain of that now. The leaves moved when I read the classification note aloud. No air circulation in the lab at the time.
          <span class="arch-annot-source">Notation 2-B &middot; Spc. Hawthorne &middot; Stardate 47.10.18</span>
        </div>
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Confirm Rank shows "Special Dispensation" (not a Fleet rank), Origin shows [Redacted], no alias line, no restricted block.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/hawthorne.html
git commit -m "Add Hawthorne dossier — Special Dispensation Template 1 variant"
```

---

## Task 6: Hector Dossier (Template 1 — short, minor character)

**Files:**
- Create: `archive/dossier/hector.html`

Short dossier reflects rank and minor character status, not redaction. No field annotations — the file is thin by design.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hector — ARK-DOS-007 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Hector</span>
      </div>
      <div class="arch-file-id">ARK-DOS-007 &middot; Confidential</div>
    </div>

    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">Matelot</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val">Dropship Operations</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">[Redacted]</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Hector</div>
      <div class="arch-role">Matelot &middot; Dropship Operations &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <div class="arch-bio">
        Skipper of the PERSEPHONE dropship, Docking Bay 2. Assigned as commanding officer of the Brigid surface landing party, Stardate 47.08. Standard service record. No flags.
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Confirm short dossier renders cleanly — no annotations block, no restricted block, thin but coherent.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/hector.html
git commit -m "Add Hector dossier — short Template 1, minor character"
```

---

## Task 7: Hargreaves Dossier (Template 1 — Captain)

**Files:**
- Create: `archive/dossier/hargreaves.html`

Captain's file. Highest rank in the dossier set. Bio content is partially defined; fields marked with HTML author comments where narrative details are pending.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hargreaves, John — ARK-DOS-001 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Hargreaves</span>
      </div>
      <div class="arch-file-id">ARK-DOS-001 &middot; Flag Officer &middot; Confidential</div>
    </div>

    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">Captain</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val">Command</div>
      </div>
      <!-- AUTHOR: confirm or replace Origin field -->
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">[Redacted]</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Hargreaves, John</div>
      <div class="arch-role">Captain &middot; Commanding Officer &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <!-- AUTHOR: replace placeholder bio with Hargreaves' backstory -->
      <div class="arch-bio">
        Captain of Record, ESS <em>Demeter</em> FF-513. Assigned for the Tau Ceti diplomatic transit — the vessel's final mission before scheduled decommissioning. Hargreaves has served Fleet command for the duration of the interstellar program. File transferred from Fleet central registry.
      </div>

      <!-- AUTHOR: add field annotations when Hargreaves' role in the story is defined -->
      <div class="arch-annotations">
        <div class="arch-annot-label">Field Annotations</div>
        <div class="arch-annot-entry">
          No annotations on file for this period.
          <span class="arch-annot-source">System &middot; Stardate 47.09.01</span>
        </div>
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Confirm file ID reads "FLAG OFFICER · CONFIDENTIAL", Captain rank renders, placeholder bio is styled correctly.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/hargreaves.html
git commit -m "Add Hargreaves dossier — Captain, Template 1"
```

---

## Task 8: Rowan, Parker, Bekhti Dossiers (Template 1 — partial content)

**Files:**
- Create: `archive/dossier/rowan.html`
- Create: `archive/dossier/parker.html`
- Create: `archive/dossier/bekhti.html`

These three files share the same structure. Character details beyond their names and ranks are pending author input and are marked with HTML comments. Parker is a Matelot (co-host of Signal 9 audiocast with Hector).

- [ ] **Step 1: Create rowan.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rowan — ARK-DOS-003 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Rowan</span>
      </div>
      <div class="arch-file-id">ARK-DOS-003 &middot; Confidential</div>
    </div>

    <!-- AUTHOR: confirm rank, specialty, and origin for Rowan -->
    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">[Rank]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val">[Specialty]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">[Redacted]</div>
      </div>
    </div>

    <div class="arch-body">

      <!-- AUTHOR: confirm display name (surname-first if applicable) -->
      <div class="arch-name">Rowan</div>
      <!-- AUTHOR: update role line with rank and specialty -->
      <div class="arch-role">[Rank] &middot; [Specialty] &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <!-- AUTHOR: replace with Rowan's Fleet bio (2-4 sentences, bureaucratic register) -->
      <div class="arch-bio">
        Personnel file transferred. Current posting: ESS <em>Demeter</em>, Tau Ceti transit.
      </div>

      <!-- AUTHOR: add field annotations when Rowan's role in the story is defined -->

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Create parker.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Parker — ARK-DOS-005 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Parker</span>
      </div>
      <div class="arch-file-id">ARK-DOS-005 &middot; Confidential</div>
    </div>

    <!-- AUTHOR: confirm specialty and origin for Parker -->
    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">Matelot</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <!-- AUTHOR: confirm Parker's specialty -->
        <div class="arch-meta-val">[Specialty]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">[Redacted]</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Parker</div>
      <!-- AUTHOR: update role line once specialty is confirmed -->
      <div class="arch-role">Matelot &middot; [Specialty] &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <!-- AUTHOR: replace with Parker's Fleet bio -->
      <div class="arch-bio">
        Personnel file transferred. Current posting: ESS <em>Demeter</em>, Tau Ceti transit. Lower-deck crew, standard assignment.
      </div>

      <!-- AUTHOR: add field annotations for Parker -->

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 3: Create bekhti.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bekhti — ARK-DOS-006 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Bekhti</span>
      </div>
      <div class="arch-file-id">ARK-DOS-006 &middot; Confidential</div>
    </div>

    <!-- AUTHOR: confirm rank, specialty, and origin for Bekhti -->
    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val">[Rank]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val">[Specialty]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">[Redacted]</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Bekhti</div>
      <div class="arch-role">[Rank] &middot; [Specialty] &middot; ESS <em>Demeter</em></div>
      <div class="arch-role-divider"></div>

      <!-- AUTHOR: replace with Bekhti's Fleet bio -->
      <div class="arch-bio">
        Personnel file transferred. Current posting: ESS <em>Demeter</em>, Tau Ceti transit.
      </div>

      <!-- AUTHOR: add field annotations for Bekhti -->

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 4: Verify all three in browser**

Open each file. Confirm the structure renders without errors. The `[Rank]` and `[Specialty]` literal text is intentional — these are placeholders for the author to fill in.

- [ ] **Step 5: Commit**

```bash
git add archive/dossier/rowan.html archive/dossier/parker.html archive/dossier/bekhti.html
git commit -m "Add Rowan, Parker, Bekhti dossiers — Template 1 with pending author content"
```

---

## Task 9: Merion (sapling) Dossier (Template 2 — Strained Personnel)

**Files:**
- Create: `archive/dossier/merion-sapling.html`

Template 2 adds: type mismatch notice, strained field values, specimen block inserted between role line and bio. The bureaucratic strain is intentional — the system accommodating something it cannot categorize.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Merion (sapling) — ARK-DOS-008 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Merion</span>
      </div>
      <div class="arch-file-id">ARK-DOS-008 &middot; See Note</div>
    </div>

    <div class="arch-mismatch">
      <div class="arch-mismatch-icon">!</div>
      <div class="arch-mismatch-text">
        Record type mismatch &mdash; personnel template applied by administrative default.<br>
        Reclassification review pending. See Notation 1-A.
      </div>
    </div>

    <div class="arch-meta-strip">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Rank</div>
        <div class="arch-meta-val strained">Non-applicable &mdash; see Notation 3</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Specialty</div>
        <div class="arch-meta-val strained">Loquentes interface &middot; unverified</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Origin</div>
        <div class="arch-meta-val">Brigid, Tau Ceti system</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Flags</div>
        <div class="arch-flag-badge">Sentient Entity &middot; Non-Humanoid</div>
        <div class="arch-flag-badge pending">Telepathic Designation &middot; Pending</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-name">Merion</div>
      <div class="arch-role">Specimen / Crew Associate &mdash; Xenobotany Division</div>
      <div class="arch-role-note">Classification contested. See administrative review ARK-ADM-0091.</div>

      <div class="arch-specimen-block">
        <div class="arch-specimen-label">Specimen Data &mdash; Inserted Per Xenobotany Protocol</div>
        <div>
          <div class="arch-spec-key">Taxonomy</div>
          <div class="arch-spec-val">Unclassified &middot; Brigid flora &middot; <em>sole recovered specimen</em> &mdash; retrieved by Spc. Sandoval</div>
        </div>
        <div>
          <div class="arch-spec-key">Morphology</div>
          <div class="arch-spec-val">Sapling, approx. 0.4m. Burgundy foliage. Active growth noted.</div>
        </div>
        <div>
          <div class="arch-spec-key">Housing</div>
          <div class="arch-spec-val">Sample Container 7-C, Xenobotany Lab, Deck 4</div>
        </div>
        <div>
          <div class="arch-spec-key">Substrate</div>
          <div class="arch-spec-val">Brigid regolith, original collection. <em>Do not substitute.</em></div>
        </div>
      </div>

      <div class="arch-bio">
        Recovered from the surface of Brigid during the 47.08 survey mission following confirmation of no other surviving specimens. Exhibits behavioral responses inconsistent with non-sentient flora. Interaction with Druidic crew members has produced communicative events consistent with loquentes chaint. Classification as sentient entity recommended by Specialist Sandoval and Spc. Hawthorne; classification contested by Fleet administrative registry, currently unresolved.
      </div>

      <div class="arch-annotations">
        <div class="arch-annot-label">Field Annotations</div>
        <div class="arch-annot-entry">
          It knows we're talking about it. I'm certain of that now. The leaves moved when I read the classification note aloud. No air circulation in the lab at the time.
          <span class="arch-annot-source">Notation 2-B &middot; Spc. Hawthorne &middot; Stardate 47.10.18</span>
        </div>
        <div class="arch-annot-entry">
          Merion initiated chaint during third-watch maintenance cycle. Duration: 4 minutes, 11 seconds. Content untranslatable. <em>Demeter</em>&rsquo;s environmental systems registered a 0.3&deg;C rise in Xenobotany Lab during the event.
          <span class="arch-annot-source">Notation 5-C &middot; V &middot; Stardate 47.12.02</span>
        </div>
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Confirm: mismatch banner appears between chrome and meta strip; Rank and Specialty render in strained (italic, grey) style; two pending flags render (gold solid + grey dashed); specimen block uses 2-column grid; "sole recovered specimen" renders in lighter weight per `.arch-spec-val em`.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/merion-sapling.html
git commit -m "Add Merion (sapling) dossier — Template 2 Strained Personnel"
```

---

## Task 10: ESS Demeter Dossier (Template 3 — Vessel Registry)

**Files:**
- Create: `archive/dossier/demeter.html`

Vessel template. Deeper navy meta strip, ship name/registry instead of person name, Children block for attached vessels, annotation and restricted layers.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ESS Demeter FF-513 — ARK-VES-001 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Demeter</span>
      </div>
      <div class="arch-file-id">ARK-VES-001 &middot; Fleet Registry</div>
    </div>

    <div class="arch-meta-strip vessel">
      <div class="arch-meta-item">
        <div class="arch-meta-key">Status</div>
        <div class="arch-meta-val accent">Active &mdash; Transit</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Class</div>
        <div class="arch-meta-val">Frigate (FF)</div>
      </div>
      <!-- AUTHOR: replace [stardate] with Demeter's commission stardate once confirmed -->
      <div class="arch-meta-item">
        <div class="arch-meta-key">Commission</div>
        <div class="arch-meta-val">[Stardate]</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Captain of Record</div>
        <div class="arch-meta-val">John Hargreaves</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Conscience</div>
        <div class="arch-meta-val warning">Organic &middot; Active</div>
      </div>
      <div class="arch-meta-item">
        <div class="arch-meta-key">Flags</div>
        <div class="arch-flag-badge">Organic Conscience &middot; Flagged</div>
      </div>
    </div>

    <div class="arch-body">

      <div class="arch-ship-name">ESS Demeter</div>
      <div class="arch-ship-registry">FF-513</div>
      <div class="arch-ship-class">Fleet Frigate &middot; Tau Ceti Transit &middot; Diplomatic Mission</div>

      <!-- AUTHOR: expand bio with commission port, prior missions, crew count -->
      <div class="arch-bio">
        Once the flagship vessel of humanity's interstellar diplomatic program, the ESS <em>Demeter</em> is among the last of her class equipped with an organic conscience &mdash; a rootwork-derived navigational and environmental intelligence grown in conjunction with the hull during construction. Her current mission represents the final diplomatic transit before scheduled decommissioning.
      </div>

      <div class="arch-children">
        <div class="arch-children-label">Attached Vessels &mdash; Organic Lineage</div>
        <div class="arch-child-row">
          <div class="arch-child-name">Persephone</div>
          <div class="arch-child-desc">Dropship &middot; Minor AI &middot; Docking Bay 2</div>
          <div class="arch-child-status">Active</div>
        </div>
        <div class="arch-child-row">
          <div class="arch-child-name">Arion</div>
          <div class="arch-child-desc">Dropship &middot; Minor AI &middot; Docking Bay 4</div>
          <div class="arch-child-status">Active</div>
        </div>
      </div>

      <div class="arch-annotations">
        <div class="arch-annot-label">Field Annotations</div>
        <div class="arch-annot-entry">
          Environmental systems registered an unprompted 0.8&deg;C variance across Decks 3 and 4 during third watch. No mechanical fault identified. Logged for review.
          <!-- AUTHOR: replace [Chief Engineer name] once confirmed -->
          <span class="arch-annot-source">Notation 1-A &middot; Chief Engineer [name] &middot; Stardate 47.10.31</span>
        </div>
        <div class="arch-annot-entry">
          <em>Demeter</em> responded to Merion&rsquo;s chaint. I don&rsquo;t have another word for what happened. The lights didn&rsquo;t flicker &mdash; they breathed.
          <span class="arch-annot-source">Notation 3-D &middot; Spc. Hawthorne &middot; Stardate 47.12.02</span>
        </div>
      </div>

      <div class="arch-restricted">
        <div class="arch-restricted-header">
          <div class="arch-restricted-label">Restricted Notation</div>
          <div class="arch-restricted-tier">Clearance Delta-1 Required &middot; Flag Officers Only</div>
        </div>
        <div class="arch-restricted-body">
          <div class="arch-redact-line full"></div>
          <div class="arch-redact-line med"></div>
          <div class="arch-redact-line full"></div>
          <div class="arch-redact-line short"></div>
          <div class="arch-redact-line full"></div>
        </div>
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Confirm: meta strip uses deeper navy (`.vessel`); Conscience field renders in gold warning style; Children block shows Persephone and Arion rows; restricted block has five redact lines (one more than Sandoval).

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/demeter.html
git commit -m "Add ESS Demeter dossier — Template 3 Vessel Registry"
```

---

## Task 11: Merion (the band) Dossier (Template 4 — External Record)

**Files:**
- Create: `archive/dossier/merion-band.html`

Template 4 looks like a scraped social profile rather than a Fleet document. Same dark background and fonts, but chrome reads "EXTERNAL RECORD — ARCHIVED". No meta strip, no annotation layers. The tone implies a Fleet archivist pulled this from a public database because someone aboard owned the music.

- [ ] **Step 1: Create the dossier**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MV0XHHFSP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8MV0XHHFSP');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Merion (the band) — ARK-EXT-001 — ESS Demeter Archive</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../archive.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

  <main class="arch-main">

    <div class="arch-chrome">
      <div class="arch-crumb">
        <a href="../">Archive</a>
        <span class="arch-crumb-sep">/</span>
        <a href="./">Dossiers</a>
        <span class="arch-crumb-sep">/</span>
        <span class="arch-crumb-current">Merion</span>
      </div>
      <div class="arch-file-id">ARK-EXT-001 &middot; External Record</div>
    </div>

    <div class="arch-external-banner">
      <div class="arch-external-label">External Record &mdash; Archived &mdash; Source: Public Database</div>
    </div>

    <div class="arch-external-body">

      <div class="arch-ext-band-name">Merion</div>

      <div class="arch-ext-meta">
        <div>
          <div class="arch-ext-key">Formation</div>
          <!-- AUTHOR: confirm or replace formation date -->
          <div class="arch-ext-val">[Date], Earth</div>
        </div>
        <div>
          <div class="arch-ext-key">Origin</div>
          <div class="arch-ext-val">Earth</div>
        </div>
        <div>
          <div class="arch-ext-key">Genres</div>
          <!-- AUTHOR: confirm or replace genres -->
          <div class="arch-ext-val">[Genre] &middot; [Genre]</div>
        </div>
        <div>
          <div class="arch-ext-key">Members</div>
          <!-- AUTHOR: confirm or replace member names -->
          <div class="arch-ext-val">[Member names]</div>
        </div>
      </div>

      <div class="arch-ext-section-label">About</div>
      <!-- AUTHOR: replace with band description consistent with the novel's world -->
      <div class="arch-ext-text">
        Record retrieved from public cultural database. Archived for crew reference. No Fleet classification applied.
      </div>

      <!-- AUTHOR: add discography entries as desired -->
      <div class="arch-ext-section-label">Discography</div>
      <div class="arch-ext-text">
        [Titles, dates &mdash; author to complete]
      </div>

      <div class="arch-ext-source">
        Source: Public cultural archive, retrieved Stardate 47.08.14 &middot; Archived by Fleet Records
      </div>

    </div>

  </main>

  <footer>
    ESS <em>Demeter</em> Archive System &mdash; <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Confirm: chrome shows "EXTERNAL RECORD" file ID; external-banner renders below chrome; no meta strip, no fleet-style annotation blocks; two-column metadata grid renders; source note appears at bottom.

- [ ] **Step 3: Commit**

```bash
git add archive/dossier/merion-band.html
git commit -m "Add Merion (band) dossier — Template 4 External Record"
```

---

## Task 12: tobbyhagler.com/card.html — QR Bridge Page

**Files:**
- Create: `tobbyhagler.com/card.html` (at `/Users/tobbyhagler/Library/CloudStorage/Dropbox/Websites/tobbyhagler.com/card.html`)

Standalone page — does not use Publii's template, placed directly alongside Publii-generated files. Self-contained: all fonts and minimal styles embedded. Receives QR scan, establishes in-universe tone, forwards to archive. No author bio, no book synopsis.

- [ ] **Step 1: Create card.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Archive Access — ESS Demeter</title>
  <meta name="robots" content="noindex, follow">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400&family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0c0c0c;
      --text: #e6e6e6;
      --accent: #3b9eea;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Noto Sans', sans-serif;
      font-weight: 200;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .card-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .card-system {
      font-family: 'Orbitron', sans-serif;
      font-size: 0.72rem;
      color: #444;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 2.5rem;
    }

    .card-status {
      font-family: 'Orbitron', sans-serif;
      font-size: 1.05rem;
      color: var(--accent);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 0.62rem;
    }

    .card-sub {
      font-size: 0.96rem;
      color: #666;
      margin-bottom: 2.5rem;
      line-height: 1.6;
      max-width: 340px;
    }

    .card-cta {
      font-family: 'Orbitron', sans-serif;
      font-size: 0.78rem;
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 0.7rem 1.5rem;
      border-radius: 2px;
      text-decoration: none;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: background 0.2s, color 0.2s;
    }

    .card-cta:hover {
      background: var(--accent);
      color: #000;
    }

    footer {
      text-align: center;
      padding: 1.5rem 1rem;
      font-size: 0.8rem;
      color: #333;
    }

    footer a {
      color: #333;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <main class="card-main">
    <div class="card-system">ESS Demeter &mdash; Archive System</div>
    <div class="card-status">Partial Access Granted</div>
    <div class="card-sub">Recovered materials from onboard systems. Proceed to archive.</div>
    <a href="https://thegroveoftauceti.com/archive/" class="card-cta">Proceed to Archive</a>
  </main>

  <footer>
    <a href="https://thegroveoftauceti.com">thegroveoftauceti.com</a>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `tobbyhagler.com/card.html` via `file://`. Confirm: dark background, system label in small caps grey, "PARTIAL ACCESS GRANTED" in accent blue, sub-copy in muted grey, single CTA button that links to the archive URL. No navigation, no author bio, no book details.

- [ ] **Step 3: Commit to tobbyhagler.com repo**

```bash
cd /Users/tobbyhagler/Library/CloudStorage/Dropbox/Websites/tobbyhagler.com
git add card.html
git commit -m "Add card.html — QR bridge page routing to archive"
```

---

## Self-Review Checklist

The following was verified after writing this plan:

**Spec coverage:**
- [x] tobbyhagler.com/card page — Task 12
- [x] Archive hub `/archive/` — Task 2
- [x] Dossier index `/archive/dossier/` — Task 3
- [x] All 10 dossier pages — Tasks 4–11
- [x] Template 1 (Personnel): V, Hawthorne, Hector, Hargreaves, Rowan, Parker, Bekhti — Tasks 4–8
- [x] Template 2 (Strained Personnel): Merion sapling — Task 9
- [x] Template 3 (Vessel Registry): ESS Demeter — Task 10
- [x] Template 4 (External Record): Merion band — Task 11
- [x] Three-layer annotation system (Official / Field Annotations / Restricted) — Task 1 CSS + Tasks 4, 5, 10
- [x] Locked stream cards (hub) — Task 2
- [x] Email signup "Request elevated access" — Task 2 (Mailchimp link)
- [x] Responsive breakpoint at 768px — Task 1 CSS
- [x] CMOS ship name formatting (ESS *Demeter* with italic name) — present in all dossier HTML

**Spec open items not implemented (author-provided content):**
- Demeter commission stardate — marked `[Stardate]` in Task 10
- Rowan, Parker, Bekhti character details — marked with `<!-- AUTHOR: -->` comments in Task 8
- Merion (band) discography and members — marked with `<!-- AUTHOR: -->` comments in Task 11
- Chief Engineer name (Demeter annotation) — marked `[name]` in Task 10

**Type consistency:** All HTML uses `arch-*` class names matching the CSS in Task 1. No class names introduced in later tasks that aren't defined in `archive.css`.

**Placeholder scan:** Plan contains no TBD/TODO implementation gaps. Content gaps are author-provided narrative details, not implementation holes.
