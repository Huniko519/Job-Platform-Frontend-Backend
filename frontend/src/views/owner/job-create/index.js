import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import {
  PageTitle,
  RegisterActions,
  RegisterBoard,
  RegisterBody,
  RegisterHeader,
} from "../style";
import { Button, Form } from "reactstrap";
import JobDescription from "../../../components/Jobs/job-description";
import JobModal from "../../../components/modal";
import ContractorsCard from "../../../components/Jobs/contractors-card";
import { contractors } from "../../../constants/mockup";
import JobService from "../../../services/job.service";
import { InvitationStatus } from "../../../constants/defaultValues";

const JobCreate = ({ history }) => {
  const [modal, setModal] = useState(false);
  const [modalBoard, setModalBoard] = useState(false);
  const [modalPrivate, setModalPrivate] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const toggle = () => setModal(!modal);
  const toggleBoard = () => setModalBoard(!modalBoard);
  const togglePrivate = () => setModalPrivate(!modalPrivate);
  const toggleRecommended = () => setRecommended(!recommended);

  const handleBack = () => {
    history.push("/houseowner/dashboard");
  };

  const publishJob = () => {
    setModal(true);
  };

  const handleBoard = () => {
    setModal(false);
    toggleBoard();
  };

  const handlePrivate = () => {
    setModal(false);
    togglePrivate();
  };

  const handleSendBoardYes = () => {
    setModalBoard(false);
    setRecommended(true);
  };

  const handleSendBoardNo = () => {
    console.log("------Board send no click---------");

    setModalBoard(false);
    setModal(true);
  };

  const handleSendPrivateYes = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", InvitationStatus.Waiting);
    formData.append("board", false);
    files.map((file) => {
      formData.append("uploads", file);
    });
    const created = await JobService.createJob(formData);
    history.push("/houseowner/jobs");
    setModalPrivate(false);
  };

  const handleSendPrivateNo = () => {
    setModalPrivate(false);
    setModal(true);
  };

  const handleRecommended = async () => {
    setRecommended(false);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", InvitationStatus.Board);
    formData.append("board", true);
    files.map((file) => {
      formData.append("uploads", file);
    });

    const created = await JobService.createJob(formData);
    history.push("/houseowner/jobs");
  //  console.log(created);
  };

  const handleUploads = (files) => {
    setFiles(files);
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>New Job</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <RegisterBoard>
          <RegisterHeader>New Job Registration</RegisterHeader>
          <RegisterBody>
            <JobDescription
              newJob={true}
              description={description}
              handleDescription={handleDescription}
              title={title}
              handleTitle={handleTitle}
              handleUploads={handleUploads}
            />
          </RegisterBody>
        </RegisterBoard>
        <RegisterActions>
          <Button color="primary" onClick={publishJob}>
            Publish Job
          </Button>
          <Button color="secondary" onClick={handleBack}>
            Cancel
          </Button>
        </RegisterActions>
      </div>
      <JobModal
        modal={modal}
        toggle={toggle}
        title="Publish Job"
        content={
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src="/assets/image/logo.svg" alt="publish job" />
            <br />
            Who will cover this damage?
          </div>
        }
        buttons={[
          { style: "primary", text: "Board", callback: handleBoard },
          { style: "info", text: "Private", callback: handlePrivate },
        ]}
      />
      <JobModal
        modal={modalBoard}
        toggle={toggleBoard}
        title="Send to Board"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure to send the job to board for approval?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleSendBoardNo },
          { style: "primary", text: "Yes", callback: handleSendBoardYes },
        ]}
      />
      <JobModal
        modal={modalPrivate}
        toggle={togglePrivate}
        title="Send to Private"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure to send the job to private for approval?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: handleSendPrivateNo },
          { style: "primary", text: "Yes", callback: handleSendPrivateYes },
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
    </section>
  );
};
export default JobCreate;
