import { createSlice } from "@reduxjs/toolkit";

const ViewSlice = createSlice({
    name: "view",
    initialState: {
        select: "Month",
        view: ["Month", "Week", "Day"],
        element: ["/month", "/weekly", "/day"],
    },
    reducers: {
        view: (state, action) => {
            state.select = action.payload;
        },
    },
});

export const { view } = ViewSlice.actions;
export default ViewSlice.reducer;
