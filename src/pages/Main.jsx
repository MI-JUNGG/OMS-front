import { useEffect, useState } from "react";
import "./Main.scss";
import { useDispatch, useSelector } from "react-redux";
import { month } from "../modules/module/monthPicker";
import { year } from "../modules/module/year";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import axios from "axios";

function Main() {
    const yearForm = useSelector((state) => state.yearReducer.value);
    const monthForm = useSelector((state) => state.monthReducer.month);
    const monthList = useSelector((state) => state.monthReducer.monthList);
    const dispatch = useDispatch();

    const date = new Date(yearForm, monthForm - 1);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const startDate = `${yearForm}-${monthForm}-01_00:00:00`;
        const endDate = `${yearForm}-${monthForm}-${daysInMonth(
            yearForm,
            monthForm - 1,
        )}_23:59:59`;

        fetch("/data/test.json")
            .then((response) => response.json())
            .then((data) => {
                const backgroundColor = data[0].data.backgroundColor;
                document.documentElement.style.setProperty(
                    "--background-color",
                    backgroundColor,
                );
            });

        //     axios
        //         .get("/data/date.json")
        //         .then((response) => {
        //             setSchedule(response.data);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // }, []);

        // axios
        //     .get("http://192.168.219.152:3001/month", {
        //         params: {
        //             startDate: startDate,
        //             endDate: endDate,
        //         },
        //         headers: {
        //             Authorization: localStorage.getItem("token"),
        //         },
        //     })
        //     .then((response) => {
        //         console.log(response);
        //         setSchedule(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        // fetch("http://192.168.0.5:3001/mypage/theme", {
        //     method: "GET",
        //     headers: {
        //         Authorization:
        //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODYyMjEyNTN9.OTJL43-q4t35oxcfbQ0kcUVkTBmdJVIrEVSBdIdzeuY",
        //         "Content-Type": "application/json", // JSON 형식으로 요청을 보내기 위해 Content-Type을 설정
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .then((data) => dispatch(color(data)));
    }, []);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [];
    monthNames.push(monthList.map((value) => value + "월"));

    const handlePrevMonth = () => {
        if (monthForm === 1) {
            dispatch(month(12));
            dispatch(year(yearForm - 1));
        } else {
            dispatch(month(monthForm - 1));
        }
    };

    const handleNextMonth = () => {
        if (monthForm === 12) {
            dispatch(month(1));
            dispatch(year(yearForm + 1));
        } else {
            dispatch(month(monthForm + 1));
        }
    };

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const dateToday = () => {
        return new Date().getDate();
    };

    const handleDateClick = (event) => {
        const clickedDate = event.target.textContent;
        const newLocation = `/day?date=${yearForm}-${monthForm}-${clickedDate}`;
        window.location.href = newLocation;
    };

    const renderDays = () => {
        const days = [];
        const daysCount = daysInMonth(date.getFullYear(), date.getMonth());
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
        const today = dateToday();

        let day = 1;
        for (let r = 0; r < 5; r++) {
            const rowDays = [];
            for (let c = 0; c < 7; c++) {
                if (r === 0 && c < firstDay) {
                    const prevMonthDaysCount = daysInMonth(
                        date.getFullYear(),
                        date.getMonth() - 1,
                    );
                    const prevMonthDay =
                        prevMonthDaysCount - (firstDay - c) + 1;
                    rowDays.push(
                        <div
                            key={`prev-${c}`}
                            className="day prev-month-day"
                            onClick={handleDateClick}
                        >
                            {prevMonthDay}
                        </div>,
                    );
                } else if (day > daysCount) {
                    const nextMonthDay = day - daysCount;
                    rowDays.push(
                        <div
                            key={`next-${c}`}
                            className="day next-month-day"
                            onClick={handleDateClick}
                        >
                            {nextMonthDay}
                        </div>,
                    );
                    day++;
                } else {
                    const dayHasSchedule = schedule.find((item) => {
                        const itemDate = new Date(item.date);
                        return (
                            itemDate.getFullYear() === date.getFullYear() &&
                            itemDate.getMonth() === date.getMonth() &&
                            itemDate.getDate() === day &&
                            item.state_Id === 1
                        );
                    });

                    const shortSchedule = schedule.find((item) => {
                        const itemDate = new Date(item.date);
                        return (
                            itemDate.getFullYear() === date.getFullYear() &&
                            itemDate.getMonth() === date.getMonth() &&
                            itemDate.getDate() === day &&
                            item.state_Id === 2
                        );
                    });

                    rowDays.push(
                        <div
                            key={`day-${day}`}
                            className={`${today === day ? "today" : "day"} ${
                                dayHasSchedule ? "dayHasSchedule" : ""
                            } ${shortSchedule ? "shortSchedule" : ""}`}
                            onClick={handleDateClick}
                        >
                            <span>{day}</span>
                            {dayHasSchedule && (
                                <div>{dayHasSchedule.title}</div>
                            )}
                            {shortSchedule && <div>{shortSchedule.title}</div>}
                        </div>,
                    );

                    day++;
                }
            }
            days.push(
                <div key={`row-${r}`} className="row">
                    {rowDays}
                </div>,
            );
        }

        return <div className="calendar-grid">{days}</div>;
    };

    return (
        <div className="mainContainer">
            <div className="calendar">
                <div className="header">
                    <AiOutlineLeft
                        className="prevBtn"
                        onClick={handlePrevMonth}
                    />
                    <h1>
                        {yearForm + " . "}
                        {monthForm + " . "}
                        {dateToday()}
                    </h1>
                    <AiOutlineRight
                        className="nextBtn"
                        onClick={handleNextMonth}
                    />
                </div>
                <div className="weekdays">
                    {weekdays.map((weekday) => (
                        <div key={weekday} className="weekday">
                            {weekday}
                        </div>
                    ))}
                </div>

                <div className="days">{renderDays()}</div>
            </div>
        </div>
    );
}

export default Main;
