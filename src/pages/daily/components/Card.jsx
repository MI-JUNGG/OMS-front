import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cardmodal } from "../../../modules/module/modal";
import { DeleteCardHandler, FixCardHandler } from "../../daily/server";
import { removeCard } from "../../../modules/module/card";
import AlldayTime from "./CardCompo/AlldayTime";
import ModalLink from "../../../assets/images/modal/ModalLink";
import ModalNote from "../../../assets/images/modal/modalNote";
import ModalX from "../../../assets/images/modal/ModalX";
import ModalCheck from "../../../assets/images/modal/ModalCheck";
import EndDate from "../components/CardCompo/endDate/EndDate";
import RepeatEnd from "./repeat/RepeatEnd";
import RepeatStart from "./repeat/RepeatStart";
import ColorSelector from "./color/ColorSelector";
import All from "./All";
import Repeat from "./repeat/Repeat";
import { cardTypeReducer } from "../../../modules/module/modal";
import { counterHandler } from "../server";
import LimitDateSelect from "./limit/LimitDateSelect";
import "./Card.scss";
import Trash from "../../../assets/images/floating_action/Trash";

function Card() {
    const dispatch = useDispatch();

    const typeId = Number(
        useSelector((state) => state.modalReducer.typeControl),
    );
    /*카드삭제*/
    const deleteHandler = (cardId) => {
        DeleteCardHandler(cardId);
        dispatch(removeCard());
        dispatch(cardTypeReducer());
    };

    const AllStartYear = useSelector((state) => state.dateReducer.year);
    const AllStartMonth = useSelector((state) => state.dateReducer.Month);
    const AllStartDay = useSelector((state) => state.dateReducer.Day);

    const AllEndYear = useSelector((state) => state.endDateReducer.year);
    const AllEndMonth = useSelector((state) => state.endDateReducer.month);
    const AllEndDay = useSelector((state) => state.endDateReducer.day);

    const repeatStartYear = useSelector(
        (state) => state.repeatStartReducer.year,
    );
    const repeatStartMonth = useSelector(
        (state) => state.repeatStartReducer.month,
    );
    const repeatStartDay = useSelector((state) => state.repeatStartReducer.day);
    const repeat = new Date(
        repeatStartYear + repeatStartMonth + repeatStartDay,
    );
    const repeatEndYear = useSelector((state) => state.repeatEndReducer.year);

    const repeatEndMonth = useSelector((state) => state.repeatEndReducer.month);
    const repeatEndDay = useSelector((state) => state.repeatEndReducer.day);
    const repeatE = new Date(repeatEndYear, repeatEndMonth, repeatEndDay);
    console.log(repeatE);
    const cardType = useSelector((state) => state.modalReducer.FixCard);

    const showLimit = useSelector((state) => state.modalReducer.limit); //

    const showColorPick = useSelector(
        (state) => state.modalReducer.showColorPicker,
    );

    const openModal = useSelector((state) => state.modalReducer.dateControl);
    const endDateModal = useSelector(
        (state) => state.modalReducer.endDateControl,
    );
    const repeatStart = useSelector(
        (state) => state.modalReducer.repeatControl,
    );
    const repeatEnd = useSelector(
        (state) => state.modalReducer.repeatEndControl,
    );

    const repeatCardType = useSelector((state) => state.repeatTypeReducer.type);

    const datetype = useSelector((state) => state.modalReducer.dateType);

    const outerRef = useRef(null);

    const [form, setForm] = useState({
        title: "",
        contents: "",
        url: "",
        startDate: repeat,
        endDate: repeatE,
        color: "",
    });
    const { title, contents, startDate, endDate, color, url } = form;
    useEffect(() => {
        const handleScroll = (event) => {
            const { target } = event;
            const isScrollable =
                target.scrollHeight > target.clientHeight &&
                (target === outerRef.current ||
                    target.contains(outerRef.current));

            if (!isScrollable || !outerRef.current.contains(event.target)) {
                event.preventDefault();
            }
        };

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const createTitle = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const clearContents = () => {
        setForm({ ...form, contents: "" });
    };
    const clearUrl = () => {
        setForm({ ...form, url: "" });
    };

    const cardHandler = () => {
        dispatch(cardmodal());
    };
    const closeModal =
        !openModal && !endDateModal && !repeatEnd && !repeatStart && !showLimit;
    console.log(repeatCardType);
    const sendingData = () => {
        //FixCardHandler(title, contents, repeatE, endDate, color, url, repeatId);
        counterHandler(
            title,
            contents,
            repeatE,
            endDate,
            color,
            url,
            repeatCardType,
        );
        setForm({
            title: "",
            contents: "",
            url: "",
            startDate: "",
            endDate: "",
            color: "",
        });
    };

    return (
        <div className="modalBackGround" ref={outerRef}>
            <div className="card">
                <div className="iconBtn">
                    <div onClick={sendingData}>
                        <ModalCheck />
                    </div>

                    <div onClick={cardHandler}>
                        {cardType === true ? (
                            <div onClick={deleteHandler}>
                                <Trash />
                            </div>
                        ) : (
                            <ModalX width={30} height={30} />
                        )}
                    </div>
                </div>
                <div className="cardTitle">
                    <input
                        type="search"
                        onChange={createTitle}
                        value={title}
                        name="title"
                        placeholder="제목"
                    />
                </div>
                <div className="timeSelect">
                    {closeModal && datetype ? (
                        <All />
                    ) : (
                        closeModal && <Repeat />
                    )}
                    {openModal && <AlldayTime />}
                    {endDateModal && <EndDate />}
                    {repeatEnd && <RepeatEnd />}
                    {repeatStart && <RepeatStart />}
                    {showLimit && <LimitDateSelect />}
                </div>
                <div className="cardContent">
                    <div className="modalx" onClick={clearUrl}>
                        <ModalX width={10} height={10} />
                    </div>
                    <div className="link">
                        <div className="linkIcon">
                            <ModalLink />
                        </div>

                        <input
                            name="url"
                            className="inputline"
                            value={url}
                            onChange={createTitle}
                            type="url"
                        />
                    </div>
                    <div className="modalx" onClick={clearContents}>
                        <ModalX width={10} height={10} />
                    </div>
                    <div className="contentsMemo">
                        <ModalNote />

                        <textarea
                            className="textArea"
                            onChange={createTitle}
                            value={contents}
                            name="contents"
                        />
                    </div>
                </div>
                <div className="selectColor">{/* <ColorSelector /> */}</div>
            </div>
        </div>
    );
}

export default Card;
