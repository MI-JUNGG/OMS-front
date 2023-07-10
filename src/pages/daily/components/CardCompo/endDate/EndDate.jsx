import DaySelector from "./DaySelector";
import Mselector from "./Mselector";
import YearSelector from "./YearSelector";
import { useSelector, useDispatch } from "react-redux";
import { endDateControl } from "../../../../../modules/module/modal";
import "../AlldayTime.scss";
import TimeSelector from "../TimeSelector";
import MinSelector from "../MinSelector";

function AlldayTime() {
    const dispatch = useDispatch();
    const saveDate = () => {
        dispatch(endDateControl());
    };
    return (
        <div className="timeTable">
            <div className="yearPicker">
                <YearSelector />
                <Mselector />
                <DaySelector />
                <TimeSelector />
                <p>:</p>
                <MinSelector />
            </div>
            <div className="btnColor">
                <button>반복 종료 안함</button>
                <button onClick={saveDate}>저장</button>
            </div>
        </div>
    );
}

export default AlldayTime;
