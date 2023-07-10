import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusD, minusD } from "../../../../../modules/module/repeatStart";
import "../../CardCompo/DaySelector.scss";

function Day() {
    const dispatch = useDispatch();
    const { year, month, day } = useSelector((state) => state.dateReducer);
    const outerRef = useRef(null);

    const increaseday = () => {
        dispatch(PlusD());
    };

    const decreaseday = () => {
        dispatch(minusD());
    };

    function getLastDayOfMonth(year, month) {
        const lastDay = new Date(year, month, 0).getDate();
        return lastDay;
    }

    useEffect(() => {
        const handleScroll = (event) => {
            const { target } = event;
            const isScrollable =
                target.scrollHeight > target.clientHeight &&
                (target === outerRef.current ||
                    target.contains(outerRef.current));

            if (event.deltaY < 0 && outerRef.current.contains(event.target)) {
                decreaseday();
            } else if (
                event.deltaY > 0 &&
                outerRef.current.contains(event.target)
            ) {
                increaseday();
            }

            if (!isScrollable || !outerRef.current.contains(event.target)) {
                event.preventDefault();
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const lastDayOfMonth = getLastDayOfMonth(year, month);
    const DAY = String(Number(day)).padStart(2, "0");

    const DAYPlus = String(Number(day) + 1).padStart(2, "0");
    const DAYMius = String(Number(day) - 1).padStart(2, "0");
    return (
        <div className="monthControll" ref={outerRef}>
            {parseInt(DAY) === 1 ? <p>{lastDayOfMonth}</p> : <p>{DAYMius}</p>}
            <p className="now">{DAY}</p>
            {parseInt(DAY) === lastDayOfMonth ? <p>01</p> : <p>{DAYPlus}</p>}
        </div>
    );
}

export default Day;
