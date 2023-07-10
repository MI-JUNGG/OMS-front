// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        cardmodal: false,
        dateControl: false,
        endDateControl: false,
        dateType: false,
        repeatControl: false,
        repeatEndControl: false,
        showColorPicker: false,
        typeControl: 1,
        limit: false,
        FixCard: false,
        deleteCard: false,
        cardID: { cardData: null, cardid: null },
    },
    reducers: {
        idHandler: (state, action) => {
            const { cardData, cardid } = action.payload;
            return { ...state, cardID: { cardData, cardid } };
        },
        deleteCard: (state) => {
            return { ...state, deleteCard: !state.deleteCard };
        },
        cardTypeReducer: (state) => {
            return { ...state, FixCard: !state.FixCard };
        },
        showColorPicker: (state) => {
            return { ...state, showColorPicker: !state.showColorPicker };
        },
        cardmodal: (state) => {
            return { ...state, cardmodal: !state.cardmodal };
        },
        dateControl: (state) => {
            return { ...state, dateControl: !state.dateControl };
        },
        endDateControl: (state) => {
            return { ...state, endDateControl: !state.endDateControl };
        },
        dateType: (state, actions) => {
            return { ...state, dateType: actions.payload };
        },
        repeatControl: (state) => {
            return { ...state, repeatControl: !state.repeatControl };
        },
        repeatEndControl: (state) => {
            return { ...state, repeatEndControl: !state.repeatEndControl };
        },
        typeControl: (_, actions) => {
            return { repeatEndControl: actions.payload };
        },
        limitControl: (state) => {
            return { ...state, limit: !state.limit };
        },
    },
});

export const {
    idHandler,
    deleteCard,
    cardmodal,
    dateControl,
    endDateControl,
    dateType,
    repeatControl,
    repeatEndControl,
    showColorPicker,
    typeControl,
    limitControl,
    cardTypeReducer,
} = modalSlice.actions;
export default modalSlice.reducer;
