import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Daily from "./pages/daily/Daily";
import Nav from "./pages/nav/Nav";
import Week from "./pages/weekly/Week";
import MyPage from "./pages/myPage/myPage";
import KakoCallback from "./pages/sign/kakoCallback";
import NaverCallback from "./pages/sign/naverCallback";

function Router() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Main />} />
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
