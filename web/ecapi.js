var ecApi = {
'log': function(data) {
  console.log(data);
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

function defaultSuccess(reply) {
  var d = document.getElementById("nav");
  
  if (d != null && d != undefined) {
    if (reply['uid'] != 0) {
      d.innerHTML  += " | My Profile";
    } else {
      d.innerText += " | (not logged in)";
    }
  }
}

function defaultInit() {
  var d = document.getElementById("nav");
  d.innerHTML += '<a href="rules.html">Rules</a> | <a href="https://github.com/mroman-ch/emojichess">Github</a>';
  
  ecApi.go({"p":"default","a":"","d":{}}, defaultSuccess, alert);
}