import { createSlice } from "@reduxjs/toolkit";

const userInfoChange = createSlice({
    name: "user",
    initialState: {
        nickName: "",
        newPassword: "",
        password: "",
        repeatNewPassword: "",
    },
    reducers: {
        nickName: (state, action) => {
            state.nickName = action.payload;
        },
        newPassword: (state, action) => {
            state.newPassword = action.payload;
        },
        repeatNewPassword: (state, action) => {
            state.repeatNewPassword = action.payload;
        },
        password: (state, action) => {
            state.password = action.payload;
        },
    },
});

export const { nickName, newPassword, password, repeatNewPassword } =
    userInfoChange.actions;
export default userInfoChange.reducer;
