import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  TableCheckButton,
  TableEditButton,
  TableRemoveButton,
  Text,
} from "../../../components/styles";
import { FaPencilAlt, FaCheck, FaFilePdf } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { VscFilePdf } from "react-icons/vsc";
import theme from "../../../theme";
import { contractorStatus } from "../../../constants/mockup";
import UserService from "../../../services/user.service";
import JobModal from "../../../components/modal";
import isEmpty from "../../../utils/is-empty";

//!for redux
import { connect } from "react-redux";
import {
  SET_CONTRACTORS,
  DELETE_CONTRACTORS,
  UPDATE_CONTRACTORS,
} from "../../../redux/actions";
import { DisabledWrapper, DropWrapper } from "../../owner/style";

const ContractorTable = ({
  user,
  contractors,
  dispatchContractors,
  deleteDispatchContractors,
  updateDispatchContractors,
  history,
}) => {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [modaltitle, setModalTitle] = useState("");
  const [flag, setFlag] = useState("");
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    UserService.getContractors().then((res) => {
      dispatchContractors(res);
    });
  }, []);

  const handleApprove = () => {
    history.push("/admin/contractors/approve");
  };

  const onEditButtonClick = (id) => {
    history.push(`/admin/contractors/edit/${id}`);
  };

  const toggleModal = () => setModal(!modal);

  const onOpenModal = (id) => {
    setModalTitle("Are you sure to delete this contractor?");
    setId(id);
    setModal(true);
    setFlag("delete");
  };

  const onInputChange = async (e, id) => {
    if (e.value === "Waiting") {
      await onOpenModal(id);
      setModalTitle("Do you want to send questions link to contractor?");
      setFlag("send");
      setStatus("Arrived");
    } else if (e.value === "Approve") {
      toast.success("Success to approve a contractor!");
    }

    let tempStatusData = {
      id: id,
      status: e.value,
    };
    setStatusData(tempStatusData);

    if (e.value !== "Waiting") {
      UserService.setContractorStatus(tempStatusData).then((res) => {
        if (res) {
          updateDispatchContractors(res);
        }
      });
    }
  };

  const onModalOkClick = async () => {
    if (flag === "delete") {
      await new Promise((resolve) => {
        UserService.deleteContractorById(id)
          .then((res) => {
            if (!res.error) {
              deleteDispatchContractors({ _id: id });
            }
            resolve(res);
            toast.success("Success to delete a contractor!");
          })
          .catch((err) => {
            resolve(err);
          });
      });
    } else if (flag === "send") {
      UserService.setContractorStatus(statusData).then((res) => {
        if (res) {
          updateDispatchContractors(res);
        }
      });
      toast.success("Success to send a question link!");
    }

    setModal(false);
  };

  const onModalCancelClick = () => {
    setModal(false);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "130px",
      borderRadius: "20px",
      cursor: "pointer",
    }),
    singleValue: (provided, { data }) => ({
      ...provided,
      color:
        data.value === "Approved" || data.value === "Approve"
          ? theme.colors.primary
          : data.value === "Waiting"
          ? theme.colors.red
          : theme.colors.black,
    }),
  };

  return (
    <>
      <Table className="job-table" borderless>
        <thead>
          <tr>
            <td>ID</td>
            <td>Company Name</td>
            <td>Contact Person</td>
            <td>Contact Person Mobile</td>
            <td>Status</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(contractors) ? (
            contractors.map((item, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.person}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Box
                      width="100%"
                      justify="flex-start"
                      position="relative"
                      padding="0 0 0 15px"
                    >
                      <FaFilePdf
                        style={{
                          position: "absolute",
                          left: "0",
                          cursor: "pointer",
                          color:
                            item.status === "Approved" ||
                            item.status === "Approve"
                              ? theme.colors.lightGreen
                              : item.status === "Waiting"
                              ? "gray"
                              : item.status === "Reject"
                              ? theme.colors.red
                              : status === "Arrived"
                              ? "orange"
                              : theme.colors.black,
                        }}
                      />
                      <DropWrapper>
                        <Select
                          isDisabled={item.status === "Approved" ? true : false}
                          value={
                            contractorStatus.filter(
                              (option) => option.label === item.status
                            )[0]
                          }
                          options={contractorStatus}
                          placeholder="Status"
                          styles={customStyles}
                          onChange={(e) => onInputChange(e, item.id)}
                        />
                      </DropWrapper>
                      <DropWrapper>
                        {item.status === "Approve" ? (
                          <TableCheckButton onClick={handleApprove}>
                            <FaCheck />
                          </TableCheckButton>
                        ) : item.status === "Approved" ? (
                          <Text fontSize="12px" color={theme.colors.gray300}>
                            Approved by {user.name} at{" "}
                            <b>
                              {new Date().getDate()}/{new Date().getMonth()}/
                              {new Date().getFullYear()} as super admin
                            </b>
                          </Text>
                        ) : null}
                      </DropWrapper>
                    </Box>
                  </td>
                  <td>
                    <Box justify="flex-start">
                      <TableEditButton
                        onClick={() => {
                          onEditButtonClick(item.id);
                        }}
                      >
                        <FaPencilAlt />
                      </TableEditButton>
                      <TableRemoveButton
                        onClick={() => {
                          onOpenModal(item.id);
                        }}
                      >
                        <AiOutlineClose />
                      </TableRemoveButton>
                    </Box>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      <JobModal
        modal={modal}
        toggle={toggleModal}
        title="Delete Contractor"
        content={<div style={{ textAlign: "center" }}>{modaltitle}</div>}
        buttons={[
          { style: "secondary", text: "No", callback: onModalCancelClick },
          { style: "primary", text: "Yes", callback: onModalOkClick },
        ]}
      />
      <ToastContainer />
    </>
  );
};

const mapStateToProps = ({ contractors, common }) => {
  return { contractors: contractors.contractors, user: common.user };
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchContractors: (payload) => {
      dispatch({ type: SET_CONTRACTORS, payload: payload });
    },
    deleteDispatchContractors: (payload) => {
      dispatch({ type: DELETE_CONTRACTORS, payload: payload });
    },
    updateDispatchContractors: (payload) => {
      dispatch({ type: UPDATE_CONTRACTORS, payload: payload });
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ContractorTable);
