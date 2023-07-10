import { createSlice } from "@reduxjs/toolkit";

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// start: { year: null, month: null, day: null, time: 0, minute: 0 },
// end: { year: null, month: null, day: null, time: 0, minute: 0 },

const repeatdateSlice = createSlice({
    name: "date",
    initialState: {
        year: null,
        month: null,
        day: null,
    },
    reducers: {
        addTime: (state) => {
            let newTime = state.time + 1;
            if (newTime > 24) {
                newTime = 1;
            }
            return { ...state, time: newTime };
        },
        minusTime: (state) => {
            let newTime = state.time - 1;
            if (newTime < 1) {
                newTime = 24;
            }
            return { ...state, time: newTime };
        },
        addMin: (state) => {
            let newMin = state.minute + 1;
            let newTime = state.time;
            if (newMin > 59) {
                newMin = 0;
                newTime = state.time + 1;
            }
            return { ...state, time: newTime, minute: newMin };
        },
        minusMin: (state) => {
            let newMin = state.minute - 1;
            let newTime = state.time;
            if (newMin < 0) {
                newMin = 59;
                newTime = state.time - 1;
            }
            return { ...state, time: newTime, minute: newMin };
        },
        addDate: (state, action) => {
            return {
                ...state,
                year: action.payload,
            };
        },
        addMonth: (state, action) => {
            return {
                ...state,
                month: action.payload,
            };
        },
        addDay: (state, action) => {
            return {
                ...state,
                day: action.payload,
            };
        },
        PlusY: (state) => {
            return {
                ...state,
                year: state.year + 1,
            };
        },
        PlusM: (state) => {
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

        PlusD: (state) => {
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

        minusY: (state) => {
            return {
                ...state,
                year: state.year - 1,
            };
        },
        minusM: (state) => {
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
        minusD: (state) => {
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
    addDate,
    addDay,
    addMonth,
    PlusD,
    PlusM,
    PlusY,
    minusY,
    minusM,
    minusD,
} = repeatdateSlice.actions;

export default repeatdateSlice.reducer;
