"use client"

import React, { useEffect, useState } from "react"

export default function Home() {
  const [notificationSent, setNotificationSent] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const sendNotification = () => {
    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      !notificationSent
    ) {
      new Notification("New push notification", {
        body: "This is your notification message",
      })
      setNotificationSent(true)
      setIsButtonDisabled(true)
    }

    setTimeout(() => {
      setIsButtonDisabled(false)
      setNotificationSent(false)
    }, 3000)
  }

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Notification permission granted!!")
        }
      })
    }
  }, [])

  return (
    <main>
      <h1>Click the button below</h1>
      <button
        className="notification-button"
        onClick={sendNotification}
        disabled={isButtonDisabled}
      >
        Trigger Notification
      </button>
      {isButtonDisabled && <p>Espere un momento...</p>}
    </main>
  )
}
