import AsyncStorage from '@react-native-async-storage/async-storage';

export type LocalStorageKeyType = 'USER_DATA' | 'USER_TOKEN' | 'LANG' | 'CURRENCY';

export const setDataInLocalStorage = async (key: LocalStorageKeyType, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('setDataInLocal error', error);
  }
};

export const getDataInLocalStorage = async (key: LocalStorageKeyType) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('getDataInLocal error', error);
    return null;
  }
};

export const removeDataInLocal = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('removeDataInLocal error', error);
  }
};

export const multiGetDataInLocalStorage = async (keys: LocalStorageKeyType[]): Promise<string[] | null> => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values.map((result) => result[1] ?? null);
  } catch (error) {
    console.error('multiGetDataInLocal error', error);
    return null;
  }
};
