'use client'
import accessDB from "../services/indexedDB/accessDB";
import addTask from "../services/indexedDB/addTask";

const TaskForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const DBOpenRequest = accessDB();
    DBOpenRequest.onsuccess = () => {
      const taskName = formData.get("taskName");
      if (!taskName) {
        console.log("no task name")
        return;
      }
      addTask(DBOpenRequest, taskName);
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