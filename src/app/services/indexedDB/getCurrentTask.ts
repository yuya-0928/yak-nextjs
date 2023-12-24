import accessDB from "./accessDB";

const getCurrentTask = (taskId: number) => {
  return new Promise<{taskId: number, startedAt: number}>((resolve, reject) => {
    const DBOpenRequest = accessDB();
  
    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      const objectStore = db.transaction(["currentTask"], "readwrite").objectStore('currentTask');
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

export default getCurrentTask;