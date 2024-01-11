import accessDB from "./accessDB";

const updateCurrentTask = (taskId: number) => {
  const DBOpenRequest = accessDB();

  DBOpenRequest.onsuccess = () => {
    const db = DBOpenRequest.result;
    const objectStore = db.transaction(["currentTask"], "readwrite").objectStore('currentTask');
    const request = objectStore.put({taskId: taskId, startedAt: Date.now()}, 'currentTask');
    request.onsuccess = () => {
      console.log("currentTask status updated");   
      db.close();
    }
    request.onerror = (err) => {
      console.log(err);
      db.close();
    }
  }
}

export default updateCurrentTask;