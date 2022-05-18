import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input } from "reactstrap";
import { setTokenData } from "../../../redux/actions";
import { Button, GrayButton, CheckboxLabel } from "../../../components/styles";
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

//! state of the save values

const NewAdmin = ({ history }) => {

  const [obj, setOBJ] = useState({});
  const [image, setImage] = useState({ preview: "", raw: "" });

  useEffect(() => { }, []);

  const handleChangeImage = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
  };

  const onInputChange = (e) => {
    obj[e.target.id] = e.target.value;
    setOBJ(obj);
  };

  const handleBack = () => {
    history.push("/admin/superadmins");
  };

  const onRadioChange = (e) => {
    obj["adminrole"] = e.target.value;
    setOBJ(obj);
  };

  const handleSave = async () => {
    let formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    formData.append("file", image.raw);

    await UserService.registerSuperAdmin(formData).then((res) => {
      console.log(res);
    });
    history.goBack();
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Add New Super Admin</span>
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
                  type="file"
                  id="upload"
                  value=""
                  onChange={(e) => handleChangeImage(e)}
                  hidden
                ></input>
                <label htmlFor="upload" className="btn btn-light">
                  <FaCloudUploadAlt size={20} /> upload
                </label>
                <span> Choose Profile Photo</span>
              </div>
            </AvatarSection>
            <InputSection>
              <label>Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="from-control"
                value={obj.fullname}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email here"
                className="from-control"
                value={obj.email}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Mobile</label>
              <input
                id="mobile"
                type="text"
                placeholder="Enter mobile number here"
                className="from-control"
                value={obj.mobile}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Comments</label>
              <Input
                id="comments"
                type="textarea"
                placeholder="Write your comments here"
                rows="4"
                className="from-control"
                value={obj.comments}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <hr />
          <Title>ACCOUNT ACCESS</Title>
          <PersonalInfoRow>
            <InputSection>
              <CheckboxLabel>
                <Input name="role" type="radio" value="admin" onChange={onRadioChange} /> Admin
              </CheckboxLabel>
            </InputSection>
            <InputSection>
              <CheckboxLabel>
                <Input name="role" type="radio" value="read_only" onChange={onRadioChange} /> Read Only
              </CheckboxLabel>
            </InputSection>
            <InputSection>
              <CheckboxLabel>
                <Input name="role" type="radio" value="access_not_delete" onChange={onRadioChange} /> Access, all but not delete
              </CheckboxLabel>
            </InputSection>
          </PersonalInfoRow>
        </PersonalInfoBoard>
        <SaveChanges>
          <GrayButton onClick={handleBack}>Cancel</GrayButton>
          <Button onClick={handleSave}>Save</Button>
        </SaveChanges>
      </div>
    </section>
  );
};

const mapStateToProps = ({ common }) => {
  const { tokenData } = common;
  return { tokenData };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setTokenData: (data) => dispatch(setTokenData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(NewAdmin);
