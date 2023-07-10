import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: "counter",
    initialState: [],
    reducers: {
        addCard: (state, action) => {
            const payload = Array.isArray(action.payload)
                ? action.payload
                : [action.payload];
            state.push(...payload);
        },
        removeCard: (state, action) => {
            const index = state.findIndex((card) => card.id === action.payload);
            state.splice(index, 1);
        },
    },
});

export const { addCard, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
