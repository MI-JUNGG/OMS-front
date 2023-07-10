import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ePlusM, eminusM } from "../../../../../modules/module/repeatEnd.js";
import "../../CardCompo/MonthSelector.scss";

function EndMonth() {
    const dispatch = useDispatch();
    const outerRef = useRef(null);
    const month = useSelector((state) => state.endDateReducer.month);

    const increaseMon = () => {
        dispatch(ePlusM());
    };

    const decreaseMon = () => {
        dispatch(eminusM());
    };

    useEffect(() => {
        const handleScroll = (event) => {
            const { target } = event;
            const isScrollable =
                target.scrollHeight > target.clientHeight &&
                (target === outerRef.current ||
                    target.contains(outerRef.current));

            if (event.deltaY < 0 && outerRef.current.contains(event.target)) {
                decreaseMon();
            } else if (
                event.deltaY > 0 &&
                outerRef.current.contains(event.target)
            ) {
                increaseMon();
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
    const MONTH = String(Number(month)).padStart(2, "0");
    const MONTHPlus = String(Number(month) + 1).padStart(2, "0");
    const MONTHMius = String(Number(month) - 1).padStart(2, "0");
    return (
        <div className="monthControll" ref={outerRef}>
            {MONTHMius === "00" ? <p>12</p> : <p>{MONTHMius}</p>}
            <p className="now">{MONTH}</p>
            {MONTHPlus === "13" ? <p>01</p> : <p>{MONTHPlus}</p>}
        </div>
    );
}

export default EndMonth;
