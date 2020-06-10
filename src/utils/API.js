// utils/API.js

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:59749/api/",
  responseType: "json"
});