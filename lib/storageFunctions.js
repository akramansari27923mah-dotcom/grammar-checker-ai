
// local storage
export const saveInLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
export const getFromLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  return JSON.parse(data);
};
export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};

// session stogare
export const saveInSessionStorage = (name, data) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};
export const getFromSessionStorage = (name) => {
  const data = sessionStorage.getItem(name);
  return JSON.parse(data);
};
export const removeFromSessionStorage = (name) => {
  sessionStorage.removeItem(name)
}