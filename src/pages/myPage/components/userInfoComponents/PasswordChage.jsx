import { useState } from "react";
import {
    newPassword,
    password,
    repeatNewPassword,
} from "../../../../modules/module/userInfoChange";
import "./PasswordChage.scss";
import { useDispatch, useSelector } from "react-redux";

function PasswordChage() {
    const dispatch = useDispatch();

    const authPassword = (e) => {
        dispatch(password(e.target.value));
    };

    const form = useSelector((state) => state.userInfoChangeReducer);

    const inputNewpassword = (e) => {
        dispatch(newPassword(e.target.value));
    };
    const repeatNewpassword = (e) => {
        dispatch(repeatNewPassword(e.target.value));
    };

    return (
        <div className="passwordChageContainer">
            <div className="passwordChage">
                <span>현재 비밀번호</span>
                <input
                    className="passwordInput"
                    placeholder="비밀번호"
                    type="password"
                    onChange={(e) => authPassword(e)}
                />
            </div>
            <div className="passwordChage">
                <span>새 비밀번호</span>
                <input
                    className="passwordInput"
                    placeholder="비밀번호"
                    type="password"
                    onChange={(e) => inputNewpassword(e)}
                />
            </div>
            <div className="passwordChage">
                <span>새 비밀번호 확인</span>
                <input
                    className="passwordInput"
                    placeholder="비밀번호"
                    type="password"
                    onChange={(e) => repeatNewpassword(e)}
                />
            </div>
        </div>
    );
}

export default PasswordChage;
