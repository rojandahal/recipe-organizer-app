import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "./Signup.css";
import Logo from "../../../assets/images/ro.png";

const Signup = (props) => {
  console.log(props.isLogin);
  // Send params : { email, name , role, password}
  const [email, setEmail] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [username, setuserName] = useState("");
  const [role, setRole] = useState("");
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

  const firstnameHandler = (event) => {
    setfirstName(event.target.value);
    console.log(firstname);
  };

  const lastnameHandler = (event) => {
    setlastName(event.target.value);
    console.log(lastname);
  };
  const usernameHandler = (event) => {
    setuserName(event.target.value);
    console.log(username);
  };

  // RoleSelector
  const roleSelector = (event) => {
    console.log(role);
    setRole(event.target.value);
  };
  const submitHandler = async () => {
    const data = {
      email,
      firstname,
      lastname,
      username,
      role,
      password,
    };
    axios
      .post("https://recipe-organizer-site.herokuapp.com/api/v1/auth/register", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.token);
        window.location.reload(false);
      })
      .catch((error) => console.log(error.response.data));
  };

  if (props.isLogin) {
    return <Redirect to="/" />;
  } else {
    // HTML file to show to the user
    return (
      <div className="signupform">
        <div class="ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui teal image header">
              <img src={Logo} class="image" alt="logo" />
              <div class="content">Sign-up to your account</div>
            </h2>
            <div class="ui form">
              <div class="two fields">
                <div class="field">
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    type="text"
                    onChange={firstnameHandler}
                  />
                </div>
                <div class="field">
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    type="text"
                    onChange={lastnameHandler}
                  />
                </div>
              </div>
              <div class="field">
                <label>Username</label>
                <input
                  placeholder="Username"
                  type="text"
                  onChange={usernameHandler}
                />
              </div>
              <div class="field">
                <label className="label">Role</label>
                <div class="ui selection dropdown">
                  <div>
                    <select value={role} onChange={roleSelector}>
                      <option value="">...</option>
                      <option value="admin">Chef</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="text"
                  onChange={emailHandler}
                />
              </div>

              <div class="field">
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={passwordHandler}
                />
              </div>

              <div
                class="ui fluid large teal submit button"
                type="submit"
                onClick={submitHandler}
              >
                Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Signup;
