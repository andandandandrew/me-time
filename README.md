# Me Time Design System

A React TypeScript design system built with Vite, integrated with Figma MCP server and Code Connect.

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
  design-system/     # Design system components
  styles/            # Global CSS files
    global.css       # Global CSS variables for light/dark mode
  utils/             # Utility functions
    theme.ts         # Theme management utilities
  App.tsx            # Main app component
  main.tsx           # React entry point
```

## Design System

### CSS Variables

Global CSS variables are defined in `src/styles/global.css` and are synced with Figma design tokens. Variables are available for both light and dark modes.

**Light Mode (Default)**: Variables are defined in `:root`
**Dark Mode**: Variables are defined in `[data-theme="dark"]`

### Component Structure

Each component in `src/design-system/` should:
- Have its own TypeScript file (e.g., `Button.tsx`)
- Have its own CSS file (e.g., `Button.css`)
- Use global CSS variables from `global.css`
- Follow the naming convention: `ComponentName.tsx` and `ComponentName.css`

### Example Component Pattern

```typescript
// src/design-system/Button/Button.tsx
import './Button.css'

export const Button = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  )
}
```

```css
/* src/design-system/Button/Button.css */
.button {
  background-color: var(--color-button-primary-bg);
  color: var(--color-button-primary-content);
  padding: var(--spacing-default);
  border-radius: var(--radius-default);
  height: var(--interactive-height-default);
}
```

## Figma Integration

### MCP Server

The project is set up to work with Figma's MCP server for generating code from Figma designs.

### Code Connect

Code Connect configuration is located in `.codeconnect/`. Components can be mapped to Figma components using Code Connect.

To connect a component:
1. Open the component in Figma
2. Use the Code Connect UI or CLI to map it to your React component

## Theme System

The theme system supports light and dark modes. Theme preferences are:
1. Checked from localStorage (user preference)
2. Fall back to system preference
3. Default to light mode

Theme utilities are available in `src/utils/theme.ts`:
- `initTheme()` - Initialize theme on app load
- `setTheme(theme)` - Set and persist theme
- `getInitialTheme()` - Get initial theme
- `toggleTheme(currentTheme)` - Toggle between themes

## CSS Variables Reference

### Colors
- `--color-content-default`
- `--color-content-disabled`
- `--color-background-surface-1`
- `--color-background-disabled`
- `--color-button-primary-bg`
- `--color-button-primary-bg-hover`
- `--color-button-primary-bg-press`
- `--color-button-primary-content`

### Typography
- `--font-family-default`
- `--text-size-default-font-size`
- `--text-size-default-line-height`
- `--text-size-default-letter-spacing`

### Spacing
- `--spacing-default`

### Radius
- `--radius-default`

### Interactive Heights
- `--interactive-height-default`
- `--interactive-height-small`

## Syncing with Figma

CSS variables should be kept in sync with Figma variables. When variables are updated in Figma:
1. Extract the new variables using Figma MCP server
2. Update `src/styles/global.css` with the new variable definitions
3. Ensure both light and dark mode variants are updated

