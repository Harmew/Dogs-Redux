import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
import NotFound from "./Components/NotFound";

// Protected Route
import ProtectedRoute from "./Components/Helper/ProtectedRoute";

// Redux
import { useDispatch } from "react-redux";
import { autoLogin } from "./Store/user";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(autoLogin);
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
