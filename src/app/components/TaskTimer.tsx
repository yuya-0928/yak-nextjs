import { useContext, useRef, useState } from "react";
import { TaskTimerContext } from "../context/TaskTimerContextType";

const TaskTimer = () => {
  const [time, setTime] = useState(0);
  const {isRunning, setIsRunning} = useContext(TaskTimerContext);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1000);
    }, 1000);
  }

  const handlePause = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setIsRunning(false);
  }

  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return (
    <div>
      <h1>Task Timer</h1>
      <p>{hours}:{minutes}:{seconds}</p>
      {isRunning ? (<button onClick={handlePause}>Pause</button>):(<button onClick={handleStart}>Start</button>)}
    </div>
  )
}

export default TaskTimer;