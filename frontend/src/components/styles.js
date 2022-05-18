import styled from "styled-components";
import theme from "../theme";

export const Box = styled.div`
  width: ${(props) => props.width || "auto"};
  max-width: ${(props) => props.maxWidth || "auto"};
  height: ${(props) => props.height || "auto"};
  display: flex;
  position: ${(props) => props.position || "unset"};
  top: ${(props) => props.top || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  border-top: ${(props) => props.borderTop || "0"};
  border-bottom: ${(props) => props.borderBottom || "0"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border-radius: ${(props) => props.borderRadius || 0};
  flex-wrap: ${(props) => props.wrap || "wrap"};
  font-size: 16px;
  color: ${theme.colors.black};
`;

export const Text = styled.p`
  width: ${(props) => props.width || "auto"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  line-height: ${(props) => props.lineHeight || "1.5rem"};
  color: ${(props) => props.color || "white"};
  max-width: ${(props) => props.maxWidth || "auto"};
  text-align: ${(props) => props.align || "center"};
  white-space: ${(props) => props.whiteSpace || "none"};
  text-overflow: ${(props) => props.textOverflow || "none"};
  overflow: ${(props) => props.overflow || "none"};
  cursor: ${(props) => props.cursor || "unset"};
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.height || "auto"};
  border-radius: ${(props) => props.borderRadius || "25px"};
  padding: ${(props) => props.padding || "35px 20px"};
  margin: ${(props) => props.margin || "0 0 20px 0"};
  background-color: ${(props) => props.backgroundColor || "white"};
  background-image: ${(props) => props.backgroundImage || "none"};
`;

export const Badge = styled.span`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.8rem;
  color: ${(props) => props.color || "white"};
  background-color: ${(props) => props.backgroundColor || "black"};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 21%);
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  font-size: 16px;
  font-family: "lato";
  background: ${theme.colors.primary};
  // background: linear-gradient(90deg, #3CA4E6 0%, #3C71DA 100%);
  // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.13);
  border-radius: 20px;
  color: white;
  border: 0;
  padding: 7px 25px;
  outline: 0 !important;
  &:hover {
    background: ${theme.colors.darkPrimary};
  }
`;

export const GrayButton = styled.button`
  font-size: 16px;
  font-family: "lato";
  background-color: ${theme.colors.gray200};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.13);
  border-radius: 20px;
  color: white;
  border: 0;
  padding: 7px 25px;
  outline: 0 !important;
  margin: 0 10px;
`;

export const TableEditButton = styled.button`
  display: flex;
  width: 21px;
  height: 21px;
  background: rgba(60, 158, 229, 0.41);
  margin-right: 10px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0 !important;
  & > svg {
    color: ${theme.colors.primary};
  }
`;

export const TableRemoveButton = styled.button`
  display: flex;
  width: 21px;
  height: 21px;
  background: rgba(255, 30, 80, 0.41);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0 !important;
  & > svg {
    color: ${theme.colors.red};
  }
`;

export const TableCheckButton = styled.button`
  display: flex;
  width: 21px;
  height: 21px;
  background: rgba(78, 245, 66, 0.41);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0 !important;
  & > svg {
    color: ${theme.colors.lightGreen};
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  padding-left: 20px;
  color: ${theme.colors.gray200} !important;
  font-size: 15px !important;
  & > input {
    margin-top: 0;
  }
`;
