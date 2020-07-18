import React from "react";
import "./style.css";
import { ModalContext, RestartContext } from "../../pages/Dashboard";

const Modal = () => {
  const Modal = React.useContext(ModalContext);
  const Restart = React.useContext(RestartContext);

  const confirmBtn = () => {
    Modal.setModalVisible(false);
    Restart.CF();
  };

  const cancelBtn = () => {
    Modal.setModalVisible(false);
  };

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="modal-column">
          <h2>Confirm Restart</h2>
          <h4>{`PC Name : ${Restart.state.v.name}`}</h4>
          <h4>{`IP Addr : ${Restart.state.v.ip}`}</h4>
          <br />
        </div>
        <div className="modal-row">
          <button className="modal-btn-no" onClick={cancelBtn}>
            No
          </button>
          <br />
          <button className="modal-btn-yes" onClick={confirmBtn}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
