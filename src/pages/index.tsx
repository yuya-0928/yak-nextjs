'use client'
import { useState } from 'react';
import TaskForm from '../app/components/TaskForm'
import TaskList from '../app/components/TaskList'
import TaskTimer from '../app/components/TaskTimer';
import { TaskListUpdatedContext } from '../app/context/TaskListUpdatedContext';
import { TaskTimerContext } from '../app/context/TaskTimerContextType';
import { Button, Container, useColorMode } from '@chakra-ui/react'

export default function Home() {
  const [isTaskListUpdated, setIsTaskListUpdated] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <TaskListUpdatedContext.Provider value={{isTaskListUpdated, setIsTaskListUpdated}}>
      <TaskTimerContext.Provider value={{currentTaskId, setCurrentTaskId, isRunning, setIsRunning, elapsedTime, setElapsedTime}}>
        <Container>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
          <TaskTimer />
          <TaskForm />
          <TaskList />
        </Container>
      </TaskTimerContext.Provider>
    </TaskListUpdatedContext.Provider>
  )
}
