// store.js

import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./module/card.js";
import monthReducer from "./module/monthPicker.js";
import viewReducer from "./module/viewSelector.js";
import yearReducer from "./module/year.js";
import modalReducer from "./module/modal.js";
import signReducer from "./module/sign.js";
import userReducer from "./module/user.js";
import loginReducer from "./module/login.js";
import loginModalReducer from "./module/loginModal.js";
import dateReducer from "./module/date.js";
import endDateReducer from "./module/endDate.js";
import settingReducer from "./module/setting.js";
import repeatEndReducer from "./module/repeatEnd.js";
import repeatStartReducer from "./module/repeatStart.js";
import limitReducer from "./module/Limit.js";
import userInfoChangeReducer from "./module/userInfoChange.js";
import colorPickerReducer from "./module/colorPicker.js";
import temporaryColorReducer from "./module/temporaryColorSetting.js";
import repeatTypeReducer from "./module/repeatType.js";

const store = configureStore({
    reducer: {
        repeatTypeReducer,
        cardReducer,
        monthReducer,
        viewReducer,
        yearReducer,
        yearReducer,
        modalReducer,
        signReducer,
        userReducer,
        loginReducer,
        loginModalReducer,
        dateReducer,
        endDateReducer,
        settingReducer,
        repeatStartReducer,
        repeatEndReducer,
        limitReducer,
        userInfoChangeReducer,
        colorPickerReducer,
        temporaryColorReducer,
    },
});

export default store;
