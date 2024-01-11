const createDB = (dbRequest: IDBOpenDBRequest) => {
  const db = dbRequest.result;

  const tasksStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
  tasksStore.createIndex("taskName", "taskName", {unique: false});
  tasksStore.createIndex("status", "status", {unique: false});
  tasksStore.createIndex("elapsedTime", "elapsedTime", {unique: false});
  tasksStore.createIndex("isDeleted", "isDeleted", {unique: false});
  
  tasksStore.transaction.oncomplete = () => {
    console.log('create yakDB complete');
  }
  
  const currentTaskStore = db.createObjectStore('currentTask');
  currentTaskStore.createIndex("taskId", "taskId", {unique: false});
  currentTaskStore.createIndex("startedAt", "startedAt", {unique: false});

  currentTaskStore.transaction.oncomplete = () => {
    console.log('create yakDB complete');
  }
}

  export default createDB;