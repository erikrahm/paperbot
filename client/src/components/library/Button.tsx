import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils/constants";

const StyledButton = styled.button`
  background: ${Colors.white};
  border: 1px solid ${Colors.blue};
  border-radius: 4px;
  color: ${Colors.blue};
  padding: 8px 10px;
  cursor: pointer;

  &:hover {
    background: ${Colors.blue};
    color: ${Colors.white};
  }
`;

export type ButtonProps = {
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
};

const BaseButton: React.FC<ButtonProps> = ({ children, clickHandler }) => {
  return (
    <StyledButton type="button" onClick={clickHandler}>
      {children}
    </StyledButton>
  );
};

const Button: React.FC<ButtonProps> = ({ children, href, clickHandler }) => {
  const wrappedButton = href ? (
    <a href={href}>
      <BaseButton clickHandler={clickHandler}>{children}</BaseButton>
    </a>
  ) : (
    <BaseButton clickHandler={clickHandler}>{children}</BaseButton>
  );

  return <>{wrappedButton}</>;
};

export default Button;
