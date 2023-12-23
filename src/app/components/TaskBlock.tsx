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
import { Box, Button, Checkbox, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, TimeIcon, CalendarIcon } from '@chakra-ui/icons'
import updateTaskStartTime from "../services/indexedDB/updateTaskStartTime";


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
    updateTaskStartTime(taskId, Date.now())
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
        <Box>
          <Flex justify='space-between'>
            <Flex align="center" gap='3'>
              <Checkbox type="checkbox" onChange={() => {onChangeStatus(task.id)}} />
              <Box>
                <Text>{task.taskName}</Text>
              </Box>
            </Flex>
            <Flex align="center" gap='3'>
              <IconButton aria-label="Edit Task" icon={<EditIcon />} onClick={() => {changeEditMode()}}></IconButton>
              <IconButton aria-label="Task Timer" icon={<TimeIcon />} onClick={() => onTaskStart(task.id)} isDisabled={task.id === currentTaskId && isRunning}></IconButton>
              <IconButton aria-label="Delete Task" icon={<DeleteIcon />} onClick={() => {onTaskDelete(task.id)}}></IconButton>
            </Flex>
          </Flex>
          <Flex alignItems='center' gap='2'>
            {task.elapsed_time !== 0 && (<Text><TimeIcon /> {convertMsTime(task.elapsed_time)}</Text>)}
            {task.deadline && <Text><CalendarIcon />{task.deadline}</Text> }
          </Flex>
        </Box>
      ): (
        <Box>
          <form onSubmit={(e) => {onUpdateTaskInfo(e, task.id)}}>
            <Input type="text" name="taskName" defaultValue={task.taskName} />
            <Flex alignItems='center' gap='3'>
                <input type="date" name="deadline"  />
                <Button type="submit">保存</Button>
            </Flex>
          </form>
        </Box>
      )}
    </>
  )
}

export default TaskBlock;