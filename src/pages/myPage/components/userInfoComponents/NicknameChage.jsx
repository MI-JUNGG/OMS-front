import "./NicknameChage.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userInfoChange, {
    nickName,
} from "../../../../modules/module/userInfoChange";

function NicknameChage() {
    const form = useSelector((state) => state.userInfoChangeReducer);

    const dispatch = useDispatch();

    const inputNickname = (e) => {
        dispatch(nickName(e.target.value));
    };

    return (
        <div className="NicknameChageContainer">
            <div className="userId">
                <h3>ID</h3>
                <span>userId@userId.com</span>
            </div>
            <div className="nicknameChage">
                <h3>닉네임</h3>
                <input
                    className="nicknameInput"
                    placeholder="NickName"
                    onChange={(e) => inputNickname(e)}
                />
            </div>
        </div>
    );
}

export default NicknameChage;
