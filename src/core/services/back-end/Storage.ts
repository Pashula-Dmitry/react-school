import { IDBPDatabase, openDB } from 'idb';
/* eslint no-console: 0 */  // --> OFF
class Storage {

  db: any;

  constructor(private dbName = 'Youtube clone') {
  }

  public async createObjectStore(tableNames: string[]) {
    try {
      this.db = await openDB(this.dbName, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
          }
        },
      });
    } catch (error) {
      return false;
    }
  }

  // taken from https://javascript.plainenglish.io/working-with-indexeddb-in-typescript-react-ad504a1bdae3
  async getValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log('Get Data ', JSON.stringify(result));
    return result;
  }

  async getAllValue(tableName: string) {
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    console.log('Get All Data', JSON.stringify(result));
    return result;
  }

  async putValue(tableName: string, value: Object) {
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    console.log('Put Data ', JSON.stringify(result));
    return result;
  }

  async putBulkValue(tableName: string, values: Object[]) {
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    for (const value of values) {
      const result = await store.put(value);
      console.log('Put Bulk Data ', JSON.stringify(result));
    }
    return this.getAllValue(tableName);
  }

  async deleteValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log('Id not found', id);
      return result;
    }
    await store.delete(id);
    return id;
  }
}

export default new Storage();
