import React from "react";
import "./Btn.scss";
import axios from "axios";
import { useSelector } from "react-redux";

function Buttons() {
    const form = useSelector((state) => state.temporaryColorReducer);
    // console.log(form.temporaryBlockColor.mainColor);
    const colorPaletteld = useSelector((state) => state.colorPickerReducer);
    // console.log(colorPaletteld);
    const customForm = useSelector(
        (state) => state.colorPickerReducer.color[5].custom,
    );
    const axiosBlock = useSelector(
        (state) => state.settingReducer.axiosBlockColor,
    );
    console.log("A", axiosBlock);
    console.log("B", form);

    const settingSub = () => {
        axios
            .put(
                "http://10.99.230.245:3001/mypage/theme",
                axiosBlock === 6
                    ? {
                          mainColor: form.temporaryMainColor,
                          backgroundColor: form.temporaryBackgroundColor,
                          textStyle: "regular",
                          textColor: form.temporaryTextColor,
                          colorPaletteId: axiosBlock,
                          color1: customForm[0].mainColor,
                          color2: customForm[1].mainColor,
                          color3: customForm[2].mainColor,
                          color4: customForm[3].mainColor,
                          color5: customForm[4].mainColor,
                          color6: customForm[5].mainColor,
                          color7: customForm[6].mainColor,
                      }
                    : {
                          mainColor: form.temporaryMainColor,
                          backgroundColor: form.temporaryBackgroundColor,
                          textStyle: "regular",
                          textColor: form.temporaryTextColor,
                          colorPaletteId: axiosBlock,
                      },
                {
                    headers: {
                        Authorization:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2ODczMjU0NDh9.GfMx3DKfCSMsSPWx6WXNb9NW9gi0jvfnof9A91I8ZWc",
                    },
                },
            )
            .then((response) => {
                console.log(response);
                alert(response.data.message);
                // window.location.replace("/")
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="btnContainer">
                <button type="button" onClick={settingSub}>
                    Save
                </button>
                <button type="button">Default</button>
            </div>
        </>
    );
}

export default Buttons;
