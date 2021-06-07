import React, {useState} from 'react';
import './ErrorPanel.css';

import {Modal, Button} from 'react-bootstrap';

const SignUpError = ({message}) => {
    const [show, showPanel] = useState(true)

    const handleClick = () => {
        showPanel(false);
        window.location.reload();
    }

    return (
        <Modal show={show} className='panel-modal'>
            <Modal.Header className='panel-title'>
                <Modal.Title className=''>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className='panel-message'>{!message ? 'Unknown error. Please try again.' : message}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClick()}>
                Try Again
            </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default SignUpError;