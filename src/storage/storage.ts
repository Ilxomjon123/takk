let storage: any;

async function setItem(name: string, value: string) {
  if (typeof storage.setItem !== 'function') {
    throw 'Storage should implement setItem';
  }
  storage.setItem(name, value);
}

async function getItem(name: string) {
  if (typeof storage.getItem !== 'function') {
    throw 'Storage should implement getItem';
  }
  return storage.getItem(name);
}

export default {
  setItem,
  getItem,
};

export function setStorage(instance: object) {
  storage = instance;
}
