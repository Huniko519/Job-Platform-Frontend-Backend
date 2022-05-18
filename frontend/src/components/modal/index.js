import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const JobModal = (props) => {
    const {
        modal,
        toggle,
        className,
        title,
        content,
        buttons,
        backdrop
    } = props;


    return (
        <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop}>
            {title && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
            {content && <ModalBody>{content}</ModalBody>}
            {buttons && (
                <ModalFooter>
                    {buttons.map((button, idx) => (
                        <Button key={idx} color={button.style} onClick={button.callback}>{button.text}</Button>))}
                </ModalFooter>)}
        </Modal>
    );
};

export default JobModal;
