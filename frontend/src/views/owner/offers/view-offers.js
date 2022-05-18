import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";

import {
  PageTitle,
  RegisterActions,
  RegisterBoard,
  RegisterBody,
  RegisterHeader,
} from "../style";
import { Button } from "reactstrap";
import OffersDescription from "../../../components/offers/offers-description";
import { useParams } from "react-router-dom";
import isEmpty from "../../../utils/is-empty";

const OffersDetail = ({ history, offers, job }) => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    console.log("offer values...", offers);
    if (!isEmpty(offers)) {
      const temp = {
        ...offers.filter((item) => item.offerid == id)[0],
        contactPerson: job.contactPerson,
        jobcurrentStatus: job.currentStatus,
        Date: job.Date,
      };
      console.log("job detail status:", temp);
      setJobDetail(temp);
    }
  }, []);

  // const jobDetail = {
  //   _id: "1234",
  //   title: "offer title",
  //   description: "offer Description",
  //   Date: "14.04.2021",
  //   contactPerson: "ksj",
  //   currentStatus: "Waiting for offers",
  //   address: "China road 50, 1780 Oslo",
  //   amount: 100,
  //   attachments: [
  //     { id: 1, src: "/assets/image/avatar.jpg" },
  //     { id: 2, src: "/assets/image/avatar.jpg" },
  //     {
  //       id: 3,
  //       src: "/assets/image/avatar.jpg",
  //     },
  //   ],
  // };
  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>View Offers</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <RegisterBoard>
          <RegisterHeader>View Offers</RegisterHeader>
          <RegisterBody>
            <OffersDescription data={jobDetail} />
          </RegisterBody>
        </RegisterBoard>
        <RegisterActions>
          <Button color="secondary" onClick={handleBack}>
            Cancel
          </Button>
        </RegisterActions>
      </div>
    </section>
  );
};

const mapStateToProps = ({ offers }) => {
  return { offers: offers.offers, job: offers.job };
};

const mapActionsToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapActionsToProps)(OffersDetail);
