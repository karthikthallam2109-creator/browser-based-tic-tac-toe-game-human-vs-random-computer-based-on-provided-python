const STORAGE_VERSION = '1.0';

export interface StorageData<T> {
  version: string;
  data: T;
  timestamp: number;
}

export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    const storageData: StorageData<T> = {
      version: STORAGE_VERSION,
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(storageData));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return defaultValue;
    }

    const parsed = JSON.parse(item) as StorageData<T>;
    
    // Basic validation
    if (!parsed.data || !parsed.version) {
      console.warn('Invalid storage data format, using default');
      return defaultValue;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}
