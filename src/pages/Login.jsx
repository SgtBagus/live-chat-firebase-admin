import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { auth, db } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const data = query(collection(db, "users"), where("email", "==", email));
      const userData = await getDocs(data);

      const { is_admin: isAdmin, email: loginEmail } = userData.docs.map(doc => doc.data())[0];

      if (isAdmin) {
        await signInWithEmailAndPassword(auth, loginEmail, password).then(() => {
          navigate("/");
        }).catch(() => {
          throw new Error('Something went wrong')
        });
      } else {
        throw new Error('Tidak Memiliki Akses');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
