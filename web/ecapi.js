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
