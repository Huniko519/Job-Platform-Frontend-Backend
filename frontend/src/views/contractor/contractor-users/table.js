import React from 'react'
import { Table } from 'reactstrap';
import { Box, TableEditButton, TableRemoveButton } from '../../../components/styles';
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import theme from "../../../theme";
import styled from 'styled-components';

const Badge = styled.p`
    font-size: 12px;
		color: ${theme.colors.primary};
		background-color: ${theme.colors.gray500};
		padding: 2px 10px;
		margin: 0 0 0 8px;
		border-radius: 10px;
`;

const ClientTable = ({ data }) => {
	return (
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
				{data.map((item, index) => {
					return (
						<tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>{item.name}</td>
							<td>{item.person}</td>
							<td>{item.phone}</td>
							<td>
								<Box width="100%" justify="flex-start">
									{item.renewDate}
									<Badge>{item.status}</Badge>
								</Box>
							</td>
							<td>
								<Box justify="flex-start">
									<TableEditButton>
										<FaPencilAlt />
									</TableEditButton>
									<TableRemoveButton>
										<AiOutlineClose />
									</TableRemoveButton>
								</Box>
							</td>
						</tr>
					)
				})}
			</tbody>
		</Table>
	);
}
export default ClientTable;
