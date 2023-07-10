import "./NicknameChage.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userInfoChange, {
    nickName,
} from "../../../../modules/module/userInfoChange";

function NicknameChage(props) {
    const form = useSelector((state) => state.userInfoChangeReducer);
    const userInfo = props.userInfo;

    const dispatch = useDispatch();

    const inputNickname = (e) => {
        dispatch(nickName(e.target.value));
    };

    return (
        <div className="NicknameChageContainer">
            <div className="userId">
                <h3>ID</h3>
                <span>{userInfo.email}</span>
            </div>
            <div className="nicknameChage">
                <h3>닉네임</h3>
                <input
                    className="nicknameInput"
                    placeholder={userInfo.nickname}
                    onChange={(e) => inputNickname(e)}
                />
            </div>
        </div>
    );
}

export default NicknameChage;
