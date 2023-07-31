export const hashTable = <T, K extends keyof T>(data: T[], keyField: K): Map<T[K], T> => {
  const hashMap = new Map<T[K], T>();
  data.forEach((item) => hashMap.set(item[keyField] as T[K], item));
  return hashMap;
};
