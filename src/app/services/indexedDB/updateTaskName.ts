import accessDB from "./accessDB";

const updateTaskName = (taskId: number, updateTaskName: FormDataEntryValue) => {
  const DBOpenRequest = accessDB();

  DBOpenRequest.onsuccess = () => {
    const db = DBOpenRequest.result;
    const objectStore = db.transaction(["tasks"], "readwrite").objectStore('tasks');
    const objectStoreTaskRequest = objectStore.get(taskId);
    objectStoreTaskRequest.onsuccess = () => {
      const data = objectStoreTaskRequest.result;
      data.taskName = updateTaskName;
      const updateTaskRequest = objectStore.put(data);

      updateTaskRequest.onsuccess = () => {
        console.log("task status updated");
      }
    }
  }
}

export default updateTaskName;