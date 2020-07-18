import React from "react";
import logo from "../../assets/images/logo.png";
import "./style.css";
import { AuthContext } from "../../App";

const Login = () => {
  const Auth = React.useContext(AuthContext);

  const handleClick = () => {
    console.log("Login");
    localStorage.setItem("auth", true);
    Auth.setAuth(true);
  };

  return (
    <div>
      <div className="container-Login">
        <div className="br-div"></div>
        <div className="body-login">
          <div className="logo-body-login"></div>
          <div className="txt-login">
            <div>
              <img src={logo} className="logo-login" alt="" />
              <p className="txt-name">RESTART SERVER</p>
              <p className="txt-name-1">login to server.</p>
            </div>
          </div>
          <div className="container-input-login">
            <div>
              <input className="input-login" placeholder="USERNAME"></input>
            </div>
          </div>
          <div className="container-input-login">
            <div>
              <input className="input-login" placeholder="PASSWORD"></input>
            </div>
          </div>
          <div className="container-btn-login">
            <button className="btn-login" onClick={handleClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
