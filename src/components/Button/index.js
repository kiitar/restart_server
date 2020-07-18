import React from "react";

import { ButtonStyled } from "./style";

export const Button = (props) => {
  return (
    <ButtonStyled ref={props.ref} color={props.color} onClick={props.onClick}>
      {props.name}
    </ButtonStyled>
  );
};
