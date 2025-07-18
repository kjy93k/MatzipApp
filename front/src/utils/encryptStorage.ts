import EncryptStorage from 'react-native-encrypted-storage';

export const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptStorage.setItem(key, JSON.stringify(data));
};

export const getEncryptStorage = async (key: string) => {
  const storedData = await EncryptStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
};

export const removeEncryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);
  if (data) await EncryptStorage.removeItem(key);
};
