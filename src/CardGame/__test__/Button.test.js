import { render, cleanup, fireEvent } from "react-testing-library";
import React from "react";
import "jest-dom/extend-expect";
import Button from "../components/Button";

afterEach(cleanup);

test("it should expect button to be clicked once", () => {
  const gameSetup = jest.fn();
  const testID = "New-Game";
  const { getByText } = render(
    <Button onClick={gameSetup} dataTestid={testID}>
      New Game
    </Button>
  );
  fireEvent.click(getByText("New Game"));
  expect(gameSetup).toHaveBeenCalledTimes(1);
});
