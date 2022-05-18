import React from "react"
import theme from '../../theme';
import styled from 'styled-components';

const JobDescription = ({jobData}) => {

    return (
        <AddressBoard>
            <div className="board-header">Customer Address</div>
            <div className="board-content">
                <span>{jobData.customerAddress.addressLine}</span>
                <span>{jobData.customerAddress.postalCode} {jobData.customerAddress.city}</span>
            </div>
            <div className="board-header">Contact Person</div>
            <div className="board-content">
                <span>{jobData.contactPerson.lastName} {jobData.contactPerson.firstName}</span>
            </div>
            <div className="board-header">Mobile Number</div>
            <div className="board-content">
                <span>{jobData.mobile}</span>
            </div>
        </AddressBoard>
    )
}

const AddressBoard = styled.div`
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
export default JobDescription
