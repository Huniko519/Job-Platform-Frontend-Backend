import React from 'react'
import { Table } from 'reactstrap';
import { Box, TableEditButton, TableRemoveButton } from '../../../components/styles';
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
// import theme from "../../../theme";

const QuestionTable = ({ data, active = true, detail = '#' }) => {
    return (
        <Table className="job-table" borderless>
            <thead>
                <tr>
                    <td>SR #</td>
                    <td>Question</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title}</td>
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
export default QuestionTable;
