import React from "react";
import "./Btn.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    main,
    background,
    textColor,
    textStyle,
    handleBlockColor,
    handleBlockColorThemeTitle,
    handleBlockColorTheme,
} from "../../../../modules/module/setting.js";
import {
    temporaryMainColor,
    temporaryBackgroundColor,
    temporaryTextStyle,
    temporaryTextColor,
    temporaryBlockMainColor,
    temporaryBlockColorTheme,
    temporaryBlockColorThemeTitle,
} from "../../../../modules/module/temporaryColorSetting.js";

function Buttons() {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.temporaryColorReducer);

    const colorPaletteld = useSelector((state) => state.colorPickerReducer);

    const customForm = useSelector(
        (state) => state.colorPickerReducer.color[5].custom,
    );
    const axiosBlock = useSelector(
        (state) => state.settingReducer.axiosBlockColor,
    );

    const pickTitle = (id) => {
        switch (id) {
            case 0:
                return "vivid";
            case 1:
                return "bright";
            case 2:
                return "soft";
            case 3:
                return "reddish";
            case 4:
                return "pale";
            case 5:
                return "custom";
            default:
                return "";
        }
    };

    const settingSub = () => {
        // axios
        //     .put(
        //         "http://10.99.230.245:3001/mypage/theme",
        //         axiosBlock === 6
        //             ? {
        //                   mainColor: form.temporaryMainColor,
        //                   backgroundColor: form.temporaryBackgroundColor,
        //                   textStyle: "regular",
        //                   textColor: form.temporaryTextColor,
        //                   colorPaletteId: axiosBlock,
        //                   color1: customForm[0].mainColor,
        //                   color2: customForm[1].mainColor,
        //                   color3: customForm[2].mainColor,
        //                   color4: customForm[3].mainColor,
        //                   color5: customForm[4].mainColor,
        //                   color6: customForm[5].mainColor,
        //                   color7: customForm[6].mainColor,
        //               }
        //             : {
        //                   mainColor: form.temporaryMainColor,
        //                   backgroundColor: form.temporaryBackgroundColor,
        //                   textStyle: "regular",
        //                   textColor: form.temporaryTextColor,
        //                   colorPaletteId: axiosBlock,
        //               },
        //         {
        //             headers: {
        //                 Authorization:
        //                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODczMjU0NDh9.GfMx3DKfCSMsSPWx6WXNb9NW9gi0jvfnof9A91I8ZWc",
        //             },
        //         },
        //     )
        //     .then((response) => {
        //         console.log(response);
        //         alert(response.data.message);
        //
        //     })
        //     .catch((err) => console.log(err));

        dispatch(main(form.temporaryMainColor));
        dispatch(background(form.temporaryBackgroundColor));
        dispatch(textColor(form.temporaryTextColor));
        dispatch(textStyle(form.temporaryTextStyle));
        dispatch(handleBlockColor(form.temporaryBlockColor));
        dispatch(handleBlockColorTheme(form.temporaryBlockColorTheme));
        dispatch(
            temporaryBlockColorThemeTitle(
                pickTitle(form.temporaryBlockColorTheme),
            ),
        );

        alert("업데이트 성공");

        document.documentElement.style.setProperty(
            "--global-font-weight",
            "normal",
        );
        document.documentElement.style.setProperty(
            "--global-font-style",
            "normal",
        );
        document.documentElement.style.setProperty(
            "--global-text-decoration",
            "none",
        );

        if (form.temporaryTextStyle === "Regular") {
            document.documentElement.style.setProperty(
                "--global-font-weight",
                "normal",
            );
        } else if (form.temporaryTextStyle === "Bold") {
            document.documentElement.style.setProperty(
                "--global-font-weight",
                "bold",
            );
        } else if (form.temporaryTextStyle === "Italic") {
            document.documentElement.style.setProperty(
                "--global-font-style",
                "italic",
            );
        } else if (form.temporaryTextStyle === "underline") {
            document.documentElement.style.setProperty(
                "--global-text-decoration",
                "underline",
            );
        }
    };

    const oldValue = useSelector((state) => state.settingReducer);

    const defaultBtn = () => {
        dispatch(temporaryMainColor(oldValue.mainColor));
        dispatch(temporaryBackgroundColor(oldValue.backgroundColor));
        dispatch(temporaryTextStyle(oldValue.textStyle));
        dispatch(temporaryTextColor(oldValue.textColor));
        dispatch(temporaryBlockMainColor(oldValue.blockColor));
        dispatch(temporaryBlockColorTheme(oldValue.blockColorTheme));
        dispatch(
            handleBlockColorThemeTitle(pickTitle(oldValue.blockColorTheme)),
        );
    };

    return (
        <>
            <div className="btnContainer">
                <button type="button" onClick={settingSub}>
                    Save
                </button>
                <button type="button" onClick={defaultBtn}>
                    Default
                </button>
            </div>
        </>
    );
}

export default Buttons;
