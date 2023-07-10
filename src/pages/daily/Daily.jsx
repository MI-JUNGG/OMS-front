import Seletime from "./components/Seletime";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { useEffect } from "react";
import "./Daily.scss";
import Card from "./components/Card";
import Button from "../button/Button";
import LoginModalBackground from "../sign/LoginModalBackground";
import { cardmodal } from "../../modules/module/modal";
import { addDate, addMonth, addDay } from "../../modules/module/date";
import { eaddDate, eaddMonth, eaddDay } from "../../modules/module/endDate";
import { laddDate, laddMonth, laddDay } from "../../modules/module/Limit";
import { addCard } from "../../modules/module/card";
import { callUserCard } from "./server";
import { callData } from "../weekly/weekSever";
import dayjs from "dayjs";

function Daily() {
    const dispatch = useDispatch();
    const ref = useRef();
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const dateString = url.searchParams.get("date");
    const [year, month, day] = dateString.split("-");
    const token = localStorage.getItem("token");
    const openCard = useSelector((state) => state.modalReducer.cardmodal);
    const form = useSelector((state) => state.dateReducer);
    const handleOutClick = (data) => {
        dispatch(cardmodal());
        dispatch(addCard(data));
    };

    const initialState = () => {
        const dateAction = addDate(Number(year));
        const monthAction = addMonth(Number(month));
        const dayAction = addDay(Number(day));

        const enddateAction = eaddDate(Number(year));
        const endmonthAction = eaddMonth(Number(month));
        const enddayAction = eaddDay(Number(day));

        const limitdateAction = laddDate(Number(year));
        const limitmonthAction = laddMonth(Number(month));
        const limitdayAction = laddDay(Number(day));

        dispatch(enddateAction);
        dispatch(endmonthAction);
        dispatch(enddayAction);

        dispatch(dateAction);
        dispatch(monthAction);
        dispatch(dayAction);

        dispatch(limitdateAction);
        dispatch(limitmonthAction);
        dispatch(limitdayAction);
    };

    useEffect(() => {
        initialState();
        const DAY = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
        callUserCard(handleOutClick, DAY);
    }, []);

    return (
        <div className="topContanier">
            <DndProvider backend={HTML5Backend}>
                <Seletime />
                {openCard === true && (
                    <>
                        <LoginModalBackground onClick={handleOutClick} />
                        <Card />
                    </>
                )}
                <div className="btnHeight">
                    <Button />
                </div>
            </DndProvider>
        </div>
    );
}

export default Daily;
