function login() {
  var name = document.getElementById("name").value;
  var pwd = document.getElementById("password").value;
  
  ecApi.go({"p":"profile","a":"login","d":{"name":name,"pwd":pwd}}, loginSuccess, alert);
}

function loginSuccess(reply) {
  if(reply['err'] != 0) {
    alert("Login failed. Try again!");
    return false;
  }
  
  localStorage.setItem("ecapi-key", reply['token']);
  
  window.location.href = "lobby.html";
  return false;
}