import React, { Component } from "react";
import axios from "axios";

import CardGameContainer from "./Containers/CardGameContainer";
import Loader from "./components/Loader/Loader";

/**
 *
 * This component handles data fetching and pasing the list of cards to the game container.
 *
 */
class App extends Component {
  state = {
    cards: [],
    loading: false
  };

  componentDidMount() {
    this.gameSetup();
  }

  gameSetup = () => {
    this.setState({
      loading: true
    });

    /**
     *
     * Creates a delay for user experience.
     * There are great libraries for this, but I decided not to import for such a lightweight app.
     *
     */
    setTimeout(() => {
      axios
        .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => {
          const cards = res.data.cards.map(card => {
            return { ...card, flipped: false, matched: false };
          });
          this.setState({
            cards,
            loading: false
          });
        });
    }, 1000);
  };

  render() {
    const { cards, loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    return <CardGameContainer gameSetup={this.gameSetup} cards={cards} />;
  }
}

export default App;
