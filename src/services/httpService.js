import axios from "axios";
// import { token } from "./auth";

// New axio interceptor syntax from
// source: https://stackoverflow.com/questions/68714143/how-can-i-use-axios-interceptors-to-add-some-headers-to-responses
axios.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers["Authorization"] = "Basic " + token;
    // }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  //   console.log("Error", error);
  const expectedErrors =
    error.response && error.respons.status >= 400 && error.respons.status < 500;

  if (!expectedErrors) {
    alert("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
