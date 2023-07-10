import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { limitControl } from "../../../../modules/module/modal.js";
import DateDropDown from "./DateDropDown.jsx";
import "./RepeatBtn.scss";

function RepeatBtn() {
    const [showmodal, setShowModal] = useState(false);
    const year = useSelector((state) => state.limitReducer.year);
    const month = useSelector((state) => state.limitReducer.month);
    const day = useSelector((state) => state.limitReducer.day);
    const repeatType = useSelector((state) => state.limitReducer.value);
    const dispatch = useDispatch();
    const limitmodalHandler = () => {
        dispatch(limitControl());
    };
    const showModal = () => {
        setShowModal((prev) => !prev);
    };
    const blockmodal = () => {
        setShowModal(false);
    };
    const repeatString = `${year}년 ${month}월 ${day}일까지 반복`;
    return (
        <div id="repeatType">
            <div onClick={() => showModal(repeatType)} className="repeatBot">
                <button id="repeatText">{repeatType}</button>
                {showmodal && <DateDropDown showModal={blockmodal} />}
            </div>
            <button
                className="limitDate"
                type="button"
                onClick={limitmodalHandler}
            >
                {repeatString}
            </button>
        </div>
    );
}

export default RepeatBtn;
