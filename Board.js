function Board() {
  this.grid = []
  for (var x = 0; x < 4; x++) {
    this.grid.push([])
    for (var y = 0; y < 4; y++) {
      this.grid[x].push([])
    }
  }
  this.white = true
  this.accepted = false
}

Board.prototype.addPiece = function(x, y) {
  this.accepted = false
  if (this.grid[x][y].length < 4) {
    this.grid[x][y].push(this.white ? "W" : "B")
    this.white = !this.white
    this.accepted = true
  }
}

Board.prototype.undo = function(x, y) {
  this.grid[x][y].pop()
  this.white = !this.white
}

Board.prototype.isLastMoveWin = function(x, y, color) {
  var z = this.grid[x][y].length - 1
  // var color = this.grid[x][y][z]
  if (this.horizontalX(x, z, color)) return true;
  if (this.horizontalY(y, z, color)) return true;
  if (z === 3) {
    if (this.vertical(x, y, color)) return true
  }
  if (y === z) {
    if (this.diagnolX(x, z, color, true)) return true
  }
  if (y === (3-z)) {
    if (this.diagnolX(x, z, color, false)) return true
  }
  if (x === z) {
    if (this.diagnolY(y, z, color, true)) return true
  }
  if (x === (3-z)) {
    if (this.diagnolY(y, z, color, false)) return true
  }
  if (x === y) {
    if (this.diagnolFlat(z, color, true)) return true
    if (x === z) {
      if (this.diagnolDiagnol(color, 0)) return true
    }
    if (x === (3-z)) {
      if (this.diagnolDiagnol(color, 1)) return true
    }
  }
  if (x === (3-y)) {
    if (this.diagnolFlat(z, color, false)) return true
    if (x === z) {
      if (this.diagnolDiagnol(color, 2)) return true
    }
    if (x === (3-z)) {
      if (this.diagnolDiagnol(color, 3)) return true
    }
  }
  return false
}

Board.prototype.horizontalX = function(x, z, color) {
  for (var y = 0; y < 4; y++) {
    if (this.grid[x][y][z] !== color) {
      return false
    }
  }
  return true
}

Board.prototype.horizontalY = function(y, z, color) {
  for (var x = 0; x<4; x++) {
    if (this.grid[x][y][z] !== color) {
      return false
    }
  }
  return true
}

Board.prototype.diagnolX = function(x, z, color, up) {
  if (up) {
    for (var i = 0; i < 4; i++) {
      if (this.grid[x][i][i] !== color) {
        return false
      }
    }
    return true
  } else {
    for (var i = 0; i < 4; i++) {
      if (this.grid[x][i][3-i] !== color) {
        return false
      }
    }
    return true
  }
}



Board.prototype.diagnolY = function(y, z, color, right) {
  if (right) {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][y][i] !== color) {
        return false
      }
    }
    return true
  } else {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][y][3-i] !== color) {
        return false
      }
    }
    return true
  }
}



Board.prototype.vertical = function(x, y, color) {
  for (var z = 0; z < 4; z++) {
    if (this.grid[x][y][z] !== color) {
      return false
    }
  }
  return true
}

Board.prototype.diagnolFlat  = function(z, color, pos) {
  // pos slope on x, y axis
  if (pos) {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][i][z] !== color) {
        return false
      }
    }
    return true
  } else {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][3-i][z] !== color) {
        return false
      }
    }
    return true
  }
}

Board.prototype.diagnolDiagnol = function(color, dir) {
  // positive slope on x, y plane, positive slope on x, z plane
  if (dir === 0) {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][i][i] !== color) {
        return false
      }
    }
    return true

  //positive slope on x, y plane, negaitive slope on x, z plane
  } else if (dir === 1) {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][i][3-i] !== color) {
        return false
      }
    }
    return true
  // negative slope on x, y plane, positive slope on x, z plane
  } else if (dir === 2) {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][3-i][i] !== color) {
        return false
      }
    }
    return true
  // neg slope on x, y plane, neg slope on x, z plane
  } else {
    for (var i = 0; i < 4; i++) {
      if (this.grid[i][3-i][3-i] !== color) {
        return false
      }
    }
    return true
  }
}

module.exports = Board;
