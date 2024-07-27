import React, { useEffect } from 'react';
import Modal from 'react-modal';
import '../assets/styles/cmps/ModalComponent.css';

Modal.setAppElement('#root'); // Ensure accessibility by linking to your app's root element

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        };
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <button className="modal-close" onClick={onRequestClose}>&times;</button>
            {children}
        </Modal>
    );
};

export default ModalComponent;
