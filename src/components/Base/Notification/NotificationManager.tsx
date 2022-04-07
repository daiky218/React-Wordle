import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createContainer } from "../../../utils/container";
import Notification, { NotificationProps } from "./Notification";
import { nanoid } from "nanoid";
import { DEFAULT_NOTIFICATION_DURATION } from "../../../constants/Settings";
import { NotifyProps } from ".";
import classNames from "classnames";

// 通知方法类型
type NotificationsProps = NotificationProps & {
    id: string;
    duration: number;
};
// 通知管理器类型
type NotificationManagerProps = {
    exposeNotify: (method: NotifyProps) => void;
};

// 创建通知容器
const notificationsContainer = createContainer("notificationPortal");

// 通知管理器组件
const NotificationManager = ({ exposeNotify }: NotificationManagerProps) => {
    // 通知数组
    const [notifications, setNotifications] = useState<NotificationsProps[]>(
        []
    );
    // 方法:创建通知
    const createNotification: NotifyProps = (options) => {
        const id = nanoid();
        setNotifications([
            ...notifications,
            {
                duration: DEFAULT_NOTIFICATION_DURATION,
                ...options,
                onClose: () => {
                    deleteNotificationById(id);
                },
                id,
            },
        ]);
    };
    // 方法:删除指定ID的通知
    const deleteNotificationById = (id: string) => {
        setNotifications((currentNotifications) =>
            currentNotifications.filter(
                (notification) => notification.id !== id
            )
        );
    };

    useEffect(() => {
        exposeNotify((options) => createNotification(options));
    });
    const className = classNames("notifications-container");
    return createPortal(
        <div className={className}>
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    content={notification.content}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={notification.onClose}
                    afterClosed={notification.afterClosed}
                    position={notification.position}
                />
            ))}
        </div>,
        notificationsContainer
    );
};
export { notificationsContainer, NotificationManager };
