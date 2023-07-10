import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NaverCallback = () => {
    const { naver } = window;
    const NAVER_CLIENT_ID = "W9f_MEprUwIoTeyjePIb";
    const NAVER_CALLBACK_URL = "http://localhost:5173/auth/naver/callback";
    const navigate = useNavigate();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const lastDay = new Date(year, month, 0);

    const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
    const endDate = `${year}-${month
        .toString()
        .padStart(2, "0")}-${lastDay.getDate()}`;

    const homePageUrl = `/month?date=${startDate}&date=${endDate}`;

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            // 팝업창으로 로그인을 진행할 것인지?
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: "green", type: 1, height: 65 },
            callbackHandle: true,
        });
        naverLogin.init();

        // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
        // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
        // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

        // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
        // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

        // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
        // 코드 생략이 가능하다.

        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                // 아래처럼 선택하여 추출이 가능하고,
                const userid = naverLogin.user.getEmail();
                const username = naverLogin.user.getName();
                // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
                // setUserInfo(naverLogin.user)
            }
        });
        // 요기!
    };

    // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 어스코드가 붙어서 전달된다.
    // 우선 아래와 같이 어스코드를 추출 할 수 있으며,
    // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

    const userAccessToken = () => {
        window.location.href.includes("access_token") && getToken();
        navigate(homePageUrl);
    };

    const getToken = () => {
        const url = window.location.href;
        const urlObject = new URL(url);
        const accessToken = urlObject.hash.split("=")[1].split("&")[0];

        console.log(accessToken);

        localStorage.setItem("token", accessToken);

        // axios
        //     .post(
        //         "http://10.99.230.245:3001/auth/naver",
        //         {
        //             naverToken: localStorage.getItem("token"),
        //         },
        //         {
        //             headers: {
        //                 Authorization: localStorage.getItem("token"),
        //                 " Content-type":
        //                     "application/x-www-form-urlencoded;charset=utf-8",
        //             },
        //         },
        //     )
        //     .then((response) => {
        //         console.log(response);
        //         // localStorage.setItem("1", response.data.accessToken);
        //         window.location.href = homePageUrl;
        //     })
        //     .then((error) => {
        //         console.log(error);
        //         alert("에러가 발생했습니다. 다시 로그인 해주세요");
        //         window.location.href = homePageUrl;
        //     });
    };

    useEffect(() => {
        initializeNaverLogin();
        userAccessToken();
    }, []);

    return (
        <>
            <div id="naverIdLogin" />
        </>
    );
};

export default NaverCallback;
