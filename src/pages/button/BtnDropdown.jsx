import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../modules/module/modal";
import Trash from "./components/Trash";
import Setting from "./components/Setting";
import Edit from "./components/Edit";

function BtnDropdown() {
    const location = useLocation();
    const dispatch = useDispatch();
    const deleteCardHandler = () => {
        alert("일정을 클릭하여 삭제하세요!");
        dispatch(deleteCard());
    };
    const mypageHandler = () => {
        location("/mypage");
    };
    return (
        <div className="btnDropDown">
            <div className="clickIcon">
                <div onClick={mypageHandler}>
                    <Setting />
                </div>
                <div onClick={deleteCardHandler}>
                    <Trash />
                </div>
                <Edit />
            </div>
        </div>
    );
}

export default BtnDropdown;
