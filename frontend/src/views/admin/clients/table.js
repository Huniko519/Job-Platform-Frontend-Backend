import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Table } from 'reactstrap';
import { Box, TableEditButton, TableRemoveButton } from '../../../components/styles';
import DeleteModal from "../../../components/modal";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import theme from "../../../theme";
import styled from 'styled-components';
import UserService from '../../../services/user.service';
import { DELETE_CLIENTS, SET_CLIENTS } from "../../../redux/actions";

const Badge = styled.p`
    font-size: 12px;
		color: ${theme.colors.primary};
		background-color: ${theme.colors.gray500};
		padding: 2px 10px;
		margin: 0 0 0 8px;
		border-radius: 10px;
`;

const ClientTable = ({ clients, history, getDispatchClients, deleteDispatchClients }) => {

	const [choicedid, setChoicedID] = useState('');
	const [modal, setModal] = useState(false);

	useEffect(() => {
		UserService.getClients().then((res) => {
			getDispatchClients(res);
		});
	}, []);

	const onOpenModal = (id) => {
		setChoicedID(id);
		setModal(true);
	};

	const onEditButtonClick = (id) => {
		history.push(`/admin/clients/edit/${id}`);
	};

	const toggleModal = () => setModal(!modal);

	const onModalCancelClick = () => {
		setModal(false);
	};

	const onModalOkClick = async () => {
		await new Promise((resolve) => {
			UserService.deleteClientById(choicedid)
				.then((res) => {
					if (!res.error) {
						deleteDispatchClients({ _id: choicedid })
					}
					resolve(res);
				})
				.catch((err) => {
					resolve(err);
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
						<td>Contact Person</td>
						<td>Contact Person Mobile</td>
						<td>Renew Date</td>
						<td>Options</td>
					</tr>
				</thead>
				<tbody>
					{clients.map((item, index) => {
						return (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{item.name}</td>
								<td>{item.person}</td>
								<td>{item.phone}</td>
								<td>
									<Box width="100%" justify="flex-start">
										{item.renew}
										<Badge>{item.status}</Badge>
									</Box>
								</td>
								<td>
									<Box justify="flex-start">
										<TableEditButton onClick={() => onEditButtonClick(item.id)}>
											<FaPencilAlt />
										</TableEditButton>
										<TableRemoveButton onClick={() => onOpenModal(item.id)}>
											<AiOutlineClose />
										</TableRemoveButton>
									</Box>
								</td>
							</tr>
						)
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
}

const mapStateToProps = ({ clients }) => {
	return { clients: clients.clients };
};

const mapActionsToProps = (dispatch) => {
	return {
		getDispatchClients: (payload) => {
			dispatch({ type: SET_CLIENTS, payload: payload })
		},
		deleteDispatchClients: (payload) => {
			dispatch({ type: DELETE_CLIENTS, payload: payload })
		}
	};
};

export default connect(mapStateToProps, mapActionsToProps)(ClientTable);
