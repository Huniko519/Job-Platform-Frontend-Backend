import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setTokenData, saveUserData } from "../../../redux/actions";
import { Button } from "../../../components/styles";
import {
  PageTitle,
  AvatarSection,
  InputSection,
  PersonalInfoBoard,
  PersonalInfoRow,
  SaveChanges,
  Title,
} from "../../owner/style";
import { FaCloudUploadAlt, FaChevronLeft } from "react-icons/fa";
import UserService from "../../../services/user.service";

const Profile = ({ user, isAuthenticated, history, onSaveUserData }) => {
  let obj = {};
  const [userInfo, setUserinfo] = useState({});
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
      return;
    }
    obj = user;
    setUserinfo({ ...obj });
  }, []);

  const handleChangeImage = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  const onInputChange = (e) => {
    obj[e.target.id] = e.target.value;
    setUserinfo({ ...userInfo, ...obj });
  };

  const handleBack = async () => {
    history.push("/houseowner/dashboard");
  };

  const handleProfileSave = async () => {
    let formData = new FormData();
    if (userInfo.pass && userInfo.confirm) {
      if (userInfo.pass !== userInfo.confirm) {
        console.log("Doesn't match. Please Confirm your password!");
        return;
      }
    }
    formData.append("data", JSON.stringify(userInfo));
    formData.append("file", image.raw);

    await UserService.registerProfile(formData).then((result) => {
      onSaveUserData(result);
    });
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
              {!image ? (
                <img src="/assets/image/avatar.jpg" alt="avatar" />
              ) : (
                <img src={image.preview} alt="avatar" />
              )}
              <div>
                <input
                  id="upload"
                  type="file"
                  value=""
                  onChange={(e) => handleChangeImage(e)}
                  hidden
                />
                <label htmlFor="upload" className="btn btn-light">
                  <FaCloudUploadAlt size={20} /> upload
                </label>
                <span>Choose Profile Photo</span>
              </div>
            </AvatarSection>
            <InputSection>
              <label>Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={userInfo.name || ""}
                onChange={onInputChange}
                className="from-control"
              />
            </InputSection>
          </PersonalInfoRow>
          <hr />
          <PersonalInfoRow>
            <InputSection>
              <label>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                className="from-control"
                value={userInfo.email || ""}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Phone Number</label>
              <input
                id="mobile"
                type="text"
                placeholder="Enter Phone Number"
                className="from-control"
                value={userInfo.mobile || ""}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <hr />
          <PersonalInfoRow>
            <InputSection>
              <label>Password</label>
              <input
                id="pass"
                type="password"
                placeholder="********"
                className="from-control"
                value={userInfo.pass || ""}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Enter Confirm Password</label>
              <input
                id="confirm"
                type="password"
                placeholder="********"
                value={userInfo.confirm || ""}
                onChange={onInputChange}
                className="from-control"
              />
            </InputSection>
          </PersonalInfoRow>
        </PersonalInfoBoard>
        <SaveChanges>
          <Button onClick={handleProfileSave}>Save Changes</Button>
        </SaveChanges>
      </div>
    </section>
  );
};

const mapStateToProps = ({ common }) => {
  const { user, isAuthenticated } = common;
  return { user, isAuthenticated };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setTokenData: (payload) => dispatch(setTokenData(payload)),
    onSaveUserData: (payload) => {
      dispatch(saveUserData(payload));
      localStorage.setItem("user", JSON.stringify(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
