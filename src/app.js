import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./components/Container/Container";
import Row from "./components/Row/Row";
import friends from "./friends.json";


//function to shuffle the characters
function shuffleCharacters(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    winLose: "",
    clicked: []
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      winLose: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 15) {
      this.setState({ winLose: "You win! You're a cosmic wonder!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      winLose: "Try Again Earth Senshi!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledCharacters = shuffleCharacters(friends);
    this.setState({ friends: shuffledCharacters });
  };



  render() {
    return (

      <Wrapper>
        <Container>
          <Nav
            title="Clicky Game"
            score={this.state.currentScore}
            topScore={this.state.topScore}
            winLose={this.state.winLose}
          />
          <Title>Match the proper character to win</Title>

          <Row>

            {this.state.friends.map(friend => (
              <FriendCard
                key={friend.id}
                handleClick={this.handleClick}
                handleIncrement={this.handleIncrement}
                handleReset={this.handleReset}
                handleShuffle={this.handleShuffle}
                id={friend.id}
                image={friend.image}
              />
            ))}

          </Row>
        </Container>
      </Wrapper>

    );
  }
}

export default App;