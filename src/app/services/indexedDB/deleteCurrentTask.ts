import accessDB from "./accessDB";

const deleteCurrentTask = () => {
  const DBOpenRequest = accessDB();

    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      const objectStore = db.transaction(["currentTask"], "readwrite").objectStore('currentTask');
      const request = objectStore.delete("currentTask");
      request.onsuccess = () => {
        console.log("delete current task success")
      }

    }
}

export default deleteCurrentTask;