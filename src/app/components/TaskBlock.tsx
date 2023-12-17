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
import { Box, Button, Checkbox, Divider, Flex, FormControl, IconButton, Input, Spacer, Text } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon, EditIcon, TimeIcon, CalendarIcon, SpinnerIcon } from '@chakra-ui/icons'


type Props = {
  task: TaskType;
}

const StyledTaskBlock = styled('div')`
  gap: 10px;
`;


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
            <Box>
              <Text>{task.taskName}</Text>
            </Box>
            <IconButton aria-label="Edit Task" icon={<EditIcon />} onClick={() => {changeEditMode()}}></IconButton>
            <IconButton aria-label="Task Timer" icon={<TimeIcon />} onClick={() => onTaskStart(task.id)} isDisabled={task.id === currentTaskId && isRunning}></IconButton>
            <IconButton aria-label="Delete Task" icon={<DeleteIcon />} onClick={() => {onTaskDelete(task.id)}}></IconButton>
          </Flex>
          <Box>
            <Flex alignItems='center' gap='3'>
              {task.elapsed_time !== 0 && (<Text><TimeIcon /> {convertMsTime(task.elapsed_time)}</Text>)}
              {task.deadline && <Text><CalendarIcon />{task.deadline}</Text> }
            </Flex>
          </Box>
        </StyledTaskBlock>
      ): (
        <StyledTaskBlock>
          <form onSubmit={(e) => {onUpdateTaskInfo(e, task.id)}}>
            <Input type="text" name="taskName" defaultValue={task.taskName} />
            <Flex alignItems='center' gap='3'>
                <input type="date" name="deadline"  />
                <Button type="submit">保存</Button>
            </Flex>
          </form>
        </StyledTaskBlock>
      )}
      <Divider colorScheme="gray" />
    </>
  )
}

export default TaskBlock;