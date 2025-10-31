import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'default' | 'small';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export type DSButtonProps = CommonProps & (AnchorProps | NativeButtonProps);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, DSButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      fullWidth = false,
      className = '',
      children,
      as = 'button',
      ...rest
    },
    ref
  ) => {
    const composed = [
      styles.button,
      variant && styles[variant],
      size && styles[`size-${size}`],
      fullWidth ? styles['full-width'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (as === 'a') {
      const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={composed} {...anchorProps}>
          {children}
        </a>
      );
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={composed} {...buttonProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
