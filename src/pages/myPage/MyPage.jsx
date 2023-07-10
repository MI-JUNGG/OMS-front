import UserInfo from "./components/UserInfo";
import Setting from "./components/Setting";
import "./MyPage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, API, token } from "./getData";
import axios from "axios";

function MyPage() {
    const navigate = useNavigate();

    const setting = useSelector((state) => state.settingReducer);
    document.documentElement.style.setProperty(
        "--main-color",
        setting.mainColor,
    );

    const [userInfo, setUserInfo] = useState(null);
    // useEffect(() => {
    //     getData("myPageUserInfo.json", setUserInfo, null);
    // }, []);

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
            content: <UserInfo userInfo={userInfo} />,
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

    const secession = () => {
        if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
            axios
                .delete(`${API}/auth/deleteUser`, {
                    headders: {
                        Authorization: `${token}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return;
        }
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
                                <span
                                    className="withDrawal"
                                    onClick={secession}
                                >
                                    회원탈퇴
                                </span>
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
