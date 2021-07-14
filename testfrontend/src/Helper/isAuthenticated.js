const isAuthenticated = () => {
  if (window.localStorage.jwt) {
    return JSON.parse(window.localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export default isAuthenticated;