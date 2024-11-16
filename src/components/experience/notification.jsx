'use client'
import { useNotification } from "../context/notification-context";


const Notification = ({ notification }) => {
    const { removeNotification } = useNotification();
    return (
        <div 
            className={`notification text-sm ${notification.type}`} 
            onClick={() => removeNotification(notification.id)}
        >
            {notification.message}
        </div>
    );
};

export default Notification;
