export enum TaskStatus {
  Active = 'active',
  Completed = 'completed',
}

export type TaskType = {
  taskName: string;
  status: TaskStatus;
  id: number;
}