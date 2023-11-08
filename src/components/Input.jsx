import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import {
  arrayUnion, doc, serverTimestamp, Timestamp, updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import Attach from "../img/attach.png";

import { checkThisFileIsImageOrNot } from "../Helper/checkFile";
import { uploadFile } from "../data/uploadFile";

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      img: null,
    };
  }

  changeForm = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  handleSend = async () => {
    const { currentUser, dataChat } = this.props; 
    const { text, img } = this.state;

    if (img) {
      const pathUpload = checkThisFileIsImageOrNot(img) ? 'message/images/' : 'message/videos/';

      const uploadImage = await uploadFile(img, pathUpload);
      await updateDoc(doc(db, "chats", dataChat.chatId), {
          messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: uploadImage,
          }),
      });
    } else {
      await updateDoc(doc(db, "chats", dataChat.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    let lastMessageText = text;
    if (img && text === '') {
        lastMessageText = checkThisFileIsImageOrNot(img) ? 'Mengkirimkan Gambar' : 'Mengikirimkan Video';
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [dataChat.chatId + ".lastMessage"]: {
        text: lastMessageText,
      },
      [dataChat.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", dataChat.user.uid), {
      [dataChat.chatId + ".lastMessage"]: {
        text: lastMessageText,
      },
      [dataChat.chatId + ".date"]: serverTimestamp(),
    });

    this.setState({
      text: '',
      img: null,
    })
  }
  
  render() {
    const { text, img } = this.state;

    return (
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => this.changeForm('text', e.target.value)}
          value={text}
        />
        {
          img !== null && (<img src={URL.createObjectURL(img)} alt="" width="150" height="150" />)
        }
        <div className="send">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            accept="image/png, image/gif, image/jpeg, video/mp4"
            onChange={(e) => this.changeForm('img', e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Attach} alt="" />
          </label>
          <button onClick={() => { this.handleSend() }}>Send</button>
        </div>
      </div>
    );
  }
}

export default Input;
