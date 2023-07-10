import { useSelector, useDispatch } from "react-redux";
import "./Nav.scss";
import MonthPicker from "./components/MonthPicker";
import ViewSwitcher from "./components/ViewSwitcher";
import YearPicker from "./components/YearPicker";
import Sign from "../sign/Sign";
import LoginModalBackground from "../sign/LoginModalBackground";
import { loginModal } from "../../modules/module/loginModal";
import { sign } from "../../modules/module/sign";
import {
    nickName,
    eMail,
    password,
    confirmPassword,
} from "../../modules/module/user";

function Nav() {
    const isLoginModal = useSelector(
        (state) => state.loginModalReducer.loginModal,
    );
    const dispatch = useDispatch();

    const HandleModal = () => {
        dispatch(loginModal());
        dispatch(sign(0));
        dispatch(nickName(""));
        dispatch(eMail(""));
        dispatch(password(""));
        dispatch(confirmPassword(""));
    };

    return (
        <>
            <div className="navWrapper">
                <div className="logo">
                    <img
                        src="/src/assets/images/logo/logo.svg"
                        alt="Oh My Calendar"
                    />
                </div>
                <ViewSwitcher />
                <div className="login">
                    {localStorage.getItem("token") ? (
                        <>
                            <span
                                className="loginText"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    alert("로그아웃 하셨습니다");
                                    window.location.replace("/");
                                    Kakao.init(
                                        "27f63acdf1c5a40aa9a44940fecc9a01",
                                    );
                                    Kakao.isInitialized();
                                }}
                            >
                                로그아웃
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="loginText" onClick={HandleModal}>
                                Login
                            </span>

                            {isLoginModal ? (
                                <>
                                    <LoginModalBackground
                                        onClick={HandleModal}
                                    />
                                    <Sign />
                                </>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Nav;
