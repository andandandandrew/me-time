import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import Button, { type ButtonTheme, type ButtonSize } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    theme: {
      control: { type: 'inline-radio' },
      options: ['primary', 'ghost'] satisfies ButtonTheme[],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'small'] satisfies ButtonSize[],
    },
    as: { control: 'inline-radio', options: ['button', 'a'] },
    href: { control: 'text' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    theme: 'primary',
    size: 'default',
    as: 'button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const LightMode: Story = {};

export const DarkMode: Story = {
  render: (args) => {
    useEffect(() => {
      const root = document.documentElement;
      root.setAttribute('data-theme', 'dark');
      return () => root.removeAttribute('data-theme');
    }, []);
    return <Button {...args} />;
  },
};

