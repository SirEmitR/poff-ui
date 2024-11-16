'use client'
import { useNotification } from '../context/notification-context';
import Notification from './Notification';

const NotificationStack = () => {
    const { notifications } = useNotification();
    return (
        <div className="notification-stack">
            {notifications.map((notification) => (
                <Notification key={notification.id} notification={notification} />
            ))}
        </div>
    );
};

export default NotificationStack;