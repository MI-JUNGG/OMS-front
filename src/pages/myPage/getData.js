import axios from "axios";

// export const API = "http://10.99.230.245:3001";
export const API = "/data";
export const token = localStorage.getItem("token");

export const getData = (endpoint, getresponse, params) => {
    axios
        .get(`${API}/${endpoint}`, {
            params: { params },
            headers: { Authorization: token },
        })
        .then((response) => {
            getresponse(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
