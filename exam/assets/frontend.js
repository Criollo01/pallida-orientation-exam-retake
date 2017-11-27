'use strict'

function ajax(method, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function(){
        callback(JSON.parse(xhr.responseText));
    };
    xhr.send();
};

