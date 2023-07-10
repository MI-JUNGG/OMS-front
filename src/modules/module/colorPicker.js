import { createSlice } from "@reduxjs/toolkit";

const ColorPicker = createSlice({
    name: "view",
    initialState: {
        color: [
            {
                vivid: [
                    {
                        id: 1,
                        mainColor: "#ef4444",
                        backgroundColor: "#FEE8E8",
                    },
                    {
                        id: 2,
                        mainColor: "#FF6800",
                        backgroundColor: "#FFF0E5",
                    },
                    {
                        id: 3,
                        mainColor: "#FACC15",
                        backgroundColor: "#FFFAE8",
                    },
                    {
                        id: 4,
                        mainColor: "#16A34A",
                        backgroundColor: "#E8F6ED",
                    },
                    {
                        id: 5,
                        mainColor: "#3582FF",
                        backgroundColor: "#EBF3FF",
                    },
                    {
                        id: 6,
                        mainColor: "#9038FF",
                        backgroundColor: "#F4EBFF",
                    },
                    {
                        id: 7,
                        mainColor: "#58595B",
                        backgroundColor: "#EEEEEF",
                    },
                ],
            },
            {
                bright: [
                    {
                        id: 1,
                        mainColor: "#FE7B91",
                        backgroundColor: "#FEE8E8",
                    },
                    {
                        id: 2,
                        mainColor: "#FF9246",
                        backgroundColor: "#FFF4EC",
                    },
                    {
                        id: 3,
                        mainColor: "#FDE047",
                        backgroundColor: "#FFFCED",
                    },
                    {
                        id: 4,
                        mainColor: "#4ADE80",
                        backgroundColor: "#EDFCF2",
                    },
                    {
                        id: 5,
                        mainColor: "#6AA0F8",
                        backgroundColor: "#F0F5FE",
                    },
                    {
                        id: 6,
                        mainColor: "#AF71FF",
                        backgroundColor: "#F7F1FF",
                    },
                    {
                        id: 7,
                        mainColor: "#7E7E80",
                        backgroundColor: "#F2F2F2",
                    },
                ],
            },
            {
                soft: [
                    {
                        id: 1,
                        mainColor: "#FCA5A5",
                        backgroundColor: "#FFF6F6",
                    },
                    {
                        id: 2,
                        mainColor: "#FDBA74",
                        backgroundColor: "#FFF8F1",
                    },
                    {
                        id: 3,
                        mainColor: "#FFE76A",
                        backgroundColor: "#FFFDF0",
                    },
                    {
                        id: 4,
                        mainColor: "#86EFAC",
                        backgroundColor: "#F3FDF7",
                    },
                    {
                        id: 5,
                        mainColor: "#A7C8FF",
                        backgroundColor: "#F6F9FF",
                    },
                    {
                        id: 6,
                        mainColor: "#D9BBFF",
                        backgroundColor: "#FBF8FF",
                    },
                    {
                        id: 7,
                        mainColor: "#BBBBBB",
                        backgroundColor: "#F8F8F8",
                    },
                ],
            },
            {
                reddish: [
                    {
                        id: 1,
                        mainColor: "#FF41A4",
                        backgroundColor: "#FFECF6",
                    },
                    {
                        id: 2,
                        mainColor: "#FF6666",
                        backgroundColor: "#FFF0F0",
                    },
                    {
                        id: 3,
                        mainColor: "#FF9090",
                        backgroundColor: "#FFF4F4",
                    },
                    {
                        id: 4,
                        mainColor: "#FF9ED3",
                        backgroundColor: "#FFF5FB",
                    },
                    {
                        id: 5,
                        mainColor: "#F692FF",
                        backgroundColor: "#FEF4FF",
                    },
                    {
                        id: 6,
                        mainColor: "#FF71D7",
                        backgroundColor: "#FFF1FB",
                    },
                    {
                        id: 7,
                        mainColor: "#DF79F9",
                        backgroundColor: "#FCF2FE",
                    },
                ],
            },
            {
                pale: [
                    {
                        id: 1,
                        mainColor: "#818CF8",
                        backgroundColor: "#F2F3FE",
                    },
                    {
                        id: 2,
                        mainColor: "#3B95FE",
                        backgroundColor: "#EBF4FF",
                    },
                    {
                        id: 3,
                        mainColor: "#38BDF8",
                        backgroundColor: "#EBF8FE",
                    },
                    {
                        id: 4,
                        mainColor: "#7DD3FC",
                        backgroundColor: "#F2FBFF",
                    },
                    {
                        id: 5,
                        mainColor: "#66E6F6",
                        backgroundColor: "#F0FCFE",
                    },
                    {
                        id: 6,
                        mainColor: "#4FE4CD",
                        backgroundColor: "#EDFCFA",
                    },
                    {
                        id: 7,
                        mainColor: "#B7EA5E",
                        backgroundColor: "#F8FDEF",
                    },
                ],
            },
            {
                custom: [
                    {
                        id: 1,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                    {
                        id: 2,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                    {
                        id: 3,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                    {
                        id: 4,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                    {
                        id: 5,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                    {
                        id: 6,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                    {
                        id: 7,
                        mainColor: "#ffffff",
                        backgroundColor: "#ffffff",
                    },
                ],
            },
        ],
    },
    reducers: {
        setCustomMainColor: (state, action) => {
            const { categoryId, customId, mainColor } = action.payload;
            state.color[categoryId].custom[customId].mainColor = mainColor;
        },
        setCustomBackgroundColor: (state, action) => {
            const { categoryId, customId, backgroundColor } = action.payload;
            state.color[categoryId].custom[customId].backgroundColor =
                backgroundColor;
        },
    },
});

export const { setCustomMainColor, setCustomBackgroundColor } =
    ColorPicker.actions;
export default ColorPicker.reducer;
