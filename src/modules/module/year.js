import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
const initialYear = date.getFullYear();

const YearSlice = createSlice({
    name: "year",
    initialState: {
        value: initialYear,
    },
    reducers: {
        year: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { year } = YearSlice.actions;
export default YearSlice.reducer;
