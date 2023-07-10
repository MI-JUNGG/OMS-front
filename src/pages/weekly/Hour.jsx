import { hours } from "../daily/time.js";
import "./Hour.scss";

function Hour() {
    return (
        <div className="hourContanier">
            {hours.map((hour, index) => {
                return (
                    <div key={index} className="hour">
                        {hour}
                    </div>
                );
            })}
        </div>
    );
}

export default Hour;
