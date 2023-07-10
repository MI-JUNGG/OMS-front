import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTime, minusTime } from "../../../../modules/module/date.js";
import { eaddTime, eminusTime } from "../../../../modules/module/endDate.js";
import "./TimeSelector.scss";

function TimeSelector() {
    const outerRef = useRef(null);
    const dispatch = useDispatch();
    const isRepeat = useSelector((state) => state.modalReducer.endDateControl);
    const startTime = useSelector((state) => state.dateReducer.time);
    const endTime = useSelector((state) => state.endDateReducer.time);
    const time = isRepeat ? endTime : startTime;
    const increaseday = () => {
        isRepeat ? dispatch(eaddTime()) : dispatch(addTime());
    };

    const decreaseday = () => {
        isRepeat ? dispatch(eminusTime()) : dispatch(minusTime());
    };

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
    const TIME = String(parseInt(time)).padStart(2, "0");
    const TIMEPlus = String(time + 1).padStart(2, "0");
    const TIMEMius = String(time - 1).padStart(2, "0");

    const renderPlusTime = (TIME) => {
        if (TIME >= "24") {
            return "01";
        } else if (TIME === "01") {
            return "02";
        } else {
            return TIMEPlus;
        }
    };

    return (
        <div className="hour" ref={outerRef}>
            <p>{TIME === "01" || time - 1 === -1 ? "24" : TIMEMius}</p>
            <p className="now">{TIME > 24 ? "01" : TIME}</p>
            <p>{renderPlusTime(TIME)}</p>
        </div>
    );
}

export default TimeSelector;
