import axios from "axios";

export const api = axios.create({
  baseURL: "https://app.subsocial.network/subid/api/v1"
})

export const NETWORK_CHAIN_ICON_BASE_URL = "https://sub.id/images"