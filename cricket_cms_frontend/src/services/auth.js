export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
  window.location.href = "/login";
};
