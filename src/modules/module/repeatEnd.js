import { createSlice } from "@reduxjs/toolkit";
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const repeatenddateSlice = createSlice({
    name: "counter",
    initialState: {
        year: null,
        month: null,
        day: null,
        time: 23,
        minute: 59,
    },
    reducers: {
        eaddDate: (state, action) => {
            return {
                ...state,
                year: action.payload,
            };
        },
        eaddMonth: (state, action) => {
            return {
                ...state,
                month: action.payload - 1,
            };
        },
        eaddDay: (state, action) => {
            return {
                ...state,
                day: action.payload,
            };
        },
        ePlusY: (state) => {
            return {
                ...state,
                year: state.year + 1,
            };
        },
        ePlusM: (state) => {
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

        ePlusD: (state) => {
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

        eminusY: (state) => {
            return {
                ...state,
                year: state.year - 1,
            };
        },
        eminusM: (state) => {
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
        eminusD: (state) => {
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
    eaddDate,
    eaddDay,
    eaddMonth,
    ePlusD,
    ePlusM,
    ePlusY,
    eeminusY,
    eminusM,
    eminusD,
} = repeatenddateSlice.actions;

export default repeatenddateSlice.reducer;
