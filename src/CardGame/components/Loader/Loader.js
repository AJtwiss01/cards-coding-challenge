import React from "react";
import { css } from "emotion";
import "./loader.css";

const Loader = () => {
  return <div className={`loader ${classNames.loaderDiv}`} />;
};

const classNames = {
  loaderDiv: css`
    display: flex;
    justify-content: center;
    margin: 30 auto;
  `
};
export default Loader;
