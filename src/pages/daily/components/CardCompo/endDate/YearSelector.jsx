import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ePlusY, eeminusY } from "../../../../../modules/module/endDate";
import "../YearSelector.scss";

function YearSelector() {
    const outerRef = useRef(null);
    const dispatch = useDispatch();
    const year = useSelector((state) => state.endDateReducer.year);

    const increaseYear = () => {
        return dispatch(ePlusY());
    };

    const decreaseYear = () => {
        return dispatch(eeminusY());
    };

    useEffect(() => {
        const handleScroll = (event) => {
            const { target } = event;
            const isScrollable =
                target.scrollHeight > target.clientHeight &&
                (target === outerRef.current ||
                    target.contains(outerRef.current));

            if (event.deltaY < 0 && outerRef.current.contains(event.target)) {
                decreaseYear();
            } else if (
                event.deltaY > 0 &&
                outerRef.current.contains(event.target)
            ) {
                increaseYear();
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

    return (
        <div ref={outerRef} className="yearControll">
            <p>{year - 1}</p>
            <p className="now">{year}</p>
            <p>{year + 1}</p>
        </div>
    );
}

export default YearSelector;
