import React from 'react'
import {MessageList, Input as ChatInput} from 'react-chat-elements';
import {Button} from 'reactstrap';
import {FaRegPaperPlane} from 'react-icons/fa';
import styled from 'styled-components';
import theme from '../../theme';

const ChatBoard = ({data, handleInput}) => {
    let inputRef = React.createRef();
    const submitMessage = () => {
        handleInput(inputRef.input.value)
        inputRef.clear()
    }
    const handleChange = (event) => {
        if(event.key === '\n' && event.ctrlKey){
            submitMessage()
        }
    }

    return (
        <ChatBoardWrapper>
            <MessageList
                className="message-list"
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={data}
            />
            <ChatInput
                placeholder="Type here..."
                multiline={true}
                maxHeight={60}
                className="message-send"
                autofocus={true}
                onKeyPress={handleChange}
                ref={el => (inputRef = el)}
                rightButtons={
                    <Button
                        color='primary'
                        backgroundcolor='white'
                        onClick={submitMessage}
                        text='Send'><FaRegPaperPlane/></Button>
                }/>
        </ChatBoardWrapper>
    )
}
const ChatBoardWrapper = styled.div`
    margin-top: 20px;
    .message-list {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        background: ${theme.colors.white};
        .rce-container-mbox {
            margin: 10px 0;
        }
        .rce-mbox {
            border: 1px solid ${theme.colors.gray200};
        }
        .rce-mbox-right-notch, .rce-mbox-left-notch {
            display: none;
        }
        
        .rce-mbox-body {
            display: flex;
        }
        .rce-mbox-time {
            bottom: -10px;
        }
        .rce-mbox-right {
            .rce-mbox-body {
                display: flex;
                flex-flow: row-reverse;
            }
        }
        .rce-mbox-text {
            white-space: pre-line;
        }
    }
    .message-send {
        margin-top: 5px;
        .rce-input-textarea {
            height: 40px;
        }
    }
`
export default ChatBoard
