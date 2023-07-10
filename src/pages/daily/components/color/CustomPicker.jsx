import React, { useState } from "react";
import { ChromePicker } from "react-color";

const CustomPicker = () => {
    const [color, setColor] = useState("#ffffff"); // 초기 색상값 설정

    const handleChange = (selectedColor) => {
        setColor(selectedColor.hex);
    };

    return (
        <div>
            <ChromePicker
                color={color}
                onChange={handleChange}
                disableAlpha={true}
                styles={{
                    default: {
                        picker: {
                            height: "300px",
                        },
                        slider: {
                            height: "300px",
                        },
                        swatch: {
                            padding: "5px",
                            background: "#fff",
                            borderRadius: "1px",
                            boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                            display: "inline-block",
                            cursor: "pointer",
                            width: "80px",
                            height: "80px",
                        },
                    },
                }}
            />
            <div
                style={{
                    backgroundColor: color,
                    width: "100px",
                    height: "100px",
                }}
            ></div>
        </div>
    );
};

export default CustomPicker;
