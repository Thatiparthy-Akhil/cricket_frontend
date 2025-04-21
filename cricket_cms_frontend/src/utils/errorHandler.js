// export const handleApiError = (error) => {
//   const status = error.response?.status;

//   if (status === 401) {
//     // Unauthorized (Token expired or invalid)
//     return {
//       message: "Your session has expired. Please log in again.",
//       redirectToLogin: true,
//     };
//   }

//   if (status === 403) {
//     // Forbidden
//     return { message: "You do not have permission to access this resource." };
//   }

//   if (status === 404) {
//     // Not Found
//     return { message: "The requested resource was not found." };
//   }

//   if (status >= 500) {
//     // Server Error
//     return {
//       message: "An unexpected error occurred. Please try again later.",
//     };
//   }

//   // Default error message
//   return {
//     message:
//       error.response?.data?.message ||
//       "Something went wrong. Please try again.",
//   };
// };
