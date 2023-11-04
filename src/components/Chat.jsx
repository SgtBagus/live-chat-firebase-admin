import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

import Messages from "./Messages";
import Input from "./Input";
import Navbar from "./Navbar";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="sidebar-message">
          <Navbar />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
