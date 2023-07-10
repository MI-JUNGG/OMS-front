import { createSlice } from "@reduxjs/toolkit";

const temporaryColorSetting = createSlice({
    name: "temporaryColorSetting",
    initialState: {
        temporaryMainColor: "#547aff",
        temporaryBackgroundColor: "#f3f6ff",
        temporaryTextStyle: "",
        temporaryTextColor: "dark",
        temporaryBlockColor: {
            mainColor: "",
            bgColor: "",
        },
        temporaryBlockColorTheme: "0",
        temporaryBlockColorThemeTitle: "vivid",
    },
    reducers: {
        temporaryMainColor: (state, action) => {
            state.temporaryMainColor = action.payload;
        },
        temporaryBackgroundColor: (state, action) => {
            state.temporaryBackgroundColor = action.payload;
        },
        temporaryTextStyle: (state, action) => {
            state.temporaryTextStyle = action.payload;
        },
        temporaryTextColor: (state, action) => {
            state.temporaryTextColor = action.payload;
        },
        temporaryBlockMainColor: (state, action) => {
            state.temporaryBlockColor.mainColor = action.payload;
        },
        temporaryBlockBGColor: (state, action) => {
            state.temporaryBlockColor.bgColor = action.payload;
        },
        temporaryBlockColorTheme: (state, action) => {
            state.temporaryBlockColorTheme = action.payload;
        },
        temporaryBlockColorThemeTitle: (state, action) => {
            state.temporaryBlockColorThemeTitle = action.payload;
        },
    },
});

export const {
    temporaryMainColor,
    temporaryBackgroundColor,
    temporaryTextStyle,
    temporaryTextColor,
    temporaryBlockMainColor,
    temporaryBlockBGColor,
    temporaryBlockColorTheme,
    temporaryBlockColorThemeTitle,
} = temporaryColorSetting.actions;
export default temporaryColorSetting.reducer;
