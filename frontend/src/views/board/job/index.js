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
} from "../../owner/style";
import Select from "react-select";
import BoardTable from "../../../components/Jobs/board-job-table";
import { boardTableHeader, JobStatuses } from "../../../constants/mockup";
import isEmpty from "../../../utils/is-empty";
//! service import
import JobService from "../../../services/job.service";

const Jobs = ({ history, show }) => {
  const [tab, setTab] = useState(show);
  const [jobsData, setJobsData] = useState([]);
  useEffect(() => {
    JobService.getBoardJobs(tab).then((response) => {
      setJobsData(
        !isEmpty(response)
          ? response.map((res) => {
              return {
                _id: res._id,
                messages: res.action,
                action: "SEE MORE",
                address: "address",
                status: res.currentStatus,
                active: res.action,
                date: res.status.filter(
                  (item) => item.value == res.currentStatus
                )[0].date,
              };
            })
          : []
      );
    });
  }, [tab]);

  const handleBack = () => {
    history.push("/board/dashboard");
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

  const jobHistory = () => {
    setTab(2);
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
                <button className="btn btn-primary" onClick={jobMine}>
                  My Jobs
                </button>
              </SearchButton>
              <SearchButton>
                <button className="btn btn-secondary" onClick={jobHistory}>
                  New Job
                </button>
              </SearchButton>
              <SearchButton>
                <button className="btn btn-info" onClick={jobHistory}>
                  History
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
          <BoardTable
            data={jobsData}
            tableHeaders={boardTableHeader}
            active={tab === 1}
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
