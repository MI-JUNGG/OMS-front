import { createSlice } from "@reduxjs/toolkit";

const loginModalSlice = createSlice({
    name: "loginModal",
    initialState: {
        loginModal: false,
    },
    reducers: {
        loginModal: (state) => {
            return { ...state, loginModal: !state.loginModal };
        },
    },
});

export const { loginModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
