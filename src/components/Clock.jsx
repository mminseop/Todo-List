import { useEffect, useState } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // 1초마다 시간 갱신

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 제거
    }, []);

    const formatTime = (time) => {
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");
        return `${hours} : ${minutes} : ${seconds}`;
    };

    return <div className="clock-wrap">{formatTime(time)}</div>;
}

export default Clock;
