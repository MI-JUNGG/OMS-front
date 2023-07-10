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

    const date = new Date();
    const dayOfWeek = date.getDay();
    const sundayDate = new Date(date);
    sundayDate.setDate(date.getDate() - dayOfWeek);

    // sundayDate 값을 YYYY-MM-DD 형식의 날짜 문자열로 변환
    const formattedSundayDate = `${sundayDate.getFullYear()}-${
        sundayDate.getMonth() + 1
    }-${sundayDate.getDate()}`;

    // useLocation 훅을 사용하여 현재 경로와 쿼리 파라미터를 가져옴
    const location = useLocation();
    const { pathname, search } = location;

    // sundayDate를 URL 쿼리 파라미터로 추가
    const updatedSearch = new URLSearchParams(search);
    updatedSearch.set("sundayDate", formattedSundayDate);

    // 쿼리 파라미터가 포함된 URL을 만듦
    const updatedUrl = `${pathname}?${updatedSearch.toString()}`;

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
                                    search: updatedSearch.toString(),
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
