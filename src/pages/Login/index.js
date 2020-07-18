import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./style.css";
import { AuthContext } from "../../App";

const Login = () => {
  const Auth = React.useContext(AuthContext);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleClick = () => {
    if (!user) {
      setErrMessage("* username is required.");
      setErr(true);
      return;
    }
    if (!pass) {
      setErrMessage("* password is required.");
      setErr(true);
      return;
    }
    if (user !== "admin") {
      setErrMessage("* username is not correct.");
      setErr(true);
      return;
    }

    if (user === "admin" && pass === "XvJz9Zc3") {
      localStorage.setItem("auth", true);
      Auth.setAuth(true);
    } else {
      setErrMessage("* wrong password.");
      setErr(true);
      return;
    }
  };

  return (
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
            <input
              className="input-login"
              placeholder="USERNAME"
              value={user}
              onChange={(e) => {
                setErr(false);
                setUser(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="container-input-login">
          <div>
            <input
              className="input-login"
              type="password"
              placeholder="PASSWORD"
              value={pass}
              onChange={(e) => {
                setErr(false);
                setPass(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="container-btn-login">
          <button className="btn-login" onClick={handleClick}>
            LOGIN
          </button>
          {err && <p className="txt-err">{errMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
