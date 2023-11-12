import createDB from "./createDB";

const accessDB = () => {
  const dbName = "yakDB";

  const DBOpenRequest = window.indexedDB.open(dbName);
  DBOpenRequest.onerror = (event) => {
    console.error("error");
    console.error(`Database error: ${JSON.stringify(event)}}`)
  }

  DBOpenRequest.onupgradeneeded = () => {
    const db = DBOpenRequest.result;

    db.onerror = (err) => {
      console.error('Error loading database.', err);
    }
    createDB(DBOpenRequest);
  }

  return DBOpenRequest;
}

export default accessDB;