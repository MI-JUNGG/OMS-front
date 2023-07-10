import { useDispatch, useSelector } from "react-redux";
import { sign } from "../../modules/module/sign";
import "./SignIn.scss";
import { KAKAO_AUTH_URL } from "./kakao";
import { NAVER_AUTH_URL } from "./LoginNaver";
// import NaverLogin from "./NaverLogin";
import { LoginNaver } from "./LoginNaver";
import axios from "axios";
import { useLocation } from "react-router";
import { email, password } from "/src/modules/module/login";
import { useEffect } from "react";
import NaverCallback from "./NaverCallback";

function SignIn() {
    const dispatch = useDispatch();

    const handleSignBox = () => {
        dispatch(sign(1));
    };

    const location = useLocation();

    const state = new URL(window.location.href).searchParams.get("state");

    const code = new URL(window.location.href).searchParams.get("code");

    const localLogin = useSelector((state) => state.loginReducer);

    const emailHandler = (e) => {
        dispatch(email(e.target.value));
    };
    const passwordHandler = (e) => {
        dispatch(password(e.target.value));
    };

    const userLogin = () => {
        axios
            .post(
                "http://10.99.230.245:3001/auth/signin",
                {
                    email: localLogin.email,
                    password: localLogin.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                alert("로그인 하셨습니다");
                localStorage.setItem("token", res.data.accessToken);
                window.location.replace("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="signInContainer">
                <h1>로그인</h1>
                <div className="userInput">
                    <input
                        className="userId"
                        placeholder="이메일"
                        onChange={emailHandler}
                    />
                    <input
                        className="userPassword"
                        placeholder="비밀번호"
                        onChange={passwordHandler}
                        type="password"
                    />
                </div>
                <div className="stayLogged">
                    <input type="checkbox" />
                    <span>로그인 상태 유지</span>
                </div>
                <div className="buttonZone">
                    <button className="loginBtn" onClick={userLogin}>
                        로그인
                    </button>
                    <div>
                        <span>아직 계정이 없으신가요?</span>
                        <a onClick={handleSignBox}>회원가입하기</a>
                    </div>
                </div>
                <div className="socialLogin">
                    <div
                        className="kakaoLogin"
                        onClick={() => {
                            window.location.href = KAKAO_AUTH_URL;
                        }}
                    >
                        <img src="/src/assets/images/social_logo/kakao.svg" />
                        <span>
                            Kakao
                            <br />
                            로그인
                        </span>
                    </div>
                    <div className="naverIdLogin">
                        <NaverCallback />
                        <span>
                            Naver
                            <br />
                            로그인
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
