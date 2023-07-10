/* 이게 종일 컴포넌트*/

import { useDispatch, useSelector } from "react-redux";
import {
    repeatControl,
    repeatEndControl,
} from "../../../../modules/module/modal";
import DateRight from "../../../../assets/images/date_picker/DateRight";
import "./AllDaySelectedTime.scss";

function AllDaySelectedTime() {
    const dispatch = useDispatch();
    const { year, month, day } = useSelector((state) => {
        return state.dateReducer;
    });

    const repeatStart = useSelector(
        (state) => state.modalReducer.repeatControl,
    );
    const repeatEnd = useSelector(
        (state) => state.modalReducer.repeatEndControl,
    );
    const d = useSelector((state) => {
        return state.endDateReducer.day;
    });
    const m = useSelector((state) => {
        return state.endDateReducer.month;
    });
    const y = useSelector((state) => {
        return state.endDateReducer.year;
    });

    const isBoolean = useSelector((state) => {
        return state.modalReducer.dateControl;
    });

    const modalhandler = () => {
        dispatch(repeatControl());
        repeatEnd && dispatch(repeatEndControl());
    };

    const endModalHandler = () => {
        dispatch(repeatEndControl());
        repeatStart && dispatch(repeatControl());
    };

    const getDayOfWeek = (year, month, day) => {
        const today = new Date(year, month, day);
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = today.getDay();
        const dayOfWeek = daysOfWeek[dayIndex];
        return dayOfWeek;
    };

    return (
        <div className="selectedDate">
            <div className="textAll" onClick={modalhandler}>
                <span>{month}월</span>
                <span>{day}일</span>
                <span>({getDayOfWeek(year, month, day)})</span>
            </div>

            <DateRight />

            <div className="textAll" onClick={endModalHandler}>
                <span>{m}월</span>
                <span>{d}일</span>
                <span>({getDayOfWeek(y, m, d)})</span>
            </div>
        </div>
    );
}

export default AllDaySelectedTime;
