import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const validateSession = (accessToken) => {
  return service
    .get(`/user/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const signup = ({ userName, email, password }) => {
  return service
    .post("/user/signup", { userName, email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`SIGNUP ERROR`, err);
      return err;
    });
};

export const login = ({ email, password }) => {
  return service
    .post("/user/login", { email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};
