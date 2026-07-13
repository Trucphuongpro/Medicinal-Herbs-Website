export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore storage errors
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore storage errors
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch {
    // ignore storage errors
  }
};
