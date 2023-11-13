'use client'
import { useContext } from "react";
import accessDB from "../services/indexedDB/accessDB";
import addTask from "../services/indexedDB/addTask";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";


const TaskForm = () => {
  const {setIsTaskListUpdated} = useContext(TaskListUpdatedContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const DBOpenRequest = accessDB();
    DBOpenRequest.onsuccess = () => {
      const taskName = formData.get("taskName");
      if (!taskName) {
        // TODO: エラーメッセージをFormの下に表示する
        console.error("no task name")
        return;
      }
      addTask(DBOpenRequest, taskName);
      setIsTaskListUpdated(true);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="taskName" placeholder="Write a Task" />
      <button type="submit">Save Task</button>
    </form>
  )
};

export default TaskForm;