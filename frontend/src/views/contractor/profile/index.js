import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {setTokenData} from "../../../redux/actions";
import {PageTitle, AvatarSection, InputSection, PersonalInfoBoard, PersonalInfoRow, SaveChanges, Title} from "../../owner/style";
import {FaCloudUploadAlt, FaChevronLeft} from "react-icons/fa";

const Profile = ({tokenData, setTokenData, history}) => {
    useEffect(() => {

    }, []);

    const handleBack = () => {
        history.push('/contractor/dashboard')
    }

    const handleProfile = () => {

    }

    return (
        <section>
            <div className="container">
                <PageTitle onClick={handleBack}>
                    <FaChevronLeft/>
                    <div>
                        <span>Profile</span>
                        <span className="page-border"/>
                    </div>
                </PageTitle>
                <PersonalInfoBoard>
                    <Title>PERSONAL INFORMATION</Title>
                    <PersonalInfoRow>
                        <AvatarSection>
                            <img
                                src="/assets/image/avatar.jpg"
                                alt="avatar"/>
                            <div>
                                <button className="btn btn-light">
                                    <FaCloudUploadAlt size={20}/> upload
                                </button>
                                <span>Choose Profile Photo</span>
                            </div>
                        </AvatarSection>
                        <InputSection>
                            <label>Full Name</label>
                            <input id="fullname" type='text' placeholder="John Doe" className='from-control'/>
                        </InputSection>
                    </PersonalInfoRow>
                    <hr/>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>Email</label>
                            <input id="email" type='email' placeholder="Enter Email" className='from-control'/>
                        </InputSection>
                        <InputSection>
                            <label>Phone Number</label>
                            <input id="phone" type='text' placeholder="Enter Phone Number" className='from-control'/>
                        </InputSection>
                    </PersonalInfoRow>
                    <hr/>
                    <PersonalInfoRow>
                        <InputSection>
                            <label>Password</label>
                            <input id="password" type='password' placeholder="********" className='from-control'/>
                        </InputSection>
                        <InputSection>
                            <label>Enter Confirm Password</label>
                            <input id="confirm" type='password' placeholder="********" className='from-control'/>
                        </InputSection>
                    </PersonalInfoRow>
                </PersonalInfoBoard>
                <SaveChanges>
                    <button className="btn btn-primary" onClick={handleProfile}>Save Changes</button>
                </SaveChanges>
            </div>
        </section>
    )
}

const mapStateToProps = ({common}) => {
    const {tokenData} = common;
    return {tokenData};
};

const mapDispatchToProp = (dispatch) => {
    return {
        setTokenData: (data) => dispatch(setTokenData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
