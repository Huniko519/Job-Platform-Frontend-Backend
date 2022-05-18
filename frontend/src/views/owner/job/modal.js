import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const DashboardModal = ({ item, toggle, modal }) => {
  return (
    <div>
      {item && (
        <Modal
          isOpen={modal}
          centered={true}
          toggle={toggle}
          className="custom-modal"
        >
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
      )}
    </div>
  );
};
export default DashboardModal;
