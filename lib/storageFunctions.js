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
export const saveInSessionStorage = (name, data) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};
export const getFromSessionStorage = (name) => {
  const data = localStorage.setItem(name);
  return JSON.parse(data);
};
