import React from "react";
// import ColorPicker from "./ColorPicker";
import "./colorCss/ColorPalette.scss";

function ColorPalette() {
    return (
        <div className="palette">
            <div className="colorPickerBox">
                {Object.keys(colors).map((key) => (
                    <div key={key}>
                        <span>{key}</span>
                        <div className="colorRow">
                            {colors[key].map((color, index) => (
                                <div
                                    className={`colorCircle ${
                                        color === "" ? "custom" : ""
                                    }`}
                                    key={index}
                                    style={{
                                        backgroundColor: color,
                                        width: "25px",
                                        height: "25px",
                                        margin: "3px",
                                        borderRadius: "100%",
                                        border:
                                            color === ""
                                                ? "1px solid red"
                                                : "none",
                                    }}
                                ></div>
                            ))}
                            <div
                                className="colorCircle"
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    margin: "3px",
                                    borderRadius: "100%",
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
                <button>Select</button>
            </div>
        </div>
    );
}

export default ColorPalette;
export const colors = {
    vivid: [
        "#EF4444",
        "#FF6800",
        "#FACC15",
        "#16A34A",
        "#3582FF",
        "#9038FF",
        "#58595B",
    ],
    bright: [
        "#FE7B91",
        "#FF9246",
        "#FDE047",
        "#4ADE80",
        "#6AA0F8",
        "#AF71FF",
        "#7E7E80",
    ],
    soft: [
        "#FCA5A5",
        "#FDBA74",
        "#FFE76A",
        "#86EFAC",
        "#A7C8FF",
        "#D9BBFF",
        "#BBBBBB",
    ],
    reddish: [
        "#FF41A4",
        "#FF6666",
        "#FF9090",
        "#FF9ED3",
        "#F692FF",
        "#FF71D7",
        "#DF79F9",
    ],
    pale: [
        "#818CF8",
        "#3B95FE",
        "#38BDF8",
        "#7DD3FC",
        "#66E6F6",
        "#4FE4CD",
        "#B7EA5E",
    ],
    custom: ["", "", "", "", "", "", ""],
};
