var G_GID = 4;
var G_MY_UID = -1;

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

function updateBoardDisplay(game) {
  G_MY_UID = parseInt(game['uid']);
  
  document.getElementById("board").innerHTML = 
    renderBoardTable(boardTo2D(game['board']), game['alpha_civ'], game['beta_civ'], 
                     undefined, undefined);
                     
  if (game['alpha'] == null)
    game['alpha'] = '?';
  
  if (game['beta'] == null)
    game['beta'] =  '?';
                     
  document.getElementById("alpha_plr").innerText = game['alpha'];
  document.getElementById("beta_plr").innerText = game['beta'];
}

var ecApi = {
'log': function(data) {
  document.getElementById("ecapi-console").innerText += data + "\n";
},
'go' : function (payload, cb_ok, cb_err) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', this.API_URL);
    
    payload['ecapi-key'] = localStorage.getItem('ecapi-key');
    
    this.log("> " + JSON.stringify(payload));

    xhr.send(JSON.stringify(payload));

    xhr.onload = (() => {
       this.log("< " + xhr.responseText);
       var resp = JSON.parse(xhr.responseText);

       cb_ok(resp);
    }).bind(this);
    
    xhr.onerror = (() => { 
      this.log("<! " + xhr.responseText);
      cb_err(xhr.responseText);
    }).bind(this);
  },
'API_URL' : 'http://localhost/emojichess/api.php',
};

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
      
      if (last_alpha != undefined)
        if (y == last_alpha[0] && x == last_alpha[1]) {
          bg += ' selected';
        }
      
      if (last_beta != undefined) {
        if (last_beta[0] == y && last_beta[1] == x)
          bg += ' lastbeta';
        
        if (last_beta[2] == y && last_beta[3] == x)
          bg += ' lastbetaorg';
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