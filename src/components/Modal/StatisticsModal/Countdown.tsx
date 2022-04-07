import { useEffect, useState } from "react";
import { getNextWordTime, tomorrow } from "../../../utils/word";
const msToHMS = (ms: number) => {
    let seconds = ms / 1000;
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60)
   

    
    return `${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`
};
const Countdown = () => {
    const [time, setTime] = useState<string>(() =>
        msToHMS(tomorrow-Date.now())
    );
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(msToHMS( tomorrow-Date.now()));
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [time]);
    return <div className="countdown-time">{time}</div>;
};
export default Countdown;
