import axios from "axios";

export const api = axios.create({
  baseURL: "https://app.subsocial.network/subid/api/v1"
})