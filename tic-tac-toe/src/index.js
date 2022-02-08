import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Function component
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// React Component class (component type)
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
        nextPlayer: ['X', 'O'],
        currentStep: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStep + 1);
    const squares = history[history.length - 1].squares.slice()
    if (squares[i] || calculateWinner(squares))
      return;

    squares[i] = this.state.nextPlayer[0];

    let nextPlayerArray = this.state.nextPlayer.slice()
    nextPlayerArray.push(nextPlayerArray.shift())
    
    this.setState({
      // concat returns new array instead of mutating the original
      history: history.concat(
        [{squares: squares}]
      ),
      currentStep: history.length,
      nextPlayer: nextPlayerArray,
    });
  }

  jumpTo(step) {
    console.log(this.state.currentStep + ": " + step)

    const next = step % 2;
    let nextPlayerArray;
    if (next === 0)
      nextPlayerArray = ['x', 'o']
    else
      nextPlayerArray = ['o', 'x']

    this.setState({
      currentStep: step,
      nextPlayer: nextPlayerArray
    })
  }

  render() {
    const squares =  this.state.history[this.state.currentStep].squares;
    const nextPlayer = this.state.nextPlayer;

    const moves = this.state.history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })

    let status;
    const winner = calculateWinner(squares);
    if (winner == null  &&  isAnySquareAvailable(squares))
      status = 'It\'s a tie !';
    else if (winner == null)
      status = 'Next player: ' + nextPlayer[0];
    else
      status = 'Winner: ' + nextPlayer[1];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
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

function isAnySquareAvailable(squares) {
  if (squares)
    return (squares.includes(null) == false);
  return false;
}