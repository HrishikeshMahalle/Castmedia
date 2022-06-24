const setAuthData = (data) => {
  localStorage.setItem("auth", data);
  console.log("Saving auth data");
};

const getAuthData  = () => {
  return localStorage.getItem("auth");
};

const removeAuthData = () => {
  return localStorage.removeItem("auth");
};

export { setAuthData, removeAuthData, getAuthData };
