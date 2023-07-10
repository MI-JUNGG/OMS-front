import EndYear from "./end/EndYear";
import EndMonth from "./end/EndMonth";
import EndDay from "./end/EndDay";
import { useDispatch } from "react-redux";
import { repeatEndControl } from "../../../../modules/module/modal";
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
