'use client'
import { useState } from 'react';
import TaskForm from '../app/components/TaskForm'
import TaskList from '../app/components/TaskList'
import TaskTimer from '../app/components/TaskTimer';
import { TaskListUpdatedContext } from '../app/context/TaskListUpdatedContext';
import { TaskTimerContext } from '../app/context/TaskTimerContextType';
import { Container, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { TaskType } from '@/app/types/TaskType';

export default function Home() {
  const [isTaskListUpdated, setIsTaskListUpdated] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <TaskListUpdatedContext.Provider value={{isTaskListUpdated, setIsTaskListUpdated}}>
      <TaskTimerContext.Provider value={{currentTask, setCurrentTask, isRunning, setIsRunning, elapsedTime, setElapsedTime}}>
        <Container>
          <IconButton onClick={toggleColorMode} aria-label='Toggle dark mode' icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon /> } />
          <TaskTimer />
          <TaskForm />
          <TaskList />
        </Container>
      </TaskTimerContext.Provider>
    </TaskListUpdatedContext.Provider>
  )
}
