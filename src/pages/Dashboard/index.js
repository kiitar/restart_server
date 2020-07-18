import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { AuthContext } from "../../App";
import "./style.css";
import Modal from "../../components/Modal";
export const ModalContext = React.createContext();
export const RestartContext = React.createContext();

const Dashboard = () => {
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
    console.log(state);
    console.log("restart");
    const btn = document.getElementById(state.i);
    btn.innerText = "Waiting";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = "Waiting";
    }, 500);

    let data = JSON.stringify({ server_id: "b76c3542-7a2b-1deb-bbf7-a37259379754", team: "fb" });

    let config = {
      method: "post",
      url: "https://api.btf.co.th/apirestart",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
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
        }, 5000);
      })
      .catch(function (error) {
        console.log(error);
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
          btn.innerText = "Failed .";
        }, 4000);
      });

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
                          <button id={i} onClick={(e) => btnClick(v.name, i)}>
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
