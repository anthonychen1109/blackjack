import React, { Component } from 'react';
import axios from 'axios';

// Components
import Dealer from './dealer';
import Player from './player';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckID: ''
    };
  }


  componentDidMount() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => this.setState({ deckID: response.data.deck_id }));
  }

  render() {
    return (
      <div className="app">
        <div className="dealer">
          <Dealer deckID = {this.state.deckID}/>
        </div>
        <div className="player">
          <Player deckID = {this.state.deckID}/>
        </div>
      </div>
    )
  }
}

export default App;
