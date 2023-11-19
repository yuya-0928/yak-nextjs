import { useContext, useEffect, useState } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";
import getTask from "../services/indexedDB/getTask";
import updateTaskElapsedTime from "../services/indexedDB/updateTaskElapsedTime";
import convertMsTime from "../helper/convertMsTime";

const TaskTimer = () => {
  const {isRunning, setIsRunning, currentTaskId, setCurrentTaskId, elapsedTime, setElapsedTime} = useContext(TaskTimerContext);
  const [currentTaskName, setCurrentTaskName] = useState<string>("");

  const handlePause = (taskId: number, time: number) => {
    updateTaskElapsedTime(taskId, time);
    setCurrentTaskId(null);
    setIsRunning(false);
  }

  useEffect(() => {
    if(isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, setElapsedTime]);

  useEffect(() => {
    const getTaskInfo = (taskId: number) => {
      (async () => {
        try {
          const task = await getTask(taskId);
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
    <div>
      <h1>Task Timer</h1>
      <p>TaskId: {currentTaskId}</p>
      <p>TaskName: {currentTaskName}</p>
      <p>{convertMsTime(elapsedTime)}</p>
      {isRunning && currentTaskId && (<button onClick={() => handlePause(currentTaskId, elapsedTime)}>Pause</button>)}
    </div>
  )
}

export default TaskTimer;