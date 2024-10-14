import React from 'react';
import { Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ show, message, onClose }) => {
  return (
    <Toast bg='danger' onClose={onClose} show={show} delay={2500} autohide>
      <Toast.Header>
        <strong className="me-auto">Ошибка</strong>
      </Toast.Header>
      <Toast.Body className={'text-white'}>{message}</Toast.Body>
    </Toast>
  );
};

export default Notification