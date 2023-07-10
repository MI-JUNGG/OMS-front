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
import Trash from "../../../assets/images/floating_action/Trash";
import dayjs from "dayjs";
import { addDate, addMonth, addDay } from "../../../modules/module/date";
import { eaddDate, eaddMonth, eaddDay } from "../../../modules/module/endDate";
import { initialReducer } from "../../../modules/module/Limit";
import { newDate } from "../../../modules/module/repeatStart";
import ColorList from "../../myPage/components/settingComponents/ColorList";
import "./Card.scss";

function Card() {
    const [form, setForm] = useState({
        title: "",
        contents: "",
        url: "",
        color: "",
    });
    const id = useSelector((state) => state.modalReducer.cardID);

    const CARD =
        id.cardData === "week"
            ? useSelector((state) => state.cardReducer.week)
            : useSelector((state) => state.cardReducer.day);

    const dispatch = useDispatch();
    const initialState = () => {
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const dateString = url.searchParams.get("date");
        const [year, month, day] = dateString.split("-");
        const dateAction = addDate(Number(year));
        const monthAction = addMonth(Number(month));
        const dayAction = addDay(Number(day));

        const enddateAction = eaddDate(Number(year));
        const endmonthAction = eaddMonth(Number(month));
        const enddayAction = eaddDay(Number(day));

        dispatch(enddateAction);
        dispatch(endmonthAction);
        dispatch(enddayAction);

        dispatch(dateAction);
        dispatch(monthAction);
        dispatch(dayAction);

        dispatch(
            initialReducer({
                year: year,
                month: month,
                day: day,
            }),
        );
        dispatch(
            newDate({
                year: Number(year),
                month: Number(month),
                day: Number(day),
            }),
        );
    };

    useEffect(() => {
        const findCARD = CARD.find((item) => item.cardId === id.cardid);
        findCARD &&
            setForm({
                title: findCARD.title,
                contents: findCARD.memo,
                url: findCARD.link,
                // color: "",
            });
    }, [id]);
    const typeId = Number(
        useSelector((state) => state.modalReducer.typeControl),
    );
    /*카드삭제*/
    const deleteHandler = () => {
        DeleteCardHandler(id.cardid);
        dispatch(removeCard());
        dispatch(cardTypeReducer());
    };

    const AllStartYear = useSelector((state) => state.dateReducer.year);
    const AllStartMonth = useSelector((state) => state.dateReducer.month);
    const AllStartDay = useSelector((state) => state.dateReducer.day);
    const toStringStart = `${AllStartYear}-${AllStartMonth}-${AllStartDay} 00:00:01`;

    const AllEndYear = useSelector((state) => state.endDateReducer.year);
    const AllEndMonth = useSelector((state) => state.endDateReducer.month);
    const AllEndDay = useSelector((state) => state.endDateReducer.day);

    const toStringEnd = `${AllEndYear}-${AllEndMonth}-${AllEndDay} 23:59:59`;
    const allStart = dayjs(toStringStart).format("YYYY-MM-DD 00:00:00");

    const allEnd = dayjs(toStringEnd).format("YYYY-MM-DD 23:59:59");

    const repeatStartYear = useSelector((state) => state.dateReducer.year);
    const repeatStartMonth =
        Number(useSelector((state) => state.dateReducer.month)) - 1;
    const repeatStartDay = useSelector((state) => state.dateReducer.day);
    const repeatStartTime = useSelector((state) => state.dateReducer.time);
    const repeatStartMinute = useSelector((state) => state.dateReducer.minute);
    const repeat = new Date(
        repeatStartYear,
        repeatStartMonth,
        repeatStartDay,
        repeatStartTime,
        repeatStartMinute,
    );

    const repeatEndYear = Number(
        useSelector((state) => state.repeatEndReducer.year),
    );
    const repeatEndMonth = Number(
        useSelector((state) => state.repeatEndReducer.month),
    );
    const repeatEndDay = Number(
        useSelector((state) => state.repeatEndReducer.day),
    );
    const repeatEndTime = Number(
        useSelector((state) => state.repeatEndReducer.time),
    );
    const repeatEndDayMinute = Number(
        useSelector((state) => state.repeatEndReducer.minute),
    );

    const endDate = `${repeatEndYear}-${
        repeatEndMonth + 1
    }-${repeatEndDay} ${repeatEndTime}:${repeatEndDayMinute}`;
    const repeatE = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");

    const limitY = useSelector((state) => state.limitReducer.year);
    const limitM = useSelector((state) => state.limitReducer.month);
    const limitD = useSelector((state) => state.limitReducer.day);

    const limitDate = dayjs()
        .year(limitY)
        .month(limitM - 1)
        .date(limitD)
        .format("YYYY-MM-DD");

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

    const { title, contents, color, url } = form;

    const limitType = useSelector((state) => state.limitReducer.value);

    const typeNum =
        limitType === "매일"
            ? 2
            : limitType === "매주"
            ? 3
            : limitType === "매달"
            ? 4
            : limitType === "매년"
            ? 5
            : 1;

    useEffect(() => {
        initialState();
    }, []);
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
    const Fix = useSelector((state) => state.modalReducer.deleteCard);

    const isALL = useSelector((state) => state.modalReducer.dateType);

    const repeatCard = () => {
        if (isALL === false) {
            const startDate = dayjs(allStart);
            const endDate = dayjs(limitDate);
            const daysDifference = dayjs(endDate).diff(startDate, "day");

            for (let i = 0; i <= daysDifference; i++) {
                const currentDate = startDate
                    .add(i, "day")
                    .format("YYYY-MM-DD");
                const currentEndDate = dayjs(allEnd)
                    .add(i, "day")
                    .format("YYYY-MM-DD");
                console.log(currentEndDate);
                counterHandler(
                    title,
                    contents,
                    currentDate,
                    currentEndDate,
                    color,
                    url,
                    typeNum,
                    limitDate,
                );
            }
        } else {
            const startDate = dayjs(repeat);
            const endDate = dayjs(repeatE);
            const enddaysDifference = endDate.diff(startDate, "day");

            for (let i = 0; i <= enddaysDifference; i++) {
                const currentDate = startDate
                    .add(i, "day")
                    .format("YYYY-MM-DD");
                counterHandler(
                    title,
                    contents,
                    currentDate,
                    endDate,
                    color,
                    url,
                    typeNum,
                    limitDate,
                );
            }
        }
    };

    const sendingData = () => {
        Fix === true
            ? FixCardHandler(
                  id,
                  title,
                  contents,
                  typeNum === 1 ? allStart : repeat,
                  typeNum === 1 ? allEnd : repeatE,
                  color,
                  url,
                  typeNum,
                  limitDate,
              )
            : repeatCard();
        setForm({
            title: "",
            contents: "",
            url: "",
            startDate: "",
            endDate: "",
            color: "",
        });
        dispatch(cardmodal());
    };

    return (
        <div className="modalBackGround" ref={outerRef}>
            <div className="card">
                <div className="iconBtn">
                    <div onClick={sendingData}>
                        <ModalCheck />
                    </div>

                    <div onClick={cardHandler}>
                        {Fix === true ? (
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
                <div className="selectColor">
                    <ColorList />
                </div>
            </div>
        </div>
    );
}

export default Card;
