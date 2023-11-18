import styled from "styled-components";
import { TaskType } from "../types/TaskType";
import deleteTask from "../services/indexedDB/deleteTask";
import { useContext, useEffect, useState } from "react";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import updateTaskStatus from "../services/indexedDB/updateTaskStatus";
import updateTaskName from "../services/indexedDB/updateTaskName";
import accessDB from "../services/indexedDB/accessDB";
import { TaskTimerContext } from "../context/TaskTimerContextType";

const StyledTaskBlock = styled('div')`
  display: flex;
  gap: 10px;
`;

type Props = {
  task: TaskType;
}

const TaskBlock: React.FC<Props> = ({task}: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const {setIsTaskListUpdated} = useContext(TaskListUpdatedContext);
  const {currentTaskId, setCurrentTaskId, isRunning, setIsRunning} = useContext(TaskTimerContext);
  const onChangeStatus = (taskId: number) => {
    console.log("task status changed");
    updateTaskStatus(taskId);
    setIsTaskListUpdated(true);
  }

  const onTaskDelete = (taskId: number) => {
    console.log("task deleted");
    deleteTask(taskId);
    setIsTaskListUpdated(true);
  }

  const changeEditMode = () => {
    console.log("changeEditMode")
    setIsEditMode(!isEditMode);
  }

  const onTaskStart = (taskId: number) => {
    setIsRunning(true);
    setCurrentTaskId(taskId);
  }

  const onUpdateTaskName = (e: React.FormEvent<HTMLFormElement>, taskId: number) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    
    const DBOpenRequest = accessDB();
    DBOpenRequest.onsuccess = () => {
      const taskName = formData.get("taskName");
      if(taskName) {
        updateTaskName(taskId, taskName)
        setIsTaskListUpdated(true);
      }
    }
    changeEditMode();
  } 

  useEffect(() => {
    console.log(isEditMode);
  }, [isEditMode])

  return (
    <>
      {isEditMode === false ? (
        <StyledTaskBlock>
          <input type="checkbox" onChange={() => {onChangeStatus(task.id)}} />
          <p>TaskId:{task.id}</p>
          <p>TaskName:{task.taskName}</p>
          <p>Status:{task.status}</p>
          <button onClick={() => {onTaskDelete(task.id)}}>delete</button>
          <button onClick={() => {changeEditMode()}}>Edit</button>
          {task.id !== currentTaskId && (<button onClick={() => onTaskStart(task.id)}>Start</button>)}
          {task.id === currentTaskId && isRunning && (<p>着手中</p>)}
        </StyledTaskBlock>
      ): (
        <StyledTaskBlock>
          <form onSubmit={(e) => {onUpdateTaskName(e, task.id)}}>
            <input type="text" name="taskName" defaultValue={task.taskName} />
            <button type="submit">Edit</button>
          </form>
        </StyledTaskBlock>
      )}
    </>
  )
}

export default TaskBlock;