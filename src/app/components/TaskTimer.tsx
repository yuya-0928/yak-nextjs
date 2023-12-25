import { useContext, useEffect, useState } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";
import updateTaskElapsedTime from "../services/indexedDB/updateTaskElapsedTime";
import convertMsTime from "../helper/convertMsTime";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import deleteCurrentTask from "../services/indexedDB/deleteCurrentTask";
import getCurrentTask from "../services/indexedDB/getCurrentTask";
import getTask from "../services/indexedDB/getTask";

const TaskTimer = () => {
  const {isRunning, setIsRunning, currentTask, setCurrentTask} = useContext(TaskTimerContext);
  const [elapsedTime, setElapsedTime]=useState(0);
  const [currentTaskStartedAt, setCurrentTaskStartedAt] = useState<number>(0);
  const {setIsTaskListUpdated} = useContext(TaskListUpdatedContext);

  const handlePause = (taskId: number, time: number) => {
    deleteCurrentTask();
    updateTaskElapsedTime(taskId, time);
    setCurrentTask(null);
    setElapsedTime(0);
    setIsRunning(false);
    setIsTaskListUpdated(true);
  }

  const getCurrentTaskStartedAt = async() => {
    const currentTask = await getCurrentTask();
    if(currentTask){
      setCurrentTaskStartedAt(currentTask.startedAt);
    }
  };
  getCurrentTaskStartedAt();

  useEffect(() => {
    if(isRunning && currentTask) {
      const interval = setInterval(async () => {
        if(currentTaskStartedAt){
          setElapsedTime(Date.now() - currentTaskStartedAt + currentTask.elapsedTime);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTask, currentTaskStartedAt, isRunning, setElapsedTime]);

  useEffect(() => {
    const getCurrentTaskFromDB = async() => {
      const currentTaskInfo = await getCurrentTask();
      if(currentTaskInfo) {
        const currentTask = await getTask(currentTaskInfo.taskId);
        setCurrentTask(currentTask);
        setIsRunning(true);
      }
    }
    getCurrentTaskFromDB();
  }, [setCurrentTask, setIsRunning])

  return (
    <Box>
      <Flex align="center" justify='space-between'>
        <Text>{currentTask ? (currentTask.taskName) : ("タスクを選択して計測を開始")}</Text>
        <Flex align="center" gap={3}>
          <Text>{convertMsTime(elapsedTime)}</Text>
          {isRunning && currentTask && (<Button onClick={() => handlePause(currentTask.id, elapsedTime)}>Pause</Button>)}
        </Flex>
      </Flex>
    </Box>
  )
}

export default TaskTimer;
