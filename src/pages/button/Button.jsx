import { useState } from "react";
import Plus from "./components/Plus";
import BtnDropdown from "./BtnDropdown";
import "./Button.scss";

function Button() {
    const [isopen, setIsopen] = useState(false);
    const openModal = () => {
        setIsopen((prev) => !prev);
    };
    return (
        <div className="Btn">
            {isopen && <BtnDropdown />}
            <div className="plus" onClick={openModal}>
                <Plus />
            </div>
        </div>
    );
}

export default Button;
