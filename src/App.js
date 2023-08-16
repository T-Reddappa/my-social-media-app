import React, { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/authentication/SignUp";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Share from "./components/share/share";
import ExplorePage from "./pages/explore/ExplorePage";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import SearchBar from "./components/searchBar/SearchBar";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiresAuth from "./routes/RequiresAuth";
import SuggestedUsers from "./components/suggestedUsers/SuggestedUsers";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />

      <div className="homepage-layout">
        <div className="components">{token && <Navbar />}</div>
        <div className="components">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<RequiresAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Route>
          </Routes>
        </div>
        <div className="components">
          {token && (
            <div className="sidebar">
              <SearchBar />
              <SuggestedUsers />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
