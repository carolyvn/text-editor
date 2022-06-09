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
export const putDb = async (id, value) => {
  console.log('PUT to update the database');
  // connect to database and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction and specify the database and data previleges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('jate');
  // use the .put() method to pass in content
  const request = objStore.put({ id: id, value: value })
  // confirm the data was added
  const result = await request;
  console.log('🚀 - Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction and specify the database and data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('jate');
  // use the .getAll() method to get all data in the database
  const request = objStore.getAll()
  // confirm the data was fetched
  const result = await request;
  console.log('result.value', result);
}

initdb();
