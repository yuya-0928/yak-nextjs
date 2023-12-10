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
import { Button, Checkbox, Divider, Flex, Input, Spacer, Text } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon, EditIcon, TimeIcon, CalendarIcon, SpinnerIcon } from '@chakra-ui/icons'

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
    <>
      {isEditMode === false ? (
        <StyledTaskBlock>
          <Flex alignItems='center' gap='3'>
            <Checkbox type="checkbox" onChange={() => {onChangeStatus(task.id)}} />
            <Spacer />
            <Text>{task.taskName}</Text>
            <Spacer />
            <Text><TimeIcon /> {convertMsTime(task.elapsed_time)}</Text>
            <Spacer />
            <Text><CalendarIcon />{task.deadline ? task.deadline : 'なし'}</Text>
            <Spacer />
            <Button onClick={() => {onTaskDelete(task.id)}}><DeleteIcon /></Button>
            <Spacer />
            <Button onClick={() => {changeEditMode()}}><EditIcon /></Button>
            <Spacer />
            <Button onClick={() => onTaskStart(task.id)} isDisabled={task.id === currentTaskId && isRunning}><TimeIcon /></Button>
          </Flex>
        </StyledTaskBlock>
      ): (
        <StyledTaskBlock>
          <form onSubmit={(e) => {onUpdateTaskInfo(e, task.id)}}>
            <Flex alignItems='center' gap='3'>
                <Input type="text" name="taskName" defaultValue={task.taskName} />
                <input type="date" name="deadline"  />
                <Button type="submit">Edit</Button>
            </Flex>
          </form>
        </StyledTaskBlock>
      )}
      <Divider />
    </>
  )
}

export default TaskBlock;