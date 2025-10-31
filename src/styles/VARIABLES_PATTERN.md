# Variables Pattern

This document defines how CSS variables are structured in `src/styles/global.css` to align with Figma variables and support light/dark modes.
.
## Layers of Variables

1. color_root (base color tokens)
- Direct mappings to Figma collection `color_root`
- This collection features color scales, organized in a tailwind fashion per color family (ex. green-50, green-100, green-200, etc)
- These color variables are meant to be aliased into the semantic collections, not typically used directly
- No color modes or themes associated with this collection
- Examples: `--root-green-500`, `--root-base-white`

2. Aliases (semantic tokens)
- Human-readable tokens consumed by system styles, and components
- Direct references and aliased into themes and components
- References color_root token collection
- Supports color modes and themes
- Examples: `--content-default`, `--background-surface-1`

3. Component tokens (component-level)
- Variables a component consumes; reference aliases or color_root
- Think in terms of themes, with like minded variables authored together `--<component>-<theme>-<attribute>-<optional_modifier>`
- Examples: `--button-primary-bg`, `--button-primary-bg-hover`, `--button-primary-content`

## Mode Structure

- Light mode (default): `:root`
- Dark mode: primarily override alias (semantic) tokens under `[data-theme="dark"]`. Component tokens may also be overridden per mode when a component theme requires it.
- color_root has no modes; it remains constant across themes.

```css
:root {
  /* color_root base (no modes) */
  --root-base-white: #ffffff;
  --root-base-black: #171717;
  --root-gray-100: #f3f4f6;
  --root-gray-300: #d1d5db;
  --root-gray-500: #6b7280;
  --root-gray-950: #0a0a0a;
  --root-green-300: #6ee7b7;
  --root-green-400: #34d399;
  --root-green-500: #10b981;
  --root-green-600: #0e8b55;
  --root-green-700: #095d39;

  /* aliases (semantic) */
  --background-surface-1: var(--root-base-white);
  --background-surface-2: var(--root-gray-100);
  --content-default: var(--root-gray-950);
  --stroke-default: var(--root-gray-300);
  --disabled-background: var(--root-gray-500);
  --disabled-content: var(--root-gray-300);

  /* component tokens (reference aliases or root scales) */
  --button-primary-bg: var(--root-green-500);
  --button-primary-bg-hover: var(--root-green-600);
  --button-primary-bg-press: var(--root-green-700);
  --button-primary-content: var(--content-default);
}

[data-theme="dark"] {
  /* override aliases (and optionally component tokens for theme needs) */
  --content-default: var(--root-base-white);
  --background-surface-1: var(--root-base-black);

  /* Example: adjust component theme in dark mode */
  --button-primary-bg: var(--root-green-300);
  --button-primary-bg-hover: var(--root-green-400);
  --button-primary-bg-press: var(--root-green-500);
  --button-primary-content: var(--content-default);
}
```

## Naming Conventions

- kebab-case with prefixes
  - color_root: `--root-*` (family-scale, e.g., `--root-green-600`)
  - aliases: semantic names without component prefixes (e.g., `--content-default`)
  - component: `--<component>-<theme>-<attribute>[-<modifier>]` (e.g., `--button-primary-bg`, `--button-primary-bg-hover`)
- Keep names aligned with Figma variable names/scales where possible

## Referencing Rules

- Never hardcode values in components; always reference variables
- Prefer aliases in components; use color_root only when needed
- Keep spacing, radius, typography as separate semantic groups (`--spacing-*`, `--radius-*`, `--text-size-*`)
- Component styles use CSS Modules (`*.module.css`) and can reference global variables defined in `src/styles/global.css`
- Storybook imports `global.css` in `.storybook/preview.ts` so tokens are available during stories

## Example Consumption

```css
/* Button.css */
.button {
  color: var(--button-primary-content);
  background-color: var(--button-primary-bg);
}
.button:hover { background-color: var(--button-primary-bg-hover); }
.button:active { background-color: var(--button-primary-bg-press); }
```

## Syncing With Figma

- Update color_root values from Figma when tokens change (no modes)
- Maintain aliases for each mode; override aliases in `[data-theme="dark"]` as needed
- Keep aliases/component tokens as references; do not replace with literals

## Dark Mode Policy

- Toggle via `data-theme="dark"` on `document.documentElement`
- Typography, spacing, radius usually identical across modes (unless Figma defines otherwise)

## Notes

- Follow nested selectors in component CSS and avoid inline styles
- Add new variables exclusively in `global.css`
