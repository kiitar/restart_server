import styled from "styled-components";
// background: rgb(38, 156, 252);
export const ButtonStyled = styled.button`
  background: ${(props) => props.color};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;

  :hover {
    background: rgb(23, 138, 233);
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;
