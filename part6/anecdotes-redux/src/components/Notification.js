import React from "react";
import { useSelector } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.notification);

  if (notification) {
    return <div style={style}>{notification}</div>;
  } else {
    return null;
  }
};

export default Notification;
