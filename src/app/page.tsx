'use client'
import { useState } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function Home() {
  const [isTaskListUpdated, setIsTaskListUpdated] = useState(false);
  
  return (
    <>
      <TaskForm onSetTask={setIsTaskListUpdated}/>
      <TaskList onTaskListUpdated={isTaskListUpdated} updateState={setIsTaskListUpdated} />
    </>
  )
}
