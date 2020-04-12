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
  // // store state in Board component - when Board's state changes, Square components re-render automatically (= controlled components)
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   }
  // }

  renderSquare(i) {
    // passing a prop called value in child component Square
    // instruct each individual Square about its current value
    return (
      <Square 
        // props 1 
        value={this.props.squares[i]} 
        // props 2
        // passing a function from Board to Square
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  // we want this component to display list of past moves
  // gives Game component full control over the Board’s data
  // & lets it instruct the Board to render previous turns from the history
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        // initial state = array of 9 nulls corresponding to 9 squares
        squares: Array(9).fill(null),
      }],
      // state to indicate which step we're currently viewing
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    // if going back in point and making a new move from this point, we need to delete all future incorrect history
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    // create a copy of the squares array
    const squares = current.squares.slice();
    // return early - ignore click if winner or square filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // flip value of xIsNext
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      // concat does not mutate original array 
      history: history.concat([{
      squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    // render currently selected move according to stepNumber
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // map history of moves to React elements representing buttons
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move : 
        'Go to game start';
      return (
        // for each move => list item that contains a button with on click handler
        // key to differentiate each list item from its siblings
        <li key={move}> 
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status; 
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
