import { useDispatch } from "react-redux";
import { limitControl } from "../../../../modules/module/modal";
import Year from "./limit/year";
import Month from "./limit/Month";
import Day from "./limit/Day";
import "../CardCompo/AlldayTime.scss";

function LimitDateSelect() {
    const dispatch = useDispatch();
    const saveDate = () => {
        dispatch(limitControl());
    };
    return (
        <div className="timeTable">
            <div className="yearPicker">
                <Year />
                <Month />
                <Day />
            </div>
            <div className="btnColor">
                <button onClick={saveDate}>Save</button>
            </div>
        </div>
    );
}

export default LimitDateSelect;
