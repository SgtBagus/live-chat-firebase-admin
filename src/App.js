import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";

import "./style.scss";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <Routes>
      <Route path="/">
        <Route index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
