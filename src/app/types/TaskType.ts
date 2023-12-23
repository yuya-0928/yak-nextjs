export type TaskStatus = 'active' | 'completed';

export type TaskType = {
  taskName: string;
  status: TaskStatus;
  start_at: number | null;
  elapsed_time: number;
  deadline: string | null;
  id: number;
  isDeleted: number;
  isCurrentDoing: number;
}