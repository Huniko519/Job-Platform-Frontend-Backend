import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../../../components/styles";
import {
  PageTitle,
  AvatarSection,
  InputSection,
  PersonalInfoBoard,
  PersonalInfoRow,
  SaveChanges,
  Title,
} from "../style";
import { FaCloudUploadAlt, FaChevronLeft } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import JobModal from "../../../components/modal";
import UserService from "../../../services/user.service";
import { LOGOUT_USER } from "../../../redux/actions";

const Profile = ({ user, history, dispatchUserLogout }) => {
  const [image, setImage] = useState({ rax: "", preview: "" });
  const [me, setMe] = useState(user);
  const [submitModal, setSubmitModal] = useState(false);
  const toggleSubmitModal = () => setSubmitModal(!submitModal);
  const [errorMsg, setErrorMsg] = useState({
    givenName: "",
    surname: "",
    username: "",
    email: "",
    phoneNo: "",
    address: "",
    post_number: "",
    post_office: "",
    apartment_no: "",
  });

  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });

  useEffect(() => {
    let username = me.name;
    const fullname = username.split(" ");
    let temp = {};
    temp["givenName"] = fullname[0];
    temp["surname"] = fullname[1];
    setMe({ ...me, ...temp });
  }, []);

  const handleMe = (field, value) => {
    checkProfileInfo(field, value.trim());
    let newMe = JSON.parse(JSON.stringify(me));
    newMe[field] = value;
    setMe(newMe);
  };

  const handleChangeImage = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  const handlePassword = (field, value) => {
    let newPassword = JSON.parse(JSON.stringify(password));
    newPassword[field] = value;
    setPassword(newPassword);
  };

  const handleErrorMsg = (field, value) => {
    let newError = JSON.parse(JSON.stringify(errorMsg));
    newError[field] = value;
    setErrorMsg(newError);
  };

  const handleBack = () => {
    history.push("/houseowner/dashboard");
  };

  const handleProfile = () => {
    //  console.log(errorMsg);
    checkProfileInfo(errorMsg.givenName);
    checkProfileInfo(errorMsg.surname);
    checkProfileInfo(errorMsg.username);
    checkProfileInfo(errorMsg.email);
    checkProfileInfo(errorMsg.phoneNo);
    checkProfileInfo(errorMsg.address);
    checkProfileInfo(errorMsg.post_number);
    checkProfileInfo(errorMsg.post_office);
    checkProfileInfo(errorMsg.apartment_no);
    if (
      !(
        errorMsg.givenName &&
        errorMsg.surname &&
        errorMsg.username &&
        errorMsg.email &&
        errorMsg.phoneNo &&
        errorMsg.address &&
        errorMsg.post_number &&
        errorMsg.post_office &&
        errorMsg.apartment_no
      )
    ) {
      toggleSubmitModal();
    }
  };

  const submitProfile = () => {
    console.log(me);
    UserService.updateProfile(user.name, me)
      .then((response) => {
        // dispatchUserLogout();
      })
      .catch((error) => {
        console.log(error);
      });
    toggleSubmitModal();
  };

  const checkProfileInfo = (field, value) => {
    let re, message;
    switch (field) {
      case "email":
        re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        message = "Invalid Email Address";
        break;
      case "givenName":
        re = /^[a-zA-Z_.-]+$/;
        message = "Invalid Given Name";
        break;
      case "surname":
        re = /^[a-zA-Z_.-]+$/;
        message = "Invalid Surname";
        break;
      case "username":
        re = /^[0-9a-zA-Z_.-]+$/;
        message = "Invalid Username";
        break;
      case "phoneNo":
        re = /^[0-9]+$/;
        message = "Invalid Phone Number";
        break;
      case "old":
        re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        message = "Invalid Password";
        break;
      case "new":
        re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        message = "Invalid Password";
        break;
      case "confirm":
        re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        message = "Invalid Password";
        break;
      default:
        re = /^[0-9a-zA-Z_.,-/\-/\s/]+$/;
        message = "Invalid";
        break;
    }
    if (re.test(value)) {
      handleErrorMsg(field, "");
    } else {
      handleErrorMsg(field, message);
    }
    return true;
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Profile</span>
            <span className="page-border" />
          </div>
        </PageTitle>
        <PersonalInfoBoard>
          <Title>PERSONAL INFORMATION</Title>
          <PersonalInfoRow>
            <AvatarSection>
              {!image.preview ? (
                <img src="/assets/image/avatar.jpg" alt="avatar" />
              ) : (
                <img src={image.preview} alt="avatar" />
              )}
              <div>
                <input
                  id="upload"
                  type="file"
                  onChange={(e) => handleChangeImage(e)}
                />
                <label htmlFor="upload" className="btn btn-light">
                  <FaCloudUploadAlt size={20} /> upload
                </label>
                <span>Choose Profile Photo</span>
              </div>
            </AvatarSection>
            <InputSection>
              <label>Given Name</label>
              <input
                type="text"
                placeholder="John"
                value={me.givenName || ""}
                onChange={(e) => handleMe("givenName", e.target.value)}
                className={`from-control ${errorMsg.givenName ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.givenName ? "show" : "hide"}`}>
                {errorMsg.givenName}
              </p>
            </InputSection>
            <InputSection>
              <label>Surname</label>
              <input
                type="text"
                placeholder="Doe"
                value={me.surname || ""}
                onChange={(e) => handleMe("surname", e.target.value)}
                className={`from-control ${errorMsg.surname ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.surname ? "show" : "hide"}`}>
                {errorMsg.surname}
              </p>
            </InputSection>
            <InputSection>
              <label>Username</label>
              <input
                type="text"
                placeholder="johndoe"
                value={me.name || ""}
                onChange={(e) => handleMe("name", e.target.value)}
                className={`from-control ${errorMsg.name ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.name ? "show" : "hide"}`}>
                {errorMsg.name}
              </p>
            </InputSection>
          </PersonalInfoRow>
          <hr />
          <PersonalInfoRow>
            <InputSection>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={me.email || ""}
                onChange={(e) => handleMe("email", e.target.value)}
                className={`from-control ${errorMsg.email ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.email ? "show" : "hide"}`}>
                {errorMsg.email}
              </p>
            </InputSection>
            <InputSection>
              <label>Phone Number</label>
              <PhoneInput
                country={"us"}
                value={me.mobile || ""}
                onChange={(mobile) => handleMe("mobile", mobile)}
              />
              <p className={`error ${errorMsg.mobile ? "show" : "hide"}`}>
                {errorMsg.mobile}
              </p>
            </InputSection>
          </PersonalInfoRow>
          <hr />
          <PersonalInfoRow>
            <InputSection>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                value={me.address || ""}
                onChange={(e) => handleMe("address", e.target.value)}
                className={`from-control ${errorMsg.address ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.address ? "show" : "hide"}`}>
                {errorMsg.address}
              </p>
            </InputSection>
            <InputSection>
              <label>Post Number</label>
              <input
                type="text"
                placeholder="Enter Post Number"
                onChange={(e) => handleMe("postalCode", e.target.value)}
                value={me.postalCode || ""}
                className={`from-control ${errorMsg.postalCode ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.postalCode ? "show" : "hide"}`}>
                {errorMsg.postalCode}
              </p>
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Post Office</label>
              <input
                type="text"
                placeholder="Enter Post Office"
                value={me.postalPlace || ""}
                onChange={(e) => handleMe("postalPlace", e.target.value)}
                className={`from-control ${
                  errorMsg.postalPlace ? "error" : ""
                }`}
              />
              <p className={`error ${errorMsg.postalPlace ? "show" : "hide"}`}>
                {errorMsg.postalPlace}
              </p>
            </InputSection>
            <InputSection>
              <label>Apartment No</label>
              <input
                type="text"
                placeholder="Enter Apartment No"
                onChange={(e) => handleMe("apartment_no", e.target.value)}
                value={me.apartment_no || ""}
                className={`from-control ${
                  errorMsg.apartment_no ? "error" : ""
                }`}
              />
              <p className={`error ${errorMsg.apartment_no ? "show" : "hide"}`}>
                {errorMsg.apartment_no}
              </p>
            </InputSection>
          </PersonalInfoRow>
          <hr />
          <PersonalInfoRow>
            <InputSection>
              <label>Old Password</label>
              <input
                type="password"
                value={password.old || ""}
                onChange={(e) => handlePassword("old", e.target.value)}
                placeholder="********"
                className={`from-control ${errorMsg.old ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.old ? "show" : "hide"}`}>
                {errorMsg.old}
              </p>
            </InputSection>
            <InputSection>
              <label>New Password</label>
              <input
                type="password"
                value={password.new || ""}
                onChange={(e) => handlePassword("new", e.target.value)}
                placeholder="********"
                className={`from-control ${errorMsg.new ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.new ? "show" : "hide"}`}>
                {errorMsg.new}
              </p>
            </InputSection>
            <InputSection>
              <label>Enter Confirm Password</label>
              <input
                type="password"
                value={password.confirm || ""}
                onChange={(e) => handlePassword("confirm", e.target.value)}
                placeholder="********"
                className={`from-control ${errorMsg.confirm ? "error" : ""}`}
              />
              <p className={`error ${errorMsg.confirm ? "show" : "hide"}`}>
                {errorMsg.confirm}
              </p>
            </InputSection>
          </PersonalInfoRow>
        </PersonalInfoBoard>
        <SaveChanges>
          <Button onClick={handleProfile}>Save Changes</Button>
        </SaveChanges>
      </div>

      <JobModal
        modal={submitModal}
        toggle={toggleSubmitModal}
        title="Confirm"
        content={
          <div style={{ textAlign: "center" }}>
            Are you sure to update profile?
          </div>
        }
        buttons={[
          { style: "secondary", text: "No", callback: toggleSubmitModal },
          {
            style: "primary",
            text: "Yes",
            callback: submitProfile,
          },
        ]}
      />
    </section>
  );
};

const mapStateToProps = ({ common }) => {
  const { user } = common;
  return { user };
};

const mapDispatchToProp = (dispatch) => {
  return {
    dispatchUserLogout: () => dispatch({ type: LOGOUT_USER }),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
