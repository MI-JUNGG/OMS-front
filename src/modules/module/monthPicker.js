import { createSlice } from "@reduxjs/toolkit";

const date = new Date();
const nowMonth = date.getMonth() + 1;

const MonthSlice = createSlice({
    name: "month",
    initialState: {
        month: nowMonth,
        monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    reducers: {
        month: (state, action) => {
            state.month = action.payload;
        },
        prevMonth: (state) => {
            const prevMonth = state.month - 1;
            state.month =
                prevMonth < state.monthList[0]
                    ? state.monthList.slice(-1)[0]
                    : prevMonth;
        },
        nextMonth: (state) => {
            const nextMonth = state.month + 1;
            state.month =
                nextMonth > state.monthList.slice(-1)[0]
                    ? state.monthList[0]
                    : nextMonth;
        },
    },
});

export const { month, prevMonth, nextMonth } = MonthSlice.actions;
export default MonthSlice.reducer;
