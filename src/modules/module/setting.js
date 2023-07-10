import { createSlice } from "@reduxjs/toolkit";

const SettingSlice = createSlice({
    name: "setting",
    initialState: {
        mainColor: "#547AFF",
        backgroundColor: "#F3F6FF",
        textStyle: "Regular",
        textColor: "Dark",
        blockColor: "#AF71FF",
        blockColorTheme: 1,
        blockColorThemeTitle: "bright",
        isModal: 0,
        isCustomPicker: false,
        axiosBlockColor: 0,
    },
    reducers: {
        main: (state, action) => {
            state.mainColor = action.payload;
        },
        background: (state, action) => {
            state.backgroundColor = action.payload;
        },
        textColor: (state, action) => {
            state.textColor = action.payload;
        },
        textStyle: (state, action) => {
            state.textStyle = action.payload;
        },
        handleBlockColor: (state, action) => {
            state.blockColor = action.payload;
        },
        handleBlockColorTheme: (state, action) => {
            state.blockColorTheme = action.payload;
        },
        handleBlockColorThemeTitle: (state, action) => {
            state.blockColorThemeTitle = action.payload;
        },
        isModal: (state, action) => {
            state.isModal = action.payload;
        },
        isCustomPicker: (state, action) => {
            state.isCustomPicker = action.payload;
        },
        handleaxiosBlockColor: (state, action) => {
            state.axiosBlockColor = action.payload;
        },
    },
});

export const {
    main,
    background,
    textColor,
    textStyle,
    handleBlockColor,
    handleBlockColorTheme,
    handleBlockColorThemeTitle,
    isModal,
    isCustomPicker,
    handleaxiosBlockColor,
} = SettingSlice.actions;
export default SettingSlice.reducer;
