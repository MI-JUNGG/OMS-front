import { useDispatch, useSelector } from "react-redux";

import "./CreatedCard.scss";

function CreatedCardItem() {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.cardReducer);

    const { title, content } = form;
    return (
        <div className="createted">
            <div>
                <span>제목: {title}</span>
                <span>할일: {content}</span>
                <button>삭제</button>
            </div>
        </div>
    );
}

export default CreatedCardItem;
