import axios from "axios";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const service = axios.create({
  baseURL: "https://developer.nps.gov/api/v1/",
  headers: { "X-Api-Key": API_KEY },
});

//total parks is 497
export const getAllParks = () => {
  return service
    .get("/parks")
    .then((response) => response.data)
    .catch((error) => error);
};

export const getAllParksByState = (statecode) => {
  return service
    .get(`/parks?statecode=${statecode}`)
    .then((response) => response.data)
    .catch((error) => error);
};
