import { useEffect, useState } from "react";
import "./UserInfo.scss";
import NicknameChage from "./userInfoComponents/NicknameChage";
import PasswordChage from "./userInfoComponents/PasswordChage";
import {
    nickName,
    password,
    repeatNewPassword,
    newPassword,
} from "../../../modules/module/userInfoChange";
import { useSelector } from "react-redux";

function UserInfo() {
    const [contentSelector, setContentSelector] = useState(0);
    const contentChanger = (id) => {
        setContentSelector(id);
    };
    const form = useSelector((state) => state.userInfoChangeReducer);
    console.log(form.nickName);

    // useEffect(() => {
    //     fetch("http://10.99.230.245/mypage", {
    //         method: "GET",
    //         headers: {
    //             Authorization:
    //                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODczMjU0NDh9.GfMx3DKfCSMsSPWx6WXNb9NW9gi0jvfnof9A91I8ZWc",
    //         },
    //     })
    //         .then((data) => data.json())
    //         .then((data) => console.log(data))
    //         .then((data) => setUserInfo(data))
    //         .catch((err) => console.log(err));
    // }, []);

    const changeNickname = () => {
        fetch("http://192.168.0.5:3001/mypage/changeInfo", {
            method: "PUT",
            headers: {
                Authorization:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODYyMTMyNDF9.zw_otMjvyPKmFiz2rmWx8HMykWVq5UkNjfdKm10XJcE",
                "Content-Type": "application/json", // JSON 형식으로 요청을 보내기 위해 Content-Type을 설정
            },
            body: JSON.stringify({
                nickname: form.nickName,
            }),
        })
            .then((data) => data.json())
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    console.log(form.password, form.newPassword);

    const changepassword = () => {
        fetch("http://192.168.0.5:3001/mypage/changeInfo", {
            method: "PUT",
            headers: {
                Authorization:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODYyMTMyNDF9.zw_otMjvyPKmFiz2rmWx8HMykWVq5UkNjfdKm10XJcE",
                "Content-Type": "application/json", // JSON 형식으로 요청을 보내기 위해 Content-Type을 설정
            },
            body: JSON.stringify({
                currentPassword: form.password,
                newPassword: form.newPassword,
            }),
        })
            .then((data) => data.json())
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="userInfoContainer">
                <div className="userInfoBox">
                    <div className="contentSelector">
                        <h2
                            className={
                                contentSelector === 0 ? "active" : "inactive"
                            }
                            onClick={() => contentChanger(0)}
                        >
                            내정보
                        </h2>
                        <h2
                            className={
                                contentSelector === 1 ? "active" : "inactive"
                            }
                            onClick={() => contentChanger(1)}
                        >
                            비밀번호
                        </h2>
                    </div>
                    <div className="myPageContent">
                        {contentSelector === 0 ? (
                            <NicknameChage />
                        ) : (
                            <PasswordChage />
                        )}
                    </div>
                    <div className="buttonZone">
                        <button
                            className="SubButton"
                            type="button"
                            onClick={changepassword}
                        >
                            저장하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserInfo;
