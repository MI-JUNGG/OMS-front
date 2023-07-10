import { useDispatch, useSelector } from "react-redux";
import { view } from "../../../modules/module/viewSelector";
import { Link, useLocation } from "react-router-dom";
import "./ViewSwitcher.scss";

function ViewSwitcher() {
    const form = useSelector((state) => state.viewReducer);

    const dispatch = useDispatch();

    const changeView = (value) => {
        dispatch(view(value));
    };

    const location = useLocation();
    const { pathname, search } = location;

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getTwoDigitMonth = (month) => String(month).padStart(2, "0");

    // 현재 날짜를 얻습니다.
    const currentDate = new Date();

    // 현재 요일을 가져옵니다. (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const currentDay = currentDate.getDay();

    // 일요일의 날짜를 계산합니다.
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDay);

    // 토요일의 날짜를 계산합니다.
    const saturday = new Date(currentDate);
    saturday.setDate(currentDate.getDate() + (6 - currentDay));

    // 일요일과 토요일의 년도, 월, 날짜를 변수에 저장합니다.
    const startYear = sunday.getFullYear();
    const startMonth = sunday.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 해줍니다.
    const startDate = sunday.getDate();
    const endYear = saturday.getFullYear();
    const endMonth = saturday.getMonth() + 1;
    const endDate = saturday.getDate();

    // 쿼리 파라미터가 포함된 URL을 만듦
    const weekQuery = `date=${startYear}-${startMonth}-${startDate}`;

    const dayQuery = `date=${currentDate.getFullYear()}-${getTwoDigitMonth(
        currentDate.getMonth() + 1,
    )}-${currentDate.getDate()}`;

    const monthQuery = `date=${currentDate.getFullYear()}-${getTwoDigitMonth(
        currentDate.getMonth() + 1,
    )}-01&date=${currentDate.getFullYear()}-${getTwoDigitMonth(
        currentDate.getMonth() + 1,
    )}-${daysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1)}`;

    return (
        <>
            <div className="viewContainer">
                {form.view.map((value, i) => {
                    return (
                        <div
                            className={
                                value === form.select ? "viewSelect" : value
                            }
                            key={i}
                            onClick={() => changeView(value)}
                        >
                            <Link
                                to={{
                                    pathname: form.element[i],
                                    search:
                                        form.element[i] === "/week"
                                            ? `?${weekQuery}`
                                            : form.element[i] === "/day"
                                            ? `?${dayQuery}`
                                            : `?${monthQuery}`,
                                }}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <div>{value}</div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ViewSwitcher;
