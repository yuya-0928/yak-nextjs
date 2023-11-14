import styled from "styled-components";
import { TaskType } from "../types/TaskType";
import deleteTask from "../services/indexedDB/deleteTask";
import { useContext, useEffect, useState } from "react";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import updateTaskStatus from "../services/indexedDB/updateTaskStatus";

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
        </StyledTaskBlock>
      ): (
        <StyledTaskBlock>
          <input type="text" defaultValue={task.taskName} />
          <button onClick={() => {changeEditMode()}}>Edit</button>
        </StyledTaskBlock>
      )}
    </>
  )
}

export default TaskBlock;