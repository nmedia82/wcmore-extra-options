// import config from "../config";
import httpService from "./httpService";
import config from "./config.json";

const { api_url } = config;

// get order detail by id
export function getExtraFields(id) {
  const url = `${api_url}/xxxx`;
  return httpService.get(url);
}

// add message in order
export function saveExtraFields(fields) {
  const url = `${api_url}/save-meta`;
  return httpService.post(url, fields);
}
