import React, { useState } from "react";
import { PageTitle, RegisterActions } from "../../owner/style";
import { FaChevronLeft } from "react-icons/fa";
import { OfferBoard, PageContent } from "../style";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import JobDescription from "../../../components/JobDescription";
import { useParams } from "react-router-dom";
import CustomDropzone from "../../../components/dropzone";
import offerService from "../../../services/offer-service";

const JobOffer = ({ history }) => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const jobDescription = {
    customerAddress: {
      addressLine: "Standakerveien 159",
      postalCode: "0150",
      city: "Oslo",
    },
    contactPerson: {
      firstName: "Test",
      lastName: "Test",
    },
    mobile: "909090909",
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("description", description);

    formData.append("jobid", id);
    formData.append("price", price);
    files.map((file) => {
      formData.append("uploads", file);
    });
    offerService.addOffers(formData).then((res) => {
      if (res.data) {
        alert();
      } else {
        handleBack();
      }
    });
  };
  const handleBack = () => {
    history.goBack();
  };

  const handleUploads = (files) => {
    setFiles(files);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleEstimatePrice = (e) => {
    setPrice(e.target.value);
  };
  return (
    <section>
      <div className="container">
        <PageTitle onClick={handleBack}>
          <FaChevronLeft />
          <div>
            <span>Make an Offer</span>
            <span className="page-border" />
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
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    onChange={(e) => {
                      handleDescription(e);
                    }}
                  />
                </FormGroup>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="price">Estimated Price</Label>
                      <Input
                        type="number"
                        name="price"
                        id="price"
                        onChange={(e) => {
                          handleEstimatePrice(e);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <CustomDropzone
                        handleUploads={handleUploads}
                      ></CustomDropzone>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </OfferBoard>
        </PageContent>
        <RegisterActions>
          <Button color="primary" onClick={handleSubmit}>
            Send
          </Button>
          <Button color="secondary" onClick={handleBack}>
            Cancel
          </Button>
        </RegisterActions>
      </div>
    </section>
  );
};

export default JobOffer;
