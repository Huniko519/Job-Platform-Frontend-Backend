import React, { useState, useEffect } from "react";
// RCE CSS
import "react-chat-elements/dist/main.css";
import { connect } from "react-redux";
// MessageBox component
import {
  ApprovePanel,
  JobDetailBoard,
  JobDetailHeader,
  JobDetailLeft,
  JobDetailRight,
} from "../style";
import {
  contractors,
  JobStatusesBoard,
  JobStatusesContractor,
} from "../../../constants/mockup";

import { Button } from "reactstrap";
import { PageTitle } from "../../owner/style";
import { FaChevronLeft } from "react-icons/fa";
import JobModal from "../../../components/modal";
import ContractorsCard from "../../../components/Jobs/contractors-card";
import ContractorCardTwo from "../../../components/cards/contractor-card-two";
import MessageBoard from "../../../components/chat";

import JobService from "../../../services/job.service";
import { useParams } from "react-router-dom";
import messagesService from "../../../services/messages.service";
import offerService from "../../../services/offer-service";

import isEmpty from "../../../utils/is-empty";
import jobService from "../../../services/job.service";

import useChat from "../../../utils/useChat";

const JobDetail = ({ history, user }) => {
  const { id } = useParams();

  // chat
  const { messages, sendEvent } = useChat(user._id);
  const [approved, setApproved] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [modalBoard, setModalBoard] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [getOfferModal, setGetOfferModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  const [messageId, setMessageId] = useState("");
  const [userId, setUserId] = useState(user._id);

  const toggleApprove = () => setApproveModal(!approveModal);
  const toggleReject = () => setRejectModal(!rejectModal);
  const toggleBoard = () => setModalBoard(!modalBoard);
  const toggleRecommended = () => setRecommended(!recommended);
  const toggleGetOffer = () => setGetOfferModal(!getOfferModal);
  const toggleComplete = () => setCompleteModal(!completeModal);

  //! jobstatus

  const [jobDetail, setJobDetail] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    JobService.getJobById(id).then((response) => {
      setJobDetail(response);
      if (
        response.currentStatus == "progress" ||
        response.currentStatus == "finalize"
      ) {
        setOffers([
          {
            id: response.offer._id,
            name: response.contractor[0].name,
            position: "ABS as",
            phone: "(262) 555-0131",
            phone: response.contractor[0].email,
            avatar: "/assets/image/avatar.jpg",
            amount: response.offer.price + " kr",
            currentStatus: response.offer.currentStatus,
          },
        ]);
        setApproved(true);
      }
    });
    messagesService.getMessagesByJobId(id).then((response) => {
      setMessageId(response[0]._id);
      const data = {
        type: "userConnect",
        messageId: response[0]._id,
        userId: userId,
      };
      sendEvent(data);
    });
    offerService.getOffersByJobId(id).then((response) => {
      setOffers(
        response.map((res) => {
          return {
            id: res._id,
            currentStatus: res.currentStatus,
            name: res.contractors.name,
            position: "ABS as",
            phone: "(262) 555-0131",
            phone: res.contractors.email,
            avatar: "/assets/image/avatar.jpg",
            amount: res.price + " kr",
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    setChatHistory(messages);
  }, [messages]);

  const handleChatInput = (msg) => {
    const data = {
      type: "newMessage",
      channelId: messageId,
      message: msg.trim(),
      userId: userId,
    };

    sendEvent(data);
  };

  const sendOffer = () => {
    history.push("/board/offer/1");
  };

  const handleBack = () => {
    history.push("/board/jobs");
  };

  const approveTask = () => {
    setApproveModal(true);
  };
  const rejectTask = () => {
    setRejectModal(true);
  };
  const requestFinalizationTask = () => {};
  const completedTask = () => {
    const data = {
      id: offers[0].id,
      jobId: id,
      offer: "completed",
    };
    offerService
      .approveOfferByJobId(data)
      .then((response) => {
        JobService.getJobById(id).then((response) => {
          setJobDetail(response);
        });
      })
      .catch((err) => {
        //    console.log(err);
      });
    toggleComplete();
    toggleComplete();
  };

  const handleApproveNo = () => {
    setApproveModal(false);
  };
  const handleRejectNo = () => {
    setRejectModal(false);
  };
  const handleRejectYes = () => {
    setRejectModal(false);
  };

  const handleBoard = () => {
    setApproveModal(false);
    setModalBoard(true);
  };

  const handleSendBoardYes = () => {
    setModalBoard(false);
    setApproveModal(false);
    //! hanlde approve task.
    //  setRecommended(true);
    //   console.log("jobid", id);
    jobService.ApproveTaskByBoard(id).then((response) => {
      setJobDetail(response);
    });
  };

  const handleSendBoardNo = () => {
    setModalBoard(false);
    setApproveModal(false);
    //! handle reject task
  };

  const handleRecommended = () => {
    setModalBoard(false);
    setApproveModal(false);
    setGetOfferModal(true);
  };

  const handleOffer = () => {
    setRecommended(false);
    setGetOfferModal(false);
    setApproved(true);
  };

  const handleApproveOrReject = (offerid, status) => {
    // JobService.ApproveOfferByBoard(id).then((response) => {
    //   setJobDetail(response);
    // });
    const data = {
      id: offerid,
      jobId: id,
      offer: "progress",
    };
    offerService.approveOfferByJobId(data).then((res) => {
      JobService.getJobById(id).then((response) => {
        if (
          response.currentStatus == "progress" ||
          response.currentStatus == "finalize"
        ) {
          //     console.log("approved true");
          setApproved(true);
        }
        setJobDetail(response);
      });
    });
    // setJobDetail({
    //   ...jobDetail,
    //   currentStatus: status ? "approved" : "rejected",
    // });
  };
  const handleComplete = () => {
    setJobDetail({ ...jobDetail, currentStatus: "completed" });
    toggleComplete();
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Make an Offer</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <JobDetailHeader>
          <div>
            <span className="label">Case No.</span>
            <span className="text">{jobDetail._id}</span>
          </div>
          <div>
            <span className="label">Date:</span>
            <span className="text">{jobDetail.Date}</span>
          </div>
          <div>
            <span className="label">Contact Person:</span>
            <span className="text">{jobDetail.contactPerson}</span>
          </div>
          <div>
            <span className="label">Status:</span>
            <span className="text">
              {!isEmpty(jobDetail)
                ? JobStatusesBoard.filter(
                    (status) => status.value === jobDetail.currentStatus
                  )[0].label
                : ""}
            </span>
          </div>
        </JobDetailHeader>
        <hr />
        <JobDetailBoard>
          <JobDetailLeft>
            <div className="job-desc">{jobDetail.description}</div>
            <div className="job-attaches">
              {!isEmpty(jobDetail)
                ? jobDetail.attachments.map((attach) => (
                    <img src={attach.src} alt={attach.id} key={attach.id} />
                  ))
                : ""}
            </div>
            <MessageBoard data={chatHistory} handleInput={handleChatInput} />
          </JobDetailLeft>
          <JobDetailRight>
            <div className="status">
              <ul>
                {!isEmpty(jobDetail)
                  ? jobDetail.status.map((status, idx) => (
                      <li
                        key={idx}
                        className={status.date !== null ? "active" : ""}
                      >
                        {JobStatusesBoard[idx].label} {status.date}
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
            {!approved && (
              <ApprovePanel>
                {jobDetail.currentStatus == "board" && (
                  <div className="buttons">
                    <Button color="primary" onClick={approveTask}>
                      Approve Task
                    </Button>
                    <Button color="danger" onClick={rejectTask}>
                      Reject Task
                    </Button>
                  </div>
                )}

                <div className="contractors">
                  {!isEmpty(offers) ? (
                    offers.map((contractor) => {
                      return (
                        <ContractorCardTwo
                          key={contractor.id}
                          data={contractor}
                          approveButtons={true}
                          handleApprove={handleApproveOrReject}
                        />
                      );
                    })
                  ) : (
                    <p>There is no proposal</p>
                  )}
                </div>
              </ApprovePanel>
            )}
            {approved && (
              <>
                {offers.map((contractor) => {
                  return (
                    <ContractorCardTwo key={contractor.id} data={contractor} />
                  );
                })}
                <div className="job-actions">
                  <Button color="info" onClick={requestFinalizationTask}>
                    Deleted
                  </Button>
                  {jobDetail.currentStatus == "finalize" && (
                    <Button color="success" onClick={completedTask}>
                      Completed
                    </Button>
                  )}
                </div>
                {/* 
                  <Button color="primary" onClick={sendOffer}>
                    Send Offer
                  </Button>
                  <Button color="secondary">Uploads</Button>
                  <Button color="success">Request Finalisation</Button>
                  <Button color="info">Received Payment</Button>
                </div> */}
              </>
            )}
          </JobDetailRight>
        </JobDetailBoard>
      </div>

      <JobModal
        modal={approveModal}
        toggle={toggleApprove}
        title="Approve a task"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure you want to approve this task?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleApproveNo },
          { style: "primary", text: "Yes", callback: handleBoard },
        ]}
      />
      <JobModal
        modal={rejectModal}
        toggle={toggleReject}
        title="Reject a task"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure you want to reject this task?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleRejectNo },
          { style: "primary", text: "Yes", callback: handleRejectYes },
        ]}
      />

      <JobModal
        modal={modalBoard}
        toggle={toggleBoard}
        backdrop="static"
        content={
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src="/assets/image/logo.svg" alt="logo" />
            Who will cover this damage?
          </div>
        }
        buttons={[
          { style: "primary", text: "Board", callback: handleSendBoardYes },
          {
            style: "secondary",
            text: "Insurance",
            callback: handleSendBoardNo,
          },
        ]}
      />

      <JobModal
        modal={recommended}
        title="Recommended Contractors"
        toggle={toggleRecommended}
        backdrop="static"
        content={<ContractorsCard contractors={contractors} />}
        className="modal-gray"
        buttons={[
          { style: "secondary", text: "CANCEL", callback: toggleRecommended },
          { style: "primary", text: "GET OFFER", callback: handleRecommended },
        ]}
      />

      <JobModal
        modal={getOfferModal}
        toggle={toggleGetOffer}
        title="Alert"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            All selected contractors will be informed immediately
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: toggleGetOffer },
          { style: "primary", text: "Yes", callback: handleOffer },
        ]}
      />

      <JobModal
        modal={completeModal}
        toggle={toggleComplete}
        title="Complete task"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure to mark the job as completed?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: toggleComplete },
          { style: "primary", text: "Yes", callback: handleComplete },
        ]}
      />
    </section>
  );
};
const mapStateToProps = ({ common }) => {
  //console.log(common)
  return { user: common.user };
};

const mapDispatchToProp = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProp)(JobDetail);
