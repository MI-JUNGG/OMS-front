import { useState, useEffect } from "react";
import Card from "../daily/components/Card.jsx";
import { useNavigate } from "react-router-dom";
import { hours, days } from "../daily/time.js";
import { callData } from "./weekSever.js";
import { addCard } from "../../modules/module/card.js";
import Button from "../button/Button.jsx";
import Hour from "./Hour.jsx";
import DateLeft from "../../assets/images/date_picker/DateLeft.jsx";
import DateRight from "../../assets/images/date_picker/DateRight.jsx";
import dayjs from "dayjs";
import { cardmodal } from "../../modules/module/modal.js";
import { useDispatch, useSelector } from "react-redux";
import LoginModalBackground from "../sign/LoginModalBackground.jsx";
import { addDate, addMonth, addDay } from "../../modules/module/date.js";
import { eaddDate, eaddMonth, eaddDay } from "../../modules/module/endDate.js";
import { newDate } from "../../modules/module/repeatStart.js";
import {
    laddDate,
    laddMonth,
    laddDay,
    initialReducer,
} from "../../modules/module/Limit.js";
import "./weekly.scss";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter.js";
import { idHandler } from "../../modules/module/modal.js";

function Weekly() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(window.location.search);
    const day = searchParams.get("date");
    const formatDate = dayjs(day);
    const starDate = formatDate.format("YYYY-MM-DD");
    const endDate = dayjs(starDate).add(7, "day").format("YYYY-MM-DD");
    const openCard = useSelector((state) => state.modalReducer.cardmodal);

    const returnDate = formatDate.format("YYYY.MM.DD");
    const startDate = searchParams.get("date");
    const data = useSelector((state) => state.cardReducer.week);
    const [date, setDate] = useState(returnDate);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        let date = dayjs(startDate).add(i, "day");
        dates.push(dayjs(date).format("DD"));
    }
    const formattedDateTime = dayjs(startDate).format("YYYY-MM-DD HH:mm");
    const getDate = dayjs(startDate).format("DD");

    const dayOfWeek = dayjs(formattedDateTime).format("ddd");

    const weekCard = useSelector((state) => state.cardReducer.week);

    const datePlusHandler = () => {
        const formatDate = new Date(date);
        formatDate.setDate(formatDate.getDate() + 7);
        const year = formatDate.getFullYear();
        const month = String(formatDate.getMonth() + 1).padStart(2, "0");
        const day = String(formatDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        const newLocation = `/weekly?date=${year}-${month}-${day}`;
        navigate(newLocation);
    };

    const dateMinusHandler = () => {
        const formatDate = new Date(date);
        formatDate.setDate(formatDate.getDate() - 7);
        const year = formatDate.getFullYear();
        const month = String(formatDate.getMonth() + 1).padStart(2, "0");
        const day = String(formatDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        const newLocation = `/weekly?date=${year}-${month}-${day}`;
        navigate(newLocation);
    };
    const dateState = (data) => {
        console.log(data);
        dispatch(addCard({ cardType: "week", cardData: data }));
    };

    useEffect(() => {
        callData(dateState, startDate, endDate);
    }, [startDate]);

    const fixHandler = (id) => {
        dispatch(cardmodal());
        dispatch(idHandler({ cardData: "week", cardid: id }));
    };

    return (
        <div className="week">
            {openCard === true && (
                <>
                    <LoginModalBackground />
                    <Card />
                </>
            )}
            <div className="weekTopContainer">
                <div className="dayChangerContainer">
                    <div className="dayChanger">
                        <div className="minusDay" onClick={dateMinusHandler}>
                            <DateLeft />
                        </div>
                        <div className="showDay">{returnDate}</div>
                        <div className="plusDay" onClick={datePlusHandler}>
                            <DateRight />
                        </div>
                    </div>
                </div>
                <div className="weekContainer">
                    <Hour />
                    <div className="timetable">
                        <div className="timetable__header">
                            {days.map((day, index) =>
                                day === "Sun" || day === "Sat" ? (
                                    <div
                                        style={{ color: "#FC9690" }}
                                        className="timetable__day"
                                        key={index}
                                    >
                                        <p>{day}</p>
                                        {dates[index]}
                                    </div>
                                ) : (
                                    <div className="timetable__day" key={index}>
                                        <p>{day}</p>
                                        {dates[index]}
                                    </div>
                                ),
                            )}
                        </div>
                        <div className="timetable__body">
                            {hours.map((hour) => (
                                <div className="timetable__row" key={hour}>
                                    {days.map((day, index) => {
                                        const currentDate = dates[index];
                                        const findData = weekCard.filter(
                                            (item) => {
                                                const transStartHour = dayjs(
                                                    item.startDate,
                                                ).format("HH:mm");
                                                const transEndHour = dayjs(
                                                    item.endDate,
                                                ).format("HH:mm");
                                                const itemDate = dayjs(
                                                    item.startDate,
                                                ).format("DD");
                                                return (
                                                    currentDate === itemDate &&
                                                    hour >= transStartHour &&
                                                    hour < transEndHour
                                                );
                                            },
                                        );

                                        return (
                                            <div
                                                className="timetable__cell"
                                                key={day + hour}
                                            >
                                                {findData.map((item) =>
                                                    dayjs(
                                                        item.startDate,
                                                    ).format("HH:mm") ===
                                                    hour ? (
                                                        <div
                                                            onClick={() =>
                                                                fixHandler(
                                                                    item.cardId,
                                                                )
                                                            }
                                                            className="rederWeekData"
                                                            style={{
                                                                backgroundColor:
                                                                    item.color,
                                                            }}
                                                            key={item.cardId}
                                                        >
                                                            {item.title}
                                                        </div>
                                                    ) : (
                                                        <div
                                                            onClick={() =>
                                                                fixHandler(
                                                                    item.cardId,
                                                                )
                                                            }
                                                            className="rederWeekData"
                                                            style={{
                                                                backgroundColor:
                                                                    item.color,
                                                            }}
                                                            key={item.cardId}
                                                        ></div>
                                                    ),
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttonContainer">
                <Button />
            </div>
        </div>
    );
}

export default Weekly;
