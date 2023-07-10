import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "setting";

const SettingSlice = createSlice({
    name: "setting",
    initialState: {
        mainColor: "#547AFF",
        backgroundColor: "#F3F6FF",
        textStyle: "Regular",
        textColor: "Dark",
        blockColor: "#AF71FF",
        blockColorTheme: 1,
        blockColorThemeTitle: "",
        isModal: 0,
        isCustomPicker: false,
        axiosBlockColor: 0,
    },
    reducers: {
        main: (state, action) => {
            state.mainColor = action.payload;
            saveSettingToLocalStorage(state);
        },
        background: (state, action) => {
            state.backgroundColor = action.payload;
            saveSettingToLocalStorage(state);
        },
        textColor: (state, action) => {
            state.textColor = action.payload;
            saveSettingToLocalStorage(state);
        },
        textStyle: (state, action) => {
            state.textStyle = action.payload;
            saveSettingToLocalStorage(state);
        },
        handleBlockColor: (state, action) => {
            state.blockColor = action.payload;
            saveSettingToLocalStorage(state);
        },
        handleBlockColorTheme: (state, action) => {
            state.blockColorTheme = action.payload;
            saveSettingToLocalStorage(state);
        },
        handleBlockColorThemeTitle: (state, action) => {
            state.blockColorThemeTitle = action.payload;
            saveSettingToLocalStorage(state);
        },
        isModal: (state, action) => {
            state.isModal = action.payload;
            saveSettingToLocalStorage(state);
        },
        isCustomPicker: (state, action) => {
            state.isCustomPicker = action.payload;
            saveSettingToLocalStorage(state);
        },
        handleaxiosBlockColor: (state, action) => {
            state.axiosBlockColor = action.payload;
            saveSettingToLocalStorage(state);
        },
    },
});

const saveSettingToLocalStorage = (setting) => {
    localStorage.setItem(localStorageKey, JSON.stringify(setting));
};

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
