import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
// RCE CSS
import "react-chat-elements/dist/main.css";
import { isEmpty } from "lodash";
// MessageBox component
import {
  JobDetailBoard,
  JobDetailHeader,
  JobDetailLeft,
  JobDetailRight,
} from "../style";
import {
  JobStatusesContractor,
  JobStatusesBoard,
} from "../../../constants/mockup";
import { Button } from "reactstrap";
import { PageTitle } from "../../owner/style";
import { FaChevronLeft } from "react-icons/fa";
import MessageBoard from "../../../components/chat";
import JobService from "../../../services/job.service";
import messagesService from "../../../services/messages.service";
import offerService from "../../../services/offer-service";
import { SET_OFFERS, SET_JOB } from "../../../redux/actions";
import useChat from "../../../utils/useChat";

const JobDetail = ({ history, dispatchOffers, dispatchJob, user }) => {
  const { id } = useParams();

  const [jobDetail, setJobDetail] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [offer, setOffer] = useState({ status: [] });
  const [progress, setProgress] = useState(false);
  const { messages, sendEvent } = useChat(user._id);
  const [messageId, setMessageId] = useState("");
  const [userId, setUserId] = useState(user._id);
  useEffect(() => {
    JobService.getJobById(id)
      .then(async (response) => {
        dispatchJob(response);
        await setJobDetail(response);
      })
      .catch((err) => {
        // console.log(err);
      });
    messagesService.getMessagesByJobId(id).then((response) => {
      setMessageId(response[0]._id);
      const data = {
        type: "userConnect",
        messageId: response[0]._id,
        userId: userId,
      };
      sendEvent(data);
      // sendEvent(  response.map((res) => {
      //   return {
      //     avatar: "/assets/image/avatar.jpg",
      //     avatarFlexible: true,
      //     position: "left",
      //     text: res.text,
      //     date: new Date(res.date),
      //   };
      // }))
    });
    offerService
      .getOfferDetailByJobId(id)
      .then((response) => {
        if (isEmpty(response)) {
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
          dispatchOffers(offersRedux);
        }
      })
      .catch((err) => {
        // console.log("reeer", err);
      });
  }, []);

  useEffect(() => {
    setChatHistory(messages);
  }, [messages]);

  const sendOffer = () => {
    history.push(`/contractor/offers/create/${id}`);
  };

  const handleRequestFinish = () => {
    const data = {
      jobId: id,
      id: offer.offerid,
      offer: "finalize",
    };
    offerService.approveOfferByJobId(data).then((response) => {
      let temp = {
        sent: true,
        jobid: id,
        offerid: response._id,
        title: response.title,
        description: response.description,
        attachments: response.attachments,
        price: response.price,
        currentStatus: response.currentStatus,
        status: response.status,
      };
      setOffer(temp);
    });
  };

  const handleBack = () => {
    history.push("/contractor/jobs");
  };

  const handleChatInput = (msg) => {
    const data = {
      type: "newMessage",
      channelId: messageId,
      message: msg.trim(),
      //userId:"614c46552a319b2c202e83e6"
      userId: userId,
    };
    sendEvent(data);
  };
  //console.log("adsfadfasdfasdf", isEmpty(offer.status));
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
            <span className="text">{jobDetail._id ? jobDetail._id : ""}</span>
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
              {
                JobStatusesBoard.find(
                  (status) => status.value === jobDetail.currentStatus
                )?.label
              }
            </span>
          </div>
        </JobDetailHeader>
        <hr />
        <JobDetailBoard>
          <JobDetailLeft>
            <div className="job-desc">{jobDetail.description}</div>
            <div className="job-attaches">
              {!isEmpty(jobDetail) ? (
                jobDetail.attachments.map((attach) => (
                  <img src={attach.src} alt={attach.id} key={attach.id} />
                ))
              ) : (
                <></>
              )}
            </div>
            <MessageBoard data={chatHistory} handleInput={handleChatInput} />
          </JobDetailLeft>
          <JobDetailRight>
            <div className="status">
              <ul>
                {!isEmpty(offer.status) ? (
                  offer.status.map((item, idx) => (
                    <li
                      key={idx}
                      className={item.date !== null ? "active" : ""}
                    >
                      {JobStatusesContractor[idx].label} {item.date}
                    </li>
                  ))
                ) : (
                  <>
                    {JobStatusesContractor.map((status, idx) => (
                      <li key={idx}>{status.label}</li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            {offer.sent ? (
              <div className="job-offer">
                <div className="job-offer-detail">
                  <img
                    src="/assets/image/avatar.jpg"
                    alt="avatar"
                    className="avatar"
                  />
                  <div className="contact-detail">
                    <span className="contact-name">{offer.contactPerson}</span>
                    <span className="contact-amount">
                      Amount: {offer.price} kr
                    </span>
                  </div>
                  <div className="contact-status">
                    <span className="c-text">Status</span>
                    <span className="c-status">
                      {
                        JobStatusesContractor.find(
                          (item) => item.value === offer.currentStatus
                        )?.label
                      }
                    </span>
                  </div>
                </div>
                <hr />
                <div className="contact-action">
                  <Link to={`/contractor/offer/${offer.offerid}`}>
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="job-actions">
              <Button
                color="primary"
                onClick={sendOffer}
                disabled={
                  offer.currentStatus && offer.currentStatus !== "waiting"
                }
              >
                Send Offer
              </Button>
              <Button color="secondary">Uploads</Button>
              {jobDetail.currentStatus == "progress" &&
              jobDetail.currentStatus ? (
                <>
                  <Button color="success" onClick={handleRequestFinish}>
                    Request Finalisation
                  </Button>
                </>
              ) : jobDetail.currentStatus == "finalize" &&
                jobDetail.currentStatus ? (
                <Button color="info">Received Payment</Button>
              ) : (
                <></>
              )}
            </div>
          </JobDetailRight>
        </JobDetailBoard>
      </div>
    </section>
  );
};
const mapStateToProps = ({ offers, common }) => {
  return { offers: offers.offers, user: common.user };
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchOffers: (payload) =>
      dispatch({ type: SET_OFFERS, payload: payload }),
    dispatchJob: (payload) => dispatch({ type: SET_JOB, payload: payload }),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(JobDetail);
