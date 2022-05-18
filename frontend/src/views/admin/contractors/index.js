import React from "react";
import { connect } from "react-redux";
import { setTokenData } from "../../../redux/actions";
import ContractorTable from "./table";
import { Box, Button } from "../../../components/styles";
import { PageTitle } from "../../owner/style";
import { IssueBoard } from "../../owner/style";
import { ContractorList } from "../../../constants/mockup";
import { FaChevronLeft } from "react-icons/fa";

const Contractors = ({ history }) => {
  const handleAdd = () => {
    history.push("/admin/contractors/new");
  };

  return (
    <section>
      <div className="container">
        <PageTitle>
          <Box justify="space-between" width="100%">
            <div>
              <FaChevronLeft />
              <span>Manage Contractors</span>
              <span className="page-border" />
            </div>
            <Button onClick={handleAdd}>Add New</Button>
          </Box>
        </PageTitle>
        <IssueBoard>
          <ContractorTable data={ContractorList} history={history} />
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

export default connect(mapStateToProps, mapDispatchToProp)(Contractors);
