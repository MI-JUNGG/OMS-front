import React, { useEffect } from "react";
import { KAKAO_CLIENT_ID, KAKAO_GRANT_TYPE, KAKAO_REDIRECT_URI } from "./kakao";
import axios from "axios";

function KakoCallback() {
    const code = new URL(window.location.href).searchParams.get("code");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const lastDay = new Date(year, month, 0);

    const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
    const endDate = `${year}-${month
        .toString()
        .padStart(2, "0")}-${lastDay.getDate()}`;

    const url = `/month?date=${startDate}&date=${endDate}`;

    useEffect(() => {
        axios
            .post(
                `https://kauth.kakao.com/oauth/token?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`,
                {},
                {
                    headers: {
                        " Content-type":
                            "application/x-www-form-urlencoded;charset=utf-8",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                const accessToken = res.data.access_token;
                localStorage.setItem("token", accessToken);
                alert("성공적으로 로그인 했습니다");
                //백엔드에 넘겨주기
                axios
                    .post(
                        "http://10.99.230.245:3001/auth/kakao",
                        {
                            kakaoToken: localStorage.getItem("token"),
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem("token"),
                                " Content-type":
                                    "application/x-www-form-urlencoded;charset=utf-8",
                            },
                        },
                    )
                    .then((response) => {
                        console.log(response);
                        localStorage.setItem(
                            "token",
                            response.data.accessToken,
                        );
                        // window.location.replace("/");
                    })
                    .then((error) => {
                        console.log(error);
                    });

                window.location.href = url;
            })
            .then((err) => console.log(err));
    }, [code]);
    return <div></div>;
}

export default KakoCallback;
