import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Example: Story = {
  args: {
    name: 'favourite',
  },
};
