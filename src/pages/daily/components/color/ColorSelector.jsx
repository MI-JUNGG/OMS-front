import { useDispatch } from "react-redux";
import "./colorCss/ColorSelector.scss";
import ModalPlus from "../../../../assets/images/modal/ModalPlus";
import { showColorPicker } from "../../../../modules/module/modal";

function ColorSelector() {
    const dispatch = useDispatch();

    const colorPickerhandler = () => {
        dispatch(showColorPicker());
    };
    const renderColor = Array(6)
        .fill()
        .map((_, index) => <div key={index} className="circle"></div>);

    return (
        <div className="colorBox">
            {renderColor}
            <div onClick={colorPickerhandler}>
                <ModalPlus />
            </div>
        </div>
    );
}

export default ColorSelector;
