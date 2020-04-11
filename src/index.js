import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// FUNCTION COMPONENT
// contains only a render & doesn't have their own state
function Square(props) {
  return (
    // passing a function as the onClick prop
    <button 
    className="square"
    // re-render Square whenever button is clicked 
    onClick={props.onClick}>
      {props.value}
  </button>
);
}
 
// REACT COMPONENT CLASS
class Board extends React.Component {
  // store state in Board component - when Board's state changes, Square components re-render automatically (= controlled components)
  constructor(props) {
    super(props);
    // initial state = array of 9 nulls corresponding to 9 squares
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    // create a copy of the squares array
    const squares = this.state.squares.slice();
    // return early - ignore click if winner or square filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // flip value of xIsNext
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
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
    const winner = calculateWinner(this.state.squares);
    let status; 
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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

// helper function to determine the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
