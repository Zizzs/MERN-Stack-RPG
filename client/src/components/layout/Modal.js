import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  render() {
    let { handleClose, show, children } = this.props;
    let showHideClassName = "modal display-none";
    if (show) {
      showHideClassName = "modal display-block";
    } else {
      showHideClassName = "modal display-none";
    }

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  }
}

export default Modal;
