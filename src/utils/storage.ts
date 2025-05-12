/* eslint-disable @typescript-eslint/no-explicit-any */
export function getStorage(key: any, defaultValue = null) {
  if (typeof window === 'undefined')

    throw new Error();

  const value = localStorage.getItem(key);
  if (!value)
    return defaultValue;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function setStorage(key: any, value: any) {
  window.localStorage.setItem(key, `${value}`);
}
