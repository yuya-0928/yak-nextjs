export enum TaskStatus {
  Active = 'Active',
  Completed = 'Completed',
}

export type TaskType = {
  taskName: string;
  status: TaskStatus;
  id: number;
}