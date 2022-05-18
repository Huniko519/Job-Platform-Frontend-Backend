import React from "react";
import theme from "../theme";
import { Box, Text, Badge } from "../components/styles";
import { personalInfo } from "../constants/mockup";
import { connect } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { LOGOUT_USER } from "../redux/actions";

const Header = ({ user, dispatchLogout }) => {
  const logout = () => {
    dispatchLogout();
  };
  return (
    <Box
      width="100%"
      height="65px"
      justify="space-between"
      padding="13px 20px"
      backgroundColor="white"
      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.11)"
    >
      <a href="/">
        <img src="/assets/image/logo.svg" alt="logo" className="h-100" />
      </a>
      <Box height="100%">
        <div>
          <Text
            color={theme.colors.primary}
            fontWeight="bold"
            lineHeight="1rem"
          >
            {user.givenName} {user.surname}
          </Text>
          <Text
            color={theme.colors.gray200}
            fontSize="0.8rem"
            lineHeight="1rem"
          >
            {user.role}
          </Text>
        </div>
        <img
          src={personalInfo.avatar}
          alt="avatar"
          style={{ height: "85%", borderRadius: "50%", margin: "0 15px" }}
        />
        <Box height="100%" padding="0 30px 0 0">
          <Box position="relative" width="40px" height="80%" align="flex-end">
            <img src="/assets/image/message_icon.svg" alt="message" />
            <Badge backgroundColor={theme.colors.black}>2</Badge>
          </Box>
          <Box position="relative" width="40px" height="80%" align="flex-end">
            <img src="/assets/image/alert_icon.svg" alt="message" />
            <Badge backgroundColor={theme.colors.primary}>5</Badge>
          </Box>
          <Box position="relative" width="40px" height="80%" align="flex-end">
            <button onClick={logout} className="btn btn-link">
              <FaSignOutAlt size={24} />
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ common }) => {
  return { user: common.user };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchLogout: (payload) => dispatch({ type: LOGOUT_USER }),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
