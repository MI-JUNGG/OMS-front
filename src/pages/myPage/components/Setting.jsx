import { useSelector } from "react-redux";
import "./Setting.scss";
import Buttons from "./settingComponents/Btn.jsx";
import ColorSelector from "./settingComponents/ColorSelector.jsx";
import TextSelector from "./settingComponents/TextSelector.jsx";

function Setting() {
    const existingSettingValue = useSelector((state) => state.settingReducer);
    return (
        <>
            <div className="settingContainer">
                <div className="settingContents">
                    <Buttons />
                    <ColorSelector
                        existingSettingValue={existingSettingValue}
                    />
                    <TextSelector existingSettingValue={existingSettingValue} />
                </div>
            </div>
        </>
    );
}

export default Setting;
