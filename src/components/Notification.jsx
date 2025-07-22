import { useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ notifications, removeNotification }) => {
  useEffect(() => {
    if (notifications.length) {
      const timer = setTimeout(() => {
        removeNotification(); // Delete the notification after 5 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications, removeNotification]);

  if (!notifications.length) return null;

  return (
    <div>
      {notifications.map((n, idx) => (
        <div key={idx} className={n.type}>
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
