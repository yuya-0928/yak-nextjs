import type { Meta, StoryObj } from '@storybook/react';
import {Task} from './fixture'
import TaskForm from './TaskForm';

const meta: Meta<typeof TaskForm> = {
  title: 'TaskForm',
  component: TaskForm,
}

export default meta;
type Story = StoryObj<typeof TaskForm>;

export const Primary: Story = {
}