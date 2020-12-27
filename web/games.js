function init() {
  var uid = 0;
  if (window.location.hash.length >= 2) {
    var hash = window.location.hash.substring(1);
    uid = parseInt(hash);
  }
  
  setTimeout(function(){
  ecApi.go({"p":"game","a":"list","d":{"uid":uid}}, showGames, alert);}, 1);
  setTimeout(function(){
  ecApi.go({"p":"game","a":"list2","d":{"uid":uid}}, showGames2, alert);}, 1);
}

function showGames(reply) {
  var s = '<table class="rule">';
  s += '<tr><td>ID</td><td>State</td><td>Alpha</td><td>Beta</td></tr>';
  for(var game of reply['games']) {
    s += '<tr><td>'+game['gid']+'</td><td>'+game['result']+'</td>';
    var alcls = "winner";
    var btcls = "loser";
    
    if (game['result'] == 'v') {
      btcls = "winner";
      alcls = "loser";
    }
    
    if (game['result'] == 'D') {
      alcls = 'draw';
      btcls = 'draw';
    }
    
    s += '<td class="'+alcls+'">' + game['alpha'] + '</td><td class="'+btcls+'">' + game['beta'] + '</td></tr>';
  }
  
  s += "</table>";
  
  document.getElementById("games").innerHTML = s;
}

function showGames2(reply) {
  var s = '<table class="rule">';
  s += '<tr><td>ID</td><td>State</td><td>Alpha</td><td>Beta</td><td></td></tr>';
  var s_ = s;
  for(var game of reply['games']) {
    var t = "";
    t += '<tr><td>'+game['gid']+'</td><td>'+game['result']+'</td>';
    var alcls = "";
    var btcls = "";
    
    
    
    t += '<td class="'+alcls+'">' + game['alpha'] + '</td><td class="'+btcls+'">' + game['beta'] + '</td><td><a href="vs.html#' + game['gid'] + '">View</a></td></tr>';
    
    if (game['result'] == 'a' || game['result'] == 'b') {
      s += t;
    }
    
    if (game['result'] == 'c') {
      s_ += t;
    }
  }
  
  s += "</table>";
  s_ += "</table>";
  
  document.getElementById("current-games").innerHTML = s;
  document.getElementById("challenges").innerHTML = s_;
}