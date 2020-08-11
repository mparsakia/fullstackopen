import React from "react"

const Notification = (props) => {
  if (props.message === null) {
    return null
  } else {
    return (<div className={props.style}>{props.message}</div>)
  }
}

export default Notification