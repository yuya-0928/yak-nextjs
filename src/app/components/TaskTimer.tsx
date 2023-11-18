import { useContext, useEffect } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";

const TaskTimer = () => {
  const {isRunning, setIsRunning, setCurrentTaskId, elapsedTime, setElapsedTime} = useContext(TaskTimerContext);

  useEffect(() => {
    if(isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, setElapsedTime])

  const handlePause = () => {
    setCurrentTaskId(null);
    setIsRunning(false);
  }

  const seconds = `0${Math.floor(elapsedTime / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(elapsedTime / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(elapsedTime / 3600000)}`.slice(-2);

  return (
    <div>
      <h1>Task Timer</h1>
      <p>{hours}:{minutes}:{seconds}</p>
      {isRunning && (<button onClick={handlePause}>Pause</button>)}
    </div>
  )
}

export default TaskTimer;