'use client'
import { useContext, useEffect, useState } from "react";
import TaskBlock from "./TaskBlock";
import { TaskType } from "../types/TaskType";
import getActiveTasks from "../services/indexedDB/getActiveTasks";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";


const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const {isTaskListUpdated, setIsTaskListUpdated} = useContext(TaskListUpdatedContext);

  useEffect(() => {
    (async () => {
      try {
        const activeTasks = await getActiveTasks();
        setTasks(activeTasks);
      } catch (err) {
        console.error(err);
      }
    })();
    setIsTaskListUpdated(false)
  }, [isTaskListUpdated, setIsTaskListUpdated])

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