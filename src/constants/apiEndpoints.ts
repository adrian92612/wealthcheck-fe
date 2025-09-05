const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const auth = apiBaseUrl + "auth/";

export const apiEndpoints = {
  auth: {
    googleLogin: auth + "google",
    logout: auth + "logout",
    authCheck: auth + "me",
  },
};
