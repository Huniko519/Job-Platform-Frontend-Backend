import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { Input } from 'reactstrap';
import { setTokenData } from "../../../redux/actions";
import { Button, GrayButton, Box, Text } from "../../../components/styles";
import { PageTitle, PersonalInfoBoard, SaveChanges } from "../../owner/style";
import { Switch } from "./styles";
import { FaChevronLeft } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import {
  contractorData,
  contractorAttachment,
} from "../../../constants/mockup";
import theme from "../../../theme";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
const publicIp = require("public-ip");

const Attachment = styled.div`
  display: flex;
  width: fit-content;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray200};
  border-radius: 20px;
  cursor: pointer;
`;

const ApproveContractor = ({ history }) => {
  const [clientIp, setClientIp] = useState("");

  useEffect(() => {
    publicIp.v4().then(function (result) {
      setClientIp(result);
    });
  }, []);

  const handleBack = () => {
    history.push("/admin/contractors");
  };

  const handleSave = () => {};

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Approve Contractor</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <PersonalInfoBoard>
          <Text
            padding="0 0 0 40px"
            color={theme.colors.primary}
            fontSize="20px"
            align="left"
          >
            Bedriften erklærer med dette følgende:
          </Text>
          {contractorData.map((item, index) => {
            return (
              <Box key={index} justify="space-between" margin="15px 0">
                <Box>
                  <Text
                    width="40px"
                    align="left"
                    color={theme.colors.black}
                    fontSize="15px"
                  >
                    {index + 1}
                  </Text>
                  <Text align="left" color={theme.colors.black} fontSize="15px">
                    {item.text}
                  </Text>
                </Box>
                <Box>
                  <Switch
                    borderWidth={item.status === "no" ? "1px 0 1px 1px" : "1px"}
                    borderColor={
                      item.status === "yes"
                        ? theme.colors.primary
                        : "rgba(0, 0, 0, 0.33)"
                    }
                    borderRadius={item.status === "yes" ? "3px" : "3px 0 0 3px"}
                  >
                    Yes
                  </Switch>
                  <Switch
                    borderWidth={item.status === "no" ? "1px" : "1px 1px 1px 0"}
                    borderColor={
                      item.status === "no"
                        ? theme.colors.primary
                        : "rgba(0, 0, 0, 0.33)"
                    }
                    borderRadius={item.status === "no" ? "3px" : "0 3px 3px 0"}
                  >
                    No
                  </Switch>
                </Box>
              </Box>
            );
          })}
          <Box
            backgroundColor="rgba(0, 0, 0, 0.03)"
            width="100%"
            padding="30px"
          >
            {contractorAttachment.map((item, index) => {
              return (
                <Box
                  key={index}
                  width="80%"
                  padding="10px 0"
                  borderTop={index !== 0 ? "1px solid rgba(0, 0, 0, 0.2)" : "0"}
                >
                  <Box width="50%" justify="space-between">
                    <Box>
                      <VscFilePdf style={{ marginRight: "10px" }} />
                      <Text color={theme.colors.black}>{item.text}</Text>
                    </Box>
                    <Attachment>View Attachment</Attachment>
                  </Box>
                </Box>
              );
            })}
            <SignatureCanvas
              penColor="black"
              canvasProps={{ className: "sigCanvas" }}
            />
            <Box width="80%" justify="space-between">
              <Box>
                <FaCheckCircle style={{ color: "#18c109" }} />
                <Text padding="0 0 0 15px" color={theme.colors.black}>
                  Accepted user terms
                </Text>
              </Box>
              <Text color={theme.colors.black}>IP: {clientIp}</Text>
            </Box>
          </Box>
        </PersonalInfoBoard>
        <SaveChanges>
          <GrayButton onClick={handleBack}>Cancel</GrayButton>
          <Button onClick={handleSave}>Save</Button>
        </SaveChanges>
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

export default connect(mapStateToProps, mapDispatchToProp)(ApproveContractor);
