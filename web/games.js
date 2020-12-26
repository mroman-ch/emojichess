function init() {
  setTimeout(function(){
  ecApi.go({"p":"game","a":"list","d":{}}, showGames, alert);}, 1);
  setTimeout(function(){
  ecApi.go({"p":"game","a":"list2","d":{}}, showGames2, alert);}, 1);
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
    
    s += '<td class="'+alcls+'">' + game['alpha'] + '</td><td class="'+btcls+'">' + game['beta'] + '</td></tr>';
  }
  
  s += "</table>";
  
  document.getElementById("games").innerHTML = s;
}

function showGames2(reply) {
  var s = '<table class="rule">';
  s += '<tr><td>ID</td><td>State</td><td>Alpha</td><td>Beta</td></tr>';
  var s_ = s;
  for(var game of reply['games']) {
    var t = "";
    t += '<tr><td>'+game['gid']+'</td><td>'+game['result']+'</td>';
    var alcls = "";
    var btcls = "";
    
    
    
    t += '<td class="'+alcls+'">' + game['alpha'] + '</td><td class="'+btcls+'">' + game['beta'] + '</td></tr>';
    
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