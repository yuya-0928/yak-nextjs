import accessDB from "./accessDB";

const updateTaskStatus = (taskId: number) => {
  const DBOpenRequest = accessDB();

  DBOpenRequest.onsuccess = () => {
    const db = DBOpenRequest.result;
    const objectStore = db.transaction(["tasks"], "readwrite").objectStore('tasks');
    const objectStoreTaskRequest = objectStore.get(taskId);
    objectStoreTaskRequest.onsuccess = () => {
      const data = objectStoreTaskRequest.result;
      data.status = data.status === "active" ? "completed" : "active";
      const updateTaskRequest = objectStore.put(data);

      updateTaskRequest.onsuccess = () => {
        console.log("task status updated");
      }
    }
  }
}

export default updateTaskStatus;