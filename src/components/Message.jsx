import React, { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import { checkfileUrl } from "../Helper/checkFile";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>

      <div className="messageContent">
        {
          message.text !== "" && (
            <p>{message.text}</p>
          )
        }
        {
          message.img && (
            <div>
              {
                  checkfileUrl(message.img)
                  ? (
                    <img
                        src={message.img}
                        className="m-2"
                        style={{ width: '400px', objectFit: 'cover' }}
                        alt=""
                    />
                  )
                  : (
                    <video className="m-2" width="400px" controls style={{ objectFit: 'cover' }}>
                        <source src={message.img} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                  )
                }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Message;
