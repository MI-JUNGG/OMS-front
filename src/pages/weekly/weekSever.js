import axios from "axios";
import { API, token } from "../daily/server";

export const callData = (data, start, end) => {
    console.log(start);
    axios
        .get(`${API}/week`, {
            params: {
                startDate: start,
                endDate: end,
            },
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            console.log(response.data);
            data(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
