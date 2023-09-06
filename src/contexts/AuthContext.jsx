import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersContext } from "./UserContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(
    localStorage.getItem("userLoginCredentials")
  );
  // const { userDispatch } = useContext(UsersContext);

  const [token, setToken] = useState(localStorageToken?.token || "");
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user || "");
  const navigate = useNavigate();

  //user Login
  const loginHandler = async (username, password) => {
    console.log(username, password);
    try {
      const res = await axios.post("/api/auth/login", {
        username: username,
        password: password,
      });
      console.log(res);
      const {
        status,
        data: { foundUser, encodedToken },
      } = res;
      if (status === 200) {
        localStorage.setItem(
          "userLoginCredentials",
          JSON.stringify({ user: foundUser, token: encodedToken })
        );
        setToken(encodedToken);
        setCurrentUser(foundUser);
        toast.success(`Welcome, ${username}`);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      const { status, data } = e.response;
      if (status === 401) {
        console.log(data.errors);
        toast.error("You have entered a wrong password");
      }

      if (status === 404) {
        console.log(
          "The username you entered is not Registered. Not Found error"
        );
        toast.warn("User is not registered");
      }
    }
  };

  //user Signup
  const signupHandler = async ({ firstName, lastName, username, password }) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        username,
        password,
      });
      const {
        status,
        data: { createdUser, encodedToken },
      } = res;
      console.log(res);

      if (status === 201) {
        console.log(res, "201");
        localStorage.setItem(
          "userLoginCredentials",
          JSON.stringify({ token: encodedToken, user: createdUser })
        );
        setToken(encodedToken);
        setCurrentUser(createdUser);
        toast.success(`${createdUser.username} account created`);
        console.log(createdUser.username);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      const {
        response: { status },
      } = e;
      console.log(e);

      // if (status == 422) {
      //   toast.error("Username Already Exists. Please choose another one.");
      // }
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userLoginCredentials");
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        currentUser,
        setCurrentUser,
        loginHandler,
        signupHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
