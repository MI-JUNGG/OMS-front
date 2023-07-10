import "./MoreSchedule.scss";
import { useSelector } from "react-redux";
import ModalX from "../../assets/images/modal/ModalX.jsx";

function MoreSchedule(props) {
    const monthScheduleData = useSelector((state) => state.cardReducer.month);
    const setBackgroundState = props.setBackgroundState;
    const backgroundState = props.backgroundState;

    const isCorrectDate = monthScheduleData.filter((item) => {
        const date = props.currentDate;

        return (
            item.startDate.slice(8, 10).toString() ===
            date.toString().padStart(2, "0")
        );
    });

    const sortedSchedule = [...isCorrectDate].sort((a, b) => {
        if (a.repeat === 1 && b.repeat !== 1) {
            return -1;
        } else if (a.repeat !== 1 && b.repeat === 1) {
            return 1;
        } else {
            return new Date(a.startDate) - new Date(b.startDate);
        }
    });

    const handleMoreClick = () => {
        setBackgroundState(!backgroundState);
    };

    const date = `${props.yearForm} . ${props.monthForm
        .toString()
        .padStart(2, "0")} . ${props.currentDate.toString().padStart(2, "0")}`;
    return (
        <>
            <div className="scheduleContainer">
                <div className="scheduleBoxTop">
                    <div className="scheduleDate">{date}</div>
                    <div className="closeModal" onClick={handleMoreClick}>
                        <ModalX width={"30px"} height={"30px"} />
                    </div>
                </div>
                <div className="scheduleContentsBox">
                    <div className="scheduleContents">
                        {sortedSchedule.map((item) => {
                            const time = `${item.startDate.substring(
                                11,
                                17,
                            )} ~ ${item.endDate.substring(11, 17)}`;
                            return (
                                <div
                                    className="scheduleContent"
                                    style={{
                                        backgroundColor: `${item.color}1A`,
                                        borderLeft: `3px solid ${item.color}`,
                                        color: `${item.color}`,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "10px",
                                        }}
                                    >
                                        {item.repeat === 1 ? "ALL DAY" : time}
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "13px",
                                            marginTop: "2px",
                                        }}
                                    >
                                        {" "}
                                        {item.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div />
        </>
    );
}

export default MoreSchedule;
