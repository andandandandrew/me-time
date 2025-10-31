import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import Button, { type ButtonVariant, type ButtonSize } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['primary', 'ghost'] satisfies ButtonVariant[],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'small'] satisfies ButtonSize[],
    },
    fullWidth: { control: 'boolean' },
    as: { control: 'inline-radio', options: ['button', 'a'] },
    href: { control: 'text' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'default',
    fullWidth: false,
    as: 'button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const AsLink: Story = {
  args: { as: 'a', href: '#', children: 'Link Button' },
};

export const DarkMode: Story = {
  render: (args) => {
    useEffect(() => {
      const root = document.documentElement;
      root.setAttribute('data-theme', 'dark');
      return () => root.removeAttribute('data-theme');
    }, []);
    return <Button {...args} />;
  },
  args: { variant: 'primary', children: 'Dark Button' },
};

