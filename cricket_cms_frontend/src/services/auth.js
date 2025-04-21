export const logout = () => {
  localStorage.removeItem("token"); // Clear the token from localStorage
  window.dispatchEvent(new Event("storage")); // Dispatch storage event manually
  window.location.href = "/login"; // Redirect to login page
};
