var G_GID = 4; // The ID of the game
var G_MY_UID = -1; // Our UID
var G_MOVE_ENABLED = false; // Whether the player can make a move
var G_SELECTION = undefined;
var G_ALPHA_CIV = undefined;
var G_BETA_CIV = undefined;
var G_BOARD = undefined;
var G_LAST_MOVE = undefined;

function init() {
  // Which game?
  
  if (window.location.hash.length >= 2) {
    hash = window.location.hash.substring(1); 
    
    G_GID = parseInt(hash);
  }
  
  ecApi.go({"p":"game","a":"get","d":{"gid":G_GID}}, updateBoardDisplay, alert);
}

function boardTo2D(b1d) {
  var board = [[' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' '],
          [' ',' ',' ',' ',' ',' ',' ',' ']];
          
  for(var i = 0; i < 64; i++) {
    var x = i % 8;
    var y = Math.floor(i / 8);
    board[y][x] = b1d[i];
  }
  
  return board;
}

function clicked(y, x) {
  if (!G_MOVE_ENABLED) {
    alert("It is not your turn!");
    return false;
  }
  
  if (G_SELECTION == undefined) {
    G_SELECTION = [y,x];
  } else {
    if (G_SELECTION[0] == y && G_SELECTION[1] == x) {
      G_SELECTION = undefined;
    } else {
      playerMove(G_SELECTION[0], G_SELECTION[1], y, x);
      G_SELECTION = undefined;
    }
  }
  
  document.getElementById("board").innerHTML = 
    renderBoardTable(G_BOARD, G_ALPHA_CIV, G_BETA_CIV);
  
  return false;
}

function playerMove(fy, fx, ty, tx) {
  G_MOVE_ENABLED = false;
  
  // Send move to server
  ecApi.go({"p":"game","a":"move","d":{"gid":G_GID,"from":{"x":fx,"y":fy},"to":{"x":tx,"y":ty}}},
    updateBoardPlayerMove,
    alert
  );
  
  // And start polling
  startPoll();
}

function startPoll() {
  setTimeout(function(){doPoll();}, 4000 + Math.floor(Math.random()*4000));
}

function doPoll() {
  ecApi.go({"p":"game","a":"get","d":{"gid":G_GID}}, handlePoll, alert);
}

function handlePoll(game) {
  // is it our turn yet?
  G_BOARD = boardTo2D(game['board']);
  G_LAST_MOVE = [game['last_move']['ty'],
                 game['last_move']['tx'],
                 game['last_move']['fy'],
                 game['last_move']['fx']];
  
  if (game['turn_uid'] == game['uid']) {
    document.getElementById("board").innerHTML = 
    renderBoardTable(G_BOARD, G_ALPHA_CIV, G_BETA_CIV);
    G_MOVE_ENABLED = true;
  } else {
    setTimeout(function(){doPoll();}, 4000 + Math.floor(Math.random()*4000));
  }
}

function updateBoardPlayerMove(reply) {
  if (reply['err'] == 69) {
    G_MOVE_ENABLED = true;
    return false; // was rejected as illegal move by the server. 
  }
  
  G_BOARD = boardTo2D(reply['board']);
  
  document.getElementById("board").innerHTML = 
    renderBoardTable(G_BOARD, G_ALPHA_CIV, G_BETA_CIV);
    
  G_MOVE_ENABLED = false;
}

function updateBoardDisplay(game) {
  G_MY_UID = parseInt(game['uid']);
  G_ALPHA_CIV = game['alpha_civ'];
  G_BETA_CIV = game['beta_civ'];
  G_BOARD = boardTo2D(game['board']);
  
  document.getElementById("board").innerHTML = 
    renderBoardTable(G_BOARD, G_ALPHA_CIV, G_BETA_CIV);
                     
  if (game['alpha'] == null)
    game['alpha'] = '?';
  
  if (game['beta'] == null)
    game['beta'] =  '?';
  
  if (game['turn_uid'] == game['uid']) {
    G_MOVE_ENABLED = true;
  }
  
  
  
  var alpha_sfx = "";
  var beta_sfx = "";
  
  if (G_MOVE_ENABLED && game['uid'] == game['alpha_id']) {
    alpha_sfx = " !!";
  }
  if (G_MOVE_ENABLED && game['uid'] == game['beta_id']) {
    beta_sfx = " !!";
  }
  
  document.getElementById("alpha_plr").innerText = game['alpha'] + alpha_sfx;
  document.getElementById("beta_plr").innerText = game['beta'] + beta_sfx;
}

var PIECES = {
  /* bugs */
  "S":"&#x1F40C;",
  "A":"&#x1F41C;",
  "B":"&#x1F98B;",
  "b":"&#x1F41D;", 
  "C":"&#x1F997;",
  "s":"&#x1F577;",
  "c":"&#x1F982;",
  
  /* smileys */
  "P":"&#x1F642;",
  "N":"&#x1F606;",
  "p":"&#x1F910;",
  "R":"&#x1F610;",
  "Q":"&#x1F644;",
  "K":"&#x1F928;",
  
  /* birds */
  "v":"&#x1F426;",
  "x":"&#x1F986;",
  "V":"&#x1F424;",
  "f":"&#x1F54A;",
  "k":"&#x1F99A;",
  
  /* people */
  "0":"&#x1F46E;",
  "1":"&#x1F575;",
  "2":"&#x1F477;",
  "3":"&#x1F482;",
  "4":"&#x1F9D9;",
  "5":"&#x1F9B8;",
  
  /* clothes */
  "l":"&#x1F45F;",
  "m":"&#x1F97E;",
  "o":"&#x1F452;",
  "g":"&#x1F3A9;",
  
  /* vehicles */
  "T":"&#x1F69C;",
  "O":"&#x1F69A;",
  "F":"&#x1F695;",
  "#":"&#x1F690;",
  "@":"&#x1F693;",
  "|":"&#x1F692;",
  
  /* Smileys 2 */
  "y":"&#x1F922;",
  "u":"&#x1F975;",
  "G":"&#x1F976;",
  "E":"&#x1F631;",
  "e":"&#x1F92C;",
  
  /* empty */
  " ":"&nbsp;",
  
  /* sounds */
  "U":"&#x1F508;",
  "W":"&#x1F4E2;",
  "X":"&#x1F4EF;",
  "L":"&#x1F514;",
};

function renderBoardASCII(b2d) {
  var r = "";
  for(var y = 0; y < 8; y++) {
    for(var x = 0; x < 8; x++) {
      r += b2d[y][x];
    }
    r += '\n';
  }
  return r;
}

function renderBoardTable(b2d, alpha_civ, beta_civ, last_alpha, last_beta) {
  var r = '<table class="board">';
  var dark = true;
  for(var y = 0; y < 8; y++) {
    if (y % 2 == 1)
      dark = true;
    else 
      dark = false;
    
    r += '<tr>';
    for(var x = 0; x < 8; x++) {
      var bg = 'dark';
      if (!dark) {
        bg = 'light';
      }
      
      var piece = b2d[y][x];
      var civ = PIECE_CIV[piece];
      
      if (civ != undefined) {
        if (civ == alpha_civ) {
          bg += "_alpha";
        } else if (civ == beta_civ) {
          bg += "_beta";
        }
      }
      
      if (G_SELECTION != undefined)
        if (y == G_SELECTION[0] && x == G_SELECTION[1]) {
          bg += ' selected';
        }
      
      if (G_LAST_MOVE != undefined) {
        if (G_LAST_MOVE[0] == y && G_LAST_MOVE[1] == x)
          bg += ' lastmove';
        
        if (G_LAST_MOVE[2] == y && G_LAST_MOVE[3] == x)
          bg += ' lastmoveorg';
      }
      
      r += '<td onclick="clicked(' + y +',' + x + '); return false;" class="piece ' + bg + '" id="p_' + (y*8+x) + '">';
      r += PIECES[b2d[y][x]];
      r += '</td>';
      
      dark = !dark;
    }
    r += '</tr>';
  }
  r += '</table>';
  
  return r;
}