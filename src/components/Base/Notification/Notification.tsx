import { useEffect, useState } from "react";
import classNames from "classnames";
import {
    DEFAULT_NOTIFICATION_ANIMATION_DURATION,
    DEFAULT_NOTIFICATION_DURATION,
} from "../../../constants/Settings";

export type NotificationProps = {
    content: string;
    position?:'topLeft'|'topRight'|'center'
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
    position='topRight'
}: NotificationProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const handleClick = () => {
        setIsClosing(true);
    };
    const className = classNames("notification", type,position,{
        slideOut: isClosing,
        slideIn: !isClosing,
    });
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
    }, [isClosing, onClose, afterClosed]);
    
    return (
        <div
            className={className}
        >
            <div className="content">{content}</div>
            {!duration && <div className="close" onClick={handleClick} />}
        </div>
    );
};

export default Notification;
