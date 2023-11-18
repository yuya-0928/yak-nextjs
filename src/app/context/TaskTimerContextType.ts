import {createContext} from "react";

type TaskTimerContextType = {
  currentTaskId: number | null,
  setCurrentTaskId: React.Dispatch<React.SetStateAction<number | null>>, 
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
}

export const TaskTimerContext = createContext<TaskTimerContextType>({
  currentTaskId: null,
  setCurrentTaskId: ()=> { console.warn('setCurrentTaskName was called without a context provider'); },
  isRunning: false,
  setIsRunning: ()=> { console.warn('setIsRunning was called without a context provider'); },
  elapsedTime: 0,
  setElapsedTime: ()=> { console.warn('setElapsedTime was called without a context provider'); }
});