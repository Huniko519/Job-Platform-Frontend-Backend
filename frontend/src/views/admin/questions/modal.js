import React from 'react';
import {Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Box, Text, Button} from '../../../components/styles';
import theme from '../../../theme';

const QuestionModal = (props) => {
    const {
        modal,
        toggle
    } = props;

    return (
        <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader toggle={toggle} className="border-0 pb-0"></ModalHeader>
            <ModalBody>
                <Text fontSize="15px" color={theme.colors.black} align="left" margin="0 0 5px 0">
                    Please add question title
                </Text>
                <Input type="textarea" name="title" id="title" rows="5" />
                <Box width="100%" justify="flex-end" margin="20px 0 0 0">
                    <Button onClick={toggle}>Save</Button>
                </Box>
            </ModalBody>
        </Modal>
    );
}

export default QuestionModal;
