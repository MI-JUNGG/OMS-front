import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    nickName,
    password,
    eMail,
    confirmPassword,
} from "../../modules/module/user";
import axios from "axios";
import "./SignUp.scss";
import { sign } from "../../modules/module/sign";

function SignUp() {
    const [isComplete, setIsComplete] = useState(false);

    const dispatch = useDispatch();
    const userInputForm = useSelector((state) => state.userReducer);

    const backToLogin = () => {
        dispatch(sign(0));
    };

    const nickNameHandler = (e) => {
        dispatch(nickName(e.target.value));
    };
    const eMailHandler = (e) => {
        dispatch(eMail(e.target.value));
    };
    const passwordHandler = (e) => {
        dispatch(password(e.target.value));
    };
    const confirmPasswordHandler = (e) => {
        dispatch(confirmPassword(e.target.value));
    };

    function validateInputs() {
        if (
            !RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(
                userInputForm.eMail,
            ) ||
            !RegExp(
                "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})",
            ).test(userInputForm.password) ||
            userInputForm.confirmPassword !== userInputForm.password
        ) {
            return false;
        }
        return true;
    }

    const userInfoSub = () => {
        console.log("A");
        axios
            .post(
                "http://192.168.219.152:3001/auth/signup",
                {
                    nickname: userInputForm.nickName,
                    email: userInputForm.eMail,
                    password: userInputForm.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                alert("성공!");
            })
            .catch((err) => {
                console.log(err);
                alert("실패!");
            });
    };

    const kakaoSignUp = () => {
        window.location.href =
            "https://accounts.kakao.com/weblogin/create_account/?app_type=web&continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fservice%3D52%26category%3D168%26locale%3Dko&lang=ko#selectVerifyMethod";
    };

    const naverSignUp = () => {
        window.location.href =
            "https://nid.naver.com/user2/V2Join.nhn?m=agree&lang=ko_KR&cpno=";
    };

    return (
        <>
            <div className="signUpContainer">
                <h1 className="signUpTitle">회원가입</h1>
                <div className="guidWordWrapper">
                    <span
                        className="guideWord"
                        style={{
                            display: `${isComplete ? "flex" : "none"}`,
                        }}
                    >
                        입력하신 정보를 다시 확인해주세요.
                    </span>
                </div>
                <div className="inputZone">
                    <div>
                        <input
                            type="text"
                            name="nickname"
                            placeholder="닉네임"
                            value={userInputForm.nickName}
                            autoComplete="off"
                            onChange={(e) => {
                                nickNameHandler(e);
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="이메일"
                            value={userInputForm.eMail}
                            autoComplete="off"
                            onChange={(e) => {
                                eMailHandler(e);
                            }}
                            className={
                                userInputForm.eMail.length > 0 &&
                                !RegExp(
                                    "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
                                ).test(userInputForm.eMail)
                                    ? "error-input"
                                    : ""
                            }
                        />
                        {userInputForm.eMail.length > 0 ? (
                            !RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(
                                userInputForm.eMail,
                            ) ? (
                                <span>올바른 이메일 형식이 아닙니다.</span>
                            ) : null
                        ) : null}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={userInputForm.password}
                            autoComplete="off"
                            onChange={(e) => {
                                passwordHandler(e);
                            }}
                            className={
                                userInputForm.password.length > 0 &&
                                !RegExp(
                                    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})",
                                ).test(userInputForm.password)
                                    ? "error-input"
                                    : ""
                            }
                        />
                        {userInputForm.password.length > 0 &&
                        !RegExp(
                            "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})",
                        ).test(userInputForm.password) ? (
                            <span>
                                비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두
                                포함한 8~20자여야 합니다.
                            </span>
                        ) : null}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="비밀번호 확인"
                            value={userInputForm.confirmPassword}
                            autoComplete="off"
                            onChange={(e) => {
                                confirmPasswordHandler(e);
                            }}
                            className={
                                userInputForm.confirmPassword.length > 0 &&
                                userInputForm.confirmPassword !==
                                    userInputForm.password
                                    ? "error-input"
                                    : ""
                            }
                        />
                        {userInputForm.confirmPassword.length > 0 ? (
                            userInputForm.confirmPassword !==
                            userInputForm.password ? (
                                <span>비밀번호가 일치하지않습니다.</span>
                            ) : (
                                ""
                            )
                        ) : null}
                    </div>
                </div>
                <button
                    className="signUpSub"
                    type="submit"
                    onClick={() => {
                        if (validateInputs()) {
                            userInfoSub();
                        } else {
                            setIsComplete(true);
                        }
                    }}
                >
                    회원가입
                </button>
                <div className="backToLogin">
                    <span>이미 계정이 있으신가요?</span>
                    <a onClick={backToLogin}>로그인하기</a>
                </div>
                <div className="socialSignUp">
                    <div className="kakaoSignUp" onClick={kakaoSignUp}>
                        <img src="/src/assets/images/social_logo/kakao.svg" />
                        <span>
                            Kakao
                            <br />
                            회원가입
                        </span>
                    </div>
                    <div className="naverSignUp" onClick={naverSignUp}>
                        <img src="/src/assets/images/social_logo/naver.svg" />
                        <span>
                            Naver
                            <br />
                            회원가입
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
