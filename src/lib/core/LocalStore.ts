import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStore<T = any> {
  constructor(private __storeName: string) {}

  async store(data: T) {
    return AsyncStorage.setItem(
      this.__storeName,
      JSON.stringify({value: data}),
    );
  }

  async get() {
    const result = await AsyncStorage.getItem(this.__storeName);
    return JSON.parse(result || '{}').value as T;
  }

  async clear() {
    await AsyncStorage.removeItem(this.__storeName);
  }
}
