import { useNavigate } from "react-router-dom";
import Trash from "./components/Trash";
import Setting from "./components/Setting";
import Edit from "./components/Edit";

function BtnDropdown() {
    return (
        <div className="btnDropDown">
            <Setting />
            <Trash />
            <Edit />
        </div>
    );
}

export default BtnDropdown;
