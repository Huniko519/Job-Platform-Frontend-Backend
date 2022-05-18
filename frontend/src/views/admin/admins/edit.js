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
import UserService from '../../../services/user.service';
import { useParams } from 'react-router-dom';

//! state of the save values

const EditAdmin = ({ history }) => {

    let obj = {};
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [userInfo, setUserinfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            obj = res;
            setUserinfo({ ...obj });
            setImage({ preview: res.avatar });
        });
    }, []);

    const handleBack = () => {
        history.push("/admin/superadmins");
    };

    const handleChangeImage = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
    };

    const handleSave = async () => {
        let formData = new FormData();

        formData.append("id", id);
        formData.append("data", JSON.stringify(userInfo));
        formData.append("file", "");

        if (image.raw) {
            formData.append("file", image.raw);
        }

        await UserService.updateSuperAdminById(formData).then((res) => {
            console.log(res);
        });

        history.goBack();
    };

    const onInputChange = (e) => {
        obj[e.target.id] = e.target.value;
        setUserinfo({ ...userInfo, ...obj });
    }

    const onRadioChange = (e) => {
        userInfo["adminrole"] = e.target.value;
        setUserinfo({ ...userInfo });
    }

    return (
        <section>
            <div className="container">
                <PageTitle onClick={handleBack}>
                    <FaChevronLeft />
                    <div>
                        <span>Edit Super Admin</span>
                        <span className="page-border" />
                    </div>
                </PageTitle>
                <PersonalInfoBoard>
                    <Title>PERSONAL INFORMATION</Title>
                    <PersonalInfoRow>
                        <AvatarSection>
                            {!image.preview ? (
                                <img src="/assets/image/avatar.jpg" alt="image" />
                            ) : (
                                    <img src={image.preview} alt="image" />
                                )}
                            <div>
                                <input
                                    type="file"
                                    id="upload"
                                    onChange={handleChangeImage}
                                    hidden
                                />
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
                                value={userInfo.name || ''}
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
                                value={userInfo.email || ''}
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
                                value={userInfo.mobile || ''}
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
                    <hr />
                    <Title>ACCOUNT ACCESS</Title>
                    <PersonalInfoRow>
                        <InputSection>
                            <CheckboxLabel>
                                <Input
                                    name="role"
                                    type="radio"
                                    value="admin"
                                    checked={(userInfo.adminrole === "admin") ? true : false}
                                    onChange={onRadioChange}
                                />  Admin
                            </CheckboxLabel>
                        </InputSection>
                        <InputSection>
                            <CheckboxLabel>
                                <Input
                                    name="role"
                                    type="radio"
                                    value="read_only"
                                    checked={(userInfo.adminrole === "read_only") ? true : false}
                                    onChange={onRadioChange}
                                />
                                    Read Only
                            </CheckboxLabel>
                        </InputSection>
                        <InputSection>
                            <CheckboxLabel>
                                <Input
                                    name="role"
                                    type="radio"
                                    value="access_not_delete"
                                    checked={(userInfo.adminrole === "access_not_delete") ? true : false}
                                    onChange={onRadioChange}
                                />
                                    Access, all but not delete
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

export default connect(mapStateToProps, mapDispatchToProp)(EditAdmin);
