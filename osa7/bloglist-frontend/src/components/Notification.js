import React from "react"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) return null
  return <Alert variant="info">{notification}</Alert>
}

export default Notification
