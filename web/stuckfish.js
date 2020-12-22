/* The stuckfish emojichess engine */

var PIECE_CIV = {
  /* bugs */
  "S":"bugs",
  "A":"bugs",
  "B":"bugs",
  "b":"bugs",
  "C":"bugs",
  "s":"bugs",
  "c":"bugs",
  
  /* smileys */
  "P":"smileys",
  "N":"smileys",
  "p":"smileys",
  "R":"smileys",
  "Q":"smileys",
  "K":"smileys",
  
  /* birds */
  "v":"birds",
  "x":"birds",
  "V":"birds",
  "f":"birds",
  "k":"birds",
  
  /* people */
  "0":"people",
  "1":"people",
  "2":"people",
  "3":"people",
  "4":"people",
  "5":"people",
  
  /* clothes */
  "l":"clothes",
  "m":"clothes",
  "o":"clothes",
  "g":"clothes",
  
  /* vehicles */
  "T":"vehicles",
  "O":"vehicles",
  "F":"vehicles",
  "#":"vehicles",
  "@":"vehicles",
  "|":"vehicles",
  
  /* Smileys 2 */
  "y":"smileys2",
  "u":"smileys2",
  "G":"smileys2",
  "E":"smileys2",
  "e":"smileys2",
  
  /* sounds */
  "U":"sounds",
  "W":"sounds",
  "X":"sounds",
  "L":"sounds",
}

var PATTERN_BISHOP = [[1,1],[-1,-1],[1,-1],[-1,1]];
var PATTERN_ALLDIR = [[1,1],[-1,-1],[1,-1],[-1,1],
                      [1,0],[0,1],[-1,0],[0,-1]];
var PATTERN_ROOK = [[1,0],[0,1],[-1,0],[0,-1]];
var PATTERN_KNIGHT = [[2,1],[-2,1],[2,-1],[-2,-1],
                      [1,2],[-1,2],[1,-2],[-1,-2]];
var PATTERN_FAR_KNIGHT = [[3,1],[-3,1],[3,-1],[-3,-1],
                      [1,3],[-1,3],[1,-3],[-1,-3]];
var PATTERN_KNIGHT_BISHOP = [[2,1],[-2,1],[2,-1],[-2,-1],
                             [1,2],[-1,2],[1,-2],[-1,-2],
                             [1,1],[-1,-1],[1,-1],[-1,1]];
var PATTERN_KNIGHT_BISHOP_ROOK = [[2,1],[-2,1],[2,-1],[-2,-1],
                             [1,2],[-1,2],[1,-2],[-1,-2],
                             [1,1],[-1,-1],[1,-1],[-1,1],
                             [1,0],[0,1],[-1,0],[0,-1]];
var PATTERN_LEFT_RIGHT_BISHOP = [[1,0],[-1,0],
                                 [1,1],[1,-1],[-1,1],[-1,-1]];
var PATTERN_UP_DOWN_BISHOP = [[0,1],[0,-1],
                              [1,1],[1,-1],[-1,1],[-1,-1]];
var PATTERN_PAWN = [[0,1]];
var PATTERN_PAWN_CAP =[[1,1],[-1,1]];

var BUGS_START_1 = "AASSSSAA";
var BUGS_START_0 = "csBCbBsc";
var SMILEYS_START_1 = "PPPPPPPP";
var SMILEYS_START_0 = "RNpQKpNR";
var BIRDS_START_1 = "VVVVVVVV";
var BIRDS_START_0 = "vxvfkvxv";
var PEOPLE_START_1 = "00000000";
var PEOPLE_START_0 = "32145213";
var CLOTHES_START_1 = "llllllll";
var CLOTHES_START_0 = "mmmogmmm";
var VEHICLES_START_1 = "TTTTTTTT";
var VEHICLES_START_0 = "FO#@|#OF";
var SMILEYS2_START_1 = "yyyyyyyy";
var SMILEYS2_START_0 = "yGuEeuGy";


var CIVSTARTS = {
  "bugs":[BUGS_START_0, BUGS_START_1],
  "smileys":[SMILEYS_START_0, SMILEYS_START_1],
  "birds":[BIRDS_START_0, BIRDS_START_1],
  "people":[PEOPLE_START_0, PEOPLE_START_1],
  "clothes":[CLOTHES_START_0, CLOTHES_START_1],
  "vehicles":[VEHICLES_START_0, VEHICLES_START_1],
  "smileys2":[SMILEYS2_START_0, SMILEYS2_START_1],
};

var PIECE_MOVEMENT = {
  /* bugs */
  "S":[[1,0],[0,1],[-1,0]],
  "A":[[1,1],[-1,1]],
  "B":[[1,0],[0,1],[-1,0],[0,-1]],
  "b":[[1,0],[0,1],[1,1],[-1,-1],
       [-1,0],[0,-1],[-1,1],[1,-1]],
  "C":[[2,1],[2,-1],[-2,1],[-2,-1],
       [1,2],[-1,2],[1,-2],[-1,-2],
       [4,0],[0,4],[0,-4],[-4,0]],
  "s":[[1,0],[0,1],[1,1],[-1,-1],
       [-1,0],[0,-1],[-1,1],[1,-1]],
  "c":[[1,1],[-1,1],[1,-1],[-1,-1]],
  
  /* smileys */
  "P":[[0,1]],
  "N":PATTERN_KNIGHT,
  "p":PATTERN_BISHOP,
  "R":PATTERN_ROOK,
  "Q":PATTERN_ALLDIR,
  "K":PATTERN_ALLDIR,
  
  /* birds */
  "v":PATTERN_ROOK,
  "x":PATTERN_KNIGHT,
  "V":PATTERN_PAWN,
  "f":PATTERN_ALLDIR,
  "k":PATTERN_ALLDIR,
  
  /* people */
  "0":PATTERN_PAWN,
  "1":PATTERN_ALLDIR,
  "2":PATTERN_ALLDIR,
  "3":PATTERN_BISHOP,
  "4":PATTERN_KNIGHT_BISHOP,
  "5":PATTERN_KNIGHT,
  
  /* clothes */
  "l":PATTERN_PAWN,
  "m":PATTERN_KNIGHT,
  "o":PATTERN_ALLDIR,
  "g":PATTERN_ALLDIR,
  
  /* vehicles */
  "T":PATTERN_PAWN,
  "O":PATTERN_ROOK,
  "F":PATTERN_BISHOP,
  "#":PATTERN_KNIGHT_BISHOP_ROOK,
  "@":PATTERN_ROOK,
  "|":PATTERN_ALLDIR,
  
  /* Smileys 2 */
  "y":PATTERN_PAWN,
  "u":PATTERN_LEFT_RIGHT_BISHOP,
  "G":PATTERN_UP_DOWN_BISHOP,
  "E":PATTERN_ALLDIR,
  "e":PATTERN_ROOK,
  
  /* sounds */
  "U":PATTERN_PAWN,
  "W":PATTERN_FAR_KNIGHT,
  "X":PATTERN_ALLDIR,
  "L":PATTERN_ALLDIR,
}

var PIECE_RANGE = {
  /* vehicles */
  "T":1,
  "F":8,
  "O":8,
  "#":1,
  "@":8,
  "|":1,
  
  /* bugs */
  "S":1,
  "A":1,
  "B":8,
  "b":2,
  "C":1,
  "s":1,
  "c":8,
  
  /* smileys */
  "P":1,
  "N":1,
  "p":8,
  "R":8,
  "Q":8,
  "K":1,
  
  /* birds */
  "v":3,
  "x":1,
  "V":1,
  "f":8,
  "k":1,
  
  /* people */
  "0":1,
  "1":2,
  "2":4,
  "3":8,
  "4":1,
  "5":1,
  
  /* clothes */
  "l":1,
  "m":1,
  "o":8,
  "g":8,
  
  /* Smileys 2 */
  "y":1,
  "u":8,
  "G":8,
  "E":1,
  "e":1,
  
  /* sounds */
  "U":1,
  "W":1,
  "X":8,
  "L":3,
}

var PROMOTIONS = {
  "vehicles":"@",
  "bugs":"C",
  "smileys":"Q",
  "birds":"f",
  "clothes":"o",
  "people":"4",
  "smileys2":"E",
  "sounds":"X",
}

var PIECE_TIER = {
  /* vehicles */
  "T":0,
  "F":1,
  "O":1,
  "#":1,
  "@":2,
  "|":3,
  
  /* bugs */
  "S":0,
  "A":0,
  "B":1,
  "b":3,
  "C":2,
  "s":1,
  "c":1,
  
  /* smileys */
  "P":0,
  "N":1,
  "p":1,
  "R":1,
  "Q":2,
  "K":3,
  
  /* birds */
  "V":0,
  "v":1,
  "f":2,
  "k":3,
  "x":1,
  
  /* people */
  "0":0,
  "1":1,
  "2":1,
  "3":1,
  "4":2,
  "5":3,
  
  /* clothes */
  "l":0,
  "m":1,
  "o":2,
  "g":3,
  
  /* Smileys 2 */
  "y":0,
  "u":1,
  "G":1,
  "E":2,
  "e":3,
  
  /* sounds */
  "U":0,
  "W":1,
  "X":2,
  "L":3,
}

var PIECE_CAPTURE = {
  /* vehicles */
  "T":PATTERN_PAWN_CAP,
  "O":PATTERN_BISHOP,
  "F":PATTERN_ROOK,
  "#":PATTERN_KNIGHT_BISHOP_ROOK,
  "@":PATTERN_ROOK,
  "|":PATTERN_ALLDIR,
  
  /* bugs */
  "S":[[1,1],[-1,1]],
  "A":[[0,1]],
  "B":[[1,0],[0,1],[-1,0],[0,-1]],
  "b":[[1,0],[0,1],[1,1],[-1,-1],
       [-1,0],[0,-1],[-1,1],[1,-1]],
  "C":[[2,1],[2,-1],[-2,1],[-2,-1],
       [1,2],[-1,2],[1,-2],[-1,-2]],
  "s":[[1,0],[0,1],[1,1],[-1,-1],
       [-1,0],[0,-1],[-1,1],[1,-1],
       [2,0],[0,2],[0,-2],[-2,0]],
  "c":[[1,1],[-1,1],[1,-1],[-1,-1]],
  
  /* smileys */
  "P":[[1,1],[-1,1]],
  "N":PATTERN_KNIGHT,
  "p":PATTERN_BISHOP,
  "R":PATTERN_ROOK,
  "Q":PATTERN_ALLDIR,
  "K":PATTERN_ALLDIR,
  
  /* birds */
  "v":PATTERN_ROOK,
  "x":PATTERN_KNIGHT,
  "V":PATTERN_PAWN_CAP,
  "f":PATTERN_ALLDIR,
  "k":PATTERN_ALLDIR,
  
  /* people */
  "0":PATTERN_PAWN_CAP,
  "1":PATTERN_ALLDIR,
  "2":PATTERN_BISHOP,
  "3":PATTERN_BISHOP,
  "4":PATTERN_KNIGHT_BISHOP,
  "5":PATTERN_KNIGHT,
  
  /* clothes */
  "l":PATTERN_PAWN_CAP,
  "m":PATTERN_KNIGHT,
  "o":PATTERN_ALLDIR,
  "g":PATTERN_ALLDIR,
  
  /* Smileys 2 */
  "y":PATTERN_PAWN_CAP,
  "u":PATTERN_LEFT_RIGHT_BISHOP,
  "G":PATTERN_UP_DOWN_BISHOP,
  "E":PATTERN_ALLDIR,
  "e":PATTERN_BISHOP,
  
  /* sounds */
  "U":PATTERN_PAWN,
  "W":PATTERN_FAR_KNIGHT,
  "X":PATTERN_ALLDIR,
  "L":PATTERN_ALLDIR,
}

function analyse (b2d, alpha_civ, beta_civ) {
  var moves = {};
  moves[alpha_civ] = [];
  moves[beta_civ] = [];
  
  var materials = {};
  materials[alpha_civ] = 0;
  materials[beta_civ] = 0;
  
  var gardez = {};
  gardez[alpha_civ] = false;
  gardez[beta_civ] = false;
  
  var attackedMaps = {};
  attackedMaps[alpha_civ] = zeroes(64);
  attackedMaps[beta_civ] = zeroes(64);
  
  var attackerMaps = {};
  attackerMaps[alpha_civ] = zeroes(64);
  attackerMaps[beta_civ] = zeroes(64);
  
  var attackerValueMap = zeroes(64, 1000);
  
  var defendedMaps = {};
  defendedMaps[alpha_civ] = zeroes(64);
  defendedMaps[beta_civ] = zeroes(64);
  
  var moveCounts = {};
  moveCounts[alpha_civ] = 0;
  moveCounts[beta_civ] = 0;
  
  var dead = {};
  dead[alpha_civ] = true;
  dead[beta_civ] = true;
  
  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      var piece = b2d[y][x];
      var idx = y*8 + x;
      
      if (piece == " ") 
        continue;
      
      var civ = PIECE_CIV[piece];
      var tier = PIECE_TIER[piece];
      var value = (2.5*tier)+1;
      
      if (tier == 3) {
        dead[civ] = false;
      }
      
      materials[civ] += (2.5*tier)+1;
      
      var t0dir = 1;
      if (alpha_civ == civ) {
        t0dir = -1;
      } else if (beta_civ == civ) {
        t0dir = 1;
      } else {
        alert("Something went horribly wrong: " + civ);
      }
      
      var ptrn_move = PIECE_MOVEMENT[piece];
      var ptrn_cap = PIECE_CAPTURE[piece];
      var range = PIECE_RANGE[piece];
      
      if (tier == 0) {
        ptrn_move = ptrn_move.slice();
        ptrn_cap = ptrn_cap.slice();
        
        for(var i = 0; i < ptrn_move.length; i++) {
          ptrn_move[i] = ptrn_move[i].slice();
          ptrn_move[i][1] *= t0dir;
        }
        
        for(var i = 0; i < ptrn_cap.length; i++) {
          ptrn_cap[i] = ptrn_cap[i].slice();
          ptrn_cap[i][1] *= t0dir;
        }
      }
      
      for(var i = 0; i < ptrn_move.length; i++) {
        for(var dr = 1; dr <= range; dr++) {
          
          var ty = y + ptrn_move[i][1]*dr;
          var tx = x + ptrn_move[i][0]*dr;
          
          if (ty <  0 || tx < 0 || ty >= 8 || tx >= 8)
            break; // out of board
          
          if (b2d[ty][tx] != " ") {
             
            break; // not empty, can't move to
          }
          
          moveCounts[civ] += 1;
  
          moves[civ].push([tx,ty, false, piece, x, y]);
        }
      }
      
      for(var i = 0; i < ptrn_cap.length; i++) {
        for(var dr = 1; dr <= range; dr++) {
          var ty = y + ptrn_cap[i][1]*dr;
          var tx = x + ptrn_cap[i][0]*dr;
          
          var idx_ = ty*8 + tx;
          
          if (ty <  0 || tx < 0 || ty >= 8 || tx >= 8)
            break; // out of board
          
          //console.log(ty,tx, ptrn_cap[i], piece);
          
          if (b2d[ty][tx] != " ") {
            var piece_ = b2d[ty][tx];
            var civ_ = PIECE_CIV[piece_];
            
            if (civ_ == civ) {
              defendedMaps[civ][idx_] += 1;
              break; // can't capture own pieces
            }
            
                      
            moves[civ].push([tx,ty, true, piece, x, y]);
            
            attackedMaps[civ_][idx_] += 1;
            attackerMaps[civ][idx] += 1;
            

            attackerValueMap[idx_] = Math.min(attackerValueMap[idx], value);
            
            if (PIECE_TIER[piece_] == 3) {
                gardez[civ_] = true;
            }
            break; // and done
          }
        }
      }
    }
  }
  
  var scores = {};
  scores[alpha_civ] = 0;
  scores[beta_civ] = 0;
  
  scores[alpha_civ] += moveCounts[alpha_civ] / 50;
  scores[beta_civ] += moveCounts[beta_civ] / 50;
  
  var mdiff = materials[alpha_civ] - materials[beta_civ];
  
  if (mdiff > 0) {
    scores[alpha_civ] += mdiff;
  } else {
    scores[beta_civ] -= mdiff;
  }
  
  if (gardez[alpha_civ]) {
    scores[alpha_civ] -= 20;
  }
  
  if (gardez[beta_civ]) {
    scores[beta_civ] -= 20;
  }
  
  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      var ix = y*8 + x;
      var piece = b2d[y][x];
      
      if (piece == ' ')
        continue;
      
      var tier = PIECE_TIER[piece];
      
      
      
      var value = tier*2.5 + 1;
      
      for(var cv of [alpha_civ, beta_civ]) {
        if (attackedMaps[cv][ix] > 0 && attackerValueMap[ix] < value) {
          scores[cv] -= value;
        }
        else if (defendedMaps[cv][ix] < attackedMaps[cv][ix]) {
          // completely hanging piece.
          scores[cv] -= value;
        }
        
        if(attackerMaps[civ][ix] > 0) {
          scores[cv] += 0.02*Math.random();
        }
        
        if(defendedMaps[civ][ix] < 1) {
          scores[cv] -= 0.01*Math.random();
        }
      }
    }
  }
  
  return {"moves":moves,"gardez":gardez,
           "materials":materials,"attackedMaps":attackedMaps,
           "attackerMaps":attackerMaps,"defendedMaps":defendedMaps,
           "scores":scores};
}

function isGameOver(b2d, alpha_civ, beta_civ) {
  var dead = {};
  dead[alpha_civ] = true;
  dead[beta_civ] = true;
  var pieces = {};
  pieces[alpha_civ] = 0;
  pieces[beta_civ] = 0;
  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      if (G_BOARD[y][x] == ' ')
        continue;
      
      var tier = PIECE_TIER[b2d[y][x]];
      var civ = PIECE_CIV[b2d[y][x]];
      
      if (tier == 3)
        dead[civ] = false;
      
      pieces[civ] += 1;
    }
  }
  
  if (pieces[alpha_civ] < 2)
    dead[alpha_civ] = true;
  
  if (pieces[alpha_civ] < 2)
    dead[alpha_civ] = true;
  
  return dead;
}

function newEmptyBoard() {
  var e = [];
  for(var y = 0; y < 8; y++) {
    var l = [];
    for(var x = 0; x < 8; x++) {
      l.push(' ');
    }
    e.push(l);
  }
  
  return e;
}

function fillBoardCiv(b2d, civ, white) {
  var START_1 = CIVSTARTS[civ][1];
  var START_0 = CIVSTARTS[civ][0];
  
 
  
  if (white) {
    for(var x = 0; x < 8; x++) {
      b2d[6][x] = START_1[x];
      b2d[7][x] = START_0[x];
    }
  } else {
    for(var x = 0; x < 8; x++) {
      b2d[1][x] = START_1[x];
      b2d[0][x] = START_0[x];
    }
  }
}

function zeroes(n, q) {
  var a = [];
  
  if(q == undefined)
    q = 0;
  
  for(var i = 0; i < n; i++) {
    a.push(q);
  }
  return a;
}

function copyBoard(fromb, tob) {
  for(var y = 0; y < 8; y++) 
    for(var x = 0; x < 8; x++)
      tob[y][x] = fromb[y][x];
}

function emptyBoard() {
  return [[' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' ']];
  
}

function moveFor(b2d, alpha_civ, beta_civ, plr, plr_) {
  var ar = analyse(b2d, alpha_civ, beta_civ);
  
  var b2d_ = emptyBoard();
  var maxScore = -1337;
  var bestMove = undefined;
  
  for(var mv of ar.moves[plr]) {
    copyBoard(b2d, b2d_);
    applyMove(b2d_, mv);
    
    var ar_ = analyse(b2d_, alpha_civ, beta_civ);
    var mvScore = ar_.scores[plr];
    if (mvScore > maxScore) {
      maxScore = mvScore;
      bestMove = mv;
    }
  }
  
  return bestMove;
}

function applyMove(b2d, mv) {
  var tx = mv[0];
  var ty = mv[1];
  var cap = mv[2];
  var piece = mv[3];
  var fx = mv[4];
  var fy = mv[5];
  
  b2d[ty][tx] = b2d[fy][fx];
  b2d[fy][fx] = ' ';
  
  /* promote tier 0s */
  var y = 0;
  for(var x = 0; x < 8; x++) {
    if (b2d[y][x] == ' ') {
      continue;
    }

    var civ = PIECE_CIV[b2d[y][x]];
    var tier = PIECE_TIER[b2d[y][x]];

    if (civ == G_ALPHA) {
      if (tier == 0) {
        // replace with
        b2d[y][x] = PROMOTIONS[civ];
      }
    }
  }
  
  var y = 7;
  for(var x = 0; x < 8; x++) {
    if (b2d[y][x] == ' ') {
      continue;
    }

    var civ = PIECE_CIV[b2d[y][x]];
    var tier = PIECE_TIER[b2d[y][x]];

    if (civ == G_BETA) {
      if (tier == 0) {
        // replace with
        b2d[y][x] = PROMOTIONS[civ];
      }
    }
  }
}
