import axios from "../utils/axios";

export function getHome(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.get("/index-infos");
}



export function getList(params) {
  axios.defaults.headers["token"] = localStorage.getItem("token")
  return axios.get("/goods/list",{ params });
}


