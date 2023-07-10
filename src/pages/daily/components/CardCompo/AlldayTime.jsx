import MonthSelector from "./MonthSelector.jsx";
import DaySelector from "./DaySelector.jsx";
import "./AlldayTime.scss";
import YearSelector from "./YearSelector.jsx";
import TimeSelector from "./TimeSelector.jsx";
import MinSelector from "./MinSelector.jsx";
import { useSelector, useDispatch } from "react-redux";
import { dateControl } from "../../../../modules/module/modal.js";

function AlldayTime() {
    const openModal = useSelector((state) => state.modalReducer.dateControl);
    const dispatch = useDispatch();
    const saveDate = () => {
        dispatch(dateControl());
    };
    return (
        <div className="timeTable">
            <div className="yearPicker">
                <YearSelector />
                <MonthSelector />
                <DaySelector />
                <TimeSelector />
                <p className="col">:</p>
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
