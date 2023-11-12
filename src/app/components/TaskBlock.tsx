import styled from "styled-components";
import { TaskType } from "../types/TaskType";
import deleteTask from "../services/indexedDB/deleteTask";
import { useEffect, useState } from "react";

const StyledTaskBlock = styled('div')`
  display: flex;
  gap: 10px;
`;

type Props = {
  task: TaskType;
  updateState: (isTaskListUpdated: boolean) => void;
}

const TaskBlock: React.FC<Props> = ({task, updateState}: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const onChange = () => {
    console.log("task status changed");
  }

  const onTaskDelete = (taskId: number) => {
    console.log("task deleted");
    deleteTask(taskId);
    updateState(true);
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
          <input type="checkbox" onChange={onChange} />
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