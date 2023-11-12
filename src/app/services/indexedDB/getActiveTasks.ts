import { TaskType } from "../../types/TaskType";
import accessDB from "./accessDB";

const getActiveTasks = () => {
  return new Promise<TaskType[]>((resolve, reject) => {
    const DBOpenRequest = accessDB();

    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      const transaction = db.transaction('tasks', 'readonly');
      const objectStore = transaction.objectStore('tasks');
      const index = objectStore.index('isDeleted');
      const objectStoreRequest = index.getAll(IDBKeyRange.only(0));
      objectStoreRequest.onsuccess = () => {
        resolve(objectStoreRequest.result);
        db.close();
      }

      objectStoreRequest.onerror = (err) => {
        reject(err);
        db.close();
      }
    }

    DBOpenRequest.onerror = (err) => {
      reject(err);
    }
  })
};

export default getActiveTasks;