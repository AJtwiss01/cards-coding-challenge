import React from "react";
import { css } from "emotion";

const enhanceFunctionWithOnEnter = cb => event => {
  if (event.key === "Enter") {
    cb(event);
  }
};

const getCardPositionAltText = id => {
  const row = Math.floor(id / 13) + 1;
  const column = (id % 13) + 1;
  return `This Card is located in column ${column} in row ${row}`;
};

const lockCardsClick = matched => matched;

const Card = ({
  id,
  value,
  suit,
  code,
  flipped,
  matched,
  image,
  updateFlipCardStatus
}) => {
  const handleFlipClick = event => {
    event.preventDefault();
    updateFlipCardStatus(id);
  };

  const positionAltText = getCardPositionAltText(id);
  const lockCardClick = lockCardsClick(matched);
  return (
    <img
      onKeyPress={enhanceFunctionWithOnEnter(handleFlipClick)}
      alt={flipped ? `This card is the ${value} of ${suit}` : positionAltText}
      tabIndex="0"
      src={flipped ? image : "../assets/playing-card-back.png"}
      id={id}
      key={code}
      data-testid={`Card-${id}`}
      onClick={lockCardClick ? e => e.preventDefault() : handleFlipClick}
      className={matched ? classNames.isHidden : classNames.isShowing}
      width="86px"
    />
  );
};
const classNames = {
  isHidden: css`
    visibility: hidden;
    cursor: none;
  `,
  isShowing: css`
    cursor: pointer;
  `
};

export default Card;
