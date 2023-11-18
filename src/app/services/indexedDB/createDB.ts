const createDB = (dbRequest: IDBOpenDBRequest) => {
  const db = dbRequest.result;

  const objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex("taskName", "taskName", {unique: false});
  objectStore.createIndex("status", "status", {unique: false});
  objectStore.createIndex("elapsed_time", "elapsed_time", {unique: false});
  objectStore.createIndex("isDeleted", "isDeleted", {unique: false});


  objectStore.transaction.oncomplete = () => {
    console.log('create yakDB complete');
  }
}

  export default createDB;