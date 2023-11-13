import { createContext } from "react";

type TaskListUpdatedContextType = {
  isTaskListUpdated: boolean,
  setIsTaskListUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskListUpdatedContext = createContext<TaskListUpdatedContextType>({isTaskListUpdated: false,
  setIsTaskListUpdated: ()=> { console.warn('setIsTaskListUpdated was called without a context provider'); }});