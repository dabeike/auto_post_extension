// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


$(function () {

	$('#test').click(function () {
		$.post("http://vote.weibo.com/aj/joinpoll?ajwvr=6&__rnd=1506586072256", {
			poll_id: "138038048",
			items: 20,
			anonymous: 0,
			share: 0,
			_t: 0
		}, function (res) {
			console.log(res);
		})
	});


});

