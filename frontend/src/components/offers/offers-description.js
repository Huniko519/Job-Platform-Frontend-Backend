import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ImageShow from "../ImageShow";
import { JobDescriptionWrapper } from "../../views/owner/style";
import { OfferHeader, OfferBody } from "./style";
import Utills from "../../utils/utill";

const OffersDescription = ({ data }) => {
  return (
    <JobDescriptionWrapper>
      <Form>
        <FormGroup>
          <OfferHeader>
            <OfferBody>
              <Label for="damageWidth">Case No: {data.jobid}</Label>
              <Label for="damageWidth">Date: {data.Date}</Label>
              <Label for="damageWidth">
                Contact Person: {data.contactPerson}
              </Label>
            </OfferBody>
            <OfferBody>
              <Label for="damageWidth">Address: {data.address}</Label>
              <Label for="damageWidth">
                Status: {Utills.getOwnerStatus(data.currentStatus).label}
              </Label>
            </OfferBody>
          </OfferHeader>
        </FormGroup>
        <hr />

        <FormGroup>
          <Label for="damageDesc">Offer Description</Label>
          <Input
            type="textarea"
            rows="5"
            name="damageDesc"
            id="damageDesc"
            value={data.description}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Offer Amount</Label>
          <Input name="amount" id="title" value={data.price} disabled />
        </FormGroup>
        <FormGroup>
          <ImageShow data={data.attachments}></ImageShow>
        </FormGroup>
      </Form>
    </JobDescriptionWrapper>
  );
};

export default OffersDescription;
