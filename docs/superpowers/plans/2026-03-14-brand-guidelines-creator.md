# Brand Guidelines Creator — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a brand-agnostic Claude Code skill that extracts brand elements from codebases/documents, interviews users, and produces both a human-readable guidelines document and a project-level Claude skill.

**Architecture:** Phased skill with references — a lean SKILL.md orchestrates the workflow and delegates to reference files for each phase (scan, ingest, interview, draft, convert, update). Instruction documents in assets/skill-template/ guide the generation of brand-specific skill files. No build dependencies, no scripts, no template engine — pure markdown skill.

**Tech Stack:** Claude Code skill ecosystem (SKILL.md + references/ + assets/), markdown only, skill-creator tooling for initialization and validation.

**Spec:** `docs/superpowers/specs/2026-03-14-brand-guidelines-creator-design.md`

---

## File Structure

### Files to Create

| File | Responsibility |
|------|---------------|
| `~/repos/brand-guidelines-creator/SKILL.md` | Orchestrator: frontmatter, invocation routing, intake questionnaire, phase dispatch, parallelism instructions |
| `~/repos/brand-guidelines-creator/references/modules.md` | Module definitions (5 modules), required vs optional, extraction report schema per module, confidence tiers |
| `~/repos/brand-guidelines-creator/references/phase-scan.md` | Codebase extraction: per-module agent prompts, tool usage (Grep/Glob/Read), report format, fallback behavior |
| `~/repos/brand-guidelines-creator/references/phase-ingest.md` | Document ingestion: supported formats, source type limitations, conflict flagging, provenance tracking |
| `~/repos/brand-guidelines-creator/references/phase-interview.md` | Gap-filling interview: conflict resolution step, question templates per module, confidence-based question framing |
| `~/repos/brand-guidelines-creator/references/phase-draft.md` | Guidelines document structure: section templates per module, provenance format, writing rules |
| `~/repos/brand-guidelines-creator/references/phase-convert.md` | Skill generation: directory structure rules, SKILL.md generation, reference file generation, reference-loading matrix |
| `~/repos/brand-guidelines-creator/references/phase-update.md` | Incremental update: existing skill detection, module parsing, selective patching, version counter increment |
| `~/repos/brand-guidelines-creator/assets/skill-template/skill-md-instructions.md` | Instructions for generating the brand skill's SKILL.md (structure, output-type workflows, reference-loading logic) |
| `~/repos/brand-guidelines-creator/assets/skill-template/reference-instructions.md` | Instructions for generating module reference files (format per module, provenance format, content rules) |

---

## Chunk 1: Repository Setup and SKILL.md Orchestrator

### Task 1: Initialize the repository and skill skeleton

**Files:**
- Create: `~/repos/brand-guidelines-creator/` (via init_skill.py)
- Modify: `~/repos/brand-guidelines-creator/SKILL.md` (replace template)

- [ ] **Step 1: Run init_skill.py to scaffold the skill**

```bash
python3 ~/.claude/skills/skill-creator/scripts/init_skill.py brand-guidelines-creator --path ~/repos
```

Expected: Creates `~/repos/brand-guidelines-creator/` with template SKILL.md and example directories.

- [ ] **Step 2: Initialize git inside the created directory**

```bash
cd ~/repos/brand-guidelines-creator
git init
```

- [ ] **Step 3: Remove example files not needed**

```bash
rm ~/repos/brand-guidelines-creator/scripts/example.py
rmdir ~/repos/brand-guidelines-creator/scripts
rm ~/repos/brand-guidelines-creator/references/api_reference.md
rm ~/repos/brand-guidelines-creator/assets/example_asset.txt
```

The skill uses no scripts. The references/ and assets/ directories stay (they will be populated in later tasks).

- [ ] **Step 4: Commit the skeleton**

```bash
cd ~/repos/brand-guidelines-creator
git add -A
git commit -m "chore: initialize brand-guidelines-creator skill skeleton"
```

### Task 2: Write SKILL.md — the orchestrator

**Files:**
- Modify: `~/repos/brand-guidelines-creator/SKILL.md`

This is the core file. It must stay under 5,000 words (progressive disclosure — detailed instructions live in references/). It handles:

1. YAML frontmatter with name and description
2. Overview of what the skill does
3. Invocation routing (full pipeline, pre-filled, update mode)
4. Intake questionnaire (4 sequential AskUserQuestion steps)
5. Phase dispatch with parallelism instructions
6. Pointers to reference files for each phase

- [ ] **Step 1: Write the SKILL.md**

Write the complete SKILL.md with this structure:

```markdown
---
name: brand-guidelines-creator
description: This skill should be used when creating, extracting, or codifying brand guidelines for a project. It analyzes codebases and documents to produce both a human-readable brand guidelines document and a project-level Claude skill that generates branded web assets, print specs, copy, and audits existing work against the guidelines. Invoke when a user wants to establish, document, or enforce brand identity for a project.
---

# Brand Guidelines Creator

[Overview section — what this skill does, zero brand-specific content]

## Invocation Routing

[Parse optional description text to determine mode: full pipeline / pre-filled / update]
[Decision tree for routing]

## Intake Questionnaire

[4 sequential AskUserQuestion steps — Inputs, Modules, Existing, Output]
[Include the exact question text and numbered options from the spec]
[Brand name slugification rule for directory paths]

## Phase Pipeline

[Overview of all 6 phases with skip conditions]
[Copy the Parallelism Model table from spec Section 5 verbatim — 5 rows: Scan/Ingest/Interview/Draft/Convert with parallel indicators]
[For each phase: 1-2 sentence summary + "Read references/phase-X.md for detailed instructions"]
[Fallback behavior summary table — copy full 7-row table from spec Section 5. Phase-specific fallbacks are also included in their respective reference files: scan fallbacks in phase-scan.md (rows 1, 2, 7), ingest fallbacks in phase-ingest.md (rows 3, 4), interview fallbacks in phase-interview.md (rows 5, 6)]

## Module System

[Brief description — "Read references/modules.md for full definitions"]
[List the 5 modules with required/optional markers]
```

Key rules for writing SKILL.md:
- Imperative/infinitive form ("To scan the codebase, dispatch parallel agents..." not "You should scan...")
- No brand-specific content — no examples referencing any real brand
- Reference files by path, do not duplicate their content
- Under 5,000 words
- Include a **Platform Detection** section near the top that detects available tools (Glob, Grep, Agent) and routes to degraded mode for non-CLI environments (see spec Section 7). In degraded mode: scan runs sequentially or is skipped, AskUserQuestion becomes conversational Q&A, parallelism downgrades to sequential, and files can be accepted via drag-and-drop UI
- Intake questionnaire must accept absolute paths for document locations (not just project-relative paths). Multiple paths are comma-separated.

- [ ] **Step 2: Validate the skill**

```bash
python3 ~/.claude/skills/skill-creator/scripts/quick_validate.py ~/repos/brand-guidelines-creator
```

Expected: "Skill is valid!"

- [ ] **Step 3: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add SKILL.md
git commit -m "feat: add SKILL.md orchestrator with routing, intake, and phase dispatch"
```

---

## Chunk 2: Module System and Scan Phase

### Task 3: Write references/modules.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/modules.md`

This file contains everything about the 5-module system. Content from spec Section 4:

1. Module definitions table (name, required/optional, what it captures, sources)
2. Module independence rules
3. Extraction report schema per module (field-level detail)
4. Confidence tiers (high/medium/low) with handling rules
5. Reference-loading matrix (which modules load for which output type)

- [ ] **Step 1: Write references/modules.md**

Write the complete file. Include all content from spec Section 4: Module Definitions, Module Independence, Extraction Report Schema (all 5 modules with specific fields), Confidence Tiers table, and Reference-Loading Matrix table.

Use imperative/infinitive form throughout. No brand-specific examples.

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/modules.md
git commit -m "feat: add module definitions with extraction schemas and confidence tiers"
```

### Task 4: Write references/phase-scan.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/phase-scan.md`

This file contains the detailed instructions for Phase 1 (codebase extraction). Content:

1. Overview of the scan phase and when it runs
2. Multi-path scanning: scan the current project directory by default, plus any additional absolute paths the user specified in the intake. All user-provided paths are treated as absolute and read directly — they do not need to be inside the project.
3. Per-module agent dispatch instructions (which tools to use, what patterns to search for)
3. Agent prompt templates for each of the 5 modules:
   - Visual Identity: Grep patterns for CSS variables, color values, font-face declarations, Google Fonts imports; Glob patterns for CSS/SCSS/design token files
   - Assets: Glob patterns for images (*.png, *.jpg, *.jpeg, *.gif, *.svg, *.ico, *.webp), fonts (*.woff, *.woff2, *.ttf, *.otf, *.eot), favicons; Read HTML for srcset/link references
   - Content Patterns: Read HTML files, identify repeated structures, heading hierarchy, nav patterns, CTA elements
   - Technical Standards: Grep for @media queries, animation/keyframe declarations, naming patterns; Read config files (tailwind.config, postcss.config, etc.)
   - Voice & Tone: Read HTML for visible text content, analyze with LLM reasoning
4. Report format instructions (markdown sections with inline provenance)
5. Parallelism instructions (dispatch all enabled module agents in a single message via Agent tool, subagent_type: Explore, model: haiku — scan/ingest agents use Haiku for cost efficiency since their work is mechanical file discovery and extraction)
6. Scan-specific fallback behavior (from spec fallback table rows 1, 2, 7): no CSS found, no asset files found, no HTML files in project

- [ ] **Step 1: Write references/phase-scan.md**

Write the complete file with all 5 agent prompt templates. Each template specifies:
- Exact tool calls to make (Glob patterns, Grep patterns, Read targets)
- What to extract from results
- How to format the extraction report
- Confidence tier assignment rules

Key Glob patterns to include:
```
Visual Identity: **/*.css, **/*.scss, **/*.less, **/tailwind.config.*, **/design-tokens.*
Assets: **/*.{png,jpg,jpeg,gif,svg,ico,webp,woff,woff2,ttf,otf,eot}
Content Patterns: **/*.html, **/*.htm
Technical Standards: **/*.css, **/tailwind.config.*, **/postcss.config.*, **/.browserslistrc
Voice & Tone: **/*.html, **/*.htm
```

Key Grep patterns to include:
```
Visual Identity colors: --[a-z-]+:\s*#[0-9a-fA-F], rgb\(, hsl\(, var\(--
Visual Identity typography: font-family, font-weight, font-size, line-height, @import.*fonts
Technical Standards: @media, @keyframes, animation:, transition:, aria-, role=
```

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/phase-scan.md
git commit -m "feat: add scan phase with per-module agent prompts and tool patterns"
```

---

## Chunk 3: Ingest and Interview Phases

### Task 5: Write references/phase-ingest.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/phase-ingest.md`

This file contains the detailed instructions for Phase 2 (document ingestion). Content:

1. Overview of the ingest phase and when it runs (only if user specified documents/URLs)
2. Path handling: accept absolute paths anywhere on the filesystem, not just project-relative. Multiple paths comma-separated. In Claude Desktop, also accept files provided via the chat UI (drag-and-drop). If a path is a directory, recurse into it and process all supported file types found.
3. Source type handling:
   - Markdown/text: Read directly, extract brand elements by module
   - PDF: Read tool with pages parameter; chunk large files (20 pages per request); warn user for 50+ page PDFs
   - URLs: WebFetch tool; note static HTML only limitation
   - Images: Read tool (multimodal); tag all extractions as low confidence. All values extracted from images must be confirmed in the interview phase (Phase 3), regardless of apparent confidence
3. Extraction rules: parse into the same module structure as scan reports
4. Conflict detection: when ingested values differ from scanned values, record both with their sources
5. Conflict format: markdown table with columns: Element, Scanned Value (source), Document Value (source)
6. Provenance tracking: every extracted value gets inline source annotation
7. Merge rules: combine scan + ingest data, flag conflicts, pass to interview phase

- [ ] **Step 1: Write references/phase-ingest.md**

Write the complete file. Include specific instructions for each source type, conflict detection format, and merge rules.

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/phase-ingest.md
git commit -m "feat: add ingest phase with source type handling and conflict detection"
```

### Task 6: Write references/phase-interview.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/phase-interview.md`

This file contains the detailed instructions for Phase 3 (gap-filling interview). Content:

1. **Key UX constraint: one question at a time, prefer multiple choice.** This is the most important rule for the interview phase.
2. Overview and when it runs (always, but lighter if scan+ingest were thorough)
3. Conflict resolution step (runs first if conflicts exist):
   - Present conflict table to user
   - Ask user to pick which value to keep for each conflict
   - Use AskUserQuestion with numbered options per conflict
4. Per-module question templates:
   - Visual Identity: confirm colors, typography, spacing; ask about logo usage rules, imagery style
   - Assets: confirm found assets; ask about missing assets, logo variants, font licenses
   - Voice & Tone: present inferred patterns; ask about personality, vocabulary, formality, audience
   - Content Patterns: confirm found patterns; ask about CTA conventions, messaging hierarchy
   - Technical Standards: confirm found conventions; ask about accessibility requirements, performance budgets
5. Confidence-based question framing:
   - High confidence: "I found X. Correct?" (confirmation)
   - Medium confidence: "It looks like X is used for Y. Is that right?" (suggestion)
   - Low confidence: "I noticed X. How would you describe Y?" (open question)
6. Required module gate: Visual Identity and Assets must have all key fields before proceeding
7. Optional module skip: "No data found for [module]. Skip this module or provide information?"
8. Ingest-specific fallbacks (from spec fallback table rows 3, 4): invalid document path, URL errors
9. Interview-specific fallbacks (from spec fallback table rows 5, 6): required module with no data, optional module with no data

- [ ] **Step 1: Write references/phase-interview.md**

Write the complete file with all question templates organized by module and confidence tier.

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/phase-interview.md
git commit -m "feat: add interview phase with conflict resolution and per-module question templates"
```

---

## Chunk 4: Draft and Convert Phases

### Task 7: Write references/phase-draft.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/phase-draft.md`

This file contains the detailed instructions for Phase 4 (guidelines document generation). Content:

1. Overview: produce a human-readable brand guidelines markdown document
2. Output location: user-specified path, default `docs/brand-guidelines.md` in the target project
3. Document structure template:
   ```
   # [Brand Name] Brand Guidelines
   <!-- Generated by brand-guidelines-creator v1 | Date: YYYY-MM-DD -->

   ## Visual Identity (always present)
   ### Colors
   ### Typography
   ### Spacing & Layout
   ### Imagery Style
   ### Logo Usage

   ## Asset Inventory (always present)
   ### Logo Files
   ### Font Files
   ### Other Assets

   ## Voice & Tone (if enabled)
   ### Personality
   ### Vocabulary
   ### Do's and Don'ts

   ## Content Patterns (if enabled)
   ### Page Structure
   ### CTA Patterns
   ### Messaging Hierarchy

   ## Technical Standards (if enabled)
   ### CSS Conventions
   ### Responsive Breakpoints
   ### Animation Conventions
   ### Accessibility
   ```
4. Per-section writing rules:
   - Include extracted/confirmed values with inline provenance
   - State usage rules and constraints clearly
   - Include examples where relevant (drawn from the actual brand data, not generic examples)
5. Parallelism: each module section can be drafted concurrently via parallel agents (model: sonnet — draft agents require judgment about prose quality and structure)
6. Writing style: clear, direct, reference-style (not conversational)

- [ ] **Step 1: Write references/phase-draft.md**

Write the complete file with the document structure template and per-section writing rules.

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/phase-draft.md
git commit -m "feat: add draft phase with guidelines document structure and writing rules"
```

### Task 8: Write references/phase-convert.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/phase-convert.md`

This file contains the detailed instructions for Phase 5 (skill generation). Content:

1. Overview: transform the guidelines document into a project-level Claude skill
2. Output location: `.claude/skills/brand-<slugified-name>/` in the target project
3. Directory structure rules:
   - One reference file per enabled module, no more, no less
   - SKILL.md generated using instructions from `assets/skill-template/skill-md-instructions.md`
   - Reference files generated using instructions from `assets/skill-template/reference-instructions.md`
   - Assets directory only created if physical asset files exist to reference
   - Template files (reusable component templates, boilerplate HTML) owned by Asset Management module — placed in `assets/templates/` and cataloged in `references/assets.md`
4. SKILL.md generation rules:
   - Read `assets/skill-template/skill-md-instructions.md` for structure
   - Include frontmatter with brand name and description
   - Include output-type workflows (web assets, print specs, copy/content, review/audit)
   - Include reference-loading matrix so the skill loads only relevant references per output type
5. Reference file generation rules:
   - Read `assets/skill-template/reference-instructions.md` for format
   - One file per enabled module
   - Include provenance metadata comment at top
   - Include all extracted/confirmed values with inline provenance
6. Parallelism: generate reference files concurrently (one agent per module, model: sonnet — convert agents require judgment about skill conventions and structure)
7. Validation: run quick_validate.py on the generated skill

- [ ] **Step 1: Write references/phase-convert.md**

Write the complete file with generation rules for both SKILL.md and reference files.

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/phase-convert.md
git commit -m "feat: add convert phase with skill generation rules and structure"
```

---

## Chunk 5: Update Phase and Skill Templates

### Task 9: Write references/phase-update.md

**Files:**
- Create: `~/repos/brand-guidelines-creator/references/phase-update.md`

This file contains the detailed instructions for Phase 6 (incremental update). Content:

1. Overview: detect and update an existing brand skill without full regeneration
2. Detection logic:
   - Glob for `.claude/skills/brand-*/SKILL.md` in target project
   - If found, read the SKILL.md to identify brand name and enabled modules
   - Parse provenance metadata to determine version and sources
3. Update workflow:
   - Present user with current modules and ask what to change
   - For each module being updated: re-run scan (if codebase) or re-ingest (if documents) for that module only
   - Interview for gaps/changes in the updated module only
   - Patch the specific reference file without touching others
   - Update the guidelines document's corresponding section
   - Increment version counter in provenance metadata (v1 -> v2, etc.)
4. Preservation rules:
   - Never modify reference files for modules not being updated
   - Never overwrite values tagged with "user interview" provenance unless user explicitly confirms
   - Preserve any manual edits the user may have made to the skill files
5. Edge cases:
   - Adding a new module to an existing skill: create new reference file, update SKILL.md to include it
   - Removing a module: confirm with user, delete reference file, update SKILL.md

- [ ] **Step 1: Write references/phase-update.md**

Write the complete file with detection logic, update workflow, and preservation rules.

- [ ] **Step 2: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add references/phase-update.md
git commit -m "feat: add update phase with incremental patching and preservation rules"
```

### Task 10: Write skill template instruction documents

**Files:**
- Create: `~/repos/brand-guidelines-creator/assets/skill-template/skill-md-instructions.md`
- Create: `~/repos/brand-guidelines-creator/assets/skill-template/reference-instructions.md`

These are instruction documents (not literal templates) that Claude reads when generating brand skill files.

#### skill-md-instructions.md

Instructions for generating a brand skill's SKILL.md. Content:

1. Frontmatter format:
   ```yaml
   ---
   name: brand-<slugified-name>
   description: This skill provides brand guidelines for [Brand Display Name]. It should be used when generating web assets, print materials, written copy, or auditing existing work for brand consistency. [Include 1-sentence brand summary.]
   ---
   ```
2. Required sections:
   - Overview (what this brand skill provides)
   - Output Type Workflows (one subsection per supported output type: web assets, print specs, copy/content, review/audit)
   - Reference Loading (which reference files to read for each output type, per the reference-loading matrix)
   - Brand Summary (key brand values in 2-3 sentences for quick context)
3. Output type workflow structure:
   - Web assets: instructions to read visual-identity + assets + technical-standards references, generate CSS/design tokens/HTML components
   - Print specs: instructions to read visual-identity + assets references, produce CMYK/Pantone values, spacing rules
   - Copy/content: instructions to read voice-tone + content-patterns references, write in brand voice
   - Review/audit: instructions to read all enabled module references, compare against each, flag deviations
4. Writing rules: imperative form, no second person, no generic examples

#### reference-instructions.md

Instructions for generating module reference files. Content:

1. Provenance header format:
   ```markdown
   <!-- Generated by brand-guidelines-creator v[N] | Source: [sources] | Date: YYYY-MM-DD -->
   ```
2. Per-module reference file structure:
   - visual-identity.md: Colors (table with name/hex/RGB/HSL/usage/source), Typography (table with family/weights/sizes/line-heights/source), Spacing, Layout, Imagery, Logo Usage Rules
   - assets.md: Asset Inventory (table with path/format/dimensions/purpose/source), Usage Rules per asset type, Template Ownership section (reusable component templates cataloged here, placed in `assets/templates/` in generated skill)
   - voice-tone.md: Personality, Vocabulary (preferred/avoided words), Tone Spectrum (formal-casual scale), Do's and Don'ts, Audience
   - content-patterns.md: Page Structures, CTA Patterns, Heading Hierarchy, Messaging Conventions
   - technical-standards.md: CSS Conventions, Breakpoints, Animations, Accessibility Requirements
3. Inline provenance format: `(source: file:line, scan|ingest|interview, vN)`
4. Writing rules: declarative/reference style, tables preferred for structured data, no conversational language

- [ ] **Step 1: Create assets/skill-template/ directory**

```bash
mkdir -p ~/repos/brand-guidelines-creator/assets/skill-template
```

- [ ] **Step 2: Write skill-md-instructions.md**

Write the complete instruction document with frontmatter format, required sections, output type workflows, and writing rules.

- [ ] **Step 3: Write reference-instructions.md**

Write the complete instruction document with provenance format, per-module structure, inline provenance format, and writing rules.

- [ ] **Step 4: Commit**

```bash
cd ~/repos/brand-guidelines-creator
git add assets/skill-template/
git commit -m "feat: add skill template instructions for generating brand skill files"
```

---

## Chunk 6: Validation and Final Packaging

### Task 11: Validate and test the complete skill

**Files:**
- Read: All files in `~/repos/brand-guidelines-creator/`

- [ ] **Step 1: Run skill validator**

```bash
python3 ~/.claude/skills/skill-creator/scripts/quick_validate.py ~/repos/brand-guidelines-creator
```

Expected: "Skill is valid!"

- [ ] **Step 2: Verify file structure matches the spec**

```bash
find ~/repos/brand-guidelines-creator -type f | sort
```

Expected output:
```
~/repos/brand-guidelines-creator/SKILL.md
~/repos/brand-guidelines-creator/assets/skill-template/reference-instructions.md
~/repos/brand-guidelines-creator/assets/skill-template/skill-md-instructions.md
~/repos/brand-guidelines-creator/references/modules.md
~/repos/brand-guidelines-creator/references/phase-convert.md
~/repos/brand-guidelines-creator/references/phase-draft.md
~/repos/brand-guidelines-creator/references/phase-ingest.md
~/repos/brand-guidelines-creator/references/phase-interview.md
~/repos/brand-guidelines-creator/references/phase-scan.md
~/repos/brand-guidelines-creator/references/phase-update.md
```

- [ ] **Step 3: Verify SKILL.md is under 5,000 words**

```bash
wc -w ~/repos/brand-guidelines-creator/SKILL.md
```

Expected: Under 5,000 words.

- [ ] **Step 4: Verify no brand-specific content**

```bash
grep -ri "tau ceti\|orbitron\|noto sans\|#3b9eea\|#0c0c0c\|thegroveoftauceti" ~/repos/brand-guidelines-creator/
```

Expected: No matches. These patterns are from the development context project (The Grove of Tau Ceti) and verify the creator skill contains no leaked brand data. The skill must contain zero brand-specific content.

- [ ] **Step 5: Read through SKILL.md and verify all reference file paths are correct**

Read SKILL.md and confirm every `references/` and `assets/` path it mentions corresponds to an actual file.

- [ ] **Step 6: Commit any fixes**

```bash
cd ~/repos/brand-guidelines-creator
git add -A
git commit -m "fix: validation corrections" # only if changes were needed
```

### Task 12: Package the skill

**Files:**
- Create: `~/repos/brand-guidelines-creator/brand-guidelines-creator.zip` (output of packaging)

- [ ] **Step 1: Package with skill-creator**

```bash
python3 ~/.claude/skills/skill-creator/scripts/package_skill.py ~/repos/brand-guidelines-creator
```

Expected: Creates `brand-guidelines-creator.zip` with validation passing.

- [ ] **Step 2: Final commit**

```bash
cd ~/repos/brand-guidelines-creator
echo "*.zip" >> .gitignore
git add .gitignore
git commit -m "chore: add .gitignore for packaged skill zip"
```

- [ ] **Step 3: Verify the skill is ready for testing**

The skill is now ready to test by:
1. Copying or symlinking `~/repos/brand-guidelines-creator/` to a project's `.claude/skills/` directory
2. Or installing the zip via Claude Code's skill installation mechanism
3. Then invoking `/brand-guidelines-creator` in a project with an existing codebase

---

## Summary

| Chunk | Tasks | What It Produces |
|-------|-------|-----------------|
| 1 | Tasks 1-2 | Repo + SKILL.md orchestrator |
| 2 | Tasks 3-4 | Module system + scan phase |
| 3 | Tasks 5-6 | Ingest + interview phases |
| 4 | Tasks 7-8 | Draft + convert phases |
| 5 | Tasks 9-10 | Update phase + skill template instructions |
| 6 | Tasks 11-12 | Validation + packaging |

**Total tasks:** 12
**Estimated chunks that can run in parallel:** Chunks 2-5 are independent of each other (they all depend only on Chunk 1). Chunk 6 depends on all previous chunks.

```
Chunk 1 (repo + SKILL.md)
    ├── Chunk 2 (modules + scan) ──────┐
    ├── Chunk 3 (ingest + interview) ──┤
    ├── Chunk 4 (draft + convert) ─────┼── Chunk 6 (validation + packaging)
    └── Chunk 5 (update + templates) ──┘
```
