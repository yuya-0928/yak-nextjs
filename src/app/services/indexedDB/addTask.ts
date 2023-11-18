const addTask = (dbRequest: IDBOpenDBRequest, taskName: FormDataEntryValue) => {
  const db = dbRequest.result;
  const transaction = db.transaction(["tasks"], "readwrite");

  const objectStore = transaction.objectStore("tasks");
  const request = objectStore.add({taskName: taskName, status: "active", elapsed_time: 0, isDeleted: 0});
  request.onsuccess = () => {
    console.log("task added");
  }

  transaction.oncomplete = () => {
    console.log("All done!");
  }

  transaction.onerror = (event) => {
    console.error("transaction error");
    console.error(`Database error: ${JSON.stringify(event)}`)
  }
}

export default addTask;