import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hours, days } from "../daily/time";
import { callData } from "./weekSever";
import Hour from "./Hour";
import DateLeft from "../../assets/images/date_picker/DateLeft";
import DateRight from "../../assets/images/date_picker/DateRight";
import dayjs from "dayjs";
import "./weekly.scss";

function Weekly() {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const day = searchParams.get("sundayDate");
    const formatDate = dayjs(day);
    const starDate = formatDate.format("YYYY-MM-DD");
    const endDate = dayjs(starDate).add(7, "day").format("YYYY-MM-DD");

    const returnDate = formatDate.format("YYYY.MM.DD");
    const startDate = searchParams.get("sundayDate");
    const [data, setData] = useState([]);
    const [date, setDate] = useState(returnDate);
    const dates = [];
    for (let i = 0; i < 7; i++) {
        let date = dayjs(startDate).add(i, "day");
        dates.push(dayjs(date).format("DD"));
    }
    const formattedDateTime = dayjs(startDate).format("YYYY-MM-DD HH:mm");
    const getDate = dayjs(startDate).format("DD");

    const dayOfWeek = dayjs(formattedDateTime).format("ddd");

    const datePlusHandler = () => {
        const formatDate = new Date(date);
        formatDate.setDate(formatDate.getDate() + 7);
        const year = formatDate.getFullYear();
        const month = String(formatDate.getMonth() + 1).padStart(2, "0");
        const day = String(formatDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        const newLocation = `/weekly?sundayDate=${year}-${month}-${day}`;
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
        const newLocation = `/weekly?sundayDate=${year}-${month}-${day}`;
        navigate(newLocation);
    };

    useEffect(() => {
        callData(setData, startDate, endDate);
    }, [setData]);

    return (
        <div>
            <div className="dayChanger">
                <div className="minusDay" onClick={dateMinusHandler}>
                    <DateLeft />
                </div>
                <div>{returnDate}</div>
                <div className="plusDay" onClick={datePlusHandler}>
                    <DateRight />
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
                                    {day}
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
                                    const findData = data.filter((item) => {
                                        const transStartHour = dayjs(
                                            item.start,
                                        ).format("HH:mm");
                                        const transEndHour = dayjs(
                                            item.end,
                                        ).format("HH:mm");
                                        const itemDate = dayjs(
                                            item.start,
                                        ).format("DD");
                                        console.log(currentDate, ":", itemDate);
                                        return (
                                            currentDate === itemDate &&
                                            hour >= transStartHour &&
                                            hour < transEndHour
                                        );
                                    });

                                    return (
                                        <div
                                            className="timetable__cell"
                                            key={day + hour}
                                        >
                                            {findData.map((item) => (
                                                <div
                                                    className="rederWeekData"
                                                    style={{
                                                        backgroundColor:
                                                            item.color,
                                                    }}
                                                    key={item.cardId}
                                                >
                                                    {item.title}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weekly;
