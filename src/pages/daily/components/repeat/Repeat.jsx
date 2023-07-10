// Repeat.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    dateControl,
    endDateControl,
    repeatControl,
} from "../../../../modules/module/modal.js";

import DateRight from "../../../../assets/images/date_picker/DateRight.jsx";
import DateType from "../CardCompo/DateType.jsx";
import RepeatBtn from "./RepeatBtn.jsx";
import "../All.scss";

function Repeat() {
    const dispatch = useDispatch();

    const { month, day, time, minute } = useSelector((state) => {
        return state.dateReducer;
    });

    const endMonth = String(
        useSelector((state) => state.endDateReducer.month),
    ).padStart(2, "0");
    const endDay = String(
        useSelector((state) => state.endDateReducer.day),
    ).padStart(2, "0");
    const endMinute = String(
        useSelector((state) => state.endDateReducer.minute),
    ).padStart(2, "0");
    const endTime = String(
        useSelector((state) => state.endDateReducer.time),
    ).padStart(2, "0");

    const modalHandler = () => {
        dispatch(dateControl());
    };

    const endModalHandler = () => {
        dispatch(endDateControl());
    };

    return (
        <div id="Repeat">
            <div className="flex">
                <div className="timeBox" onClick={modalHandler}>
                    <div className="text">
                        <span>{String(month).padStart(2, "0")}월</span>
                        <span>{String(day).padStart(2, "0")}일</span>
                    </div>
                    <span>
                        {String(time).padStart(2, "0")} :{" "}
                        {String(minute).padStart(2, "0")}
                    </span>
                </div>
                <DateRight />
                <div className="timeBox" onClick={endModalHandler}>
                    <div className="text">
                        <span>{endMonth}월</span>
                        <span>{endDay}일</span>
                    </div>
                    <span>
                        {endTime} : {endMinute}
                    </span>
                </div>
                <DateType />
            </div>
            <RepeatBtn />
        </div>
    );
}

export default Repeat;
