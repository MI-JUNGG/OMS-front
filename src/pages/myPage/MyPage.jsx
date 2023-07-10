import UserInfo from "./components/UserInfo";
import Setting from "./components/Setting";
import "./MyPage.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MyPage() {
    const navigate = useNavigate();

    const PAGE_STATE = [
        {
            id: 0,
            title: "Home",
            content: null,
            img: "/src/assets/images/mypage/mypage_home.svg",
        },
        {
            id: 1,
            title: "회원정보",
            content: <UserInfo />,
            img: "/src/assets/images/mypage/mypage_mypage.svg",
        },
        {
            id: 2,
            title: "설정",
            content: <Setting />,
            img: "/src/assets/images/mypage/mypage_setting.svg",
        },
    ];

    const [pageState, setPageState] = useState(1);

    const pageStateChanger = (data) => {
        setPageState(data);
        data === 0 && navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <div className="myPageContainer">
                <div className="myPageNav">
                    <div className="settingNavTop">
                        <img
                            src="/src/assets/images/setting/setting_calendar2.svg"
                            alt="OhMyCalender"
                        />
                        <div className="logZone">
                            <span>NickName</span>
                            <div className="logOutZone">
                                <span onClick={logout}>로그아웃</span>
                                <span className="withDrawal">회원탈퇴</span>
                            </div>
                        </div>
                    </div>
                    <div className="pageState">
                        {PAGE_STATE.map((data, id) => {
                            return (
                                <div
                                    className={`${
                                        pageState === data.id
                                            ? "selectState"
                                            : ""
                                    }`}
                                    key={data.id}
                                    onClick={() => {
                                        pageStateChanger(data.id);
                                    }}
                                >
                                    <img src={data.img} alt={data.title} />
                                    <span>{data.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    {pageState === PAGE_STATE[1].id && PAGE_STATE[1].content}
                    {pageState === PAGE_STATE[2].id && PAGE_STATE[2].content}
                </div>
            </div>
        </>
    );
}

export default MyPage;
