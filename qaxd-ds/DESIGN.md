# Design System — QAX (奇安信)

> Category: Enterprise Security / B2B Collaboration
> Cybersecurity operations. Dark-mode-first, high-contrast angular surfaces, PingFang SC, data-dense command centers.

## 1. Visual Theme & Atmosphere

QAX's interface language is a precision operations system built for security analysts navigating high-stakes threat landscapes. The visual tone is engineered for sustained focus: deep dark canvases absorb visual fatigue, high-contrast foreground elements cut through information density, and angular geometry reinforces a sense of structural authority. The interface is designed to feel like a command center — calm under pressure, ruthlessly efficient, and always in control.

Across the two analyzed page surfaces, the system operates in two distinct but unified modes. The **dark operations mode** (dashboard, threat monitoring, security posture) uses a deep midnight canvas (`#0c0f20`) with translucent layered cards and luminous accent signals — the primary environment for security analysts in extended operational sessions. The **light administration mode** (asset management, configuration, collaborative workflows) uses clean white surfaces with restrained gray borders and compact utility controls — suited for routine management and cross-team coordination. Both modes share identical typography, spacing rhythm, and component DNA, differentiated only by surface and contrast polarity.

Typography is the backbone of information hierarchy. PingFang SC carries the entire interface with a tightly calibrated seven-tier size ladder — from 32px page titles down to 12px body text and micro labels. Numeric data receives special treatment: DIN Alternate renders dashboard KPIs with mechanical precision, while `tabular-nums` ensures columnar alignment in tables and charts. The weight ladder is deliberately restrained — 400 for body, 700 for emphasis — avoiding visual noise in data-rich environments.

**Key Characteristics:**
- Binary surface polarity: deep dark operation canvases (`#0c0f20`, `#16181C`) versus clean light administration surfaces (`#ffffff`, `#F3F3F4`)
- Single blue accent family for action, navigation, and security-status semantics (`#105CF4` Light / `#3676F6` Dark)
- Dual operating modes in one system: dark operations command center and light administration utility surfaces
- High information density as default; whitespace is functional, never decorative
- Angular geometry language with minimal radius (2px–8px), reinforcing precision and authority
- Tight typographic metrics (PingFang SC, 12px–32px range) optimized for vertical data scanning
- Four-tier radius system (2px→4px→6px→8px) mapping to content→wrapper→container→outer hierarchy
- Depth through translucency stepping and fill-opacity layers rather than heavy shadow stacking
- Security-domain color vocabulary: threat levels, attack states, and task statuses as first-class palette citizens

## 2. Color Palette & Roles

> **Source:** `resource/tokens/variables/_colors.scss` (SSOT). All hex values below are Light-mode defaults unless noted; Dark-mode values are mapped automatically via `[data-theme='dark']`.

### Primary
- **Brand Blue** (`#105CF4` / Dark: `#3676F6`): Primary action fill, active navigation, focus signaling, and security-status accent. The anchor of the entire color system.
- **Near-Black Ink** (`#1E2127` / Dark: `#F6F6F7`): Primary text on light surfaces; reverses to high-luminance text on dark surfaces.
- **Sunken Gray** (`#F3F3F4` / Dark: `#16181C`): Secondary background for content wells, table headers, and sunken containers.

### Secondary & Accent
- **Accent Hover** (`#3A79F6` / Dark: `#6194F8`): Hover-state lightening of brand blue for interactive feedback.
- **Accent Active** (`#0A4ACA` / Dark: `#3A79F6`): Active/pressed-state deepening of brand blue.
- **Accent Fill** (`#E8F0FF` / Dark: `#011A4D`): Tinted background fill for accent-context containers and selected-row highlights.
- **Link Blue** (`#1082F4` / Dark: `#3696F6`): Inline link color distinct from action blue, optimized for clickable text within dense data tables.

### Surface & Background
- **Pure White** (`#FFFFFF` / Dark: `#20242A`): Primary background for light-mode pages; dark-mode base surface.
- **Elevated Surface** (`#FFFFFF` / Dark: `#373C47`): Cards, modals, and raised containers above the base plane.
- **Overlay Surface** (`#FFFFFF` / Dark: `#292D35`): Drawer and overlay context layers.
- **Accent Background** (`#F8F8F9` / Dark: `rgba(246,246,247,0.06)`): Subtle tinted background for header bars and grouped content zones.
- **Mask** (`rgba(30,33,39,0.5)` / Dark: `rgba(22,24,28,0.5)`): Semi-transparent overlay for modal and drawer backdrops.

### Neutrals & Text
- **Secondary Text** (`#292D35` / Dark: `#DDDFE3`): Body copy and standard content text.
- **Tertiary Text** (`#6D7585` / Dark: `#A6ABB4`): Helper descriptions, metadata, and de-emphasized labels.
- **Quaternary Text** (`rgba(168,173,182,0.65)` / Dark: `rgba(246,246,247,0.35)`): Placeholder text and disabled-state content.
- **Primary Border** (`#C8CBD1` / Dark: `rgba(246,246,247,0.2)`): Control outlines and input field borders.
- **Secondary Border** (`#ECEDEF` / Dark: `rgba(246,246,247,0.1)`): Container dividers and card separators.
- **Fill Hover** (`#ECEDEF` / Dark: `rgba(246,246,247,0.15)`): Row hover and interactive-element background fill.

### Semantic & Status
- **Success** (`#00B82B` / Dark: `#28C64D`): Confirmation, completion, safe-status, and security-passed indicators.
- **Warning** (`#F48210` / Dark: `#F69636`): Caution, pending action, and medium-severity alert states.
- **Danger** (`#F42738` / Dark: `#F74D5B`): Critical alerts, destructive actions, and high-severity threat indicators.
- **Info** (`#1082F4` / Dark: `#3696F6`): Neutral informational notices and objective status signals.

### Security-Domain State Colors
- **Threat Critical** (`#A00D19` / Dark: `#A01420`): Imminent threat requiring immediate response.
- **Threat High** (`#F42738` / Dark: `#F74D5B`): High-severity security findings.
- **Threat Medium** (`#F48210` / Dark: `#F69636`): Moderate-risk indicators.
- **Threat Low** (`#F4CB00` / Dark: `#F6D531`): Low-severity observations.
- **Threat Security** (`#00B82B` / Dark: `#28C64D`): Verified-safe status.
- **Threat Unknown** (`#A8ADB6` / Dark: `#6F7787`): Unclassifiable or pending-analysis state.

### Data Visualization Palette
- An 18-color perceptually uniform categorical palette (`--color-data-1` through `--color-data-18`) reserved exclusively for charts and data visualizations. Must never be used in UI chrome or interactive components.

### Gradient System
- Gradients are used sparingly and purposefully. Dark-mode cards employ subtle directional gradients (`linear-gradient(135deg, rgba(246,246,247,0.04) → rgba(246,246,247,0.02))`) to differentiate card surfaces from the base canvas without introducing opaque borders. Light mode relies on solid surfaces and border-led containment rather than gradients.

## 3. Typography Rules

### Font Family
- **Primary Family:** `PingFang SC`, fallbacks `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`
- **Numeric Display:** `DIN Alternate`, fallbacks `"Helvetica Neue", sans-serif` — reserved for dashboard KPI values, large-format counters, and data-monitoring numerics.
- **Usage Split:** PingFang SC handles all interface text including headings, labels, body copy, and micro text. DIN Alternate is applied only to standalone numeric displays where mechanical precision and vertical proportion are paramount.

### Hierarchy
| Role | Size | Weight | Line Height | Token | Notes |
|------|------|--------|-------------|-------|-------|
| Heading 1 | 32px | 700 | 40px | `--font-size-heading-1` | Page-level titles, top-level section names |
| Heading 2 | 28px | 700 | 36px | `--font-size-heading-2` | Module titles, dialog headers |
| Heading 3 | 24px | 700 | 32px | `--font-size-heading-3` | Sub-module headings, card titles |
| Heading 4 | 20px | 700 | 28px | `--font-size-heading-4` | Container titles, section sub-headings |
| Heading 5 | 16px | 700 | 24px | `--font-size-heading-5` | Small titles, sidebar section names |
| Heading 6 | 14px | 700 | 22px | `--font-size-heading-6` | Sidebar items, guiding labels |
| Body | 12px | 400 | 20px | `--font-size-body` | Standard body text, table content, form labels |
| KPI Numeric | 24px | 500 | — | DIN Alternate | Dashboard metric values, counter displays |
| Table Header | 12px | 400 | — | Body token | Column headers in data tables |
| Micro Label | 12px | 400–600 | — | Body token | Status badges, tags, pagination, fine print |

### Principles
- **Hierarchy through size and weight:** The seven-tier size ladder combined with a two-weight system (400/700) creates clear visual stratification without requiring intermediate weights that add noise.
- **Readability in density:** Body text at 12px with 20px line-height maintains legibility even in tightly packed data tables and configuration forms typical of security operations.
- **Numeric alignment:** All tabular data, counters, and dashboard metrics must declare `font-variant-numeric: tabular-nums` to ensure columnar alignment across varying digit widths.
- **Restrained weight palette:** 200 (thin) appears only in decorative or de-emphasized contexts; 400 carries the informational load; 700 marks structural emphasis. No 500/600 weights to prevent visual ambiguity.

### Note on Font Substitutes
- Closest freely available substitutes: `Inter` for body-heavy implementation and `Noto Sans SC` for CJK coverage.
- When substituting for PingFang SC, increase line-height by +2px on body sizes to compensate for tighter CJK metrics.
- DIN Alternate substitutes: `Roboto Mono` or `JetBrains Mono` for numeric displays, though letter-spacing should be reduced by -0.5px to approximate DIN's compact proportion.

## 4. Component Stylings

### Buttons
- **Primary Fill Action:** `--color-accent` (`#105CF4`) background, `--color-accent-foreground` (`#FFFFFF`) text, `--radius-wrapper` (4px) radius. Used for primary CTAs and decisive actions (create task, confirm, execute scan).
- **Default Outline Action:** `--color-background` fill with `--color-border-primary` border, `--color-text-primary` text, 4px radius. Standard secondary operations.
- **Text Action:** No background or border, `--color-text-primary` text. Low-priority inline operations in tables and lists.
- **Dashed Action:** Dashed `--color-border-secondary` border, transparent fill. Guiding add/import placeholder actions.
- **Ghost Action:** Transparent background with `--color-accent` border and text. Used on dark or colored backgrounds where fill buttons would overwhelm.
- **Danger Action:** `--color-danger` fill or text variant for destructive and irreversible operations (delete, disconnect, force-terminate).
- **Size Ladder:** Medium (40px height, 16px padding), Small (32px, 12px padding), Mini (24px, 8px padding). All use 14px font except Mini at 12px.
- **Button Group:** Zero-gap concatenation with `margin-left: -1px` border overlap; first/last buttons retain outer-side radius only (4px), middle buttons have 0 radius.

### Cards & Containers
- **Dark-Mode Operation Cards:** Gradient glass-surface treatment (`linear-gradient(135deg, rgba(246,246,247,0.04) → 0.02)`) with `rgba(246,246,247,0.06)` border and `--radius-outer` (8px). Hover state shifts border to `rgba(60,126,255,0.3)` with accent-tinted shadow.
- **Light-Mode Administration Cards:** Solid `#FFFFFF` fill with `--color-border-secondary` (`#ECEDEF`) 1px border and 8px radius. Row hover uses `--color-fill-hover`.
- **KPI Metric Cards:** Compact 88px-height containers in dark mode featuring gradient fill, 56px circular icon indicators (blue/teal/purple/sky variants), and DIN Alternate numeric values at 24px.
- **Template/Feature Cards:** 164px-height vertical card with body/footer split; footer uses top-border separation with dual action links. Active state indicated by accent border highlight.

### Inputs & Forms
- **Standard Input Fields:** `--color-background` fill, `--color-border-primary` border, 4px radius, 32px default height. Focus transitions border to `--color-accent-focus` with subtle glow.
- **Size Hierarchy:** Large (40px), Default (32px), Small (24px). Form containers propagate `size` attribute to all child inputs — mixed sizes within a single form are prohibited.
- **Label Alignment:** Right-aligned labels (default) minimize eye travel; left-aligned for wide-label variance; top-aligned for mobile and guided flows.
- **Select Dropdowns:** Popover background via `--color-background-elevated`, selected items highlighted with `--color-accent` text. Multi-select tags rendered 6–8px shorter than input height.
- **Validation:** Error states use `--color-danger` border with inline error text; feedback triggers on blur event.

### Navigation
- **Sidebar Navigation (NavMenu):** Fixed 216px width (64px collapsed), 56px logo area, 40px menu-item height. Active item: `--color-accent` fill with white text/icon. Hover: `--color-fill-hover` with 4px radius. Multi-level: nested sub-menus use `--color-background-sunken` for depth differentiation.
- **Breadcrumb Navigation:** Compact 24px-height top bar with tertiary-text icons and secondary-text labels.
- **Table Header Navigation:** Sort-enabled columns with inline sort indicators; section headers with action links or compact accent-border button clusters.

### Image Treatment
- **Icon-First UI:** SVG line icons (16px standard, 14px in navigation) as the primary visual language — photography is secondary in security operations interfaces.
- **Geometric Logo Mark:** The QAX brand mark uses a four-quadrant angular composition in brand blue (`#3d53f7`/`#5fafff`), emphasizing structure and precision.
- **Status Dot Language:** 8px circular indicators (`status-dot`) with semantic colors for task states — pending (orange), running (blue), done (green), failed (red), cancelled (gray).

### Other Distinctive Components
- **Progress Bars:** 61px×6px track with `rgba(246,246,247,0.2)` background and accent-blue fill, accompanied by percentage text label.
- **Host Statistics Bars:** Multi-segment horizontal bar (168px×6px, 1px radius) showing green/red/orange distribution for security scan results.
- **Switch Toggle:** 28px×16px capsule with 12px circular thumb; off-state uses `rgba(246,246,247,0.2)` track, on-state uses `--color-accent` fill.
- **Pagination:** 32px×32px square page buttons with 4px radius and 1px border; active page uses accent fill; includes ellipsis collapse and goto-input field.
- **Status Badges:** Inline badge with 8px status dot + text label; tag-style badges with tinted background (e.g., `rgba(60,126,255,0.1)` for blue tags, `rgba(40,198,77,0.1)` for green).
- **Icon System:** `@store.bizicon/skyeye-qgpt` (270+ icons, Vue component with `i-` prefix), four rendering styles (outline/filled/twoTone/multiColor), with security-domain categories including attack paths, threat actors, and operational workflows.

## 5. Layout Principles

### Spacing System
- Base unit is `8px`, enforced through five named spacing tokens.
- Token ladder: `--spacing-compact` (4px), `--spacing-standard` (8px), `--spacing-loose` (16px), `--spacing-wide` (24px), `--spacing-vast` (32px).
- 4px auxiliary step permitted for centering and precise alignment, but all structural spacing must align to 8px multiples.
- Proximity principle: related elements use smaller tokens (icon-to-text: 4–8px); unrelated modules use larger tokens (card-to-card: 16–24px).

### Grid & Container
- **24-column grid system** with 16px gutter width that must not be compressed.
- **Layout anchor constants:** `--layout-header-height` (56px) and `--layout-sidebar-width` (216px) lock the application frame.
- **Four layout modes:** Top-Bottom (simple single-module), Fixed (centered content with max-width), Left-Right (sidebar + content, most common in B2B), Hybrid (top bar + sidebar for complex architectures).
- Standard design canvas: 1440px width for UI design and review baseline.

### Page Layout Patterns

#### Content-to-Canvas Gutter
- The main content area must maintain a **16px gutter** (`--layout-gutter`) on all four sides (top, right, bottom, left) between the content and the canvas edge (viewport or sidebar boundary).
- This gutter is achieved via `padding: var(--layout-gutter)` on the main content container and must never collapse to zero.

#### Section Header Layout (Table / List / Card Modules)
- **Two-row structure within the section header:**
  - **Row 1:** Section title only (14px, weight 700, `--color-text-secondary`).
  - **Row 2:** Primary action button(s) on the **left** + filter controls on the **right**, both on the same horizontal line (`align-items: center`). Gap between rows: 16px (`--spacing-loose`).
- **Left side (Row 2):** Primary action buttons (create, add, execute) are always placed directly below the section title on the left, never in the top-right corner. This establishes a clear visual reading order: title → action → data.
- **Right side (Row 2):** Filter controls (select dropdowns, search inputs, date pickers) are right-aligned via `margin-left: auto`, occupying the horizontal space opposite the button group.
- **Structure:** The section header uses `flex-direction: column` with a toolbar row that uses `display: flex; align-items: center;`. The toolbar's left group contains button(s); the right group (`margin-left: auto`) contains filter controls. Elements wrap on narrower viewports.

#### KPI Card Grid
- KPI metric cards use a 4-column CSS grid (`grid-template-columns: repeat(4, 1fr)`) with 16px gaps.
- Cards fill available width fluidly; no fixed pixel widths.

#### Table Container
- The table section uses `flex: 1` to fill remaining vertical space after KPI cards and top bar.
- The table body (`table-wrapper`) uses `overflow: auto` with a sticky header (`position: sticky; top: 0`) for vertical scrolling within the card.
- **Table inner padding:** The table must maintain a **16px** (`--spacing-loose`) horizontal padding from its container edges — achieved via `padding: 0 var(--spacing-loose)` on the `.table-wrapper`. This ensures the table content never touches the card boundary.
- **Section header divider line:** The divider line between the section header and the table body must have a **16px** (`--spacing-loose`) inset margin on both left and right sides — achieved via `::after` pseudo-element with `left: var(--spacing-loose); right: var(--spacing-loose)` rather than a full-width `border-bottom`. This visually aligns the divider with the table content edges.
- Table minimum width is 900px; horizontal scroll activates when viewport is narrower.

### Whitespace Philosophy
- **Functional density:** Whitespace exists to separate information groups, not to create editorial breathing room. Security operations interfaces prioritize information density.
- **Consistent spatial rhythm:** Same-level containers use identical spacing tokens in both horizontal and vertical axes.
- **Contrast-led separation:** Dark-mode surfaces rely on fill-opacity stepping and gradient differentiation rather than explicit borders. Light-mode surfaces use border-led containment.

### Border Radius Scale
- **2px** (`--radius-content`): Checkboxes, micro tags, inline status dots — minimal curvature for precision feel.
- **4px** (`--radius-wrapper`): Buttons, inputs, selectors, nav items — standard interactive control geometry.
- **6px** (`--radius-container`): Inner nested modules, sub-cards within larger containers — intermediate nesting layer.
- **8px** (`--radius-outer`): Top-level cards, dialogs, large containers — outermost shell radius.
- **Nesting rule:** Inner radius must be ≤ outer radius; each nesting step reduces by one tier (8→6→4→2).

## 6. Depth & Elevation

| Level | Treatment | Use |
|------|-----------|-----|
| Level 0 | Flat base surfaces (`#FFFFFF`/`#F3F3F4` Light; `#16181C`/`#20242A` Dark) | Page backgrounds, sunken content wells |
| Level 1 | Subtle shadow (`0 1px 2px 0 rgba(30,33,39,0.1)`) | Top navigation bar, default buttons, basic cards |
| Level 2 | Medium shadow (`0 4px 8px 0 rgba(30,33,39,0.1)`) | Hover-elevated cards, dragged elements |
| Level 3 | Prominent shadow (`0 8px 16px 4px rgba(30,33,39,0.1)`) | Dropdown menus, popovers, tooltips |
| Level 4 | Deep shadow (`0 12px 24px 8px rgba(30,33,39,0.1)`) | Dialogs, global notifications, drawers |
| Accessibility | Accent-blue focus ring (`--color-accent-focus`) | Keyboard focus and selection emphasis |

Depth is intentionally restrained and systematic. QAX favors fill-opacity layering in dark mode and border-led containment in light mode over heavy shadow accumulation. Shadow levels map directly to Z-axis physical height — a Level 4 dialog must always visually dominate a Level 2 hover card.

### Decorative Depth
- Dark mode creates depth through translucency stepping: `rgba(246,246,247,0.04)` → `0.06` → `0.08` → `0.1` opacity borders and gradient fills produce subtle surface differentiation without synthetic shadow effects.
- Radial gradient accents (e.g., `radial-gradient(circle, rgba(61,83,247,0.08) 0%, transparent 70%)`) provide atmospheric depth cues in sidebar and navigation contexts.
- Light mode achieves depth primarily through `--color-background-sunken` surface stepping and `--color-border-secondary` containment.

## 7. Do's and Don'ts

### Do
- Use the semantic token system (`--color-accent`, `--color-text-primary`, etc.) as the exclusive color reference; never hardcode hex values.
- Design dark mode first for security operations surfaces; light mode is the derivative variant.
- Enable `font-variant-numeric: tabular-nums` for all tabular data, counters, and dashboard metrics.
- Follow the radius nesting rule: inner elements use smaller radius than their containers (8→6→4→2).
- Maintain the 8px spacing grid; use 4px auxiliary step only for centering and fine alignment.
- Use the security-domain state colors (threat levels, attack results, task statuses) for their designated business contexts.
- Propagate form `size` attributes to child components to ensure visual consistency within data-entry flows.
- Use DIN Alternate for standalone dashboard numerics to maximize data-scanning efficiency.
- Separate dark operations surfaces and light administration surfaces by surface polarity while keeping all other tokens shared.

### Don't
- Don't use primitive palette colors (e.g., `$primitive-brand-3`) directly in component code; always reference semantic tokens.
- Don't mix control sizes within a single form or data-entry group (40px/32px/24px must not coexist in one form).
- Don't introduce rounded or pill-shaped geometries that exceed the 8px maximum radius; this system is angular by design.
- Don't apply data-visualization palette colors (`--color-data-*`) to UI chrome, buttons, or interactive components.
- Don't use decorative gradients on interactive controls; gradients are reserved for dark-mode card surfaces and atmospheric accents.
- Don't compress the 16px gutter width in the 24-column grid under any responsive condition.
- Don't override shadow tokens with arbitrary values; shadow levels must reflect genuine Z-axis hierarchy.
- Don't treat dark and light modes as separate design systems; they share identical typography, spacing, and component DNA.
- Don't use shadow as a primary differentiator in dark mode; use translucency stepping and fill-opacity instead.

## 8. Responsive Behavior

### Fluid Layout Foundation
- All page layouts must be **fully responsive** using `100vw × 100vh` as the viewport basis, never fixed pixel dimensions (e.g., `1440px × 900px`).
- Sidebar width is fixed (`216px` expanded, `64px` collapsed); the main content area fills the remaining width via `flex: 1` with `min-width: 0` to prevent overflow.
- All vertical spacing between sections uses `gap: var(--layout-gutter)` (16px), ensuring consistent rhythm that adapts automatically to content height.
- The table section uses `flex: 1` to absorb all remaining vertical space; KPI cards and top bar use `flex-shrink: 0` to maintain fixed heights.
- Content area uses `overflow-y: auto` for vertical scrolling when content exceeds viewport height; table body uses `overflow: auto` with sticky header for internal scrolling.
- Minimum viewport width: `1024px` (via `min-width` on `body`). Below this threshold, horizontal scroll is permitted rather than further compressing layout.

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| SM (Small) | ≤1280px | Sidebar collapses to 64px icon-only mode; KPI grid shifts to 2×2; filter inputs compress |
| MD (Medium) | 1281–1366px | Full sidebar; KPI grid remains 4-column with reduced padding; filter inputs narrow |
| LG (Default) | 1367–1440px | Design baseline; full layout with standard spacing tokens |
| XL (Extra Large) | ≥1441px | Expanded content area; all components at full padding; comfortable spacing |

### Touch Targets
- All interactive controls maintain minimum 32px hit region (small button height).
- Nav menu items use 40px height with 8px horizontal padding for comfortable targeting.
- Pagination buttons are 32px×32px with 2px margin separation.
- Switch toggles use 28px×16px visual area within a larger implicit touch target.

### Collapsing Strategy
- Sidebar collapses from 216px (expanded with text labels) to 64px (icon-only mode) at SM breakpoint or via user toggle.
- Content area adapts via the 24-column grid with fixed 16px gutters; column count reduces proportionally.
- KPI card rows maintain 4-column grid at LG/XL, may stack to 2×2 at SM/MD.
- Table sections preserve column readability; horizontal scroll activates when columns exceed viewport width.
- Form layouts shift from right-aligned labels (desktop) to top-aligned labels (compact viewports).

### Image Behavior
- SVG icons scale proportionally across breakpoints without quality loss.
- Dashboard charts and data visualizations maintain aspect ratio with responsive container width.
- Logo mark preserves 32px display size at all breakpoints; text title hides in collapsed sidebar mode.
- Status dots and badge indicators maintain fixed pixel sizes regardless of viewport scale.

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary action blue: **Brand Blue** (`#105CF4` Light / `#3676F6` Dark)
- Dark operations canvas: **Midnight** (`#0c0f20` dashboard) / **Charcoal** (`#16181C` system)
- Light administration canvas: **White** (`#FFFFFF`) / **Sunken Gray** (`#F3F3F4`)
- Primary text on light: **Near-Black Ink** (`#1E2127`)
- Primary text on dark: **High-Luminance** (`#F6F6F7`)
- Danger/threat high: **Alert Red** (`#F42738` Light / `#F74D5B` Dark)
- Success/security: **Safe Green** (`#00B82B` Light / `#28C64D` Dark)

### Example Component Prompts
- "Design a QAX dark-mode security dashboard on a midnight canvas (`#0c0f20`) with PingFang SC headings, DIN Alternate KPI values (24px), gradient-glass KPI cards (8px radius, `rgba(246,246,247,0.04)` fill), and accent-blue (`#3676F6`) action indicators."
- "Create a light-mode administration table on white (`#FFFFFF`) with 4px-radius input fields, `#C8CBD1` borders, PingFang SC 12px body text, compact 32px-height controls, and right-aligned form labels."
- "Build a threat-alert list using security-domain state colors: Critical (`#A00D19`), High (`#F42738`), Medium (`#F48210`), Low (`#F4CB00`), with status-dot indicators (8px circles), inline badge tags, and accent-blue action links."
- "Generate a sidebar navigation (216px width, 56px logo area, 40px menu items) with active-state accent fill (`#105CF4`), hover fill (`#ECEDEF`), and collapsed icon-only mode (64px)."
- "Compose a hybrid operations page: dark sidebar navigation → light administration content → dark dashboard widget panel, maintaining shared typography and spacing tokens across all surface modes."

### Iteration Guide
1. Lock the surface polarity first (dark operations vs. light administration) before tuning accent and status colors.
2. Keep accent blue purposeful; in security UI, blue must not compete with threat-level red or status green — reserve it strictly for actions, navigation, and information semantics.
3. Tune typography in this order: body readability (12px), heading hierarchy (14–32px), then numeric displays (DIN Alternate).
4. Apply radius by component class (2px content → 4px control → 6px nested → 8px outer) following the nesting rule strictly.
5. Increase information density deliberately when moving from administration surfaces to operations surfaces.
6. Validate that data-table alignment holds with `tabular-nums` enabled after each typography revision.

### Known Gaps
- Animation and micro-interaction specifications (transition durations, easing curves, loading skeletons) are not yet codified in the token system.
- Responsive behavior below 1280px (tablet and mobile breakpoints) requires further specification for security operations workflows.
- Some interactive micro-states (drag-and-drop feedback, multi-select highlight, inline editing transitions) vary by module and are not represented as universal system tokens.
- Dark-mode gradient card treatments use hardcoded rgba values in preview pages that should be migrated to semantic tokens.
- The icon system's filled, twoTone, and multiColor styles lack formal usage guidelines beyond the default outline mode.
