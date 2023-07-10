import { useEffect, useState } from "react";
import "./TextSelector.scss";
import { useDispatch, useSelector } from "react-redux";
import { isModal, isCustomPicker } from "../../../../modules/module/setting";

import {
    temporaryBlockBGColor,
    temporaryBlockMainColor,
    temporaryTextColor,
    temporaryTextStyle,
} from "../../../../modules/module/temporaryColorSetting";
import ColorList from "./ColorList";

function TextSelector(props) {
    const existingSettingValue = props.existingSettingValue;

    const dispatch = useDispatch();
    const ismodal = useSelector((state) => state.settingReducer.isModal);
    const handleOutClick = () => {
        dispatch(isModal(1));
    };
    const form = useSelector((state) => state.temporaryColorReducer);

    const old = useSelector((state) => state.settingReducer);

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
    }, [ismodal]);

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
        form.temporaryTextColor
            ? form.temporaryTextColor
            : existingSettingValue.temporaryTextColor,
    );
    document.documentElement.style.setProperty(
        "--textPreviewBGColor",
        form.temporaryBlockColor.bgColor
            ? form.temporaryBlockColor.bgColor
            : `${existingSettingValue.blockColor}1A`,
    );
    document.documentElement.style.setProperty(
        "--textPreviewMainColor",
        form.temporaryBlockColor.mainColor
            ? form.temporaryBlockColor.mainColor
            : existingSettingValue.mainColor,
    );
    document.documentElement.style.setProperty(
        "--existing-text-preview-main-color",
        existingSettingValue.mainColor,
    );
    document.documentElement.style.setProperty(
        "--existing-text-preview-BG-color",
        `${existingSettingValue.mainColor}1A`,
    );

    const TEXT_STYLE = [
        {
            id: 1,
            style: "regular",
            fontSize: "14px",
            className: "text-regular",
        },
        {
            id: 2,
            style: "bold",
            fontSize: "20px",
            className: "text-bold",
        },
        {
            id: 3,
            style: "italic",
            fontSize: "19px",
            className: "text-italic",
        },
        {
            id: 4,
            style: "underline",
            fontSize: "15px",
            className: "text-underline",
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
            title: "colored",
            color: form.temporaryBlockColor.mainColor,
        },
    ];

    const previewFont = () => {
        if (form.temporaryTextStyle === "regular") {
            return "textPreview text-regular";
        } else if (form.temporaryTextStyle === "bold") {
            return "textPreview text-bold";
        } else if (form.temporaryTextStyle === "italic") {
            return "textPreview text-italic";
        } else if (form.temporaryTextStyle === "underline") {
            return "textPreview text-underline";
        }
    };

    return (
        <>
            {blockColor && blockColor.length > 0 && (
                <>
                    <div className="textSelectorContainer">
                        <div className="textSelectorZone">
                            <div className="textStyleSelectZone">
                                <h3>Text Style</h3>
                                <div className="textStyleSelect ">
                                    {TEXT_STYLE.map((style, i) => {
                                        const fixStyle = {
                                            fontSize: style.fontSize,
                                        };
                                        return (
                                            <div
                                                className={
                                                    (style.className,
                                                    form.temporaryTextStyle ===
                                                    style.style
                                                        ? "active"
                                                        : "inactive")
                                                }
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
                                                className={
                                                    form.temporaryTextColor ===
                                                    color.color
                                                        ? "textColor active"
                                                        : "textColor inActive"
                                                }
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
                                <ColorList />
                            </div>
                        </div>

                        <div className="textPreviewContainer">
                            <div className={previewFont()}>
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
