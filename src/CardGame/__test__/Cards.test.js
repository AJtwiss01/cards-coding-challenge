import { render } from "react-testing-library";
import React from "react";
import "jest-dom/extend-expect";
import Card from "../components/Card";

const id = 1;
const value = 2;
const suit = "HEARTS";
const flipped = true;
const notFlipped = false;
const positionAltText = "position alt text";

describe("Cards", () => {
  const card = render(
    <Card id={id} value={value} suit={suit} flipped={notFlipped} />
  );
  it("it should have expect Card component data-testid='Card-1'", () => {
    expect(card.getByTestId("Card-1")).toBeTruthy();
  });
  it("it should have expect Card component img alt='This card is the 2 of HEARTS'", () => {
    const flippedCard = render(
      <Card
        id={id}
        value={value}
        suit={suit}
        flipped={flipped}
        positionAltText={positionAltText}
      />
    );
    expect(
      flippedCard.getByAltText("This card is the 2 of HEARTS")
    ).toBeTruthy();
  });
  it("it should expect Card components position of column=2 and row=1", () => {
    expect(card.getByAltText("Card position of column 2 in row 1"));
  });
});
