var Board = require('./Board.js');
var prompt = require('prompt')

var board = new Board()


var depthLen = 5

var moves = {}

function miniMax(depth) {
  var white = board.white;
  var moves = undefined;
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      board.addPiece(x, y)
      if (board.accepted) {
        if (board.isLastMoveWin(x, y, white ? "W" : "B")) {
          board.undo(x, y)
          if (depth === depthLen) {
            return [x, y]
          }
          return white ? 1 : -1
        } else if (depth > 0){
          moves = moves || {}
          // moves[getCoords(x, y)] = () => {return miniMax(depth-1)}
          moves[getCoords(x, y)] = miniMax(depth-1)
        } else {
          board.undo(x, y)
          return 0
        }
        board.undo(x, y)
      }
    }
  }
  if (moves !== undefined) {
    // for (var coord in moves) {
    //   moves[coord] = moves[coord]()
    // }
    var coords = getCoords(getMove(moves, white))
    if (depth === depthLen) {
      return coords
    }
    return moves[getMove(moves, white)]
  }
}

function getCoords(x_n, y) {
  if (y !== undefined) {
    return y*10+x_n
  } else {
    return [x_n%10, Math.floor(x_n/10)]
  }
}

function getMove(moves, white) {
  var result;
  if (white) {
    var max = -2
    for (var coord in moves) {
      if (moves[coord] === 1) {
        return coord
      } else if (moves[coord] > max) {
        result = coord
        max = moves[coord]
      }
    }
    return result
  } else {
    var min = 2
    for (var coord in moves) {
      if (moves[coord] === -1) {
        return coord
      } else if (moves[coord] < min) {
        result = coord
        min = moves[coord]
      }
    }
    return result
  }
}

prompt.start()

var schema = {
  properties: {
    name: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    password: {
      hidden: true
    }
  }
};

var color;
var possibleVals = [0,1,2,3]
function commandLineGame(AI_turn) {
  if (AI_turn) {
    var AI_move = miniMax(depthLen)
    color = board.white ? "W" : "B"
    board.addPiece(AI_move[0],AI_move[1])
    console.log("AI_MOVE: ", AI_move)
    console.log("color: ", color, "\n")
    if (!board.isLastMoveWin(AI_move[0], AI_move[1], color)) {
      commandLineGame(false)
    } else {
      console.log("AI WINS!!!")
      prompt.stop()
    }
  } else {
    prompt.get([{
      name: "X",
      require: true,
      description: "Your turn!\nX-value: ",
      type: "number"
    ,
  }, {
    name: "Y",
    description: "Your turn!\nY-value: ",
    require: true,
    type: "number"
  }], function (err, result) {
      console.log('Command-line input received:');
      console.log('  X: ' + result["X"]);
      console.log('  Y: ' + result["Y"]);
      if (possibleVals.includes(result["X"]) && possibleVals.includes(result["Y"])) {
        color = board.white ? "W" : "B"
        console.log("color: ", color, '\n')
        board.addPiece(result["X"], result["Y"])
        if (!board.isLastMoveWin(result["X"], result["Y"], color)) {
          commandLineGame(true)
        } else {
          console.log("YOU WIN!!!")
          prompt.stop()
        }
      } else {
        console.log("ERROR X and Y must be real number between 0 and 3 (inclusive)")
        commandLineGame(false)
      }
    });
  }
}

commandLineGame(false)

// prompt.stop()





// var win;
//
// board.addPiece(0, 0)
// win = board.isLastMoveWin(0, 0)
// console.log('1: ', board, board.grid[0], 'win: ', win)
// //
// board.addPiece(0, 2)
// win = board.isLastMoveWin(0, 2)
// console.log('2: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(2, 2)
// win = board.isLastMoveWin(2, 2)
// console.log('3: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(3, 3)
// win = board.isLastMoveWin(3, 3)
// console.log('4: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(2, 3)
// win = board.isLastMoveWin(2, 3)
// console.log('5: ', board, board.grid[0], 'win: ', win)
// //
// board.addPiece(0, 3)
// win = board.isLastMoveWin(0, 3)
// console.log('6: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(3, 0)
// win = board.isLastMoveWin(3, 0)
// console.log('7: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(0, 1)
// win = board.isLastMoveWin(0, 1)
// console.log('7: ', board, board.grid[0], 'win: ', win)
//
// // board.addPiece(0, 1)
// // win = board.isLastMoveWin(0, 1)
// // console.log('7: ', board, board.grid[0], 'win: ', win)
//
//
//
// console.log('result from miniMax: ', miniMax(depthLen))
// board.addPiece(2, 0)
// console.log('result from miniMax: ', miniMax(depthLen))


//
// board.addPiece(3, 3)
// win = board.isLastMoveWin(3, 3)
// console.log('8: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(0, 0)
// win = board.isLastMoveWin(0, 0)
// console.log('9: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(3, 3)
// win = board.isLastMoveWin(3, 3)
// console.log('10: ', board, board.grid[0], 'win: ', win)
//
// board.addPiece(3, 3)
// win = board.isLastMoveWin(3, 3)
// console.log('11: ', board, board.grid[0], 'win: ', win)
