import "./ColorSelector.scss";
import SettingCalndaer_1 from "../../../../assets/images/setting/SettingCalendar_1";
import SettingCalndaer_2 from "../../../../assets/images/setting/SettingCalendar_2";
import { useDispatch, useSelector } from "react-redux";
import {
    temporaryBackgroundColor,
    temporaryMainColor,
} from "../../../../modules/module/temporaryColorSetting";

function ColorSelector(props) {
    const existingSettingValue = props.existingSettingValue;

    const dispatch = useDispatch();
    const form = useSelector((state) => state.temporaryColorReducer);

    const changeTemporaryMainColor = (id) => {
        dispatch(temporaryMainColor(id));
    };
    const changeTemporaryBGColor = (id) => {
        dispatch(temporaryBackgroundColor(id));
    };

    document.documentElement.style.setProperty(
        "--temporarybackgroundColor",
        form.temporaryBackgroundColor
            ? form.temporaryBackgroundColor
            : existingSettingValue.backgroundColor,
    );
    document.documentElement.style.setProperty(
        "--temporaryMainColor",
        form.temporaryMainColor
            ? form.temporaryMainColor
            : existingSettingValue.mainColor,
    );

    return (
        <>
            <div className="colorSelectorContainer">
                <div className="selectZone">
                    <div className="mainColorSelect">
                        <h3>Main Color</h3>
                        <div className="mainColorList">
                            {MAIN_COLOR.map((data, id) => {
                                return (
                                    <div
                                        className={
                                            form.temporaryMainColor ===
                                            data.color
                                                ? "active"
                                                : "inActive"
                                        }
                                        style={{
                                            marginRight: "32px",
                                        }}
                                    >
                                        <div
                                            key={id}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "100px",
                                                backgroundColor: data.color,

                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                changeTemporaryMainColor(
                                                    data.color,
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bgColorSelect">
                        <h3>Background Color</h3>
                        <div className="bgColorList">
                            {BG_COLOR.map((data, id) => {
                                return (
                                    <div
                                        className={
                                            form.temporaryBackgroundColor ===
                                            data.color
                                                ? "active"
                                                : "inActive"
                                        }
                                        style={{
                                            marginRight: "32px",
                                        }}
                                    >
                                        <div
                                            key={id}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "100px",
                                                backgroundColor: data.color,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                changeTemporaryBGColor(
                                                    data.color,
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="colorPreview">
                    <div className="previewTop">
                        <img
                            src="/src/assets/images/logo/logo.svg"
                            alt="로고"
                        />
                    </div>
                    <div className="previewInsideContainer">
                        <div className="previewInside">
                            <button className="previewBtn" type="button">
                                Button
                            </button>
                            <span className="previewText">Text Color</span>
                            <div className="previewLogo">
                                <SettingCalndaer_1 />
                                <SettingCalndaer_2 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div />
        </>
    );
}

export default ColorSelector;

const MAIN_COLOR = [
    {
        id: 1,
        color: "#FF96A8",
    },
    {
        id: 2,
        color: "#FDB844",
    },
    {
        id: 3,
        color: "#2DD4BF",
    },
    {
        id: 4,
        color: "#547AFF",
    },
    {
        id: 5,
        color: "#AF71FF",
    },
    {
        id: 6,
        color: "#787676",
    },
];

const BG_COLOR = [
    {
        id: 1,
        color: "#FFC5CF",
    },
    {
        id: 2,
        color: "#FFD9A7",
    },
    {
        id: 3,
        color: "#BAF4DD",
    },
    {
        id: 4,
        color: "#B3C4F6",
    },
    {
        id: 5,
        color: "#DBBEFF",
    },
    {
        id: 6,
        color: "#D9D9D9",
    },
];
