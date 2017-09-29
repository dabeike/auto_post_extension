// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// function click(e) {
//   chrome.tabs.executeScript(null,
//       {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
//   window.close();
// }
//

function post(vote_id, count){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","http://vote.weibo.com/aj/joinpoll?ajwvr=6&__rnd=1506586072256",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Referer", "http://vote.weibo.com/aj/joinpoll");
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("http://vote.weibo.com/poll/" + vote_id + ": " + JSON.parse(xmlhttp.responseText)["msg"])
        }
    }
    xmlhttp.send("poll_id="+vote_id+"&items="+count+"&anonymous=0&share=0&_t=0");
}

document.addEventListener('DOMContentLoaded', function () {
  // var divs = document.querySelectorAll('div');
  // for (var i = 0; i < divs.length; i++) {
  //   divs[i].addEventListener('click', function (e) {
  //       alert(1)
  //   });
  // }
    document.getElementById("test").addEventListener('click', function (e) {
        post("138038048", "20")
    })
});


