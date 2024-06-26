import React from "react";
import Modal from "react-modal";
import "./DeleteModal.css";

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      ariaHideApp={false}
      overlayClassName="Overlay"
      className="Modal"
    >
      <h2 className="modal-heading">
        Are you sure you want to delete the post?
      </h2>
      <div className="buttons">
        <button className="modal-btn" onClick={onConfirm}>
          Yes
        </button>
        <button className="modal-btn" onClick={onRequestClose}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
