'use client'
import { useContext, useRef } from "react";
import accessDB from "../services/indexedDB/accessDB";
import addTask from "../services/indexedDB/addTask";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import { Input } from "@chakra-ui/react";


const TaskForm = () => {
  const {setIsTaskListUpdated} = useContext(TaskListUpdatedContext);
  const inputRef = useRef<HTMLInputElement>(null);
  
  let inputText = '';
  const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputText = e.target.value;
  }
  
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
    if(inputRef.current) inputRef.current.value = '';
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Input ref={inputRef} onChange={inputValue} size='lg' type="text" name="taskName" placeholder="Write a Task" />
    </form>
  )
};

export default TaskForm;