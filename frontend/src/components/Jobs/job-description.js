import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { JobDescriptionWrapper } from "../../views/owner/style";
import CustomDropzone from "../dropzone";

const JobDescription = ({
  newJob,
  description,
  handleDescription,
  title,
  handleTitle,
  handleUploads,
}) => {
  return (
    <JobDescriptionWrapper>
      <Form>
        <FormGroup>
          <Label for="damageWidth">Case No. {newJob ? "" : "1234"}</Label>
        </FormGroup>
        <FormGroup>
          <Label for="damageHeight">Date: {newJob ? "" : "2021-04-28"}</Label>
        </FormGroup>
        <hr />
        <FormGroup>
          <Label for="title">Enter your job title</Label>
          <Input name="title" id="title" value={title} onChange={handleTitle} />
        </FormGroup>
        <FormGroup>
          <Label for="damageDesc">Enter your job description</Label>
          <Input
            type="textarea"
            rows="5"
            name="damageDesc"
            id="damageDesc"
            value={description}
            onChange={handleDescription}
          />
        </FormGroup>
        <FormGroup>
          <CustomDropzone handleUploads={handleUploads} />
        </FormGroup>
      </Form>
    </JobDescriptionWrapper>
  );
};

export default JobDescription;
