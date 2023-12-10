import styled from "styled-components";
import { TaskType } from "../types/TaskType";
import deleteTask from "../services/indexedDB/deleteTask";
import { useContext, useEffect, useState } from "react";
import { TaskListUpdatedContext } from "../context/TaskListUpdatedContext";
import updateTaskStatus from "../services/indexedDB/updateTaskStatus";
import accessDB from "../services/indexedDB/accessDB";
import { TaskTimerContext } from "../context/TaskTimerContextType";
import updateTaskElapsedTime from "../services/indexedDB/updateTaskElapsedTime";
import convertMsTime from "../helper/convertMsTime";
import updateTaskInfo from "../services/indexedDB/updateTaskName";
import { Card, CardBody } from "@chakra-ui/react";

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
  const {currentTaskId, setCurrentTaskId, isRunning, setIsRunning, elapsedTime} = useContext(TaskTimerContext);
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
    if(currentTaskId){
      updateTaskElapsedTime(currentTaskId, elapsedTime);
      setIsTaskListUpdated(true);
    }
    setCurrentTaskId(taskId);
  }

  const onUpdateTaskInfo = (e: React.FormEvent<HTMLFormElement>, taskId: number) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    
    const DBOpenRequest = accessDB();
    DBOpenRequest.onsuccess = () => {
      const taskName = formData.get("taskName");
      const deadline = formData.get("deadline");
      if(taskName || deadline) {
        updateTaskInfo(taskId, taskName, deadline)
        setIsTaskListUpdated(true);
      }
    }
    changeEditMode();
  } 

  useEffect(() => {
    console.log(isEditMode);
  }, [isEditMode])

  return (
    <Card variant='elevated'>
      <CardBody>
      {isEditMode === false ? (
        <StyledTaskBlock>
          <input type="checkbox" onChange={() => {onChangeStatus(task.id)}} />
          <p>TaskId:{task.id}</p>
          <p>TaskName:{task.taskName}</p>
          <p>Status:{task.status}</p>
          <p>経過時間：{convertMsTime(task.elapsed_time)}</p>
          <p>期限：{task.deadline ? task.deadline : 'なし'}</p>
          <button onClick={() => {onTaskDelete(task.id)}}>delete</button>
          <button onClick={() => {changeEditMode()}}>Edit</button>
          {task.id !== currentTaskId && (<button onClick={() => onTaskStart(task.id)}>Start</button>)}
          {task.id === currentTaskId && isRunning && (<p>着手中</p>)}
        </StyledTaskBlock>
      ): (
        <StyledTaskBlock>
          <form onSubmit={(e) => {onUpdateTaskInfo(e, task.id)}}>
            <input type="text" name="taskName" defaultValue={task.taskName} />
            <input type="date" name="deadline"  />
            <button type="submit">Edit</button>
          </form>
        </StyledTaskBlock>
      )}
      </CardBody>
    </Card>
  )
}

export default TaskBlock;