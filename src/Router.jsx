import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    background,
    handleBlockColorTheme,
    handleBlockColorThemeTitle,
    main,
    textColor,
    textStyle,
} from "../src/modules/module/setting";
import {
    temporaryMainColor,
    temporaryBackgroundColor,
    temporaryTextColor,
    temporaryTextStyle,
    temporaryBlockColorTheme,
    temporaryBlockColorThemeTitle,
} from "../src/modules/module/temporaryColorSetting";
import Daily from "./pages/daily/Daily";
import Nav from "./pages/nav/Nav";
import Week from "./pages/weekly/Week";
import MyPage from "./pages/myPage/MyPage";
import KakoCallback from "./pages/sign/KakoCallback";
import NaverCallback from "./pages/sign/NaverCallback";
import Main from "./pages/Main";

function Router() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("/data/myPage.json", {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json", // JSON 형식으로 요청을 보내기 위해 Content-Type을 설정
            },
        })
            .then((response) => response.json())
            .then((res) => {
                const mainColor = res.mainColor;
                dispatch(main(mainColor));
                dispatch(temporaryMainColor(mainColor));

                const backgroundColor = res.backgroundColor;
                dispatch(background(backgroundColor));
                dispatch(temporaryBackgroundColor(backgroundColor));

                const resTextColor = res.textColor;
                dispatch(textColor(resTextColor));
                dispatch(temporaryTextColor(resTextColor));

                const resTextStyle = res.textStyle;
                dispatch(textStyle(resTextStyle));
                dispatch(temporaryTextStyle(resTextStyle));

                const colorPaletteId = res.colorPaletteId;
                dispatch(temporaryBlockColorTheme(colorPaletteId - 1));
                dispatch(handleBlockColorTheme(colorPaletteId - 1));

                dispatch(
                    temporaryBlockColorThemeTitle(
                        pickTitle(colorPaletteId - 1),
                    ),
                );
                dispatch(
                    handleBlockColorThemeTitle(pickTitle(colorPaletteId - 1)),
                );
            });
    }, []);

    const pickTitle = (id) => {
        switch (id) {
            case 0:
                return "vivid";
            case 1:
                return "bright";
            case 2:
                return "soft";
            case 3:
                return "reddish";
            case 4:
                return "pale";
            case 5:
                return "custom";
            default:
                return "";
        }
    };

    useEffect(() => {
        const savedSetting = localStorage.getItem("setting");

        if (savedSetting) {
            const setting = JSON.parse(savedSetting);

            document.documentElement.style.setProperty(
                "--main-color",
                setting.mainColor,
            );
            document.documentElement.style.setProperty(
                "--background-color",
                setting.backgroundColor,
            );
            document.documentElement.style.setProperty(
                "--text-color",
                setting.textColor,
            );
            document.documentElement.style.setProperty(
                "--text-style",
                setting.textStyle,
            );
            document.documentElement.style.setProperty(
                "--block-color",
                setting.blockColor,
            );
        }
    }, []);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Nav />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/month" element={<Main />} />
                <Route path="/day" element={<Daily />} />
                <Route path="/weekly" element={<Week />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/auth/kakao/callback" element={<KakoCallback />} />
                <Route
                    path="/auth/naver/callback"
                    element={<NaverCallback />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
