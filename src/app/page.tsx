'use client'
import { useState } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskTimer from './components/TaskTimer';
import { TaskListUpdatedContext } from './context/TaskListUpdatedContext';
import { TaskTimerContext } from './context/TaskTimerContextType';

export default function Home() {
  const [isTaskListUpdated, setIsTaskListUpdated] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  return (
    <TaskListUpdatedContext.Provider value={{isTaskListUpdated, setIsTaskListUpdated}}>
      <TaskTimerContext.Provider value={{currentTaskId, setCurrentTaskId, isRunning, setIsRunning, elapsedTime, setElapsedTime}}>
        <TaskTimer />
        <TaskForm />
        <TaskList />
      </TaskTimerContext.Provider>
    </TaskListUpdatedContext.Provider>
  )
}
