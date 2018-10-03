import { render, cleanup, fireEvent } from "react-testing-library";
import React from "react";
import CardGameContainer from "../Containers/CardGameContainer";

afterEach(cleanup);
const cards = [
  {
    code: "7C",
    flipped: false,
    image: "https://deckofcardsapi.com/static/img/7C.png",
    images: "",
    png: "https://deckofcardsapi.com/static/img/7C.png",
    svg: "https://deckofcardsapi.com/static/img/7C.svg",
    matched: false,
    suit: "CLUBS",
    value: "7"
  }
];
test("it should expect button to be clicked once", () => {
  const gameSetup = jest.fn();
  const { getByText } = render(
    <CardGameContainer cards={cards} gameSetup={gameSetup} />
  );
  fireEvent.click(getByText("New Game"));
  expect(gameSetup).toHaveBeenCalledTimes(1);
});
