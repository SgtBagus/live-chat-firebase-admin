import React, { useContext } from "react";

import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat dataChat={data} currentUser={currentUser} />
      </div>
    </div>
  )
}

export default Home