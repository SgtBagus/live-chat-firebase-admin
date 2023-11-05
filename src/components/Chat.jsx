import React, { Component } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import Messages from "./Messages";
import Input from "./Input";

import { db } from "../firebase";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageStatus: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    const { dataChat } = this.props;
    const { dataChat: pDataChat } = prevProps;

    if (pDataChat !== dataChat) {
      this.getStatusMessage(dataChat.chatId);
    }
  }

  getStatusMessage = async (id) => {
    try {
      await onSnapshot(doc(db, "chats", id), (doc) => {
        if (doc.exists()) {
          const { allow_chat: allowChat } = doc.data();

          this.setState({
            messageStatus: allowChat,
          })
        }
      });
    } catch (err) {
      alert(err);
    }
  }

  changeStatusMessage = async (value) => {
    const { dataChat: { chatId: id } } = this.props;
    try {
      await updateDoc(doc(db, "chats", id), {
        allow_chat: value,
      });
    } catch(err) {
      alert(err);
    }
  }
  
  render() {
    const { messageStatus } = this.state;
    const { dataChat, currentUser } = this.props;

    return (
      <div className="chat">
        <div className="chatInfo">
          <span>{dataChat.user?.displayName}</span>
          <div>
            {
              !messageStatus ? (
                <button onClick={() => this.changeStatusMessage(true)}>Enable Chat</button>
              ) : (
                <button onClick={() => this.changeStatusMessage(false)}>Disabled Chat</button>
              )
            }
          </div>
        </div>
        <Messages />
        <Input dataChat={dataChat} currentUser={currentUser} />
      </div>
    );
  }
}

export default Chat;
