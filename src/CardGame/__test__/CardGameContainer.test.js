import {render, cleanup, fireEvent} from 'react-testing-library'
import React from 'react';
import CardGameContainer from '../CardGameContainer';

// don't forget to clean up the document.body
afterEach(cleanup)
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
]
test('click button by text element ', () => {
  const gameSetup = jest.fn()
  const {getByText} = render(<CardGameContainer cards={cards} gameSetup={gameSetup}><button onClick={gameSetup} >New Game</button></CardGameContainer>)
  fireEvent.click(getByText('New Game'))
  expect(gameSetup).toHaveBeenCalledTimes(1)
})

