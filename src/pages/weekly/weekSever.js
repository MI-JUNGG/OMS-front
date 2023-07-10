import axios from "axios";
import { API, token } from "../daily/server.js";

export const callData = (dateState, startDate, endDate) => {
    console.log(`${API}/week`);
    axios
        .get(`${API}/week`, {
            params: {
                startDate: startDate,
                endDate: endDate,
            },
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            dateState(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
