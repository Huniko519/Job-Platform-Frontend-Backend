import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import {
  PageTitle,
  IssueBoard,
  IssueBoardFilter,
  IssueBoardWrapper,
  SearchButton,
  SelectWrapper,
} from "../style";
import Select from "react-select";
import JobTable from "../../../components/Jobs/job-table";
import {
  JOB_STATUS,
  JobStatuses,
  ownerTableHeaders,
} from "../../../constants/mockup";
import JobService from "../../../services/job.service";
import { Button } from "../../../components/styles";

const Jobs = ({ history, show }) => {
  const [tab, setTab] = useState(show);

  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    JobService.getJobs()
      .then((response) => {
        console.log(response)
        setJobsData(
          response.map((res) => {
            return {
              _id: res._id,
              messages: res.action,
              action: "SEE MORE",
              title: res.title,
              status: res.currentStatus,
              active: true,
              date: res.status[res.status.length - 1].Date,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBack = () => {
    history.push("/houseowner/dashboard");
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

  const jobCreate = () => {
    history.push("/houseowner/jobcreate");
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
                <button className="btn btn-info" onClick={() => setTab(1)}>
                  My jobs
                </button>
              </SearchButton>
              <SearchButton>
                <button className="btn btn-secondary" onClick={() => setTab(2)}>
                  History
                </button>
              </SearchButton>
              <SearchButton>
                <button className="btn btn-primary" onClick={jobCreate}>
                  New Jobs
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
                <Button>Search</Button>
              </SearchButton>
            </IssueBoardFilter>
          </IssueBoardWrapper>
          <JobTable
            data={jobsData}
            tableHeaders={ownerTableHeaders}
            active={tab}
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
