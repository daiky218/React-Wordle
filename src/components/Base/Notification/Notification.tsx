import { useEffect, useState } from "react";
import {
    DEFAULT_NOTIFICATION_ANIMATION_DURATION,
    DEFAULT_NOTIFICATION_DURATION,
} from "../../../constants/Settings";

export type NotificationProps = {
    content: string;
    type?: "success" | "info" | "warning" | "error";
    duration?: number;
    onClose: () => void;
    afterClosed?: Function;
};
const Notification = ({
    content,
    type = "info",
    duration = DEFAULT_NOTIFICATION_DURATION,
    onClose,
    afterClosed,
}: NotificationProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const handleClick = () => {
        setIsClosing(true);
    };
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsClosing(true);
            }, duration);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [duration, onClose]);
    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                onClose();
                if (typeof afterClosed === "function") {
                    afterClosed();
                }
            }, DEFAULT_NOTIFICATION_ANIMATION_DURATION);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isClosing, onClose,afterClosed]);
    return (
        <div
            className={`notification ${type} ${
                isClosing ? "slideOut" : "slideIn"
            }`}
        >
            <div className="content">{content}</div>
            {!duration && <div className="close" onClick={handleClick} />}
        </div>
    );
};

export default Notification;
