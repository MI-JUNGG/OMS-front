import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import DayHours from "./DayHours";
import { hours } from "../time";
import DateLeft from "../../../assets/images/date_picker/DateLeft";
import DateRight from "../../../assets/images/date_picker/DateRight";
import { cardTypeReducer } from "../../../modules/module/modal";
import { cardmodal } from "../../../modules/module/modal";
import "./Selectime.scss";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "./color/ColorPalette";
import { update } from "../../../modules/module/date";
import { endUpdate } from "../../../modules/module/endDate";
import { addCard } from "../../../modules/module/card";
import { callUserCard } from "../server";

function Selectime() {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(window.location.search);
    const day = searchParams.get("date");
    const formatDate = dayjs(day);
    const returnDate = formatDate.format("YYYY.MM.DD");

    const [date, setDate] = useState(returnDate);
    const navigate = useNavigate();

    const data = useSelector((state) => state.cardReducer);
    const card = useSelector((state) => state.cardReducer);
    const datePlusHandler = () => {
        const formatDate = new Date(date);
        formatDate.setDate(formatDate.getDate() + 1);
        const year = formatDate.getFullYear();
        const month = String(formatDate.getMonth() + 1).padStart(2, "0");
        const day = String(formatDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        const newLocation = `/day?date=${year}-${month}-${day}`;
        navigate(newLocation);
    };

    const dateMinusHandler = () => {
        const formatDate = new Date(date);
        formatDate.setDate(formatDate.getDate() - 1);
        const year = formatDate.getFullYear();
        const month = String(formatDate.getMonth() + 1).padStart(2, "0");
        const day = String(formatDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        const newLocation = `/day?date=${year}-${month}-${day}`;
        navigate(newLocation);
    };

    const fixModalHandler = (e, cardId) => {
        dispatch(cardmodal());
        dispatch(cardTypeReducer());
        const getData = cardId;

        const { start, end, title, url, memo, color } = card.find(
            (data) => data.cardId === cardId,
        );
        const parsedDate = dayjs(start);
        const parsedEndDate = dayjs(end);

        const formatTime = {
            year: parsedDate.year(),
            month: parsedDate.month() + 1,
            day: parsedDate.date(),
            time: parsedDate.hour(),
            minute: parsedDate.minute(),
        };
        const formattedEndDate = {
            year: parsedEndDate.year(),
            month: parsedEndDate.month() + 1,
            day: parsedEndDate.date(),
            time: parsedEndDate.hour(),
            minute: parsedEndDate.minute(),
        };
        dispatch(addCard(callUserCard));
        dispatch(update(formatTime));
        dispatch(endUpdate(formattedEndDate));
    };

    return (
        <div className="dayTable">
            <div className="dayChanger">
                <div className="minusDay" onClick={dateMinusHandler}>
                    <DateLeft />
                </div>
                <div>{returnDate}</div>
                <div className="plusDay" onClick={datePlusHandler}>
                    <DateRight />
                </div>
            </div>
            <div className="timeTable">
                <DayHours />
                <ul>
                    {hours.map((item) => {
                        const matchingData = card.filter(
                            (data) =>
                                dayjs(data.start).format("HH:mm") <= item &&
                                dayjs(data.end).format("HH:mm") > item,
                        );

                        if (matchingData.length > 0) {
                            return (
                                <li key={item} className="renderCard">
                                    {matchingData.map(
                                        ({ cardId, title, color, start }) =>
                                            dayjs(start).format("HH:mm") ===
                                            item ? (
                                                <div
                                                    onClick={(e) =>
                                                        fixModalHandler(
                                                            e,
                                                            cardId,
                                                        )
                                                    }
                                                    className="rederTitle"
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                    key={cardId}
                                                >
                                                    {title}
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={(e) =>
                                                        fixModalHandler(
                                                            e,
                                                            cardId,
                                                        )
                                                    }
                                                    className="rederempty"
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                    key={cardId}
                                                ></div>
                                            ),
                                    )}
                                </li>
                            );
                        } else {
                            return (
                                <li key={item} className="renderCard">
                                    <div className="empty"></div>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Selectime;
