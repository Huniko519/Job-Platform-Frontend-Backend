import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import {
  Box,
  TableEditButton,
  TableRemoveButton,
} from "../../../components/styles";
import UserService from "../../../services/user.service";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import DeleteModal from "../../../components/modal";

import { connect } from "react-redux";
import { SET_SUPERADMINS, DELETE_SUPERADMINS } from "../../../redux/actions";

const AdminTable = ({
  superadmins,
  dispatchSuperAdmins,
  deleteSuperAdmins,
  history,
}) => {
  const [modal, setModal] = useState(false);
  const [choicedid, setChoicedID] = useState("");

  useEffect(() => {
    UserService.getSuperAdmins().then((res) => {
      dispatchSuperAdmins(res);
    });
  }, []);

  const onEditButtonClick = (id) => {
    history.push(`/admin/superadmins/edit/${id}`);
  };

  const onOpenModal = (id) => {
    setChoicedID(id);
    setModal(true);
  };

  const toggleModal = () => setModal(!modal);

  const onModalCancelClick = () => {
    setModal(false);
  };

  const onModalOkClick = async () => {
    let result = await new Promise((resolve) => {
      UserService.deleteSuperAdminById(choicedid)
        .then((res) => {
          if (!res.error) deleteSuperAdmins({ _id: choicedid });
          resolve(res);
        })
        .catch((err) => {
          resolve(null);
        });
    });

    setModal(false);
  };

  return (
    <>
      <Table className="job-table" borderless>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Mobile</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {superadmins.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
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
          })}
        </tbody>
      </Table>
      <DeleteModal
        modal={modal}
        toggle={toggleModal}
        title="Delete Super Admin"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure to delte this super admin?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: onModalCancelClick },
          { style: "primary", text: "Yes", callback: onModalOkClick },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({ superadmins }) => {
  return { superadmins: superadmins.superadmins };
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchSuperAdmins: (payload) =>
      dispatch({ type: SET_SUPERADMINS, payload: payload }),
    deleteSuperAdmins: (payload) =>
      dispatch({ type: DELETE_SUPERADMINS, payload: payload }),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AdminTable);
