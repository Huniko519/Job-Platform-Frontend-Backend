import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import theme from "../../theme";
import JobModal from "../modal";

const ContractorCardTwo = ({ data, handleApprove, approveButtons = false }) => {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const toggleApprove = () => setApproveModal(!approveModal);
  const toggleReject = () => setRejectModal(!rejectModal);

  const handleApproveNo = () => {
    toggleApprove();
  };

  const handleApproveYes = () => {
    toggleApprove();
    handleApprove(data.id, 1);
  };

  const handleRejectNo = () => {
    toggleReject();
  };

  const handleRejectYes = () => {
    toggleReject();
    handleApprove(data.id, 0);
  };

  return (
    <CardWrapper>
      <div className="job-offer-detail">
        <img src={data.avatar} alt="avatar" className="avatar" />
        <div className="contact-detail">
          <span className="contact-name">{data.name}</span>
          <span className="contact-amount">Amount: {data.amount}</span>
        </div>
        <div className="contact-status">
          <span className="c-text">Status</span>
          {!approveButtons ? (
            <span className="c-status">{data.currentStatus}</span>
          ) : (
            <span className="c-status">Waiting for offer</span>
          )}
        </div>
      </div>
      <hr />
      <div className="contact-action">
        <Link to={`/houseowner/offers/${data.id}`}>VIEW DETAILS</Link>
        {approveButtons && (
          <div className="contact-buttons">
            <span className="reject" onClick={toggleReject}>
              Reject
            </span>
            <span className="approve" onClick={toggleApprove}>
              Approve
            </span>
          </div>
        )}
      </div>

      <JobModal
        modal={approveModal}
        toggle={toggleApprove}
        title="Approve a task"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure you want to approve this offer?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleApproveNo },
          { style: "primary", text: "Yes", callback: handleApproveYes },
        ]}
      />
      <JobModal
        modal={rejectModal}
        toggle={toggleReject}
        title="Reject a task"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure you want to reject this offer?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleRejectNo },
          { style: "primary", text: "Yes", callback: handleRejectYes },
        ]}
      />
    </CardWrapper>
  );
};
const CardWrapper = styled.div`
  margin: 10px 10px 0 10px;
  padding: 10px;
  border: 4px solid ${theme.colors.gray100};
  border-radius: 5px;
  .job-offer-detail {
    display: flex;
    flex-flow: nowrap;
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
        white-space: nowrap;
      }
    }
  }
  .contact-action {
    display: flex;
    justify-content: space-between;
    .contact-buttons {
      span {
        padding: 3px 10px;
        cursor: pointer;
        font-weight: ${theme.fontWeights.medium};
        &:hover {
          font-weight: ${theme.fontWeights.bold};
          border: 1px solid ${theme.colors.darkPrimary};
        }
      }
      span.reject {
        border-right: 1px solid ${theme.colors.gray400};
        color: ${theme.colors.darkBlue};
      }
      span.approve {
        border-left: 1px solid ${theme.colors.gray400};
        color: ${theme.colors.primary};
      }
    }
  }
`;

export default ContractorCardTwo;
