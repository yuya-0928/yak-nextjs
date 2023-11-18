import { useContext, useEffect, useState } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";
import getTask from "../services/indexedDB/getTask";

const TaskTimer = () => {
  const {isRunning, setIsRunning, currentTaskId, setCurrentTaskId, elapsedTime, setElapsedTime} = useContext(TaskTimerContext);
  const [currentTaskName, setCurrentTaskName] = useState<string>("");

  useEffect(() => {
    if(isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, setElapsedTime]);

  useEffect(() => {
    if(currentTaskId) {
      getTaskInfo(currentTaskId);
    }
  }, [currentTaskId]);

  const handlePause = () => {
    setCurrentTaskId(null);
    setIsRunning(false);
  }

  const getTaskInfo = (taskId: number) => {
    console.log("getTaskInfo");
    (async () => {
      try {
        const task = await getTask(taskId);
        setCurrentTaskName(task.taskName);
      } catch (err) {
        console.error(err);
      }
    })();
  }

  const seconds = `0${Math.floor(elapsedTime / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(elapsedTime / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(elapsedTime / 3600000)}`.slice(-2);

  return (
    <div>
      <h1>Task Timer</h1>
      <p>TaskId: {currentTaskId}</p>
      <p>TaskName: {currentTaskName}</p>
      <p>{hours}:{minutes}:{seconds}</p>
      {isRunning && (<button onClick={handlePause}>Pause</button>)}
    </div>
  )
}

export default TaskTimer;