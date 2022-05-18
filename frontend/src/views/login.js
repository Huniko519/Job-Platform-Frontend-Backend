import React, { useState, useEffect } from "react";
import { FormGroup, Button, Form, Input } from "reactstrap";
import { Box } from "../components/styles";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import AuthService from "../services/auth.service";
import { UserRole } from "../constants/defaultValues";
import { SET_TOKEN_DATA, SET_USER_DATA } from "../redux/actions";

const Login = ({
  history,
  token,
  user,
  dispatchTokenData,
  dispatchUserData,
}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    if (token && user && user.role) {
      handleRole(user.role);
    }
  });
 // console.log(localStorage.getItem("token"));
  const handleRole = (role) => {
    switch (role) {
      case UserRole.HouseOwner:
        history.push("/houseowner");
        break;
      case UserRole.SuperAdmin:
        history.push("/admin");
        break;
      case UserRole.Contractor:
        history.push("/contractor");
        break;
      case UserRole.Consultant:
        history.push("/consultant");
        break;
      case UserRole.Board:
        history.push("/board");
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    AuthService.login(username, password).then(
      (data) => {
      //  console.log(data);
        const decode = jwt_decode(data.token);
        dispatchTokenData({ token: data.token, expiresAt: decode.exp });
        dispatchUserData(data.user);
        handleRole(data.user.role);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      //  console.log(resMessage);
      }
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleClick();
  };

  return (
    <div className="container">
      <Box width="100%" height="90vh">
        <Form style={{ width: "300px" }}>
          <FormGroup>
            <Input
              name="username"
              type={"text"}
              placeholder="Enter username/email"
              style={{ height: "45px" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="password"
              type={"password"}
              placeholder="Password"
              style={{ height: "45px" }}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
            />
          </FormGroup>
          <FormGroup className="text-center">
            <Button
              color="primary"
              type="button"
              style={{ padding: "10px 30px" }}
              onClick={handleClick}
            >
              Login
            </Button>
          </FormGroup>
        </Form>
      </Box>
    </div>
  );
};

const mapStateToProps = ({ common }) => {
  const { token, expiresAt, user } = common;
  return { token, expiresAt, user };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchTokenData: (payload) =>
      dispatch({ type: SET_TOKEN_DATA, payload: payload }),
    dispatchUserData: (payload) =>
      dispatch({ type: SET_USER_DATA, payload: payload }),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
