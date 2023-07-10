import { hours } from "../time";
import "./DayHour.scss";

function DayHours() {
    return (
        <div className="dayhourContanier">
            {hours.map((hour) => {
                return (
                    <div key={hour} className="hour">
                        {hour}
                    </div>
                );
            })}
        </div>
    );
}

export default DayHours;
