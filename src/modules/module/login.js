import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: "login",
    initialState: {
        email: "",
        password: "",
    },
    reducers: {
        email: (state, action) => {
            state.email = action.payload;
        },
        password: (state, action) => {
            state.password = action.payload;
        },
    },
});

export const { email, password } = LoginSlice.actions;
export default LoginSlice.reducer;
