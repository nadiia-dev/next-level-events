"use client";
import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timeout = setTimeout(() => {
        setActiveNotification(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [activeNotification]);

  function handleShowNotification(data) {
    setActiveNotification(data);
  }

  function handleHideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification,
  };

  return <NotificationContext value={context}> {children}</NotificationContext>;
}

export default NotificationContext;
