import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {setTokenData} from "../../../redux/actions";
import {PageTitle, WidgetItem, Widgets, WidgetsWrapper, WidgetTitle} from "../style";
import {DashboardLinks, DashboardStats} from "../../../constants/mockup";
import {UserRole} from "../../../constants/defaultValues";

const Dashboard = ({tokenData, setTokenData, history}) => {

    useEffect(() => {

    }, []);
    const handleLinks = (to) => {
        history.push(to)
    }

    return (
        <section>
            <div className="container">
                <PageTitle>
                    <div>
                        <span>Dashboard</span>
                        <span className="page-border"/>
                    </div>
                </PageTitle>
                <WidgetsWrapper>
                    <WidgetTitle>Quick Links</WidgetTitle>
                    <Widgets>
                        {DashboardLinks.filter(item => item.role === UserRole.HouseOwner).map(item => (
                            <WidgetItem key={item.key} onClick={() => handleLinks(item.to)}>
                                <img src={item.icon} alt={item.label}/>
                                <span>{item.label}</span>
                            </WidgetItem>
                        ))}
                    </Widgets>
                </WidgetsWrapper>
                <WidgetsWrapper>
                    <WidgetTitle>Quick Stats</WidgetTitle>
                    <Widgets>
                        {DashboardStats.filter(item => item.role === UserRole.HouseOwner).map(item => (
                            <WidgetItem key={item.key} onClick={() => handleLinks(item.to)}>
                                <img src={item.icon} alt={item.label}/>
                                <span>{item.label}</span>
                            </WidgetItem>
                        ))}
                    </Widgets>
                </WidgetsWrapper>
            </div>
        </section>
    )
}

const mapStateToProps = ({common}) => {
    const {tokenData} = common;
    return {tokenData};
};

const mapDispatchToProp = (dispatch) => {
    return {
        setTokenData: (data) => dispatch(setTokenData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
