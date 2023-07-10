import axios from "axios";

import { addCard } from "../../modules/module/card";

export const API = "http://10.99.230.245:3001";
export const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODczMjA5MzF9.IPsILZ50ZUhLMwCwkzHs3dM75GnaBrvNtjV7U0Ord08";
export const callUserCard = (handleOutClick, day) => {
    axios
        .get("http://10.99.230.245:3001/day", {
            params: {
                //수정
                startDate: day,
            },
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            console.log(response.data);
            handleOutClick([...response.data]);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const counterHandler = (
    title,
    contents,
    repeatE,
    endDate,
    color,
    url,
    repeatCardType,
) => {
    console.log(repeatCardType);

    const config = {
        headers: {
            Authorization: token,
        },
    };

    axios
        .post(
            "http://10.99.230.245:3001/card",
            {
                title: title,
                memo: contents,
                startDate: repeatE.toISOString(),
                repeatId: repeatCardType,
                endDate: repeatE.toISOString(),
                color: "#1234",
                link: url,
                deadline: repeatE.toISOString(),
            },
            config,
        )
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log("error", error);
        });

    console.log(endDate);
};

export const FixCardHandler = (
    title,
    contents,
    repeatE,
    repeatId,
    endDate,
    color,
    url,
) => {
    console.log(title, contents, repeatE, repeatId, endDate, color, url);
    axios
        .put(
            `http://${API}:3001/card`,
            {
                cardId: 26,
                title: title,
                memo: contents,
                startDate: repeatE.toISOString(),
                repeatId: 2,
                endDate: repeatE.toISOString(),
                color: color,
                link: url,
                deadline: repeatE.toISOString(),
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const DeleteCardHandler = (cardId) => {
    axios
        .delete(`http://${API}:3001/card`, {
            headers: {
                Authorization: token,
            },
            data: {
                cardId: 27,
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (data) {
            console.log(data);
        });
};
