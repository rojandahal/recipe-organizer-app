import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Logo from "../../../assets/images/ro.png";
import { Redirect } from "react-router";

const Login = (props) => {
  console.log(props.isLogin);
  // Send params : { email, password}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handler
  const emailHandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const submitHandler = async () => {
    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:3000/api/v1/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Fetched");
        console.log(response.data);
        window.location.reload(false);
      })
      .catch((error) => console.log(error.message));
  };
  if (props.isLogin) {
    return <Redirect to="/"></Redirect>
  } else {
    // HTML file to show to the user
    return (
      <div className="loginbox">
        <div class="ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui teal image header">
              <img src={Logo} class="image" alt="logo" />
              <div class="content">Log-in to your account</div>
            </h2>

            <form class="ui large form">
              <div class="ui stacked segment">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input
                      type="email"
                      name="InputEmail"
                      placeholder="Email"
                      onChange={emailHandler}
                    ></input>
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input
                      type="password"
                      name="InputPassword"
                      placeholder="Password"
                      onChange={passwordHandler}
                    ></input>
                  </div>
                </div>
                <div
                  class="ui fluid large teal submit button"
                  type="submit"
                  onClick={submitHandler}
                >
                  Login
                </div>
              </div>

              <div class="ui error message"></div>
            </form>

            <div class="ui message">
              New to us? <a href="/auth/signup">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
