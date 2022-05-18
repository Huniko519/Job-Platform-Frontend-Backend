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
import { clientType, countryList } from "../../../constants/mockup";
import UserService from "../../../services/user.service";

import { useParams } from 'react-router-dom';

const EditClient = ({ history }) => {

    let obj = {};
    const [userInfo, setUserinfo] = useState({});
    const [image, setImage] = useState({ preview: "", raw: "" });
    const { id } = useParams();

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            obj = res;
            var reNew = obj.reNew;
            var startDate = obj.startDate;

            obj.reNew = reNew.substr(0, 10);
            obj.startDate = startDate.substr(0, 10);
            setUserinfo({ ...obj });
            setImage({ preview: res.avatar });
        });
    }, []);

    const handleBack = () => {
        history.push("/admin/clients");
    };

    const handleChangeImage = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
    };

    const onInputChange = (e) => {
        userInfo[e.target.id] = e.target.value;
        setUserinfo({ ...userInfo, ...obj });
    };

    const handleSave = async () => {
        let formData = new FormData();

        formData.append("id", id);
        formData.append("data", JSON.stringify(userInfo));
        formData.append("file", "");

        if (image.raw) {
            formData.append("file", image.raw);
        }

        await UserService.updateClientById(formData).then((res) => {
            console.log(res);
        });

        history.goBack();
    };

    const onCheckboxChange = (e) => {
        userInfo["autoSubscript"] = !userInfo["autoSubscript"];
        setUserinfo({ ...userInfo });
    };

    return (
        <section>
            <div className="container">
                <PageTitle onClick={handleBack}>
                    <FaChevronLeft />
                    <div>
                        <span>Edit Client</span>
                        <span className="page-border" />
                    </div>
                </PageTitle>
                <PersonalInfoBoard>
                    <Title>PERSONAL INFORMATION</Title>
                    <PersonalInfoRow>
                        <AvatarSection>
                            {
                                !image.preview ? (
                                    <img src="/assets/image/avatar.jpg" alt="avatar" />
                                ) : (
                                    <img src={image.preview} alt="avatar" />
                                )
                            }
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
                            <label>Client Name</label>
                            <input
                                id="contactCompanyName"
                                type="text"
                                placeholder="Enter name here"
                                className="from-control"
                                value={userInfo.contactCompanyName || ""}
                                onChange={onInputChange}
                            />
                        </InputSection>
                        <InputSection>
                            <label>Type of Client</label>
                            <Input id="contactPersonType" type="select" value={userInfo.contactPersonType} onChange={onInputChange} className="form-control">
                                {clientType.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.text}
                                        </option>
                                    );
                                })}
                            </Input>
                        </InputSection>
                    </PersonalInfoRow>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>No of Employees</label>
                            <input
                                id="employees"
                                type="text"
                                placeholder="100"
                                className="from-control"
                                value={userInfo.employees || ""}
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
                                value={userInfo.reNew || ""}
                                onChange={onInputChange}
                            />
                        </InputSection>
                        <InputSection>
                            <label></label>
                            <CheckboxLabel>
                                <Input id="autoSubscript" type="checkbox"
                                    checked={userInfo.autoSubscript || false}
                                    onChange={onCheckboxChange} /> Renew this Subscription automatically?
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
                                value={userInfo.contactPersonName || ""}
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
                                value={userInfo.contactPersonEmail || ""}
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
                                value={userInfo.contactPersonMobile || ""}
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
                            <Input id="country" type="select" value={userInfo.country} onChange={onInputChange} className="form-control">
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
                                value={userInfo.postalCode || ""}
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
                                value={userInfo.postalPlace || ""}
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
                                value={userInfo.address || ""}
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
                                value={userInfo.startDate || ""}
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
                                value={userInfo.comments || ""}
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

export default connect(mapStateToProps, mapDispatchToProp)(EditClient);
