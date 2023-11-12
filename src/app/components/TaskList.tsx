'use client'
import { useEffect, useState } from "react";
import TaskBlock from "./TaskBlock";
import { TaskType } from "../types/TaskType";
import getActiveTasks from "../services/indexedDB/getActiveTasks";

type Props = {
  onTaskListUpdated: boolean;
  updateState: (isTaskListUpdated: boolean) => void;
}

const TaskList = ({onTaskListUpdated, updateState}: Props) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const activeTasks = await getActiveTasks();
        setTasks(activeTasks);
      } catch (err) {
        console.error(err);
      }
    })();
    updateState(false)
  }, [onTaskListUpdated, updateState])

  useEffect(() => {
    console.log(tasks);
  }, [tasks])

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskBlock task={task} updateState={updateState}  />
        </div>
      ))}
    </div>
  )
}

export default TaskList;