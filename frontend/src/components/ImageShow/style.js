import styled from "styled-components";
import theme from "../../theme";

export const OfferDetailImage = styled.div`
  display: flex;
  flex: 1;
  .job-desc {
    padding: 20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    background: ${theme.colors.white};
  }
  .job-attaches {
    display: flex;
    flex: 1;
    margin-top: 20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    background: ${theme.colors.white};
    img {
      padding: 10px;
      width: 100px;
      height: 100px;
    }
  }
`;
