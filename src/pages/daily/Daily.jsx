import Seletime from "./components/Seletime.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { useEffect } from "react";
import "./Daily.scss";
import Card from "./components/Card.jsx";
import Button from "../button/Button.jsx";
import LoginModalBackground from "../sign/LoginModalBackground.jsx";
import { cardmodal } from "../../modules/module/modal.js";
import { addCard } from "../../modules/module/card.js";
import { callUserCard } from "./server.js";
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

    const handleOutClick = (data) => {
        dispatch(addCard({ cardType: "day", cardData: data }));
    };
    const form = useSelector((state) => state.cardReducer);

    useEffect(() => {
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
