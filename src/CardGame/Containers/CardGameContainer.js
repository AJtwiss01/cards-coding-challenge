import React, { Component } from "react";
import { css } from "emotion";

import Card from "../components/Card";
import GameOver from "../components/GameOver";
import Button from "../components/Button";
/**
 *
 * This component receives a list of cards and handles the all state in the app.
 * It also shapes and passes data to the card list and game functions.
 *
 */
class CardGameContainer extends Component {
  // initializing state - (we dont care about prop updates except on new game)
  state = {
    cards: this.props.cards,
    firstCardFlipped: null,
    secondCardFlipped: null,
    isGameOver: false
  };

  isEveryCardMatched = () => {
    const { cards } = this.state;
    return cards.every(({ matched }) => matched);
  };

  updateMatchStatus = flippedCards => {
    const cardOneValue = flippedCards[0].value;
    const cardTwoValue = flippedCards[1].value;
    const cardOneIndex = flippedCards[0].index;
    const cardTwoIndex = flippedCards[1].index;
    const newCardList = this.state.cards.slice();
    let firstCard = { ...newCardList[cardOneIndex], flipped: false };
    let secondCard = { ...newCardList[cardTwoIndex], flipped: false };

    if (cardOneValue === cardTwoValue) {
      firstCard = { ...firstCard, matched: true };
      secondCard = { ...secondCard, matched: true };
    }
    newCardList[cardOneIndex] = firstCard;
    newCardList[cardTwoIndex] = secondCard;
    this.setState({
      cards: newCardList,
      firstCardFlipped: null,
      secondCardFlipped: null
    });
  };

  updateFlipCardStatus = id => {
    const { firstCardFlipped, secondCardFlipped, cards } = this.state;
    if (
      // if the first card hasn't been flipped
      firstCardFlipped === null
    ) {
      //create a object so we wont mutate the state
      const firstCard = { ...cards[id], flipped: true };
      const newCardList = cards.slice();
      newCardList[id] = firstCard;

      this.setState({
        cards: newCardList,
        firstCardFlipped: { ...firstCard, index: id }
      });
    } else if (
      firstCardFlipped !== null &&
      cards[id].code !== firstCardFlipped.code &&
      secondCardFlipped === null
    ) {
      const secondCard = { ...cards[id], flipped: true };
      const newCardList = cards.slice();
      newCardList[id] = secondCard;

      this.setState({
        cards: newCardList,
        secondCardFlipped: { ...secondCard, index: id }
      });
      /**
       *
       * handling a way for cards not to automaticaly flip over when there is not a match
       * could posibily have race conditions TD
       */
      setTimeout(() => {
        const { firstCardFlipped, secondCardFlipped } = this.state;
        if (firstCardFlipped !== null && secondCardFlipped !== null) {
          this.updateMatchStatus([firstCardFlipped, secondCardFlipped]);
        }
      }, 500);
    }
  };

  render() {
    const { gameSetup } = this.props;
    const { cards } = this.state;
    const isGameOver = this.isEveryCardMatched();

    return (
      <div className={classNames.containerStyle}>
        <div className={classNames.divMarginSpacing}>
          <Button onClick={gameSetup} dataTestid="New-Game">
            New Game
          </Button>
        </div>
        <div className={classNames.divWrapper}>
          {isGameOver ? (
            <GameOver />
          ) : (
            cards.map((singleCard, index) => (
              <Card
                id={index}
                value={singleCard.value}
                suit={singleCard.suit}
                key={singleCard.code}
                flipped={singleCard.flipped}
                matched={singleCard.matched}
                image={singleCard.image}
                updateFlipCardStatus={this.updateFlipCardStatus}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const classNames = {
  containerStyle: css`
    display: flex;
    flex-direction: column;
    width: 1140px;
    margin: 0 auto;
  `,
  divWrapper: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    margin: 0 auto;
  `,
  divMarginSpacing: css`
    display: flex;
    margin: 1em 0;
  `
};

export default CardGameContainer;
