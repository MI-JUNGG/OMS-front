import { useSelector } from "react-redux";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

function Sign() {
    const isSign = useSelector((state) => state.signReducer);

    return (
        <>
            <div className="signContainer">
                {isSign.sign === 0 ? <SignIn /> : <SignUp />}
            </div>
            <div />
        </>
    );
}

export default Sign;
