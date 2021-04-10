 import Realm from 'realm';
 import wordDir from './schemas/wordDir';
 import wordItem from './schemas/wordItem';
import { reject } from 'lodash';
import { ImagePickerIOS } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
 const getRealm = () =>Realm.open({
  path: "com.tlnn",
  schema: [wordDir, wordItem]
});

export default getRealm;

export const create = async (schemaName, data) => {
  const realm = await getRealm();
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const object = realm.create(schemaName, {
        _id: 1, // object id value
        ...data
      })
    })
    resolve(object);
  })
}

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
