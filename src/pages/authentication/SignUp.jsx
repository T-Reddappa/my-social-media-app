import React, { useContext, useState } from "react";
import "./styles.css";
import { AuthContext } from "../../contexts/AuthContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const { signupHandler } = useContext(AuthContext);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    hidePassword: true,
  });
  document.title = "Signup | myConverse";

  const signupFormHandler = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const signup = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password } = userCredentials;

    signupHandler(userCredentials);
  };
  const handlePasswordVisibility = () => {
    setUserCredentials({
      ...userCredentials,
      hidePassword: !userCredentials.hidePassword,
    });
  };
  return (
    <div>
      <div className="signup-cont">
        <div className="signup-card">
          <h3>Signup</h3>
          <form className="signup-input" onSubmit={signup}>
            <label htmlFor="firstName">
              <p>First Name</p>{" "}
            </label>
            <input
              type="text"
              name="firstName"
              value={userCredentials.firstName}
              placeholder="Enter your First Name"
              onChange={signupFormHandler}
              required
            />
            <label htmlFor="lastName">
              <p>Last Name </p>
            </label>
            <input
              type="text"
              name="lastName"
              value={userCredentials.lastName}
              placeholder="Enter your Last Name"
              onChange={signupFormHandler}
              required
            />

            <label>
              <p>Email Address</p>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="email"
              name="username"
              value={userCredentials.username}
              onChange={signupFormHandler}
              required
            ></input>

            <div className="signup-input">
              <label>
                <p>Password</p>
              </label>
              <input
                type={userCredentials.hidePassword ? "password" : "text"}
                placeholder="********"
                name="password"
                className="password"
                value={userCredentials.password}
                onChange={signupFormHandler}
                required
              ></input>
            </div>

            <div className="signup-forgot-details">
              <div className="remember-me">
                <input type="checkbox" onChange={handlePasswordVisibility} />
                <label> Show Password</label>
              </div>
              <div className="remember-me">
                <input type="checkbox" required />
                <label>I accept all Terms & Conditions</label>
              </div>
            </div>
            <div className="bottom-btns">
              <button className="card-button active-button" type="submit">
                Create New Account
              </button>
              <NavLink className="create-new-account" to="/login">
                Already have an account
                <ArrowForwardIosIcon
                  className="material-symbols-outlined"
                  style={{ fontSize: "12px", marginLeft: "-5px" }}
                />
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// const userSignup = async () => {
//   try {
//     const email = document.getElementsByClassName("email")[0].value;
//     const password = document.getElementsByClassName("password")[0].value;
//     const creds = {
//       email: email,
//       password: password,
//     };

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       body: JSON.stringify(creds),
//     });
//     const data = await res.json();
//     const { encodedToken } = data;
//     console.log(data);
//     console.log(encodedToken);
//     localStorage.setItem("encodedToken", encodedToken);
//   } catch (e) {
//     console.log(e);
//   }
// };
