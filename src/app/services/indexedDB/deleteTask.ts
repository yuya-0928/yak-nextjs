import accessDB from "./accessDB";

const deleteTask = (taskId: number) => {
  const DBOpenRequest = accessDB();

    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      const objectStore = db.transaction(["tasks"], "readwrite").objectStore('tasks');
      const objectStoreTaskRequest = objectStore.get(taskId);
      objectStoreTaskRequest.onsuccess = () => {
        const data = objectStoreTaskRequest.result;
        data.isDeleted = 1;
        const updateTaskRequest = objectStore.put(data);

        updateTaskRequest.onsuccess = () => {
          console.log("task updated");
        }
      }

    }
}

export default deleteTask;