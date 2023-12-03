export type TaskStatus = 'active' | 'completed';

export type TaskType = {
  taskName: string;
  status: TaskStatus;
  elapsed_time: number;
  deadline: string | null;
  id: number;
}