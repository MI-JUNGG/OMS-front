import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMin, minusMin } from "../../../../modules/module/date.js";
import { eaddMin, eminusMin } from "../../../../modules/module/endDate.js";
import "./Minselector.scss";

function MinSelector() {
    const outerRef = useRef(null);
    const dispatch = useDispatch();
    const isRepeat = useSelector((state) => state.modalReducer.endDateControl);

    const startminute = useSelector((state) => state.dateReducer.minute);
    const endMin = useSelector((state) => state.endDateReducer.minute);
    const minute = isRepeat ? endMin : startminute;

    const increaseday = () => {
        isRepeat ? dispatch(eaddMin()) : dispatch(addMin());
    };

    const decreaseday = () => {
        isRepeat ? dispatch(eminusMin()) : dispatch(minusMin());
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
    const MIN = String(parseInt(minute)).padStart(2, "0");
    const MINPlus = String(minute + 1).padStart(2, "0");
    const MINMius = String(minute - 1).padStart(2, "0");

    return (
        <div className="minutes" ref={outerRef}>
            <p>{MIN === "00" ? "59" : MINMius}</p>
            <p className="now">{MIN}</p>
            <p>{MIN === "59" ? "00" : MINPlus}</p>
        </div>
    );
}

export default MinSelector;
