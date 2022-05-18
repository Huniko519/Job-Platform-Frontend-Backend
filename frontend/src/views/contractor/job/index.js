import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import {
  PageTitle,
  IssueBoard,
  IssueBoardFilter,
  IssueBoardWrapper,
  SearchButton,
  SelectWrapper,
} from "../../owner/style";
import Select from "react-select";
import ContractorTable from "../../../components/Jobs/contractor-job-table";
import {
  contractorTableHeaders,
  contractorTableData,
  JobStatuses,
} from "../../../constants/mockup";

import JobService from "../../../services/job.service";

const Jobs = ({ history, show }) => {
  const [tab, setTab] = useState(parseInt(show));
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    JobService.getNewJobsContractor(tab).then((response) => {
      setJobData(
        response.map((res) => {
          return {
            case_no: res._id,
            messages: res.action ? res.action : 0,
            title: res.title,
            status: res.currentStatus,
            active: 1,
            date: res.Date,
          };
        })
      );
    });
  }, [tab]);

  //   const jobData = contractorTableData.filter((item) => {
  //     switch (tab) {
  //       case 1:
  //         return item.status === "pending" || item.status === "waiting";
  //       case 2:
  //         return item.status === "approved";
  //       case 3:
  //         return item.status === "done" || item.status === "completed";
  //       default:
  //         break;
  //     }
  //     return false;
  //   });

  const handleBack = () => {
    history.push("/contractor/dashboard");
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const customStyles = {
    control: (provided) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      borderRadius: "20px",
    }),
  };

  const jobMine = () => {
    setTab(1);
  };

  const jobRejected = () => {
    // console.log("tab changed");
    setTab(2);
  };
  const jobCompleted = () => {
    setTab(3);
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>View Issues</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <IssueBoard>
          <IssueBoardWrapper>
            <IssueBoardFilter>
              <SearchButton>
                <button
                  className={`btn ${
                    tab === 1 ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={jobMine}
                >
                  New Jobs
                </button>
              </SearchButton>
              <SearchButton>
                <button
                  className={`btn ${
                    tab === 2 ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={jobRejected}
                >
                  Under Work
                </button>
              </SearchButton>
              <SearchButton>
                <button
                  className={`btn ${
                    tab === 3 ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={jobCompleted}
                >
                  Completed Jobs
                </button>
              </SearchButton>
              <SelectWrapper>
                <Select
                  options={options}
                  placeholder="Registered time"
                  styles={customStyles}
                />
              </SelectWrapper>
              <SelectWrapper>
                <Select
                  options={JobStatuses}
                  placeholder="Status"
                  styles={customStyles}
                />
              </SelectWrapper>
              <SearchButton>
                <button className="btn btn-primary">Search</button>
              </SearchButton>
            </IssueBoardFilter>
          </IssueBoardWrapper>
          <ContractorTable
            data={jobData}
            tableHeaders={contractorTableHeaders}
          />
        </IssueBoard>
      </div>
    </section>
  );
};

const mapStateToProps = ({ common }) => {
  return {};
};

const mapDispatchToProp = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(Jobs);
