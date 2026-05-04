# Restricted Archive — Design Spec
**Project:** The Grove of Tau Ceti  
**Date:** 2026-05-04  
**Status:** Approved for implementation

---

## Overview

An in-universe "restricted archive" experience tied to the novel *The Grove of Tau Ceti*. Visitors arrive via QR code on a physical card (`tobbyhagler.com/card`), which routes to `thegroveoftauceti.com/archive/`. The experience is framed as partial access to ESS *Demeter*'s onboard systems — recovered data, personnel files, field logs.

Primary audience: cold visitors with no prior knowledge of the book. The archive must create intrigue and atmosphere without requiring context. Secondary audience: existing readers, who get additional layers of meaning.

Access gate is **aesthetic only** — no authentication. Pages are openly accessible but designed to look like restricted system data.

---

## URL Structure

```
thegroveoftauceti.com/
└── archive/                    ← hub index
    ├── dossier/                ← crew dossier index
    │   ├── v.html
    │   ├── hawthorne.html
    │   ├── rowan.html
    │   ├── parker.html
    │   ├── hargraves.html
    │   ├── bekhti.html
    │   ├── merion-sapling.html
    │   ├── merion-band.html
    │   ├── hector.html
    │   └── demeter.html
    ├── signal-9/               ← field logs (locked at launch)
    ├── captains/               ← Fleet audiocasts (locked at launch)
    └── druid-blessings/        ← cultural archive (locked at launch)

tobbyhagler.com/
└── card.html                   ← QR bridge page
```

---

## Tech Stack

Vanilla HTML/CSS/JS. No build step. Served via GitHub Pages. Follows existing `thegroveoftauceti.com` conventions:

- Single shared `styles.css` — archive pages extend it with an `archive.css`
- Fonts: Orbitron (headings/nav/labels), Noto Sans 200 (body)
- CSS variables: `--bg-color: #0c0c0c`, `--text-color: #e6e6e6`, `--accent-color: #3b9eea`, `--max-width: 960px`
- Responsive breakpoint: `768px`
- Ship name formatting per CMOS 17th ed.: ESS *Demeter* (prefix roman, name italic)

---

## tobbyhagler.com/card

A minimal in-universe bridge page on the existing Publii site. Purpose: receive the QR scan, establish tone, forward to the archive.

**Content:**
- Brief in-universe framing: something like "Partial access granted. Proceed to archive." — restrained, no marketing language
- A single CTA linking to `thegroveoftauceti.com/archive/`
- No book synopsis, no author bio — those live on the main site

**Tone:** The page should feel like a system confirmation, not a welcome screen.

---

## Archive Hub — `/archive/`

**Layout:** Grid Cards (2×2)

Four stream cards. At launch, only Crew Dossiers is accessible. The other three are visible but dimmed (dashed border, reduced opacity) — their existence is information.

**Card anatomy (accessible):**
- Stream name in Orbitron/accent
- One-line description in Noto Sans muted
- Entry count: "N records available"
- Links to stream index

**Card anatomy (locked):**
- Same structure, dimmed
- Status reads: "Access tier required"
- Not linked

**Hub header:**
- Chrome line: `ESS DEMETER — ARCHIVE SYSTEM`
- Badge: `PARTIAL ACCESS GRANTED`
- Breadcrumb: `Archive`

**Email signup:**
Framed as "Request elevated access" — links to Mailchimp signup (same integration already live on the main site). Lives below the stream grid or in the hub chrome. Copy stays in-universe: no "subscribe to my newsletter."

---

## Dossier Index — `/archive/dossier/`

A listing of all dossier entries. Each entry shows:
- Subject name (surname-first for Fleet personnel)
- Designation/role
- Status badge
- Flags (if any)
- Link to individual dossier

The two Merion entries are disambiguated by label: "Merion (sapling)" and "Merion (the band)."

---

## Dossier Templates

All pages share the site's responsive layout: `max-width: 960px`, single breakpoint at `768px`.

### Chrome (all templates)

```
[breadcrumb: Archive / Dossiers / NAME]        [FILE ID · CLASSIFICATION]
```

Top border: 2px solid `--accent-color`. Background: `#1a1a1a`.

---

### Template 1 — Personnel (standard)

Used for: V, Hawthorne, Rowan, Parker, Hargraves, Bekhti, Hector.

**Header strip** (background `#0f1520`, border-bottom `#1e2d4f`):

| Field | Notes |
|---|---|
| Status | Active / Missing / Deceased / [REDACTED] — accent color when active |
| Rank | Fleet rank or special designation |
| Specialty | Functional role |
| Origin | Homeworld or station — redactable per character |
| Flags | Badge(s) in gold border — e.g., `DRUID AFFILIATION · LEGAL` |

**Body:**
- Name: `SURNAME, GIVEN` in Orbitron 700
- Alias line: `Known as "[nickname]"` in Noto Sans muted (used for V)
- Role line: `Rank · Specialty · ESS Demeter` in Orbitron slate, uppercase
- Bio: 2–4 sentences, Noto Sans 200, muted, restrained Fleet bureaucratic language

**Layer 2 — Field Annotations** (gold, `rgba(201,168,76,...)`)
- Label: `FIELD ANNOTATIONS` in Orbitron gold
- One or more entries: italic, attributed with notation ID, author, stardate
- Tone: observed behavior, commander's notes, Druid practice logs, anomalous events
- Multiple entries separated by hairline border

**Layer 3 — Restricted Notation** (coral/red, soft lock)
- Header: `RESTRICTED NOTATION` + `CLEARANCE DELTA-1 REQUIRED · FLAG OFFICERS ONLY`
- Content: blurred red bars (CSS `filter: blur(3.5px)`) — content exists but is unreadable
- Used for: V's succession status, any character with flag-officer-only information
- The existence of the block on a given file is itself narrative information

**Character notes:**

- **V (Violet "V" Sandoval)** — Origin: Galway, Earth. Rank: Specialist. Specialty: Systems Integration. Flag: `DRUID AFFILIATION · LEGAL`. Restricted notation: succession status as heir apparent to the Grand Coven of Druids (her elder sister Ris is deceased; her mother — referred to by V as "Muther," Irish slang and an intentional slight — is the current High Priestess). This flag is not visible to V.
- **Hawthorne** — Special dispensation status. Rank field: `Special Dispensation`. Flag: `DRUID AFFILIATION · LEGAL`. Known for loquentes rootwork at a level of renown that earns her special Fleet authorization outside normal rank hierarchy.
- **Hector** — Intentionally brief dossier. Records sparse; reason in-universe TBD (expunged, restricted, or simply limited).

---

### Template 2 — Strained Personnel

Used for: Merion (sapling).

Identical structure to Template 1 with three additions:

**Type mismatch notice** (above header strip, gold background `rgba(201,168,76,0.08)`):
```
! RECORD TYPE MISMATCH — PERSONNEL TEMPLATE APPLIED BY ADMINISTRATIVE DEFAULT.
  RECLASSIFICATION REVIEW PENDING. SEE NOTATION 1-A.
```

**Strained field values** — fields that don't apply show italic muted text:
- Rank: `Non-applicable — see Notation 3`
- Specialty: `Loquentes interface · unverified`
- Flags: `SENTIENT ENTITY · NON-HUMANOID` + `TELEPATHIC DESIGNATION · PENDING`

**Specimen block** (non-standard, inserted between role line and bio):
A two-column grid labeled `SPECIMEN DATA — INSERTED PER XENOBOTANY PROTOCOL` containing:
- Taxonomy: `Unclassified · Brigid flora · sole recovered specimen`
- Morphology: `Sapling, approx. 0.4m. Burgundy foliage. Active growth noted.`
- Housing: `Sample Container 7-C, Xenobotany Lab, Deck 4`
- Substrate: `Brigid regolith, original collection. Do not substitute.`

**File ID suffix:** `ARK-DOS-008 · SEE NOTE`

The strain is intentional — the bureaucratic system accommodating something it cannot categorize by stapling lab paperwork onto a personnel form.

---

### Template 3 — Vessel Registry

Used for: Demeter.

**Header strip** (background `#0a1020`, deeper navy):

| Field | Value |
|---|---|
| Status | Active — Transit |
| Class | Frigate (FF) |
| Commission | [stardate TBD] |
| Captain of Record | [name TBD] |
| Conscience | `Organic · Active` — displayed in gold/warning color |
| Flags | `ORGANIC CONSCIENCE · FLAGGED` |

**Body:**
- Ship name: `ESS DEMETER` in Orbitron 700, large
- Registry: `FF-513` in accent color
- Classification line: `Fleet Frigate · Tau Ceti Transit · Diplomatic Mission` in Orbitron slate

**Children block** (navy background `#0d1825`, border `#1e2d4f`):
Label: `ATTACHED VESSELS — ORGANIC LINEAGE`
Rows: Name · Description · Status
- `PERSEPHONE` — Dropship · Minor AI · Docking Bay 2 — Active
- `ARION` — Dropship · Minor AI · Docking Bay 4 — Active

Field Annotations and Restricted Notation layers carry over from Template 1.

**File ID:** `ARK-VES-001 · FLEET REGISTRY`

---

### Template 4 — External Record

Used for: Merion (the band).

A scraped/archived social media profile rather than a Fleet document. Visually distinct — same dark background and fonts, but the chrome reads `EXTERNAL RECORD — ARCHIVED` rather than Fleet classification language.

Fields: Band name, formation date, origin (Earth), members list, genres, discography, greatest hits. No header strip in the Fleet style. No annotation layers. A "Source" note at bottom indicating where the record was scraped from.

Tone: feels like a Fleet archivist pulled this from a public database and filed it because someone aboard owned the music.

---

## Locked Stream Templates (at launch)

All three locked streams share the same locked card treatment on the hub. When built out, each gets its own index and entry format:

**Signal 9** (`/archive/signal-9/`)
Informal field log transmissions from two crew members. Slightly weird/anomalous tone. Feed-style index (reverse chronological). Each entry: transmission ID, sender, stardate, body text. Short, incomplete, observational.

**Captains of Old** (`/archive/captains/`)
Archival Fleet-style propaganda audiocasts. Each entry: title, episode number, transcript or summary, audio embed (if audio is produced). Formal, slightly self-congratulatory Fleet tone — contrast with the Signal 9 informality.

**Druid Blessings & Curses** (`/archive/druid-blessings/`)
Cultural archive — legal but flagged. Each entry: blessing or curse title, classification badge (`CULTURAL ARTIFACT · FLAGGED`), text, commentary. Slightly mystical, slightly uncomfortable to the Fleet bureaucratic framing around it.

---

## Annotation Layer System

Three-tier system used across personnel and vessel templates:

| Layer | Color | Visibility | Purpose |
|---|---|---|---|
| Official record | Neutral (site default) | All visitors | Fleet bureaucratic data — cold, formal |
| Field annotations | Gold (`#c9a84c`) | All visitors | Observed behavior, commander's notes, anomalous events |
| Restricted notation | Coral (`#c44a3a`) | Soft lock — blurred | Flag-officer-only information; existence of block is itself narrative |

The restricted block uses CSS `filter: blur(3.5px)` on the content with `user-select: none`. The header (`RESTRICTED NOTATION · CLEARANCE DELTA-1 REQUIRED`) is always legible. The block appears only on files where classified information exists — its presence on V's file is a story hook for cold visitors.

---

## Content Marketing System

The archive is structured for ongoing updates without redesign:

- **Signal 9** entries are the primary recurring content — short, low-effort to write, high atmosphere per word. Publishable on any cadence.
- **New dossier annotations** can be added to existing files over time — a new field notation or commander's note dated later in the voyage creates a sense of an unfolding story.
- **Locked stream unlock** — when a new stream is ready, the locked card on the hub becomes accessible. This is a natural announcement event.
- **Email signup** ("request elevated access") captures readers who want to be notified when locked streams open or new transmissions are posted.
- **tobbyhagler.com/card** remains a stable QR destination — the archive evolves behind it without changing the physical card.

---

## Voice & Tone

Follows the brand guidelines established at `thegroveoftauceti.com/brand`:

- Restrained and observational — the prose watches rather than pushes
- Implied worldbuilding — context through action, never exposition
- Fleet bureaucratic register for official records: cold, precise, institutional
- Field annotation register: slightly warmer, still controlled, occasionally anomalous
- No marketing language anywhere in the archive

Ship name formatting per CMOS 17th ed.: ESS *Demeter* (prefix roman, name italic, possessive *'s* roman).

---

## Open Items (for implementation)

- Captain of Record name for Demeter
- Demeter commission stardate
- Full character roster details for Rowan, Parker, Hargraves, Bekhti
- Whether any characters besides V have restricted notation blocks
- Whether Hector's sparse record is in-universe (expunged/restricted) or just minimal
- `tobbyhagler.com/card` copy — exact in-universe text
- Signal 9 sender identities (which two crew members write the logs)
- Audio format decision for Captains of Old (transcript-only vs. actual audio)
