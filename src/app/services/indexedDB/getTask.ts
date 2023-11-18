import { TaskType } from "@/app/types/TaskType";
import accessDB from "./accessDB";

const getTask = (taskId: number) => {
  return new Promise<TaskType>((resolve, reject) => {
    console.log("getTask.ts: getTask()")
    const DBOpenRequest = accessDB();
  
    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      const objectStore = db.transaction(["tasks"], "readwrite").objectStore('tasks');
      const objectStoreTaskRequest = objectStore.get(taskId);
      objectStoreTaskRequest.onsuccess = () => {
        resolve(objectStoreTaskRequest.result);
        db.close();
      }
      objectStoreTaskRequest.onerror = (err) => {
        reject(err);
        db.close();
      }
    }

    DBOpenRequest.onerror = (err) => {
      reject(err);
    }
  })
}

export default getTask;