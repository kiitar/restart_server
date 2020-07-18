import React, { useState, useRef } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { AuthContext } from "../../App";
import "./style.css";
import Modal from "../../components/Modal";
export const ModalContext = React.createContext();
export const RestartContext = React.createContext();

const Dashboard = () => {
  let btnRef = useRef();
  const Auth = React.useContext(AuthContext);
  const [state, setState] = useState({ v: null, i: null });
  // ** data server
  const data = [
    { name: "FB-01", ip: "192.123.2.0" },
    { name: "FB-02", ip: "192.123.2.1" },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    console.log("Logout");
    localStorage.clear();
    Auth.setAuth(false);
  };

  const btnClick = (v, i) => {
    setState({ v, i });
    setModalVisible(true);
  };

  const CF = () => {
    console.log("click");
    console.log(state.i);
    console.log("restart");
    const data = {
      server_id: "b76c3542-7a2b-1deb-bbf7-a37259379754",
      team: "fb",
    };
    const config = {
      method: "post",
      url: "http://103.245.164.59:8081/restart",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    const btn = document.getElementById(state.i);
    btn.innerText = "Waiting";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = "Waiting";
    }, 500);
    setTimeout(() => {
      btn.innerText = "Waiting . ";
    }, 1000);
    setTimeout(() => {
      btn.innerText = "Waiting . . ";
    }, 1500);

    setTimeout(() => {
      btn.innerText = "Waiting . . . ";
    }, 2000);
    setTimeout(() => {
      btn.innerText = "Waiting . . . .";
    }, 2500);

    setTimeout(() => {
      btn.innerText = "Success .";
    }, 8000);

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = `Restart ${state.v}`;
    }, 10000);
  };

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      <RestartContext.Provider value={{ state, CF }}>
        {modalVisible && <Modal />}
        <div>
          <div className="container">
            <div className="img-logo">
              <img src={logo} className="logo-login" alt="" />
            </div>
            {/* <div className="user">USER : APIROM </div> */}
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PC Name</th>
                    <th>IP Number</th>
                    <th>Restart</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td> {`${i + 1}`}</td>
                        <td>{v.name}</td>
                        <td>{v.ip}</td>
                        <td>
                          <button id={i} ref={(el) => (btnRef.current = el)} onClick={(e) => btnClick(v.name, i)}>
                            {`Restart ${v.name}`}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </RestartContext.Provider>
    </ModalContext.Provider>
  );
};

export default Dashboard;
