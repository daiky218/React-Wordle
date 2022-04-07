import { createRoot } from "react-dom/client";
import {
    NotificationManager,
    notificationsContainer,
} from "./NotificationManager";


export type NotifyProps = {
    (options: NotifyOptionsProps): void;
};
type NotifyOptionsProps = {
    content: string;
    position?:'topLeft'|'topRight'|'center'
    type?: "success" | "info" | "warning" | "error";
    duration?: number;
    afterClosed?:Function;
};

let notify: NotifyProps;
const container = createRoot(notificationsContainer);
container.render(
    <NotificationManager
        exposeNotify={(method: NotifyProps) => {
            notify = method;
        }}
    />
);

const success = (options: NotifyOptionsProps) =>
    notify({ ...options, type: "success" });
const info = (options: NotifyOptionsProps) =>
    notify({ ...options, type: "info" });
const warning = (options: NotifyOptionsProps) =>
    notify({ ...options, type: "warning" });
const error = (options: NotifyOptionsProps) =>
    notify({ ...options, type: "error" });

export { success, info, warning, error };
