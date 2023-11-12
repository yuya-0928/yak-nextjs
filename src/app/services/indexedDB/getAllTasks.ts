import { TaskType } from "../../types/TaskType";
import accessDB from "./accessDB";

const getAllTasks = () => {
  return new Promise<TaskType[]>((resolve, reject) => {
    const DBOpenRequest = accessDB();

    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      const transaction = db.transaction('tasks', 'readonly');
      const objectStoreRequest = transaction.objectStore('tasks').getAll();
      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result);
      }

      objectStoreRequest.onerror = (err) => {
        reject(err);
      }
    }

    DBOpenRequest.onerror = (err) => {
      reject(err);
    }
  })
};

export default getAllTasks;