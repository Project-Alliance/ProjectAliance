import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.43.107:5005/api/",
  headers: {
    "Content-type": "application/json",
  }
});
