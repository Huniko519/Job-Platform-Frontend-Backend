import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
// RCE CSS
import "react-chat-elements/dist/main.css";
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
  JobStatuses,
  JobStatusesContractor,
  JobStatusesBoard,
} from "../../../constants/mockup";
import { Button } from "reactstrap";
import { PageTitle } from "../../owner/style";
import { FaChevronLeft } from "react-icons/fa";
import JobModal from "../../../components/modal";
import ContractorsCard from "../../../components/Jobs/contractors-card";
import ContractorCardTwo from "../../../components/cards/contractor-card-two";
import MessageBoard from "../../../components/chat";

import JobService from "../../../services/job.service";
import messagesService from "../../../services/messages.service";
import offerService from "../../../services/offer-service";
import { isEmpty } from "lodash";
import { SET_OFFERS, SET_JOB } from "../../../redux/actions";
//import  for chat
import useChat from "../../../utils/useChat";

const JobDetail = ({ history, user, dispatchOffers, dispatchJob }) => {
  const { id } = useParams();
  const { messages, sendEvent } = useChat(user._id);

  const [approved, setApproved] = useState(false);
  const [board, setBoard] = useState(false);
  const [progress, setProgress] = useState(false);

  const [rejectModal, setRejectModal] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [getOfferModal, setGetOfferModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  const toggleReject = () => setRejectModal(!rejectModal);
  const toggleRecommended = () => setRecommended(!recommended);
  const toggleGetOffer = () => setGetOfferModal(!getOfferModal);
  const toggleComplete = () => setCompleteModal(!completeModal);

  const [jobDetail, setJobDetail] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState({ status: [] });
  const [messageId, setMessageId] = useState("");
  const [userId, setUserId] = useState(user._id);

  useEffect(() => {
    //! send for user connect event to socket server
    JobService.getJobById(id)
      .then((response) => {
        // console.log("response", response);
        dispatchJob(response);

        setBoard(response.board);
        setJobDetail(response);
        //! if board approved
        //! if stauts progress by owner
        if (
          response.currentStatus != "waiting" ||
          response.currentStatus != "created" ||
          response.currentStatus != "approved"
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
      })
      .catch((err) => {
        console.log(err);
      });

    messagesService.getMessagesByJobId(id).then(async (response) => {
      setMessageId(response[0]._id);
      const data = {
        type: "userConnect",
        messageId: response[0]._id,
        userId: userId,
      };
      await sendEvent(data);
      //setChatHistory(messages)
      //setChatHistory(response[0].messages);
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

    offerService
      .getOfferDetailByJobId(id)
      .then((response) => {
        if (isEmpty(response)) {
          console.log("Empty response");
          let temp = {
            sent: false,
            status: [],
          };
          setOffer(temp);
        } else {
          if (response[0].currentStatus != "waiting") {
            setProgress(true);
          }
          let temp = {
            sent: true,
            jobid: id,
            offerid: response[0]._id,
            title: response[0].title,
            description: response[0].description,
            attachments: response[0].attachments,
            price: response[0].price,
            currentStatus: response[0].currentStatus,
            status: response[0].status,
          };
          setOffer(temp);
          let offersRedux = [temp];

          console.log("offerRedux******", offersRedux);
          dispatchOffers(offersRedux);
        }
      })
      .catch((err) => {
        // console.log("reeer", err);
      });
  }, []);

  //! if message was changed, we must set the messages.
  useEffect(() => {
    setChatHistory(messages);
  }, [messages]);

  const handleChatInput = (msg) => {
    //! send new Message,, ready data
    const data = {
      type: "newMessage",
      channelId: messageId,
      message: msg.trim(),
      //userId:"614c46552a319b2c202e83e6"
      userId: userId,
    };

    sendEvent(data);
  };

  const handleBack = () => {
    history.push("/houseowner/jobs");
  };

  const rejectTask = () => {
    setRejectModal(true);
  };
  const requestFinalizationTask = () => {};
  const completedTask = () => {
    toggleComplete();
  };

  const handleDeleteNo = () => {
    setRejectModal(false);
  };
  const handleDeleteYes = () => {
    setRejectModal(false);
  };

  const handleSendBoardYes = () => {
    setRecommended(true);
  };

  const handleRecommended = () => {
    setGetOfferModal(true);
  };

  const handleOffer = () => {
    setRecommended(false);
    setGetOfferModal(false);
    setApproved(true);
  };

  const handleApproveOrReject = (offerid, status) => {
    setJobDetail({
      ...jobDetail,
      currentStatus: status ? "progress" : "rejected",
    });
    const data = {
      id: offerid,
      jobId: id,
      offer: "progress",
    };
    offerService.approveOfferByJobId(data).then((res) => {
      console.log(res);
    });
    setApproved(true);
  };
  const handleComplete = () => {
    setJobDetail({ ...jobDetail, currentStatus: "completed" });
    const data = {
      id: offers[0].id,
      jobId: id,
      offer: "completed",
    };
    offerService
      .approveOfferByJobId(data)
      .then((response) => {
        //console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    toggleComplete();
  };
  // console.log("job Detail Status", jobDetail.status);
  // console.log("board status", board);
  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span> Make an Offer </span> <span className="page-border" />
          </div>
        </PageTitle>
        <JobDetailHeader>
          <div>
            <span className="label"> Case No. </span>
            <span className="text"> {jobDetail._id} </span>
          </div>
          <div>
            <span className="label"> Date: </span>
            <span className="text"> {jobDetail.Date} </span>
          </div>
          <div>
            <span className="label"> Contact Person: </span>
            <span className="text"> {jobDetail.contactPerson} </span>
          </div>
          <div>
            <span className="label"> Status: </span>
            <span className="text">
              {!board
                ? jobDetail.currentStatus
                  ? JobStatuses.filter(
                      (status) => status.value == jobDetail.currentStatus
                    )[0].label
                  : ""
                : jobDetail.currentStatus
                ? JobStatusesBoard.filter(
                    (status) => status.value == jobDetail.currentStatus
                  )[0].label
                : ""}
            </span>
          </div>
        </JobDetailHeader>
        <hr />
        <JobDetailBoard>
          <JobDetailLeft>
            <div className="job-desc"> {jobDetail.description} </div>
            <div className="job-attaches">
              {!isEmpty(jobDetail) ? (
                jobDetail.attachments.map((attach) => (
                  <img src={attach.src} alt={attach.id} key={attach.id} />
                ))
              ) : (
                <> </>
              )}
            </div>
            <MessageBoard data={chatHistory} handleInput={handleChatInput} />
          </JobDetailLeft>
          <JobDetailRight>
            <div className="status">
              <ul>
                {!isEmpty(jobDetail.status) ? (
                  jobDetail.status.map((status, idx) => (
                    <li
                      key={idx}
                      className={status.date !== null ? "active" : ""}
                    >
                      {board
                        ? JobStatusesBoard[idx].label
                        : JobStatusesContractor[idx].label}
                      {/* {!board{status.date} */} {status.date}
                    </li>
                  ))
                ) : (
                  <> </>
                )}
              </ul>
            </div>
            {!approved && (
              <ApprovePanel>
                <div className="contractors">
                  {!isEmpty(offers) ? (
                    offers.map((contractor) => {
                      return (
                        <ContractorCardTwo
                          key={contractor.id}
                          data={contractor}
                          approveButtons={!board}
                          handleApprove={handleApproveOrReject}
                        />
                      );
                    })
                  ) : (
                    <p className="p3"> No proposal yet </p>
                  )}
                </div>
              </ApprovePanel>
            )}
            {approved && (
              <>
                <ApprovePanel>
                  <div className="buttons">
                    {/* <Button color="primary" onClick={handleSendBoardYes}>
                            Get Offer
                        </Button> */}
                    {!board && (
                      <>
                        <Button color="danger" onClick={rejectTask}>
                          Delete job
                        </Button>
                        {jobDetail.currentStatus == "finalize" && (
                          <Button color="success" onClick={completedTask}>
                            Completed
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                  <div className="contrators">
                    {offers.map((contractor) => {
                      return (
                        <ContractorCardTwo
                          key={contractor.id}
                          data={contractor}
                        />
                      );
                    })}
                  </div>
                </ApprovePanel>
              </>
            )}
          </JobDetailRight>
        </JobDetailBoard>
      </div>
      <JobModal
        modal={rejectModal}
        toggle={toggleReject}
        title="Reject a task"
        backdrop="static"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure you want to delete this task?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleDeleteNo },
          { style: "primary", text: "Yes", callback: handleDeleteYes },
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
            All selected contractors will be informed immediately?
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

const mapStateToProps = ({ offers, common }) => {
  return { offers: offers.offers, user: common.user };
};

const mapDispatchToProp = (dispatch) => {
  return {
    dispatchOffers: (payload) =>
      dispatch({ type: SET_OFFERS, payload: payload }),
    dispatchJob: (payload) => dispatch({ type: SET_JOB, payload: payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(JobDetail);
