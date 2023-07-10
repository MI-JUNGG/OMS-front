import { createSlice } from "@reduxjs/toolkit";

const SignSlice = createSlice({
    name: "sign",
    initialState: {
        sign: 0,
    },
    reducers: {
        sign: (state, action) => {
            state.sign = action.payload;
        },
    },
});

export const { sign } = SignSlice.actions;
export default SignSlice.reducer;
