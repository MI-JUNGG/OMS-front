import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: "counter",
    initialState: {
        title: "",
        url: "",
        contents: "",
    },

    reducers: {
        textReducer: (state, actions) => {
            return {
                ...state,
                [state.name]: actions.payload,
            };
        },
    },
});

export const { textReducer } = contentSlice.actions;

export default contentSlice.reducer;
