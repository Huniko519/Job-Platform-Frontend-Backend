import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input } from "reactstrap";
import { setTokenData } from "../../../redux/actions";
import { Button, GrayButton } from "../../../components/styles";
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
import { countryList } from "../../../constants/mockup";

import UserService from "../../../services/user.service";
import { useParams } from "react-router-dom";

const EditContractor = ({ history }) => {
  //! set the data of contracgtor
  let obj = {};
  const { id } = useParams();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [userInfo, setUserInfo] = useState({});
  const handleChangeImage = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  useEffect(() => {
    UserService.getUserById(id).then((res) => {
      obj = res;
      obj["startDate"] = obj.startDate.substr(0, 10);
      obj["reNew"] = obj.reNew.substr(0, 10);
      setUserInfo({ ...obj });
      setImage({ preview: res.avatar });
    });
  }, []);

  const handleBack = () => {
    history.push("/admin/contractors");
  };

  const handleSave = async () => {
    //! made form data
    let formData = new FormData();
    formData.append("id", id);
    formData.append("data", JSON.stringify(userInfo));
    if (image.raw) {
      formData.append("file", image.raw);
    }
    await UserService.updateContractorById(formData).then((res) => {
      console.log(res);
    });
    history.goBack();
  };

  const onInputChange = (e) => {
    obj[e.target.id] = e.target.value;
    setUserInfo({ ...userInfo, ...obj });
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Edit Contractor</span>
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
                  onChange={handleChangeImage}
                  hidden
                ></input>
                <label htmlFor="upload" className="btn btn-light">
                  <FaCloudUploadAlt size={20} /> upload
                </label>
                <span> Choose Profile Photo</span>
              </div>
            </AvatarSection>
            <InputSection>
              <label>Contact Person Name</label>
              <input
                id="contactPersonName"
                type="text"
                placeholder="Enter name here"
                className="from-control"
                value={userInfo.contactPersonName || ''}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Contact Person Email</label>
              <input
                id="contactPersonEmail"
                type="email"
                placeholder="Enter email here"
                className="from-control"
                value={userInfo.contactPersonEmail || ''}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Contact Company</label>
              <input
                id="contactCompanyName"
                type="text"
                placeholder="Enter Company Name"
                className="from-control"
                value={userInfo.contactCompanyName || ''}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Contact Person Mobile</label>
              <input
                id="contactPersonMobile"
                type="text"
                placeholder="Enter mobile number here"
                className="from-control"
                value={userInfo.contactPersonMobile || ''}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Renew Date</label>
              <input
                id="reNew"
                type="date"
                placeholder="22/12/2019"
                className="from-control"
                value={userInfo.reNew || ''}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
        </PersonalInfoBoard>
        <PersonalInfoBoard>
          <Title>Invoice INFORMATION</Title>
          <PersonalInfoRow>
            <InputSection>
              <label>Country</label>
              <Input
                id="country"
                type="select"
                className="form-control"
                value={userInfo.country || ''}
                onChange={onInputChange}
              >
                {countryList.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.text}
                    </option>
                  );
                })}
              </Input>
            </InputSection>
            <InputSection>
              <label>Postal Code</label>
              <input
                id="postalCode"
                type="text"
                placeholder="511000"
                className="from-control"
                value={userInfo.postalCode || ''}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Postal Place</label>
              <input
                id="postalPlace"
                type="text"
                placeholder="Oslo"
                className="from-control"
                value={userInfo.postalPlace || ''}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Address</label>
              <input
                id="address"
                type="text"
                placeholder="Enter address here"
                className="from-control"
                value={userInfo.address || ''}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Start Date</label>
              <input
                id="startDate"
                type="date"
                placeholder="22/12/2019"
                className="from-control"
                value={userInfo.startDate || ''}
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
                value={userInfo.comments || ''}
                onChange={onInputChange}
              />
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

export default connect(mapStateToProps, mapDispatchToProp)(EditContractor);
