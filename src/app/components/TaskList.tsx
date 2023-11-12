'use client'
import { useEffect, useState } from "react";
import TaskBlock from "./TaskBlock";
import { TaskType } from "../types/TaskType";
import getActiveTasks from "../services/indexedDB/getActiveTasks";


const TaskList = () => {
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
  }, [])

  useEffect(() => {
    console.log(tasks);
  }, [tasks])

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskBlock task={task} />
        </div>
      ))}
    </div>
  )
}

export default TaskList;