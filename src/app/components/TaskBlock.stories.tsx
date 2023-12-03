import type { Meta, StoryObj } from '@storybook/react';
import {Task} from './fixture'
import TaskBlock from './TaskBlock';

const meta: Meta<typeof TaskBlock> = {
  title: 'TaskBlock',
  component: TaskBlock,
}

export default meta;
type Story = StoryObj<typeof TaskBlock>;

export const Primary: Story = {
  args: {
    task: Task
  }
}