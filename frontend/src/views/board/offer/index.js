import React from 'react';
import {PageTitle, RegisterActions} from '../../owner/style';
import {FaChevronLeft} from 'react-icons/fa';
import { OfferBoard, PageContent} from '../style';
import {Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import JobDescription from '../../../components/JobDescription';

const JobOffer = ({history}) => {
    const jobDescription = {
        customerAddress: {
            addressLine: 'Standakerveien 159',
            postalCode: '0150',
            city: 'Oslo'
        },
        contactPerson: {
            firstName: 'Test',
            lastName: 'Test'
        },
        mobile: '909090909'
    };
    const handleBack = () => {
        history.push('/board/detail/1');
    };

    return (
        <section>
            <div className="container">
                <PageTitle onClick={handleBack}>
                    <FaChevronLeft/>
                    <div>
                        <span>Make an Offer</span>
                        <span className="page-border"/>
                    </div>
                </PageTitle>
                <PageContent>
                    <JobDescription jobData={jobDescription} />
                    <OfferBoard>
                        <div className="board-header">Provide Offer</div>
                        <div className="board-content">
                            <Form>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="textarea" name="description" id="description"/>
                                </FormGroup>
                                <Row form>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="photos">Upload Documents</Label>
                                            <Input type="file" name="photos" id="photos" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="price">Estimated Price</Label>
                                            <Input type="number" name="price" id="price"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </OfferBoard>
                </PageContent>
                <RegisterActions>
                    <Button color="primary">Send</Button>
                    <Button color="secondary" onClick={handleBack}>Cancel</Button>
                </RegisterActions>
            </div>
        </section>
    );
};

export default JobOffer;
