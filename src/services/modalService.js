// import config from "../config";
import httpService from "./httpService";
import config from "./config.json";

const { api_url } = config;

// get meta
export function getMeta() {
  const url = `${api_url}/get-meta`;
  return httpService.get(url);
}

// get extra fields by id
export function getExtraFields(id) {
  const url = `${api_url}/get-fields?group_id=${id}`;
  return httpService.get(url);
}

// save extra fields
export function saveExtraFields(fields) {
  const url = `${api_url}/save-fields`;
  return httpService.post(url, fields);
}
