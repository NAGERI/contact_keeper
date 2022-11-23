import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Bearer"] = "Authorization " + token;
  } else {
    delete axios.defaults.headers.common["Bearer"];
  }
};

export default setAuthToken;
