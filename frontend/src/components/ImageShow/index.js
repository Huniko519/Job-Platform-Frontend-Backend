import { OfferDetailImage } from "./style";
import React from "react";
import isEmpty from "../../utils/is-empty";
const ImageShow = ({ data }) => {
  return (
    <OfferDetailImage>
      <div className="job-attaches">
        {!isEmpty(data) ? (
          data.map((attach) => (
            <img src={attach.src} alt={attach.id} key={attach.id} />
          ))
        ) : (
          <></>
        )}
      </div>
    </OfferDetailImage>
  );
};

export default ImageShow;
