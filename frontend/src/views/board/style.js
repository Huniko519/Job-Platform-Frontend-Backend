import styled from 'styled-components';
import theme from '../../theme'

export const Widgets = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


export const WidgetItem = styled.div`
    display: flex;
    align-items: center;
    padding: 30px;
    border: 1px solid ${theme.colors.primary};
    background-color: ${theme.colors.white};
    width: 24%;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 18px;
    font-weight: 300;
    &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
    }
    img {
        max-height: 30px;
    }
    img + span {
        margin-left: 10px;
    }
`;


export const WidgetItemStats = styled.div`
    margin-bottom: 20px;
    padding: 30px;
    border: 1px solid ${theme.colors.primary};
    background-color: ${theme.colors.white};
    width: calc(33% - 10px);
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 18px;
    font-weight: 300;
    &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
    }
    img + span {
        margin-left: 10px;
    }
    
`;

export const JobDetailHeader = styled.div`
    margin-top: 30px;
    padding: 20px;
    font-size: ${theme.fontSizes.placeholder};
    font-family: Lato;
    font-weight: ${theme.fontWeights.medium};
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    background: ${theme.colors.white};
    div {
        display: flex;
        span + span {
            margin-left: 10px;
        }
        span.label {
            width: 120px;
        }
        span.text {
            color: ${theme.colors.darkPrimary};
            font-weight: ${theme.fontWeights.bold};
        }
    }
`;

export const JobDetailBoard = styled.div`
    display: flex;
`;

export const JobDetailLeft = styled.div`
    width: 60%;
    border-right: 1px solid ${theme.colors.gray300};
    padding-right: 20px;
    .job-desc {
        padding: 20px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        background: ${theme.colors.white};
    }
    .job-attaches {
        margin-top: 20px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        background: ${theme.colors.white};
        img {
            padding: 10px;
            width: 100px;
            height: 100px;
        }
    }
    .messages {
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
        }
        .message-send {
            margin-top: 5px;
            .rce-input-textarea {
                height: 40px;
            }
        }
    }
`;

export const JobDetailRight = styled.div`
    padding-bottom: 20px;
    width: 40%;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    margin-left: 20px;
    background: ${theme.colors.white};
    .status {
        ul {
            list-style: none;
            padding: 20px 20px 10px 20px;
            li.active {
                color: ${theme.colors.primary};
            }     
        }
    }
    .job-offer {
        margin: 10px 10px 0 10px;
        padding: 10px;
        border: 4px solid ${theme.colors.gray100};
        border-radius: 5px;
        .job-offer-detail {
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .contact-detail {
                padding: 10px;
                display: flex;
                flex-direction: column;
            }
            .contact-status {
                display: block;
                line-height: 14px;
                .c-status {
                    padding: 3px;
                    border: 1px solid ${theme.colors.primary};
                    border-radius: 5px;
                    margin-left: 10px;
                    font-size: ${theme.fontSizes.placeholder};
                    font-weight: ${theme.fontWeights.medium};
                    color: ${theme.colors.primary};
                }
            }
            
        }
    }
    .job-actions {
        padding: 20px;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        button {
            margin: 5px;
            width: 40%;
        }
    }
`;

export const PageContent = styled.div`
    margin-top: 30px;
    padding: 20px;
    background: ${theme.colors.white};
    border-radius: 5px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    display: flex;
`;
export const AddressBoard = styled.div`
    width: 40%;
    .board-header {
        font-size: ${theme.fontSizes.placeholder};
    }
    .board-content {
        display: flex;
        flex-direction: column;
        padding: 10px;
        color: ${theme.colors.primary};
        font-weight: ${theme.fontWeights.medium};
        span + span {
            margin-top: 5px;
        }
    }
`;

export const OfferBoard = styled.div`
    width: 60%;
    .board-header {
        font-size: ${theme.fontSizes.placeholder};
    }
    .board-content {
        padding: 10px;
    }
`;

export const ApprovePanel = styled.div`
    padding: 20px 0;
    .buttons {
        display: flex;
        justify-content: space-between;
        padding: 5px 20px;
        button {
            width: 45%;
        }
    }
`;
