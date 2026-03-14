# Brand Guidelines Creator Skill — Design Spec

> A brand-agnostic skill that extracts, codifies, and generates brand guidelines from existing codebases, documents, and user input. Produces both a human-readable guidelines document and a project-level Claude skill capable of generating branded web assets, print specs, copy, and auditing existing work against the guidelines.

---

## 1. Overview

### Problem

Brand consistency requires knowledge scattered across CSS files, design documents, tribal knowledge, and ad-hoc decisions. Claude has no structured way to learn a brand's identity and enforce it across sessions.

### Solution

A skill (`brand-guidelines-creator`) that:

1. Extracts brand elements from code and documents
2. Interviews the user to fill gaps and confirm inferences
3. Produces a human-readable brand guidelines document
4. Converts that document into a project-level Claude skill that generates branded outputs and audits existing work

### Key Constraints

- The creator skill contains zero brand-specific content — no examples, no defaults, no sample brands
- Generated brand skills are always project-level (`.claude/skills/brand-<name>/`)
- The creator skill lives in `~/repos/brand-guidelines-creator/` for future plugin conversion
- Incremental updates only — no full regeneration; respect manual edits
- Brand name is slugified for directory paths (lowercased, spaces to hyphens, special characters stripped); original name preserved for display

---

## 2. Skill Structure

### Creator Skill Layout

```
brand-guidelines-creator/
  SKILL.md                          # Orchestrator: routing, intake questionnaire, phase dispatch
  references/
    modules.md                      # Module definitions and requirements
    phase-scan.md                   # Codebase extraction instructions
    phase-ingest.md                 # Document ingestion instructions
    phase-interview.md              # Gap-filling interview: question templates per module
    phase-draft.md                  # Brand guidelines document structure and writing rules
    phase-convert.md                # Guidelines-to-skill conversion rules
    phase-update.md                 # Incremental update: detect existing skill, diff, patch
  assets/
    skill-template/                 # Instruction docs that tell Claude how to generate brand skill files
      skill-md-instructions.md      # Instructions for generating the brand skill's SKILL.md
      reference-instructions.md     # Instructions for generating module reference files
```

Note: The skill-template directory contains instruction documents, not literal templates with placeholder syntax. Each instruction file describes the structure, sections, and rules Claude follows when generating the corresponding output file. There is no template engine — Claude reads the instructions and writes the output file directly.

### Invocation Patterns

```
/brand-guidelines-creator
  Full pipeline: intake questionnaire -> scan -> ingest -> interview -> draft -> convert

/brand-guidelines-creator I have a style guide at docs/brand-guide.pdf
  Skips to: intake (pre-filled) -> ingest -> interview (lighter) -> draft -> convert

/brand-guidelines-creator update the color palette
  Detects existing skill -> opens incremental update for visual-identity module
```

The optional description after the command is parsed to determine which phases to run and what context to pre-fill. Default (no description) runs the full pipeline.

---

## 3. Intake Questionnaire

On invocation, the skill presents a sequential intake questionnaire using AskUserQuestion before doing any work. Each question is presented as a separate step with numbered options:

| Step | Question | Options |
|------|----------|---------|
| **1. Inputs** | What brand materials are available? | 1. Codebase (auto-scan current project), 2. Documents (specify paths — accepts absolute paths anywhere on the filesystem, multiple paths comma-separated), 3. URLs (specify URLs), 4. None (start from scratch), 5. Multiple — follow-up asks "Which inputs? (e.g., 1 and 2)" accepting comma-separated option numbers |
| **2. Modules** | Which brand modules to generate? | 1. Required only (Visual Identity + Assets), 2. Add Voice & Tone, 3. Add Content Patterns, 4. Add Technical Standards, 5. All modules |
| **3. Existing** | Is there an existing brand skill to update? | 1. Auto-detect (scan .claude/skills/), 2. Specify path, 3. No (new brand) |
| **4. Output** | Brand name for the generated skill? | Free text input |

After the questionnaire, the skill routes to the appropriate phases, skipping any that are not needed based on the answers and the optional description text.

---

## 4. Module System

### Module Definitions

| Module | Required | What It Captures | Sources |
|--------|----------|-----------------|---------|
| **Visual Identity** | Yes | Colors (hex, RGB, HSL, CMYK, Pantone), typography (families, weights, sizes, line-heights), spacing scale, layout principles, logo usage rules, imagery style | CSS variables, design tokens, stylesheets, brand docs |
| **Asset Management** | Yes | Logo files (formats, variants), font files, color swatch files, templates, favicon/icons | Project file system, user-specified directories |
| **Voice & Tone** | No | Writing personality, vocabulary preferences, do's and don'ts, formality level, audience awareness | Existing copy, brand docs, user interview |
| **Content Patterns** | No | Page structure conventions, CTA patterns, messaging hierarchy, heading styles, component content patterns | HTML structure, existing pages, brand docs |
| **Technical Standards** | No | CSS naming conventions, responsive breakpoints, animation conventions, accessibility requirements, performance budgets | Codebase analysis, config files, brand docs |

### Module Independence

Modules do not depend on each other. This enables:

- Generating a brand skill with just Visual Identity + Assets, or all five
- Parallel execution across modules in every phase
- Incremental updates to individual modules without affecting others

Each module maps to its own section in the guidelines document and its own reference file in the generated brand skill.

### Extraction Report Schema

Each module's scan/ingest phase produces a structured extraction report in markdown. The report follows a consistent format across modules, with module-specific fields:

**Visual Identity report:**
- Colors: name, hex, RGB, HSL, usage context (background/text/accent/border), source file and line
- Typography: family name, weights used, sizes, line-heights, where loaded from (Google Fonts/local), source
- Spacing: scale values, gap sizes, padding patterns, source
- Layout: max-widths, grid/flex patterns, alignment conventions, source
- Imagery: border-radius, shadow patterns, filter/effect conventions, source

**Asset Management report:**
- Files: path, format, dimensions (if image), file size, apparent purpose (logo/icon/cover/font), source directory

**Voice & Tone report (if enabled):**
- Observed patterns: sentence length, formality level, vocabulary examples, tone descriptors
- Confidence: low/medium/high per observation (most will be low)

**Content Patterns report (if enabled):**
- Components: pattern name, HTML structure summary, frequency of use, source files
- Hierarchy: heading levels used, CTA patterns, navigation structure

**Technical Standards report (if enabled):**
- Conventions: naming patterns (BEM/utility/custom), breakpoints, animation durations/easings, accessibility attributes found
- Configuration: any design token files, preprocessor configs, framework configs

Reports are written as markdown sections and merged into a single scan summary. Per-value provenance is tracked inline: `- Primary Blue: #3b9eea (source: styles.css:4, scan)`.

### Confidence Tiers

Extracted values are tagged with a confidence level:

| Tier | Meaning | Handling |
|------|---------|----------|
| **High** | Exact value from code or document (CSS variable, font declaration, explicit spec) | Presented as confirmation in interview: "I found X. Correct?" |
| **Medium** | Inferred from patterns (repeated color usage, consistent spacing) | Presented as suggestion: "It looks like X is used for Y. Is that right?" |
| **Low** | Best guess from limited data (voice tone from copy, imagery style from a few images) | Presented as open question: "I noticed X. How would you describe Y?" |

### Reference-Loading Matrix

The generated brand skill loads only the references relevant to the requested output type:

| Output Type | References Loaded |
|-------------|-------------------|
| **Web assets** | visual-identity, assets, technical-standards (if present) |
| **Print specs** | visual-identity, assets |
| **Copy/content** | voice-tone, content-patterns (if present) |
| **Review/audit** | All enabled modules |

---

## 5. Phase Pipeline

### Parallelism Model

| Phase | Parallel? | How | Model |
|-------|-----------|-----|-------|
| **Scan** | Yes | One agent per module, all scanning concurrently | Haiku (mechanical file discovery and extraction) |
| **Ingest** | Yes | Multiple documents parsed in parallel | Haiku (reading files, extracting values into known schema) |
| **Interview** | No | Runs in main conversation (sequential Q&A with user) | Inherits parent model |
| **Draft** | Yes | Each module section drafted concurrently | Sonnet (writing coherent prose, structural judgment) |
| **Convert** | Yes | Each module's skill reference file generated concurrently | Sonnet (generating skill files following conventions) |

### Phase 1 — Scan (Codebase Extraction)

The scan phase operates on the current project directory by default. If the user specified additional directories in the intake (e.g., a shared assets folder at an absolute path), scan those directories as well. All paths provided by the user are treated as absolute paths and read directly — they do not need to be inside the project.

Dispatches parallel subagents via the Agent tool (subagent_type: Explore, model: haiku) per enabled module. All agents run concurrently in a single message with multiple Agent tool calls:

- **Visual Identity agent**: Uses Grep/Glob/Read to find CSS/SCSS files, design token configs, tailwind configs. Extracts color values, font declarations, spacing scales, border radii, shadows.
- **Assets agent**: Uses Glob to find image files (*.png, *.jpg, *.svg, *.ico), font files (*.woff, *.woff2, *.ttf, *.otf), and other brand assets. Uses Read on HTML to find srcset/favicon references. Catalogs paths, formats, and sizes.
- **Content Patterns agent** (if enabled): Uses Read on HTML files to identify repeated component patterns, heading hierarchy, CTA structures.
- **Technical Standards agent** (if enabled): Uses Grep/Read on CSS/config files to extract responsive breakpoints, animation keyframes, naming conventions, accessibility attributes.
- **Voice & Tone agent** (if enabled): Uses Read on HTML files to extract visible text content. The agent then applies LLM reasoning to analyze sentence structure, formality, and vocabulary patterns (no external tool — inference only). Most observations tagged as low confidence.

Each agent returns a structured extraction report (see Section 4, Extraction Report Schema). Reports are merged into a single scan summary presented to the user in the conversation. The scan summary is ephemeral — it is not written to disk. The persisted artifact is the brand guidelines document produced in Phase 4.

### Phase 2 — Ingest (Document Analysis)

If the user specified documents or URLs in the intake:

- Parse each source (markdown, PDF, images of style guides, etc.)
- Extract brand elements into the same module structure as the scan
- Flag conflicts between scanned values and document values (e.g., CSS says `#3b9eea` but the brand doc says the primary blue is `#2196F3`)

URLs are fetched using the WebFetch tool and parsed as static HTML. Merge ingested data with scan data, noting source provenance for each value.

**Conflict resolution:** Conflicts are collected during ingest but not resolved automatically. They are presented to the user at the start of the interview phase (Phase 3) as a dedicated "Resolve Conflicts" step before gap-filling questions. The user picks which value to keep for each conflict.

**Source type limitations:**
- **Markdown/text files**: Fully parseable, highest reliability
- **PDF files**: Parseable via Read tool; files over 10 pages are read in chunks (20 pages per request). For large PDFs (50+ pages), the ingest phase warns the user about processing time and asks whether to read the full document or focus on specific page ranges
- **URLs**: Only static HTML/text content is reliably parseable via WebFetch; dynamic/JS-rendered pages may be incomplete
- **Images of style guides**: Best-effort extraction using multimodal capabilities; always confirmed in interview phase

### Phase 3 — Interview (Gap-Filling)

For each enabled module, check what is missing or uncertain:

- Present the scan/ingest findings first: "Here is what I found for Visual Identity: [summary]. Correct?"
- Ask targeted questions only for gaps — do not re-ask things already extracted
- Use multiple-choice where possible
- Required modules (Visual Identity, Assets) must have all key fields filled before proceeding
- Optional modules can be left sparse if the user does not have the information

### Phase 4 — Draft (Guidelines Document)

Produce a human-readable brand guidelines markdown document at a user-specified location (default: `docs/brand-guidelines.md` in the project).

Structure follows the enabled modules. Each section includes:

- The extracted/confirmed values
- Usage rules and constraints
- Examples where relevant
- Source provenance (where each value came from)

### Phase 5 — Convert (Skill Generation)

Transform the guidelines document into a project-level Claude skill at `.claude/skills/brand-<name>/`:

- Generate `SKILL.md` with workflow instructions for producing branded outputs
- Generate `references/` files per module with detailed specs
- Copy or reference asset files into `assets/`
- Structure scales directly with enabled modules: one reference file per enabled module, no more, no less. A 2-module brand gets 2 reference files; a 5-module brand gets 5.

### Phase 6 — Update (Incremental)

When an existing brand skill is detected:

- Load the current skill and parse its module structure
- Present the user with which modules exist and what they want to change
- Apply changes to the specific module files without touching others
- Preserve any manual edits in untouched sections

### Fallback Behavior

| Scenario | Behavior |
|----------|----------|
| Scan finds no CSS/style files | Skip scan for Visual Identity; interview collects all values manually |
| Scan finds no image/font/asset files | Asset Management report lists "No assets found"; interview asks user to specify locations or confirm no assets exist |
| Document path is invalid or unreadable | Warn user, ask for correction, continue with remaining sources |
| URL returns error or unusable content | Warn user, skip that source, continue with remaining sources |
| Required module (Visual Identity) has no data after scan + ingest | Interview phase must collect all key values manually before proceeding |
| Optional module has no data after scan + ingest | Present to user: "No data found for [module]. Skip this module or provide information?" |
| Codebase has no HTML files (assets-only project) | Content Patterns and Voice & Tone scan agents return empty reports; those modules rely entirely on documents and interview |

---

## 6. Generated Brand Skill Structure

### Lean Brand (2 required modules only)

```
.claude/skills/brand-<name>/
  SKILL.md                    # Brand overview + generation workflows
  references/
    visual-identity.md        # Colors, typography, spacing, logo rules
    assets.md                 # Asset inventory with paths and usage rules
  assets/
    logos/                    # Logo files (or references to project paths)
```

### Full Brand (all 5 modules)

```
.claude/skills/brand-<name>/
  SKILL.md                    # Brand overview + generation workflows for all output types
  references/
    visual-identity.md        # Colors, typography, spacing, imagery style
    assets.md                 # Asset inventory, formats, locations
    voice-tone.md             # Writing personality, vocabulary, do's and don'ts
    content-patterns.md       # Page structures, CTAs, messaging hierarchy
    technical-standards.md    # CSS conventions, breakpoints, accessibility, animations
  assets/
    logos/                    # Logo variants
    fonts/                    # Font files (if bundled)
    templates/                # Reusable component templates
```

### Generated SKILL.md Capabilities

The generated skill's `SKILL.md` instructs Claude how to produce branded outputs:

| Output Type | What the Skill Instructs Claude to Do |
|-------------|---------------------------------------|
| **Web assets** | Generate CSS files, design tokens, or HTML components using the brand's colors, fonts, and patterns |
| **Print specs** | Produce color values in CMYK/Pantone, typography specs for print, logo clear space rules |
| **Copy/content** | Write text in the brand's voice, following tone guidelines, vocabulary, and messaging patterns |
| **Review/audit** | Compare existing code or content against the guidelines, flag deviations with specific references to the violated rule |

The skill loads only the references relevant to the requested output type, not everything at once.

### Provenance Tracking

Each reference file includes a metadata comment at the top:

```markdown
<!-- Generated by brand-guidelines-creator v1 | Source: scan + docs/style-guide.pdf + user interview | Date: 2026-03-14 -->
```

The version counter (`v1`, `v2`, etc.) increments with each incremental update. Per-value provenance is tracked inline throughout the file:

```markdown
- Primary Blue: #3b9eea (source: styles.css:4, scan)
- Font Family: Orbitron (source: user interview, v1)
```

This supports incremental updates — the update phase knows what was auto-extracted vs. manually confirmed and can re-scan without overwriting user-provided values.

### Template Ownership

The Asset Management module owns template files (reusable component templates, boilerplate HTML). Templates appear in `assets/templates/` in the generated skill and are cataloged in `references/assets.md`.

---

## 7. Platform Compatibility

The skill is designed primarily for Claude Code CLI but should degrade gracefully in other environments.

### Tool Availability by Platform

| Capability | Claude Code CLI | Claude Desktop (Chat/CoWork) |
|------------|----------------|------------------------------|
| File system (Glob, Grep, Read, Write) | Built-in | Requires MCP file system server |
| Parallel subagents (Agent tool) | Built-in | Not available |
| AskUserQuestion | Built-in interactive prompt | Natural conversation (ask in message, user replies) |
| WebFetch | Built-in | May require MCP or be unavailable |
| File drag-and-drop | Not applicable | Built-in (files added via UI) |

### Degraded Mode for Non-CLI Environments

When running outside Claude Code CLI (detected by unavailability of Glob/Grep/Agent tools):

- **Scan phase**: Run sequentially instead of via parallel agents. Use Read on user-specified file paths instead of Glob/Grep discovery. If file system tools are unavailable, skip the scan phase entirely and rely on ingested documents and user interview.
- **Ingest phase**: Accept files provided via the chat UI (drag-and-drop) in addition to file paths. Read each file directly.
- **Interview phase**: Use natural conversational Q&A instead of AskUserQuestion. Present options as numbered lists in messages. This is the most portable phase — it works identically in any environment.
- **Draft phase**: Write the guidelines document to a path the user specifies. If Write is unavailable, present the document content in the conversation for the user to copy.
- **Convert phase**: Same as draft — write to `.claude/skills/` if possible, otherwise present content for manual creation.
- **Parallelism**: All parallelism downgrades to sequential execution. The skill still works; it just takes longer.

The skill's SKILL.md should detect available tools at the start of execution and route to the appropriate mode. The core logic (module system, extraction schemas, confidence tiers, provenance tracking) is platform-independent.

---

## 8. Non-Goals

- No brand-specific content in the creator skill itself (no examples, defaults, or sample brands)
- No full regeneration mode — updates are always incremental
- No global skill output — generated brand skills are always project-level
- No build system, preprocessor, or runtime dependency
- No direct integration with external design tools (Figma, Sketch) in v1

---

## 9. Future Considerations

- **Plugin conversion**: The standalone repo structure (`~/repos/brand-guidelines-creator/`) is designed for future packaging as a Claude Code plugin
- **Design tool integration**: Future versions could import from Figma design tokens or Sketch libraries
- **Multi-brand support**: A project could have multiple brand skills (e.g., `brand-primary/`, `brand-partner/`) — the creator already supports this via the brand name in the intake questionnaire
- **Brand validation CI**: The audit capability could be wrapped in a pre-commit hook or CI step
