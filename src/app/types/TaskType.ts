export type TaskStatus = 'active' | 'completed';

export type TaskType = {
  taskName: string;
  status: TaskStatus;
  elapsedTime: number;
  deadline: string | null;
  id: number;
  isDeleted: number;
  isCurrentDoing: number;
}