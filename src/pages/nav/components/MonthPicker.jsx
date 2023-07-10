import React from "react";
import { month } from "../../../modules/module/monthPicker.js";
import { useDispatch, useSelector } from "react-redux";
import "./MonthPicker.scss";

function MonthPicker() {
    const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const form = useSelector((state) => state.monthReducer);

    const dispatch = useDispatch();

    const selectMonth = (list) => {
        dispatch(month(list));
    };

    return (
        <>
            <div className="monthContainer">
                <div className="monthListWrapper">
                    {monthList.map((list, i) => {
                        return (
                            <li
                                className={
                                    form.month === list ? "pick" : "monthList"
                                }
                                key={i}
                                onClick={() => selectMonth(list)}
                                name="month"
                            >
                                {list}
                            </li>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default MonthPicker;
