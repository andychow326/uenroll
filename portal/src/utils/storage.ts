export enum StorageKey {
  SessionID = "sessionID",
}

export function getStorageItem(key: StorageKey): string | null {
  return localStorage.getItem(key);
}

export function removeStorageItem(key: StorageKey) {
  localStorage.removeItem(key);
}

export function setStorageItem(key: StorageKey, value: string | null): void {
  if (value == null) {
    removeStorageItem(key);
    return;
  }
  localStorage.setItem(key, value);
}
