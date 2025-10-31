# Component Pattern Documentation

This document outlines the pattern for creating new design system components.

## File Structure

Each component should follow this structure:

```
src/design-system/
  ComponentName/
    ComponentName.tsx
    ComponentName.module.css
    ComponentName.stories.tsx
```

### File Naming

- **Component file**: `ComponentName.tsx` (PascalCase)
- **Styles file**: `ComponentName.module.css` (must use `.module.css` extension for CSS Modules)
- **Storybook file**: `ComponentName.stories.tsx` (required for all design system components)

## CSS Modules

All component styles use **CSS Modules** for scoped styling. This provides:
- Automatic class name scoping (prevents style collisions)
- Type-safe class references in TypeScript
- Ability to reference global CSS variables from `src/styles/global.css`

### Importing CSS Modules

```typescript
import styles from './ComponentName.module.css';
```

### Using CSS Module Classes

Classes are accessed via the `styles` object, which provides type-safe access to your CSS classes:

```typescript
className={styles.button} // ✅ Correct
className="button"        // ❌ Won't work (class is scoped)
```

For dynamic classes, use bracket notation:

```typescript
className={styles[variant]}              // Dynamic class name
className={styles[`size-${size}`]}       // Template literal class name
className={styles['full-width']}          // Kebab-case class names
```

### Composing Multiple Classes

When combining CSS Module classes with additional classes:

```typescript
const composed = [
  styles.button,
  styles[variant],
  styles[`size-${size}`],
  className, // Additional classes passed via props
].filter(Boolean).join(' ');
```

## TypeScript Component Pattern

```typescript
// src/design-system/ComponentName/ComponentName.tsx
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // Define props here
  children?: React.ReactNode;
  className?: string;
}

export const ComponentName = ({ children, className = '', ...props }: ComponentNameProps) => {
  const composed = [styles.componentName, className].filter(Boolean).join(' ');
  return (
    <div className={composed} {...props}>
      {children}
    </div>
  );
};
```

## CSS Pattern

```css
/* src/design-system/ComponentName/ComponentName.module.css */

.componentName {
  /* Use global CSS variables */
  color: var(--content-default);
  background-color: var(--background-surface-1);
  font-family: var(--font-family-default);
  font-size: var(--text-size-default-font-size);
  line-height: var(--text-size-default-line-height);
  padding: var(--spacing-default);
  border-radius: var(--radius-default);
  
  /* Component-specific styles */
  /* ... */
}

/* Variants using nested selectors (CSS Modules + PostCSS nesting) */
.componentName {
  &.variant-primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-content);

    &:hover {
      background-color: var(--button-primary-bg-hover);
    }
  }

  /* Size variants */
  &.size-small {
    height: var(--interactive-height-small);
  }

  &.size-default {
    height: var(--interactive-height-default);
  }
}
```

## Best Practices

1. **Always use global CSS variables** - Never hardcode colors, spacing, or typography values
2. **Use CSS Modules** - All component styles must use `.module.css` extension
3. **Separate CSS files** - Each component should have its own CSS Module file
4. **Use nested selectors** - For variants, use nested selectors with `&` instead of separate classes (enabled by PostCSS nesting)
5. **Theme support** - Components automatically support light/dark mode through CSS variables
6. **TypeScript types** - Define proper interfaces for all component props
7. **Storybook stories** - Every component must have a `.stories.tsx` file demonstrating all variants and states

## Storybook

Every design system component must include a Storybook story file. Stories demonstrate component variants, sizes, states, and theming.

### Story File Location

Stories should be co-located with their component:

```
src/design-system/ComponentName/ComponentName.stories.tsx
```

### Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import ComponentName from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Design System/ComponentName',
  component: ComponentName,
  argTypes: {
    // Define controls for props
    variant: { control: { type: 'inline-radio' }, options: ['primary', 'ghost'] },
    size: { control: { type: 'inline-radio' }, options: ['default', 'small'] },
  },
  args: {
    // Default args
    variant: 'primary',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// Individual stories
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const DarkMode: Story = {
  render: (args) => {
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      return () => document.documentElement.removeAttribute('data-theme');
    }, []);
    return <ComponentName {...args} />;
  },
};
```

### Story Requirements

- **Variants**: Show all component variants (primary, ghost, etc.)
- **Sizes**: Demonstrate all size options
- **States**: Include disabled, loading, error states if applicable
- **Dark mode**: At least one story demonstrating dark mode support
- **Interactions**: Use Storybook controls for interactive testing

### Running Storybook

```bash
npm run storybook
```

Storybook automatically imports `src/styles/global.css` via `.storybook/preview.ts`, ensuring all global CSS variables are available in stories.

## Example: Button Component

```typescript
// src/design-system/Button/Button.tsx
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'small';
  fullWidth?: boolean;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'default',
  fullWidth = false,
  className = '',
  children,
  ...props 
}: ButtonProps) => {
  const composed = [
    styles.button,
    styles[variant],
    styles[`size-${size}`],
    fullWidth ? styles['full-width'] : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={composed} {...props}>
      {children}
    </button>
  );
};
```

```css
/* src/design-system/Button/Button.module.css */

/* base, shared styles */
.button {
  font-family: var(--font-family-default);
  font-size: var(--text-size-default-font-size);
  line-height: var(--text-size-default-line-height);
  border-radius: var(--radius-default);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* sizes */
.button {
  &.size-default {
    height: var(--interactive-height-default);
    padding: 0 calc(var(--spacing-default) * 1.6);
  }

  &.size-small {
    height: var(--interactive-height-small);
    padding: 0 calc(var(--spacing-default) * 1.2);
  }
}

/* variant themes */
.button {
  &.primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-content);

    &:hover {
      background-color: var(--button-primary-bg-hover);
    }

    &:active {
      background-color: var(--button-primary-bg-press);
    }
  }

  :disabled {
    background-color: var(--disabled-background);
    color: var(--disabled-content);
    cursor: not-allowed;
  }
}
```

