import React from "react";
import AllDaySelectedTime from "./CardCompo/AllDaySelectedTime.jsx";
import { useDispatch } from "react-redux";
import { dateControl } from "../../../modules/module/modal";
import DateType from "./CardCompo/DateType.jsx";
import "./All.scss";

function All() {
    return (
        <div className="flex">
            <AllDaySelectedTime />
            <DateType />
        </div>
    );
}

export default All;
