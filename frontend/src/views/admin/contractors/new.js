import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input } from "reactstrap";
import { setTokenData } from "../../../redux/actions";
import { Button, GrayButton } from "../../../components/styles";
import { ToastContainer, toast } from "react-toastify";
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
import { clientType, countryList } from "../../../constants/mockup";
import UserService from "../../../services/user.service";
import JobModal from "../../../components/modal";

const NewContractor = ({ history }) => {
  //! set the data of contracgtor

  const [obj, setObj] = useState({});
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [modal, setModal] = useState(false);

  const handleChangeImage = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  useEffect(() => {}, []);

  const toggleModal = () => setModal(!modal);

  const handleBack = () => {
    history.push("/admin/contractors");
  };

  const sendQuestionPDF = () => {
    toast.success("Success to send new contractor!");
  };

  const onModalOkClick = async () => {
    //! made form data
    let formData = new FormData();

    formData.append("data", JSON.stringify(obj));
    formData.append("file", image.raw);
    formData.append("isSent", "sent");

    sendQuestionPDF();
    await UserService.registerContractor(formData).then((res) => {
      console.log(res);
      toast.success("Success to register new contractor!");
    });
    history.goBack();
  };

  const onModalCancelClick = async () => {
    //! made form data
    let formData = new FormData();

    formData.append("data", JSON.stringify(obj));
    formData.append("file", image.raw);
    formData.append("isSent", "nosent");

    await UserService.registerContractor(formData).then((res) => {
      console.log(res);
      toast.success("Success to register new contractor!");
    });
    history.goBack();
  };

  const handleSave = async () => {
    setModal(true);
  };

  const onInputChange = (e) => {
    obj[e.target.id] = e.target.value;
    setObj({ ...obj });
  };

  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Add New Contractor</span>
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
                value={obj.contactPersonName}
                onChange={onInputChange}
              />
            </InputSection>
            <InputSection>
              <label>Company Name</label>
              <input
                id="contactCompanyName"
                type="email"
                placeholder="Enter email here"
                className="from-control"
                value={obj.contactCompanyName}
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
          </PersonalInfoRow>
          <PersonalInfoRow>
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
            <InputSection>
              <label>Type of Contractor</label>
              <Input
                id="contactPersonType"
                type="select"
                value={obj.contactPersonType}
                onChange={onInputChange}
                className="form-control"
              >
                {clientType.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.text}
                    </option>
                  );
                })}
              </Input>
            </InputSection>
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
                value={obj.country}
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
        <JobModal
          modal={modal}
          toggle={toggleModal}
          title="Insert Contractor"
          content={
            <div style={{ textAlign: "center" }}>
              Do you want to send questions link to contractor?
            </div>
          }
          buttons={[
            { style: "secondary", text: "No", callback: onModalCancelClick },
            { style: "primary", text: "Yes", callback: onModalOkClick },
          ]}
        />
        <ToastContainer />
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

export default connect(mapStateToProps, mapDispatchToProp)(NewContractor);
