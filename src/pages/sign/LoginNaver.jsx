import { useEffect } from "react";
import axios from "axios";

export const NAVER_CLIENT_ID = "W9f_MEprUwIoTeyjePIb";
export const NAVER_CLIENT_SECRET = "z9qj_eIPjD";
export const NAVER_STATE_STRING = Math.random().toString(36).substr(3, 14);
export const NAVER_CALLBACK_URI = "http://localhost:5173/auth/naver/callback";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE_STRING}&redirect_uri=${NAVER_CALLBACK_URI}`;
export const NAVER_ACCESS_TOKEN_URL = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg`;

export function LoginNaver() {
    console.log("A");
    const code = new URL(window.location.href).searchParams.get("code");
    const loginFormWithNaver = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URI,
            isPopup: false,
        });
        naverLogin.init();
    };

    useEffect(() => {
        loginFormWithNaver();
    }, []);

    const NAVER_CLIENT_ID = "W9f_MEprUwIoTeyjePIb";
    const NAVER_CLIENT_SECRET = "z9qj_eIPjD";
    const NAVER_STATE_STRING = Math.random().toString(36).substr(3, 14);
    const NAVER_CALLBACK_URI = "http://localhost:5173/auth/naver/callback";

    const state = new URL(window.location.href).searchParams.get("state");

    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE_STRING}&redirect_uri=${NAVER_CALLBACK_URI}`;
    const NAVER_ACCESS_TOKEN_URL = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg&state=${state}`;

    console.log(state);
    console.log(code);
    useEffect(() => {
        axios
            .post(
                `/oauth2.0/token?client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&grant_type=authorization_code&state=${state}&code=${code}`,

                {},
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                },
            )
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                console.log("a");
            })
            .then((err) => console.log(err));
    }, [code]);

    return <div id="naverIdLogin"> </div>;
}
