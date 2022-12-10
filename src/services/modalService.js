// import config from "../config";
import httpService from "./httpService";

// get order detail by id
export function getExtraFields(id) {
  const { api_url } = window.WCForce_Data;
  const url = `${api_url}/xxxx`;
  return httpService.get(url);
}

// add message in order
export function saveExtraFields(fields) {
  const { api_url } = window.WCForce_Data;
  const url = `${api_url}/save-extra-fields`;
  return httpService.post(url, fields);
}
