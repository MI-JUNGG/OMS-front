import { useEffect, useState } from "react";
import "./TextSelector.scss";
import { useDispatch, useSelector } from "react-redux";
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

function TextSelector() {
    const dispatch = useDispatch();
    const ismodal = useSelector((state) => state.settingReducer.isModal);
    const handleOutClick = () => {
        dispatch(isModal(1));
    };
    const form = useSelector((state) => state.temporaryColorReducer);
    const blockColorTheme = useSelector(
        (state) => state.settingReducer.blockColorTheme,
    );
    const blockColorThemeTitle = useSelector(
        (state) => state.settingReducer.blockColorThemeTitle,
    );
    const isOnCustom = useSelector(
        (state) => state.settingReducer.isCustomPicker,
    );

    const colorForm = useSelector((state) => state.colorPickerReducer.color);

    const [blockColor, setBlockColor] = useState([]);

    useEffect(() => {
        setBlockColor(colorForm);
    }, [colorForm]);

    const changeTemporaryTextStyle = (id) => {
        dispatch(temporaryTextStyle(id));
    };
    const changeTemporaryTextColor = (id) => {
        dispatch(temporaryTextColor(id));
    };
    const changeTemporaryBlockMainColor = (id) => {
        dispatch(temporaryBlockMainColor(id.mainColor));
        dispatch(temporaryBlockBGColor(id.backgroundColor));
        dispatch(temporaryTextColor(id.mainColor));
    };

    document.documentElement.style.setProperty(
        "--textPreviewFontColor",
        form.temporaryTextColor,
    );
    document.documentElement.style.setProperty(
        "--textPreviewBGColor",
        form.temporaryBlockColor.bgColor,
    );
    document.documentElement.style.setProperty(
        "--textPreviewMainColor",
        form.temporaryBlockColor.mainColor,
    );

    const TEXT_STYLE = [
        {
            id: 1,
            style: "Regular",
            fontSize: "14px",
        },
        {
            id: 2,
            style: "Bold",
            fontSize: "20px",
        },
        {
            id: 3,
            style: "Italic",
            fontSize: "19px",
        },
        {
            id: 4,
            style: "underline",
            fontSize: "15px",
        },
    ];

    const TEXT_COLOR = [
        {
            id: 1,
            title: "Dark",
            color: "black",
        },
        {
            id: 2,
            title: "Colored",
            color: form.temporaryBlockColor.mainColor,
        },
    ];

    return (
        <>
            {blockColor && blockColor.length > 0 && (
                <>
                    <div className="textSelectorContainer">
                        <div className="textSelectorZone">
                            <div className="textStyleSelectZone">
                                <h3>Text Style</h3>
                                <div className="textStyleSelect">
                                    {TEXT_STYLE.map((style, i) => {
                                        const fixStyle = {
                                            fontSize: style.fontSize,
                                            fontStyle: style.style,
                                            textDecoration: style.style,
                                        };
                                        return (
                                            <div
                                                key={i}
                                                style={fixStyle}
                                                onClick={() => {
                                                    changeTemporaryTextStyle(
                                                        style.style,
                                                    );
                                                }}
                                            >
                                                {style.style}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="textColorSelectZone">
                                <h3>Text Color</h3>
                                <div className="textColorSelect">
                                    {TEXT_COLOR.map((color, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="textColor"
                                                onClick={() => {
                                                    changeTemporaryTextColor(
                                                        color.color,
                                                    );
                                                }}
                                            >
                                                <div
                                                    className={`textColor${color.title}`}
                                                >
                                                    <span>{color.title}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="blockColorSelctZone">
                                <h3>Block Color</h3>
                                <div className="blockColorSelect">
                                    {blockColor.length > 0 &&
                                        blockColor[blockColorTheme][
                                            blockColorThemeTitle
                                        ]?.map((data, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="blockColorVivid"
                                                    style={{
                                                        backgroundColor: `${data.mainColor}`,
                                                    }}
                                                    onClick={() => {
                                                        changeTemporaryBlockMainColor(
                                                            data,
                                                        );
                                                    }}
                                                ></div>
                                            );
                                        })}
                                    <div
                                        className="moreColor"
                                        onClick={handleOutClick}
                                    >
                                        <ModalPlus />
                                    </div>
                                    {ismodal === 1 && blockColor && (
                                        <>
                                            <ColorPicker
                                                colorList={blockColor}
                                                blockColorTheme={
                                                    blockColorTheme
                                                }
                                                blockColorThemeTitle={
                                                    blockColorThemeTitle
                                                }
                                            />
                                            <ColorPickerBackground
                                                onClick={() => {
                                                    dispatch(isModal(0));
                                                    dispatch(
                                                        isCustomPicker(false),
                                                    );
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="textPreviewContainer">
                            <div className="textPreview">
                                <div className="textPreviewCard_1">
                                    ⚽ Schedule
                                </div>
                                <div className="textPreviewCard_2">
                                    ⚽ Schedule
                                </div>
                                <div className="textPreviewCard_3">
                                    ⚽ Schedule
                                </div>
                            </div>
                        </div>
                    </div>
                    <div />
                </>
            )}
        </>
    );
}

export default TextSelector;
