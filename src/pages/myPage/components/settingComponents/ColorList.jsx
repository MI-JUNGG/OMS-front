import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ColorList.scss";
import ModalPlus from "/src/assets/images/modal/ModalPlus";
import { isModal, isCustomPicker } from "../../../../modules/module/setting";
import ColorPicker from "./ColorPicker";
import ColorPickerBackground from "./ColorPickerBackground";
import {
    temporaryBlockBGColor,
    temporaryBlockMainColor,
    temporaryTextColor,
    temporaryTextStyle,
} from "../../../../modules/module/temporaryColorSetting";

function ColorList() {
    const dispatch = useDispatch();
    const [blockColor, setBlockColor] = useState([]);
    const colorForm = useSelector((state) => state.colorPickerReducer.color);
    const ismodal = useSelector((state) => state.settingReducer.isModal);
    const blockColorTheme = useSelector(
        (state) => state.settingReducer.blockColorTheme,
    );
    const blockColorThemeTitle = useSelector(
        (state) => state.settingReducer.blockColorThemeTitle,
    );
    const form = useSelector((state) => state.temporaryColorReducer);
    useEffect(() => {
        setBlockColor(colorForm);
    }, [ismodal]);
    const changeTemporaryBlockMainColor = (id) => {
        dispatch(temporaryBlockMainColor(id.mainColor));
        dispatch(temporaryBlockBGColor(id.backgroundColor));
        dispatch(temporaryTextColor(id.mainColor));
    };
    const handleOutClick = () => {
        dispatch(isModal(1));
    };
    return (
        <div className="blockColorSelect">
            {blockColor.length > 0 &&
                blockColor[blockColorTheme][blockColorThemeTitle]?.map(
                    (data, i) => {
                        return (
                            <div
                                className={
                                    form.temporaryBlockColor.mainColor ===
                                    data.mainColor
                                        ? " active"
                                        : " inactive"
                                }
                            >
                                <div
                                    key={i}
                                    className="blockColorVivid"
                                    style={{
                                        backgroundColor: `${data.mainColor}`,
                                    }}
                                    onClick={() => {
                                        changeTemporaryBlockMainColor(data);
                                    }}
                                ></div>
                            </div>
                        );
                    },
                )}
            <div className="moreColor" onClick={handleOutClick}>
                <ModalPlus />
            </div>
            {ismodal === 1 && blockColor && (
                <>
                    <ColorPicker
                        colorList={blockColor}
                        blockColorTheme={blockColorTheme}
                        blockColorThemeTitle={blockColorThemeTitle}
                    />
                    <ColorPickerBackground
                        onClick={() => {
                            dispatch(isModal(0));
                            dispatch(isCustomPicker(false));
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default ColorList;
