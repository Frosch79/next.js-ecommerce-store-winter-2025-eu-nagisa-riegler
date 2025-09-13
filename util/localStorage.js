export function getLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
}

export function setLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
}
