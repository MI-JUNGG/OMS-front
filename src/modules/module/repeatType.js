import { createSlice } from "@reduxjs/toolkit";

const repeatType = createSlice({
    name: "repeattype",
    initialState: { type: 1 },
    reducers: {
        typeReducer: (state, action) => {
            return { ...state, type: action.payload + 1 };
        },
    },
});

export const { typeReducer } = repeatType.actions;
export default repeatType.reducer;
