import {render, Simulate, wait} from 'react-testing-library';
import React from 'react';
import 'jest-dom/extend-expect'
import Card from './Card';

const value = 2
const suit = "HEARTS"
const flipped = true
const notFlipped = false 

describe('Cards', () => {
  it('Check if data-tesid is correct', () => {
    const {getByTestId} = render(<Card value={value} suit={suit} />);
    getByTestId('Card-2-HEARTS');
  })
  it('Check alt test of Card flipped', () => {
    const {getByAltText} = render(<Card value={value} suit={suit} flipped={flipped}/>);
     getByAltText('This card is the 2 of HEARTS');
  })
  it('Check alt test of Card Not flipped', () => {
    const {getByAltText} = render(<Card value={value} suit={suit} flipped={notFlipped}/>);
     getByAltText('Card to Flip');
  })
});

