import React, { useEffect } from "react";
import { KAKAO_CLIENT_ID, KAKAO_GRANT_TYPE, KAKAO_REDIRECT_URI } from "./kakao";
import axios from "axios";

function KakoCallback() {
    const code = new URL(window.location.href).searchParams.get("code");
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
                console.log("b");
                console.log(res);
                const accessToken = res.data.access_token;
                localStorage.setItem("token", accessToken);
                alert("성공적으로 로그인 했습니다");
                window.location.replace("/");
            })
            .then((err) => console.log(err));
    }, [code]);
    return <div></div>;
}

export default KakoCallback;
