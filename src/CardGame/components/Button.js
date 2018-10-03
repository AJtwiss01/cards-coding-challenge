import React from "react";

const Button = ({ onClick, children, dataTestid }) => (
  <button onClick={onClick} data-testid={dataTestid}>
    {children}
  </button>
);

export default Button;
