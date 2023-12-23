import { useContext, useEffect, useState } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";
import getTask from "../services/indexedDB/getTask";
import updateTaskElapsedTime from "../services/indexedDB/updateTaskElapsedTime";
import convertMsTime from "../helper/convertMsTime";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { TaskType } from "../types/TaskType";

const TaskTimer = () => {
  const {isRunning, setIsRunning, currentTaskId, setCurrentTaskId, elapsedTime, setElapsedTime} = useContext(TaskTimerContext);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [currentTaskName, setCurrentTaskName] = useState<string>("");
  const {setIsTaskListUpdated} = useContext(TaskListUpdatedContext);


  const handlePause = (taskId: number, time: number) => {
    updateTaskElapsedTime(taskId, time);
    setCurrentTaskId(null);
    setIsRunning(false);
    setIsTaskListUpdated(true);
  }

  useEffect(() => {
    if(isRunning && currentTask) {
      const interval = setInterval(() => {
        if(currentTask.start_at !== null){
          setElapsedTime(Date.now() - currentTask.start_at + currentTask.elapsed_time);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTask, isRunning, setElapsedTime]);

  useEffect(() => {
    const getTaskInfo = (taskId: number) => {
      (async () => {
        try {
          const task = await getTask(taskId);
          setCurrentTask(task);
          setCurrentTaskName(task.taskName);
          setElapsedTime(task.elapsed_time);
        } catch (err) {
          console.error(err);
        }
      })();
    }
    
    if(currentTaskId) {
      getTaskInfo(currentTaskId);      
    }
  }, [currentTaskId, setElapsedTime]);

  return (
    <Box>
      <Flex align="center" justify='space-between'>
        <Text>{currentTaskName ? (currentTaskName) : ("タスクを選択して計測を開始")}</Text>
        <Flex align="center" gap={3}>
          <Text>{convertMsTime(elapsedTime)}</Text>
          {isRunning && currentTaskId && (<Button onClick={() => handlePause(currentTaskId, elapsedTime)}>Pause</Button>)}
        </Flex>
      </Flex>
    </Box>
  )
}

export default TaskTimer;
