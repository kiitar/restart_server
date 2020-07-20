import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { AuthContext } from "../../App";
import "./style.css";
import Modal from "../../components/Modal";
export const ModalContext = React.createContext();
export const RestartContext = React.createContext();

const Dashboard = () => {
  // ** data server
  const URL = "https://api.btf.co.th/apirestart";
  const DATA = [
    { name: "FB-PC01", ip: "103.195.4.195", server_id: "8c573542-8f69-06dc-16c5-88721dc38c0e", team: "fb" },
    { name: "FB-PC02", ip: "103.195.5.119", server_id: "cc5d3542-2ae2-6fb2-df6e-326990ff31d9  ", team: "fb" },
    { name: "FB-PC03", ip: "103.195.5.26", server_id: "42358890-946f-8765-1681-9938995030a5", team: "fb" },
    { name: "FB-PC04", ip: "45.126.124.228", server_id: "39c63542-21d1-ab06-11f6-bc53242f1f4a", team: "fb" },
    { name: "FB-PC05", ip: "103.195.4.73", server_id: "9bea3542-8568-493a-99ec-23aadf85d329", team: "fb" },
    { name: "FB-PC06", ip: "103.195.5.121", server_id: "55273542-ab83-e7a5-3a3c-f89441b80d13", team: "fb" },
    { name: "FB-PC07", ip: "103.195.4.50", server_id: "ea763542-4dac-c576-2cc9-83475c4c5476", team: "fb" },
    { name: "FB-PC08", ip: "103.195.5.182", server_id: "564d2c2e-cfb7-a134-1892-c07583e9c426", team: "fb" },
    { name: "FB-PC09", ip: "103.195.6.78", server_id: "0e123542-53bf-3a0e-0145-95880b4e51f6", team: "fb" },
    { name: "FB-PC10", ip: "103.195.7.127", server_id: "b76c3542-7a2b-1deb-bbf7-a37259379754", team: "fb" },
    { name: "FB-PC11", ip: "45.126.124.115", server_id: "11593542-164f-3a76-9f7e-1d7329598dbb", team: "fb" },
    { name: "FB-PCH", ip: "103.195.5.147", server_id: "423522a6-4c25-ff7e-9dcb-fc5eb88b5560", team: "fb" },
    { name: "FB-PCR", ip: "45.126.124.229", server_id: "f72b3542-3346-ed69-2455-26916999b220", team: "fb" },
  ];
  // * data server

  const Auth = React.useContext(AuthContext);
  const [state, setState] = useState({ v: null, i: null });
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    Auth.setAuth(false);
  };

  const btnClick = (v, i) => {
    setState({ v, i });
    setModalVisible(true);
  };

  const CF = () => {
    const btn = document.getElementById(state.i);
    btn.innerText = "Waiting";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = "Waiting";
    }, 500);

    let data = JSON.stringify({ server_id: state.v.server_id, team: state.v.team });

    let config = {
      method: "post",
      url: URL,
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
        console.log(error.message);
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
      btn.innerText = `Restart ${state.v.name}`;
    }, 10000);
  };

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      <RestartContext.Provider value={{ state, CF }}>
        {modalVisible && <Modal />}
        <div>
          <div className="container">
            <div className="logo">
              <img src={logo} className="logo-login" alt="" />
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PC Name</th>
                    <th>IP Addr</th>
                    <th>Restart</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td> {`${i + 1}`}</td>
                        <td>{v.name}</td>
                        <td>{v.ip}</td>
                        <td>
                          <button id={i} onClick={(e) => btnClick(v, i)}>
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
