import React, { forwardRef } from 'react';
import styles from './Button.module.css';
import type { LucideIcon } from 'lucide-react';

export type ButtonTheme = 'primary' | 'ghost';
export type ButtonSize = 'default' | 'small';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type CommonProps = {
  theme?: ButtonTheme;
  size?: ButtonSize;
  icon?: LucideIcon;
};

export type DSButtonProps = CommonProps & (AnchorProps | NativeButtonProps);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, DSButtonProps>(
  (
    {
      theme = 'primary',
      size = 'default',
      className = '',
      children,
      icon: Icon,
      as = 'button',
      ...rest
    },
    ref
  ) => {
    const composed = [
      styles.button,
      theme && styles[theme],
      size && styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconElement = Icon ? (
      <Icon size={16} color="currentColor" strokeWidth={1.5} />
    ) : null;

    if (as === 'a') {
      const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={composed} {...anchorProps}>
          {iconElement}
          {children}
        </a>
      );
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={composed} {...buttonProps}>
        {iconElement}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
