import {createContext} from "react";
import { TaskType } from "../types/TaskType";

type TaskTimerContextType = {
  currentTask: TaskType | null,
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | null>>,
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
}

export const TaskTimerContext = createContext<TaskTimerContextType>({
  currentTask: null,
  setCurrentTask: ()=> { console.warn('setCurrentTask was called without a context provider'); },
  isRunning: false,
  setIsRunning: ()=> { console.warn('setIsRunning was called without a context provider'); },
  elapsedTime: 0,
  setElapsedTime: ()=> { console.warn('setElapsedTime was called without a context provider'); }
});