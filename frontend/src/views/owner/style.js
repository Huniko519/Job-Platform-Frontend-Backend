import styled from "styled-components";
import theme from "../../theme";

export const PageTitle = styled.div`
  font-family: Lato;
  font-size: ${theme.fontSizes.pageTitle};
  font-weight: ${theme.fontWeights.bold};
  display: flex;
  position: relative;
  line-height: 24px;
  svg + div {
    margin-left: 10px;
  }
  div {
    position: relative;
  }
  svg {
    padding: 2px;
    width: 30px;
    color: ${theme.colors.darkPrimary};
    border-radius: 20px;
    border: 1px solid;
    background: ${theme.colors.gray100};
  }
  .page-border {
    border-bottom: 3px solid ${theme.colors.gray300}77;
    position: absolute;
    width: 35px;
    left: 0;
    bottom: -5px;
  }
  &:hover {
    cursor: pointer;
  }
  button {
    position: absolute;
    right: 5px;
  }
`;

export const WidgetsWrapper = styled.div`
  font-family: Rubik;
`;
export const Widgets = styled.div`
  display: flex;
  flex-wrap: wrap;
  div + div {
    margin-left: 20px;
  }
`;

export const WidgetTitle = styled.div`
  font-size: ${theme.fontSizes.widget};
  margin-top: 40px;
  margin-bottom: 15px;
`;

export const WidgetItem = styled.div`
  padding: 30px;
  border: 1px solid ${theme.colors.primary};
  background-color: ${theme.colors.white};
  width: 40%;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 18px;
  font-weight: 300;
  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
  img + span {
    margin-left: 10px;
  }
`;

export const IssueBoard = styled.div`
  margin-top: 30px;
  font-family: Lato;
  font-size: ${theme.fontSizes.placeholder};
  line-height: 19px;
  ul {
    display: flex;
    list-style: none;
    li + li {
      margin-left: 20px;
    }
    li {
      color: ${theme.colors.gray400};
      padding: 0 5px 15px 5px;
      cursor: pointer;
    }
    li:hover {
      border-bottom: 3px solid ${theme.colors.lightGreen};
    }
    li.active {
      color: #303841;
      border-bottom: 3px solid ${theme.colors.lightGreen};
    }
  }
`;

export const IssueBoardWrapper = styled.div`
  background-color: ${theme.colors.white}; ;
`;

export const IssueBoardFilter = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-flow: row;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  padding: 20px 10px;
  select {
    border-radius: 20px;
    padding: 5px;
    font-size: ${theme.fontSizes.primary};
    font-family: Rubik;
    height: 40px;
  }
`;

export const DropWrapper = styled.div`
  padding: 0 10px;
`;

export const SearchButton = styled.div`
  padding: 20px 10px;
  button {
    width: 130px;
    border-radius: 20px;
    font-size: ${theme.fontSizes.primary};
    font-family: "lato";
  }
`;

export const PersonalInfoBoard = styled.div`
  background: ${theme.colors.white};
  margin-top: 30px;
  padding: 25px 40px;
  p.error {
    height: 30px;
    padding: 2px 10px;
    color: ${theme.colors.red};
    margin: 0;
  }
  p.error.show + input {
    border: 1px solid ${theme.colors.red};
  }
`;
export const Title = styled.div`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeights.bold};
  font-family: Lato;
`;

export const PersonalInfoRow = styled.div`
  background: ${theme.colors.white};
  margin: 20px 0;
  display: flex;
  width: 100%;
  div + div {
    margin-left: 20px;
  }
  .react-tel-input .form-control {
    height: 100%;
    width: 100%;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  height: 50px;
  width: 40%;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  div {
    margin-top: 10px;
    margin-left: 20px;
    display: inline-grid;

    label {
      font-size: ${theme.fontSizes.primary};
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray400};
      white-space: nowrap;
      :hover {
        cursor: pointer;
      }
    }

    span {
      font-size: ${theme.fontSizes.primary};
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray400};
      white-space: nowrap;
    }
  }
`;

export const InputSection = styled.div`
  display: inline-grid;
  width: 100%;
  label {
    font-size: ${theme.fontSizes.primary};
    font-weight: 500;
    font-family: Lato;
    color: #303841;
  }
  input,
  select {
    padding: 15px 12px;
    border: 1px solid #dfe1e6;
    border-radius: 3px;
    height: auto;
  }
  input:focus {
    outline-color: ${theme.colors.primary} !important;
  }
  input.error {
    border: 1px solid ${theme.colors.red};
  }
`;

export const SaveChanges = styled.div`
  text-align: right;
  margin: 30px 50px;
`;
export const RegisterBoard = styled.div``;
export const RegisterBody = styled.div`
  background: ${theme.colors.white};
  padding: 30px;
`;
export const JobDescriptionWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`;
export const DamageInfoWrapper = styled.ul`
  list-style: none;
  font-size: ${theme.fontSizes.placeholder};
  color: ${theme.colors.black};
  li + li {
    margin-top: 20px;
  }
  li {
    line-height: 2;
    .info-text {
      float: left;
      width: 50%;
      text-align: right;
      margin-right: 20px;
      font-size: ${theme.fontSizes.placeholder};
      font-family: Poppins;
      font-weight: 500;
    }
    .info-buttons {
      text-align: left;
      button {
        background: ${theme.colors.white};
        color: black;
        font-size: ${theme.fontSizes.primary};
        font-family: Poppins;
        font-weight: 600;
        width: 60px;
      }
      button.active {
        background: #3ca4e61f !important;
        color: black !important;
      }
    }
  }
`;

export const RegisterHeader = styled.ul`
  margin-top: 30px;
  padding: 20px;
  background-color: ${theme.colors.white};
  margin-bottom: 0;
  font-size: ${theme.fontSizes.widget};
  text-align: center;
`;

export const RegisterActions = styled.div`
  padding: 10px 40px;
  text-align: right;
  button {
    border-radius: 20px;
  }
  button + button {
    margin-left: 10px;
  }
`;

export const ApprovePanel = styled.div`
  padding: 20px 0;
  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    button {
      width: 45%;
    }
  }
`;

export const JobDetailBoard = styled.div`
  display: flex;
`;

export const JobDetailLeft = styled.div`
  width: 60%;
  border-right: 1px solid ${theme.colors.gray300};
  padding-right: 20px;
  .job-desc {
    padding: 20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    background: ${theme.colors.white};
  }
  .job-attaches {
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
  .messages {
    margin-top: 20px;
    .message-list {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
      border-radius: 6px;
      background: ${theme.colors.white};
      .rce-container-mbox {
        margin: 10px 0;
      }
      .rce-mbox {
        border: 1px solid ${theme.colors.gray200};
      }
      .rce-mbox-right-notch,
      .rce-mbox-left-notch {
        display: none;
      }

      .rce-mbox-body {
        display: flex;
      }
      .rce-mbox-time {
        bottom: -10px;
      }
      .rce-mbox-right {
        .rce-mbox-body {
          display: flex;
          flex-flow: row-reverse;
        }
      }
    }
    .message-send {
      margin-top: 5px;
      .rce-input-textarea {
        height: 40px;
      }
    }
  }
`;

export const JobDetailRight = styled.div`
  padding-bottom: 20px;
  width: 40%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  margin-left: 20px;
  background: ${theme.colors.white};
  .status {
    ul {
      list-style: none;
      padding: 20px 20px 10px 20px;
      li.active {
        color: ${theme.colors.primary};
      }
    }
  }
  .job-offer {
    margin: 10px 10px 0 10px;
    padding: 10px;
    border: 4px solid ${theme.colors.gray100};
    border-radius: 5px;
    .job-offer-detail {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .contact-detail {
        padding: 10px;
        display: flex;
        flex-direction: column;
      }
      .contact-status {
        display: block;
        line-height: 14px;
        .c-status {
          padding: 3px;
          border: 1px solid ${theme.colors.primary};
          border-radius: 5px;
          margin-left: 10px;
          font-size: ${theme.fontSizes.placeholder};
          font-weight: ${theme.fontWeights.medium};
          color: ${theme.colors.primary};
        }
      }
    }
  }
  .job-actions {
    padding: 20px;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    button {
      margin: 5px;
      width: 40%;
    }
  }
`;

export const JobDetailHeader = styled.div`
  margin-top: 30px;
  padding: 20px;
  font-size: ${theme.fontSizes.placeholder};
  font-family: Lato;
  font-weight: ${theme.fontWeights.medium};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  background: ${theme.colors.white};
  div {
    display: flex;
    span + span {
      margin-left: 10px;
    }
    span.label {
      width: 120px;
    }
    span.text {
      color: ${theme.colors.darkPrimary};
      font-weight: ${theme.fontWeights.bold};
    }
  }
`;
