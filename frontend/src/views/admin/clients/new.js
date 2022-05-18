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
import { countryList } from "../../../constants/mockup";
import UserService from "../../../services/user.service";

const NewClient = ({ history }) => {
  const [obj, setObj] = useState({});
  const [image, setImage] = useState({ preview: "", raw: "" });

  useEffect(() => {}, []);

  const handleBack = () => {
    history.push("/admin/clients");
  };

  const handleChangeImage = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  const onInputChange = (e) => {
    obj[e.target.id] = e.target.value;
    setObj(obj);
  };

  const handleSave = async () => {
    let formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    formData.append("file", image.raw);
    await UserService.registerClient(formData).then((res) => {
      console.log(res);
    });

    history.goBack();
  };

  const onCheckboxChange = (e) => {
    obj["autoSubscript"] = e.target.checked;
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Add New Client</span>
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
              <label>Name of Board Complex</label>
              <input
                id="contactCompanyName"
                type="text"
                placeholder="Enter name here"
                className="from-control"
                value={obj.contactCompanyName}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>No of Employees</label>
              <input
                id="employees"
                type="text"
                placeholder="100"
                className="from-control"
                value={obj.employees}
                onChange={onInputChange}
              />
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Renew Date</label>
              <input
                id="reNew"
                type="date"
                placeholder="22/12/2019"
                className="from-control"
                value={obj.reNew}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label></label>
              <CheckboxLabel>
                <Input
                  id="autoSubscript"
                  type="checkbox"
                  checked={obj.autoSubscript}
                  onChange={onCheckboxChange}
                />{" "}
                Renew this Subscription automatically?
              </CheckboxLabel>
            </InputSection>
          </PersonalInfoRow>
          <PersonalInfoRow>
            <InputSection>
              <label>Contact Person Name</label>
              <input
                id="contactPersonName"
                type="text"
                placeholder="Enter name here"
                className="from-control"
                value={obj.contactPersonName}
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
                value={obj.contactPersonEmail}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Contact Person Mobile</label>
              <input
                id="contactPersonMobile"
                type="text"
                placeholder="Enter mobile number here"
                className="from-control"
                value={obj.contactPersonMobile}
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
                value={obj.country}
                onChange={onInputChange}
                className="form-control"
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
                value={obj.postalCode}
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
                value={obj.postalPlace}
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
                value={obj.address}
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
                value={obj.startDate}
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

export default connect(mapStateToProps, mapDispatchToProp)(NewClient);
