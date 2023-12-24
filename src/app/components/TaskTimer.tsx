import { useContext, useEffect, useState } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";
import updateTaskElapsedTime from "../services/indexedDB/updateTaskElapsedTime";
import convertMsTime from "../helper/convertMsTime";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const TaskTimer = () => {
  const {isRunning, setIsRunning, currentTask, setCurrentTask} = useContext(TaskTimerContext);
  const [elapsedTime, setElapsedTime]=useState(0);
  const {setIsTaskListUpdated} = useContext(TaskListUpdatedContext);

  const handlePause = (taskId: number, time: number) => {
    // TODO: タスクを一時停止したら、currentTaskからデータを削除する
    updateTaskElapsedTime(taskId, time);
    setCurrentTask(null);
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
    // TODO：初回読み込み時にcurrentTaskにデータがあったら、stateにcurrentTaskの情報を元にタスクのデータを入れる
  }, []);

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
