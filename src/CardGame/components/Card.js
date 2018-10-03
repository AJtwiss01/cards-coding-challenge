import React from "react";
import { css } from "emotion";

/**
 *
 * Function is called on event and turns it in to a onEnter
 *
 */
const enhanceFunctionWithOnEnter = cb => event => {
  if (event.key === "Enter") {
    cb(event);
  }
};

/**
 *
 * Creates Postions for cards to give descriptions in Alt test for Accesibility
 *
 */
const getCardPositionAltText = id => {
  const row = Math.floor(id / 13) + 1;
  const column = (id % 13) + 1;
  return `Card position of column ${column} in row ${row}`;
};

const Card = ({
  id,
  value,
  suit,
  flipped,
  matched,
  image,
  updateFlipCardStatus
}) => {
  /**
   *
   * Passes id of card click up to Card Game Container
   *
   */
  const handleFlipClick = event => {
    event.preventDefault();
    updateFlipCardStatus(id);
  };

  const positionAltText = getCardPositionAltText(id);

  return (
    <img
      onKeyPress={enhanceFunctionWithOnEnter(handleFlipClick)}
      alt={flipped ? `This card is the ${value} of ${suit}` : positionAltText}
      tabIndex="0"
      src={flipped ? image : "../assets/playing-card-back.png"}
      id={id}
      data-testid={`Card-${id}`}
      onClick={matched ? e => e.preventDefault() : handleFlipClick}
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
