function newGame() {
  ecApi.go({"p":"game","a":"new","d":{}}, alert, alert);
}

function init() {
  ecApi.go({"p":"game","a":"lobby","d":{}}, showOpenChallenges, alert);
}

function showOpenChallenges(reply) {
  var s = '<table class="rule">';
  s += '<tr><td>GID</td><td>Opponent</td><td></td></tr>';
  for(var game of reply['games']) {
    s += "<tr><td>" + game['gid'] + '</td><td>' + game['opponent'] + '</td><td><a href="#" onclick="join(' + game['gid'] + '); return false;">Join</a></td></tr>';
  }
  s += "</table>";
  document.getElementById("lobby").innerHTML = s;
}

function join(gid) {
  ecApi.go({"p":"game","a":"ack","d":{"gid":gid}}, joinSuccess, alert);
}

function joinSuccess(reply) {
  if (reply['err'] != 0) {
    alert("There was an error: " + reply[err]);
    return false;
  }
  
  document.location.href = "./vs.html#" + reply['gid'];
}