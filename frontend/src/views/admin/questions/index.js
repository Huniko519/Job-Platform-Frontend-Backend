import React, {useState} from 'react';
import { connect } from "react-redux";
import { setTokenData } from "../../../redux/actions";
import QuestionTable from "./table";
import Modal from "./modal";
import { Box, Button } from "../../../components/styles";
import { PageTitle } from "../../owner/style";
import { IssueBoard } from "../../owner/style";
import { QuestionList } from "../../../constants/mockup";

const Questions = ({ tokenData, setTokenData }) => {
	const [openModal, setOpenModal] = useState(false);

	const handleModal = () => {
		setOpenModal(!openModal);
	}

	return (
		<section>
			<Modal modal={openModal} toggle={handleModal} />
			<div className="container">
				<PageTitle>
					<Box justify="space-between" width="100%">
						<div>
							<span>Manage Questions</span>
							<span className="page-border" />
						</div>
						<Button onClick={handleModal}>Add New</Button>
					</Box>
				</PageTitle>
				<IssueBoard>
					<QuestionTable data={QuestionList} />
				</IssueBoard>
			</div>
		</section>
	)
}

const mapStateToProps = ({ common }) => {
	const { tokenData } = common;
	return { tokenData };
};

const mapDispatchToProp = (dispatch) => {
	return {
		setTokenData: (data) => dispatch(setTokenData(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProp)(Questions);
