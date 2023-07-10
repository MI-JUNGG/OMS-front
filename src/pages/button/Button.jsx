import { useState } from "react";
import Plus from "./components/Plus";
import BtnDropdown from "./BtnDropdown";

function Button() {
    const [isopen, setIsopen] = useState(false);
    const openModal = () => {
        setIsopen((prev) => !prev);
    };
    return (
        <div className="Btn">
            {isopen && <BtnDropdown />}
            <div onClick={openModal}>
                <Plus />
            </div>
        </div>
    );
}

export default Button;
