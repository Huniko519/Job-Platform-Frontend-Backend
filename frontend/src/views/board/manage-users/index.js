import React from 'react';
import { connect } from "react-redux";
import { setTokenData } from "../../../redux/actions";
import ClientsTable from "./table";
import { Button } from "../../../components/styles";
import { PageTitle } from "../../owner/style";
import { IssueBoard } from "../../owner/style";
import { clientList } from "../../../constants/mockup";
import { FaChevronLeft} from "react-icons/fa";

const Clients = ({ history }) => {

	const handleAdd = () => {
		history.push('/board/users/new')
	}

	const handleBack = () => {
		history.push('/board/dashboard')
	}

	return (
		<section>
			<div className="container">
				<PageTitle>
					<FaChevronLeft  onClick={handleBack}/>
					<div onClick={handleBack}>
						<span>Manage Own Organization</span>
						<span className="page-border"/>
					</div>
					<Button onClick={handleAdd}>Add New</Button>
				</PageTitle>
				<IssueBoard>
					<ClientsTable data={clientList} />
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

export default connect(mapStateToProps, mapDispatchToProp)(Clients );
