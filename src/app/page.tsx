'use client'
import { useState } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { TaskListUpdatedContext } from './context/TaskListUpdatedContext';

export default function Home() {
  const [isTaskListUpdated, setIsTaskListUpdated] = useState(false);
  
  return (
    <TaskListUpdatedContext.Provider value={{isTaskListUpdated, setIsTaskListUpdated}}>
      <TaskForm />
      <TaskList />
    </TaskListUpdatedContext.Provider>
  )
}
