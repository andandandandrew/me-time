<!-- 244f13d4-d14f-48a8-8f99-d434075c9010 3e16cd8f-02f5-4fb9-8206-b7aa7e0387e5 -->
# Design System Foundation Setup

## Overview

Set up a React TypeScript design system foundation using Vite with Figma MCP server integration and Code Connect. Configure global CSS variables for light/dark mode support, create the project structure, and set up necessary tooling.

## Project Setup

1. **Initialize Vite React TypeScript project**

- Create `package.json` with Vite, React, TypeScript dependencies
- Set up `tsconfig.json` with appropriate React settings
- Configure `vite.config.ts` for the project
- Create base HTML entry point

2. **Create directory structure**

- `src/design-system/` - main directory for design system components
- `src/styles/` - for global CSS files
- Standard React app structure (`src/App.tsx`, etc.)

3. **Global CSS Variables Setup**

- Create `src/styles/global.css` with CSS variable definitions
- Set up light mode and dark mode variable sets
- Configure `:root` for light mode variables
- Configure `[data-theme="dark"]` or `.dark` class for dark mode variables
- Extract initial variables from Figma (https://www.figma.com/design/0oCn02dTg2qWGiC1pADaws/andrew-ds-1?node-id=0-1&m=dev)
- Note: Variables should match Figma variable names/structure

4. **Theme System**

- Create utility for theme switching (light/dark)
- Set up CSS variable access in components
- Ensure theme persistence (localStorage) if needed

5. **Figma Integration Setup**

- Configure Figma MCP server connection (documentation/notes)
- Set up Code Connect configuration files:
- `.codeconnect/` directory structure
- Code Connect manifest/config if needed
- Create documentation on how to connect components to Figma

6. **Base Files**

- Create `src/App.tsx` as entry point
- Create `src/main.tsx` for React entry
- Create `src/vite-env.d.ts` for Vite types
- Set up proper TypeScript types for design system usage

7. **Component CSS Template**

- Document pattern for component CSS files in `design-system/`
- Show example of how components will reference global CSS variables

## Files to Create

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/vite-env.d.ts`
- `src/styles/global.css`
- `.codeconnect/` directory structure (if needed)
- `README.md` with setup instructions

## Notes

- No actual components will be created yet (foundation only)
- CSS variables will need to be synced with Figma variables during setup
- Figma file connection details will be needed for variable extraction

## Decisions (Variables & Component Patterns)

- VARIABLES_PATTERN
  - Three-layer tokens:
    - color_root: `--root-*` tokens (no modes), mirroring Figma color scales (e.g., `--root-gray-50..950`, `--root-green-300..700`, `--root-base-white`, `--root-base-black`)
    - Aliases (semantic): `--background-surface-1/2`, `--content-default`, `--stroke-default`, `--disabled-*`
    - Component tokens: `--button-primary-{bg,bg-hover,bg-press,content}`
  - Mode policy: override aliases under `[data-theme="dark"]`; override component tokens per-mode when required; color_root has no modes
  - Global CSS uses aliases for base styles and component tokens for examples

- COMPONENT_PATTERN
  - Each component has its own `.css` and `.tsx` files under `src/design-system/<ComponentName>/`
  - CSS uses nested selectors (Sass-style) for variants and states
  - Components consume semantic aliases and component tokens; never hardcode values
  - Class naming for themes/variants follows `--<component>-<theme>-<attribute>[-<modifier>]`

## Storybook

1. Add Storybook for React + Vite + TypeScript
   - Packages: `storybook`, `@storybook/react-vite`, `@storybook/addon-essentials`
   - Config files:
     - `.storybook/main.ts` (framework: `@storybook/react-vite`, stories glob, addons)
     - `.storybook/preview.ts` (global parameters)
   - Scripts in `package.json`:
     - `storybook`: `storybook dev -p 6006`
     - `build-storybook`: `storybook build`

2. Authoring rule
   - When creating any design system component, also create a matching story file:
     - `src/design-system/<ComponentName>/<ComponentName>.stories.tsx`
     - Stories must demonstrate variants, sizes, states, and theming (light/dark)