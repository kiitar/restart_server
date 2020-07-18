import React from "react";
import "./style.css";
import { ModalContext, RestartContext } from "../../pages/Dashboard";

function Modal(props) {
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
          <p>{`PC Name : ${Restart.state.v}`}</p>
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
}

export default Modal;
