import {render } from 'react-testing-library';
import React from 'react';
import 'jest-dom/extend-expect'
import Card from '../components/Card';

const id = 1
const value = 2
const suit = "HEARTS"
const flipped = true
const notFlipped = false 
const positionAltText = "position alt text"

describe('Cards', () => {
  it('Check if data-tesid is correct', () => {
    const {getByTestId} = render(<Card id={id} value={value} suit={suit} />);
    getByTestId('Card-2-HEARTS');
  })
  it('Check alt test of card not flipped', () => {
    const {getByAltText} = render(<Card id={id} value={value} suit={suit} flipped={flipped} positionAltText={positionAltText}/>);
     getByAltText('This card is the 2 of HEARTS');
  })
  it('Check alt test of Card flipped with card position', () => {
    const {getByAltText} = render(<Card id={id} value={value} suit={suit} flipped={notFlipped}/>);
     getByAltText('This Card is located in column 2 in row 1');
  })
});

