import { useLocation } from "react-router";
import { useEffect } from "react";
import { LoginNaver } from "./LoginNaver";
const { naver } = window;

export default function NaverLogin() {
    const location = useLocation();
    const code = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        if (window.location.href.includes("access_token")) {
            window.localStorage.setItem(
                "token",
                window.location.href.split("=")[1].split("&")[0] ?? "none",
            );
            // location("/");
        }
    }, [code]);

    return (
        <div>
            <LoginNaver></LoginNaver>
        </div>
    );
}
