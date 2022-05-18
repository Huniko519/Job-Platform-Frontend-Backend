import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Input } from 'reactstrap';
import { setTokenData } from "../../../redux/actions";
import { Button, GrayButton, CheckboxLabel } from "../../../components/styles";
import { PageTitle, AvatarSection, InputSection, PersonalInfoBoard, PersonalInfoRow, SaveChanges, Title } from "../../owner/style";
import { FaCloudUploadAlt, FaChevronLeft } from "react-icons/fa";
import { clientType, countryList } from '../../../constants/mockup';

const NewClient = ({ history }) => {

    useEffect(() => {

    }, []);

    const handleBack = () => {
        history.push('/board/users')
    }

    const handleSave = () => {

    }

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
                            <img
                                src="/assets/image/avatar.jpg"
                                alt="avatar" />
                            <div>
                                <button className="btn btn-light">
                                    <FaCloudUploadAlt size={20} /> upload
                                </button>
                                <span>Choose Profile Photo</span>
                            </div>
                        </AvatarSection>
                        <InputSection>
                            <label>Client Name</label>
                            <input id="clientName" type='text' placeholder="Enter name here" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label>Type of Client</label>
                            <Input id="type" type='select' className='form-control'>
                                {
                                    clientType.map((item, index) => {
                                        return (
                                            <option value={item.value} key={index}>{item.text}</option>
                                        )
                                    })
                                }
                            </Input>
                        </InputSection>
                    </PersonalInfoRow>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>No of Employees</label>
                            <input id="number" type='text' placeholder="100" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label>Renew Date</label>
                            <input id="renew" type='date' placeholder="22/12/2019" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label></label>
                            <CheckboxLabel>
                                <Input type="checkbox" /> Renew this Subscription automatically?
                            </CheckboxLabel>
                        </InputSection>
                    </PersonalInfoRow>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>Contact Person Name</label>
                            <input id="personName" type='text' placeholder="Enter name here" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label>Contact Person Email</label>
                            <input id="personEmail" type='email' placeholder="Enter email here" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label>Contact Person Mobile</label>
                            <input id="personMobile" type='text' placeholder="Enter mobile number here" className='from-control' />
                        </InputSection>
                    </PersonalInfoRow>
                </PersonalInfoBoard>
                <PersonalInfoBoard>
                    <Title>Invoice INFORMATION</Title>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>Country</label>
                            <Input id="country" type='select' className='form-control'>
                                {
                                    countryList.map((item, index) => {
                                        return (
                                            <option value={item.value} key={index}>{item.text}</option>
                                        )
                                    })
                                }
                            </Input>
                        </InputSection>
                        <InputSection>
                            <label>Postal Code</label>
                            <input id="postalCode" type='text' placeholder="511000" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label>Postal Place</label>
                            <input id="postalPlace" type='text' placeholder="Oslo" className='from-control' />
                        </InputSection>
                    </PersonalInfoRow>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>Address</label>
                            <input id="address" type='text' placeholder="Enter address here" className='from-control' />
                        </InputSection>
                        <InputSection>
                            <label>Start Date</label>
                            <input id="startDate" type='date' placeholder="22/12/2019" className='from-control' />
                        </InputSection>
                    </PersonalInfoRow>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>Comments</label>
                            <Input id="comments" type='textarea' placeholder="Write your comments here" rows='4' className='from-control' />
                        </InputSection>
                    </PersonalInfoRow>
                </PersonalInfoBoard>
                <SaveChanges>
                    <GrayButton onClick={handleBack}>Cancel</GrayButton>
                    <Button onClick={handleSave}>Save</Button>
                </SaveChanges>
            </div>
        </section>
    )
}

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
