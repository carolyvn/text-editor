import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a conncetcion to the database and version we want to use
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database and data previleges
  const tx = jateDB.transaction('jate', 'readwrite');
  // Open the object store
  const store = tx.objectStore('jate');
  // Use .put() method to pass in content
  const request = store.put({ jate: content });
  // Confirm data was added
  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a conncetcion to the database and version we want to use
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database and data previleges
  const tx = jateDB.transaction('jate', 'readonly');
  // Open the object store
  const store = tx.objectStore('jate');
  // Use .getAll() method to get all data in the database
  const request = store.getAll();
  // Confirm data was fetched
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
