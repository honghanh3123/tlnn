import Realm from 'realm';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import wordDir from './schemas/wordDir';
import wordItem from './schemas/wordItem';
import testDetail from './schemas/testDetail';
import test from './schemas/test';
import result from './schemas/result';
import user from './schemas/user';

const getRealm = () => Realm.open({
  path: "com.tlnn",
  schema: [wordDir, wordItem, test, testDetail, result, user]
});

export default getRealm;

export const create = async (schemaName, data) => {
  const realm = await getRealm();
  return new Promise((resolve, reject) => {
    let object;
    realm.write(() => {
      object = realm.create(schemaName, data)
    })
    resolve(object);
  })
}

export const bulkCreate = async (schemaName, datas) => {
  const realm = await getRealm();
  return new Promise((resolve, reject) => {
    let objects;
    realm.write(() => {
      objects = datas.map(data => realm.create(schemaName, data))
    })
    resolve(objects);
  })
}

export const update = async (schemaName, cbQuery, data) => {
  const realm = await getRealm();
  const dataUpdates = await cbQuery(realm.objects(schemaName));
  return new Promise((resolve, reject) => {
    realm.write(() => {
      dataUpdates.forEach(dataUpdate => {
        return Object.assign(dataUpdate, data);
      });
    })
    resolve(dataUpdates);
  })
}

//update("Words", (words) => words.filter("status == 'done'"), {status: "created"})

export const read = async (schemaName) => {
  const realm = await getRealm();
  return new Promise((resolve, reject) => {
    const data = realm.objects(schemaName);
    resolve(data);
  })
}

export const deleteRealm = async (task) => {
  const realm = await getRealm();
  realm.write(() => {
    // Delete the task from the realm.
    realm.delete(task);
    // Discard the reference.
    task1 = null;
  });
}

export const deleteById = async (schemaName, id) => {
  const realm = await getRealm();
  const tasks = await read(schemaName);
  const task = tasks.find(item => item._id == id)
  realm.write(() => {
    // Delete the task from the realm.
    realm.delete(task);
    // Discard the reference.
    task1 = null;
  });
}