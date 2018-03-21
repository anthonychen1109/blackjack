import React, { Component } from 'react';
import axios from 'axios';

class Dealer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw: true,
      cards: [],
      suit: [],
      total: 0
    };
    this.bust = this.bust.bind(this);
  }

  draw_card(deck_id) {
    axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    .then(response => {
      if (isNaN(response.data.cards[0].value)) {
        this.setState({
          cards: [...this.state.cards, 10],
          total: this.state.total + 10
        })
      } else if(response.data.cards[0].value === "ACE"){
        console.log("ace");
      } else {
        this.setState({
          cards: [...this.state.cards, parseInt(response.data.cards[0].value, 10)],
          total: this.state.total + parseInt(response.data.cards[0].value, 10)
        })
      }
      this.setState({ suit: [...this.state.suit, response.data.cards[0].suit]})
    })
  }

  bust() {
    alert('Bust!')
  }

  render() {
    return (
      <div>
        <h1>Dealer</h1>
          <div>
            <p>{this.state.cards}</p>
            <p>Total: {this.state.total}</p>
            {this.state.total < 21?
              <div className="card-buttons">
                <button
                  className="btn btn-success"
                  onClick={() => this.draw_card(this.props.deckID)}
                >
                Hit
                </button>
                <button className="btn btn-danger">Stand</button>
              </div> : <div>BUST</div>
            }
          </div>
      </div>
    );
  }
}

export default Dealer;
