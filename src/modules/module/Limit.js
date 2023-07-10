import { createSlice } from "@reduxjs/toolkit";
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const limitdateSlice = createSlice({
    name: "counter",
    initialState: {
        year: null,
        month: null,
        day: null,
        value: "매일",
    },
    reducers: {
        valueSelector: (state, action) => {
            return {
                ...state,
                value: action.payload,
            };
        },
        laddDate: (state, action) => {
            return {
                ...state,
                year: action.payload,
            };
        },
        laddMonth: (state, action) => {
            return {
                ...state,
                month: action.payload,
            };
        },
        laddDay: (state, action) => {
            return {
                ...state,
                day: action.payload,
            };
        },
        lPlusY: (state) => {
            return {
                ...state,
                year: state.year + 1,
            };
        },
        lPlusM: (state) => {
            let newMonth = state.month + 1;
            let newYear = state.year;

            if (newMonth > 12) {
                newMonth = 1;
                newYear = state.year + 1;
            }

            return {
                ...state,
                month: newMonth,
                year: newYear,
            };
        },

        lPlusD: (state) => {
            const daysInMonth = getDaysInMonth(state.year, state.month);
            const day = state.day + 1;
            let newDay = day;
            let newMonth = state.month;
            let newYear = state.year;

            if (newDay > daysInMonth) {
                newDay = 1;
                newMonth = state.month + 1;
                if (newMonth > 12) {
                    newMonth = 1;
                    newYear = state.year + 1;
                }
            }

            return {
                ...state,
                day: newDay,
                month: newMonth,
                year: newYear,
            };
        },

        lminusY: (state) => {
            return {
                ...state,
                year: state.year - 1,
            };
        },
        lminusM: (state) => {
            let newMonth = state.month - 1;
            let newYear = state.year;

            if (newMonth < 1) {
                newMonth = 12;
                newYear = state.year - 1;
            }

            return {
                ...state,
                month: newMonth,
                year: newYear,
            };
        },
        lminusD: (state) => {
            const daysInPreviousMonth = getDaysInMonth(
                state.year,
                state.month - 1,
            );
            const day = state.day - 1;
            let newDay = day;
            let newMonth = state.month;
            let newYear = state.year;

            if (newDay < 1) {
                newDay = daysInPreviousMonth;
                newMonth = state.month - 1;
                if (newMonth < 1) {
                    newMonth = 12;
                    newYear = state.year - 1;
                }
            }

            return {
                ...state,
                day: newDay,
                month: newMonth,
                year: newYear,
            };
        },
    },
});

export const {
    laddDate,
    laddDay,
    laddMonth,
    lPlusD,
    lPlusM,
    lPlusY,
    lminusY,
    lminusM,
    lminusD,
    valueSelector,
} = limitdateSlice.actions;

export default limitdateSlice.reducer;
