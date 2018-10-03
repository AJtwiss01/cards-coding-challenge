import React, { Component } from "react";
import axios from "axios";

import CardGameContainer from "./CardGameContainer";
import Loader from "./components/Loader";

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
