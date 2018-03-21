import React, { Component } from 'react';
import axios from 'axios';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  }

  draw_card(deck_id) {
    axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    .then(response => {
      if (isNaN(response.data.cards[0].value)) {
        this.setState({ cards: [...this.state.cards, 10]})
      } else if(response.data.cards[0].value === "ACE"){
        console.log("ace");
      } else {
        this.setState({ cards: [...this.state.cards, parseInt(response.data.cards[0].value, 10)]})
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Player</h1>
        <button
          onClick={() => this.draw_card(this.props.deckID)}
          >
          Draw
        </button>
      </div>
    );
  }
}

export default Player;
