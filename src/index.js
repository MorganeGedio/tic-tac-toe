import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      // passing a function as the onClick prop
      <button 
        className="square"
        // re-render Square whenever button is clicked 
        onClick={() =>
          this.props.onClick() }
      >
          {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // store state in Board component - when Board's state changes, Square components re-render automatically (= controlled components)
  constructor(props) {
    super(props);
    // initial state = array of 9 nulls corresponding to 9 squares
    this.state = {
      squares: Array(9).fill(null),
    }
  }

  handleClick(i) {
    // create a copy of the squares array
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    // passing a prop called value in child component Square
    // instruct each individual Square about its current value
    return (
      <Square 
        // props 1 
        value={this.state.squares[i]} 
        // props 2
        // passing a function from Board to Square
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
