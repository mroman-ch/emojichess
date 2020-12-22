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

function userMove(fy, fx, ty, tx) {
  G_CLICK_ENABLED = false;
  
  if (G_RESULT == undefined) {
    G_RESULT = analyse(G_BOARD, G_ALPHA, G_BETA, G_ALPHA, G_BETA);
  }
  
  var piece = G_BOARD[fy][fx];
  var iscap = false;
  var civ = PIECE_CIV[piece];
  
  if (G_BOARD[ty][tx] != ' ') {
    civ_ = PIECE_CIV[G_BOARD[ty][tx]];
    
    if (civ != civ_) {
      iscap = true;
    }
  }
  
  //TODO: check if legal move
  var islegal = false;
  
  for(var mv of G_RESULT.moves[G_ALPHA]) {
    if (mv[0] == tx && mv[1] == ty && mv[2] == iscap && mv[3] == piece 
        && mv[4] == fx && mv[5] == fy) {
          islegal = true;
          break;
        }
  }
  
  if(!islegal) {
    alert("That's not a legal move!");
    document.getElementById("board").innerHTML = renderBoardTable(G_BOARD, G_ALPHA, G_BETA);
    G_CLICK_ENABLED = true;
    return false;
  }
  
  applyMove(G_BOARD, [tx,ty,iscap,piece,fx,fy]);
  
  document.getElementById("board").innerHTML = renderBoardTable(G_BOARD, G_ALPHA, G_BETA);
  
  G_RESULT = undefined;
  
  if (isGameOver_()[G_BETA]) {
    alert("You won!");
    G_CLICK_ENABLED = false;
    return false;
  }
  
  setTimeout(function(){
    moveBeta();
    document.getElementById("board").innerHTML = renderBoardTable(G_BOARD, G_ALPHA, G_BETA);
    if (isGameOver_()[G_ALPHA]) {
      alert("You lost!");
      G_CLICK_ENABLED = false;
      return;
    }
    G_CLICK_ENABLED = true;
  }, 1000);
  
  return false;
}

function isGameOver_() {
  return isGameOver(G_BOARD, G_ALPHA, G_BETA);
}

function clicked(y, x) {
  if (!G_CLICK_ENABLED)
    return false;
  
  if (G_SELECTION == undefined) {
    G_SELECTION = [y,x];
    document.getElementById("board").innerHTML = renderBoardTable(G_BOARD, G_ALPHA, G_BETA);
    return false;    
  } else {
    if (y == G_SELECTION[0] && x == G_SELECTION[1]) {
      G_SELECTION = undefined;
      document.getElementById("board").innerHTML = renderBoardTable(G_BOARD, G_ALPHA, G_BETA);
      return false;
    }
    var fy = G_SELECTION[0];
    var fx = G_SELECTION[1];
    G_SELECTION = undefined;
    userMove(fy, fx, y, x);
    
    return false;
  }
  
  return false;
}

function renderBoardTable(b2d, alpha_civ, beta_civ) {
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
        
      if (G_LAST_BETA[0] == y && G_LAST_BETA[1] == x)
        bg += ' lastbeta';
      
      if (G_LAST_BETA[2] == y && G_LAST_BETA[3] == x)
        bg += ' lastbetaorg';
      
      r += '<td onclick="clicked(' + y +',' + x + '); return false;" class="piece ' + bg + '" id="p_' + (y*8+x) + '">';
      r += PIECES[b2d[y][x]];
      r += '</td>';
      
      dark = !dark;
    }
    r += '</tr>';
  }
  r += '</table>';
  
  G_RESULT = undefined;
  
  return r;
}



var G_BOARD = undefined;
var G_ALPHA = undefined;
var G_BETA = undefined;
var G_RESULT = undefined;
var G_SELECTION = undefined;
var G_CLICK_ENABLED = true;
var G_LAST_BETA = [-1,-1];

function init() {
  var b2d = newEmptyBoard();
  
  var allCivs = ["birds","bugs","smileys","people","clothes","vehicles"];
  
  var idx0 = Math.floor(Math.random()*allCivs.length);
  var idx1 = Math.floor(Math.random()*allCivs.length);
  
  while(idx1 == idx0) {
    idx0 = Math.floor(Math.random()*allCivs.length);
  }
  
  G_ALPHA = allCivs[idx0];
  G_BETA = allCivs[idx1];
  
  if (window.location.hash.length > 3) {
    var hash = window.location.hash.substring(1);
    var parts = hash.split("V");
    G_ALPHA = parts[0];
    G_BETA = parts[1];
  }
  
  fillBoardCiv(b2d, G_ALPHA, true);
  fillBoardCiv(b2d, G_BETA, false);
  

  
  G_BOARD = b2d;
  
  document.getElementById("board").innerHTML = renderBoardTable(b2d, G_ALPHA, G_BETA);
  
  //setTimeout(function(){moveAlpha();}, 1000);
}

function moveAlpha() {
  var mv = moveFor(G_BOARD, G_ALPHA, G_BETA, G_ALPHA, G_BETA);
  applyMove(G_BOARD, mv);
  document.getElementById("board").innerHTML = renderBoardTable(G_BOARD, G_ALPHA, G_BETA);
  
  setTimeout(function(){moveBeta();}, 1000);
}

function moveBeta() {
  var mv = moveFor(G_BOARD, G_ALPHA, G_BETA, G_BETA, G_ALPHA);
  G_LAST_BETA = [mv[1],mv[0],mv[5],mv[4]];
  applyMove(G_BOARD, mv);
  //setTimeout(function(){moveAlpha();}, 1000);
}

function rndf() {
  var q = Math.random();
  q = q*q*q;
  return 1+q;
}

