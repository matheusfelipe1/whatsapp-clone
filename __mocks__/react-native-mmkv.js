// Manual mock so tests don't depend on the native Nitro/MMKV module.
function createMMKV() {
  const store = new Map();

  return {
    set: (key, value) => {
      store.set(key, value);
    },
    getString: key => store.get(key),
    getBoolean: key => store.get(key),
    getNumber: key => store.get(key),
    remove: key => {
      const existed = store.has(key);
      store.delete(key);
      return existed;
    },
    contains: key => store.has(key),
    getAllKeys: () => Array.from(store.keys()),
    clearAll: () => store.clear(),
  };
}

module.exports = { createMMKV };
