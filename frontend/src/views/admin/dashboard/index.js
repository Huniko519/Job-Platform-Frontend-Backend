import React from "react";
import { connect } from "react-redux";
import { setTokenData } from "../../../redux/actions";
import Select from "react-select";
import JobTable from "../../../components/Jobs/job-table";
import { Text } from "../../../components/styles";
import { PageTitle, WidgetsWrapper } from "../../owner/style";
import { Widgets, WidgetItem, WidgetAmount } from "../style";
import {
  IssueBoard,
  IssueBoardFilter,
  IssueBoardWrapper,
  SearchButton,
  SelectWrapper,
} from "../../owner/style";
import {
  adminDashboard,
  ownerTableData,
  ownerTableHeaders,
} from "../../../constants/mockup";
import theme from "../../../theme";

const Dashboard = ({ tokenData, setTokenData }) => {
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

  return (
    <section>
      <div className="container">
        <PageTitle>
          <div>
            <span>Dashboard</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <WidgetsWrapper>
          <Widgets>
            {adminDashboard.map((item, index) => (
              <WidgetItem key={index}>
                <WidgetAmount>{item.amount}</WidgetAmount>
                <Text fontSize="18px" color={theme.colors.lightBlack}>
                  {item.title}
                </Text>
              </WidgetItem>
            ))}
          </Widgets>
        </WidgetsWrapper>
        <PageTitle>
          <div>
            <span>Search Claims</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <IssueBoard>
          <IssueBoardWrapper>
            <IssueBoardFilter>
              <SelectWrapper>
                <Select
                  options={options}
                  placeholder="Registered time"
                  styles={customStyles}
                />
              </SelectWrapper>
              <SelectWrapper>
                <Select
                  options={options}
                  placeholder="Status"
                  styles={customStyles}
                />
              </SelectWrapper>
              <SelectWrapper>
                <Select
                  options={options}
                  placeholder="Contractor"
                  styles={customStyles}
                />
              </SelectWrapper>
              <SelectWrapper>
                <Select
                  options={options}
                  placeholder="Complex"
                  styles={customStyles}
                />
              </SelectWrapper>
              <SearchButton>
                <button className="btn btn-primary">Search</button>
              </SearchButton>
            </IssueBoardFilter>
          </IssueBoardWrapper>
          <JobTable data={ownerTableData} tableHeaders={ownerTableHeaders} />
        </IssueBoard>
      </div>
    </section>
  );
};

const mapStateToProps = ({ common }) => {
  const { tokenData } = common;
  return { tokenData };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setTokenData: (data) => dispatch(setTokenData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
