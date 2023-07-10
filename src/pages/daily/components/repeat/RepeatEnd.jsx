import EndYear from "./end/EndYear.jsx";
import EndMonth from "./end/EndMonth.jsx";
import EndDay from "./end/EndDay.jsx";
import { useDispatch } from "react-redux";
import { repeatEndControl } from "../../../../modules/module/modal.js";
import "../CardCompo/AlldayTime.scss";

function RepeatEnd() {
    const dispathch = useDispatch();
    const onClickHandler = () => {
        dispathch(repeatEndControl());
    };
    return (
        <div className="timeTable">
            <div className="yearPicker">
                <EndYear />
                <EndMonth />
                <EndDay />
            </div>
            <div className="btnColor">
                <button onClick={onClickHandler}>저장</button>
            </div>
        </div>
    );
}

export default RepeatEnd;
