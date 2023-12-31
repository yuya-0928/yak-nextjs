import type { Meta, StoryObj } from '@storybook/react';
import TaskList from './TaskList';

const meta: Meta<typeof TaskList> = {
  title: 'TaskList',
  component: TaskList,
}

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Primary: Story = {
}