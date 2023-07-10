import "./YearPicker.scss";
import { year } from "../../../modules/module/year.js";
import { useSelector, useDispatch } from "react-redux";

function YearPicker() {
    const dispatch = useDispatch();
    const yearForm = useSelector((state) => state.yearReducer.value);

    const date = new Date();
    const thisYear = date.getFullYear();

    const yearOptions = [];
    for (let year = 2010; year <= 2035; year++) {
        yearOptions.push(
            <option
                key={year}
                value={year}
                style={
                    year === thisYear
                        ? { backgroundColor: "pink" }
                        : { padding: "15px" }
                }
            >
                {year}
            </option>,
        );
    }

    const handleYearChange = (e) => {
        dispatch(year(Number(e.target.value)));
    };

    return (
        <>
            <div className="year">
                <select
                    className="yearSelect"
                    onChange={handleYearChange}
                    value={yearForm}
                >
                    {yearOptions}
                </select>
            </div>
        </>
    );
}

export default YearPicker;
