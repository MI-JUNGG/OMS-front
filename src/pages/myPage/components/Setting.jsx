import "./Setting.scss";
import Buttons from "./settingComponents/Btn";
import ColorSelector from "./settingComponents/ColorSelector";
import TextSelector from "./settingComponents/TextSelector";

function Setting() {
    return (
        <>
            <div className="settingContainer">
                <div className="settingContents">
                    <Buttons />
                    <ColorSelector />
                    <TextSelector />
                </div>
            </div>
        </>
    );
}

export default Setting;
