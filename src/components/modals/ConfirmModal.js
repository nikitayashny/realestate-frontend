import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Context } from '../../index';

const ConfirmModal = ({ show, onHide }) => {
    const { user } = useContext(Context);

    const handleSubmit = async (event) => {

    }

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Вы уверены?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;