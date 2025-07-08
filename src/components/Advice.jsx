import { useState } from "react";
import useFetch from "../hooks/useFetch";

function Advice() {
    const { data, isLoading } = useFetch(
        "https://korean-advice-open-api.vercel.app/api/advice"
    );
    const [isShow, setIsShow] = useState(false);

    if (isLoading) return <div>명언 불러오는 중...</div>;

    const handleToggle = () => {
        setIsShow((prev) => !prev);
    };

    return (
        <>
            <div className="advice-btn-wrap">
                <button onClick={handleToggle} className="advice-toggle-btn">
                    {isShow ? "명언 숨기기" : "오늘의 명언 보기"}
                </button>
            </div>
            {isShow && (
                <div className="advice-wrap">
                    <div className="advice-author">
                        {data.author}
                        {`(${data.authorProfile})`}
                    </div>
                    <div className="advice-message">{data.message}</div>
                </div>
            )}
        </>
    );
}

export default Advice;
