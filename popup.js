// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/
const draw = function () {
	chrome.storage.sync.get({ 'series': [] }, function ({ series: result }) {
		console.log(result);
		// makeAMess();
		document.getElementById("seriesTable").innerHTML = '';

		for (let el of result) {

			const tableElementTr = document.createElement("TR");

			const textnodeNameTd = document.createElement("td");
			// textnodeNameTd.innerText = el.name;

			const linkElement = document.createElement("a");
			linkElement.href = '#';
			linkElement.innerText = el.name;
			linkElement.onclick = function () {
				chrome.tabs.create({ active: true, url: el.link });
			}

			const textnodeEpisodeTd = document.createElement("td");
			textnodeEpisodeTd.innerText = el.lastEpisode;

			const removeButton = document.createElement("button");
			removeButton.innerText = "remove";

			textnodeNameTd.appendChild(linkElement);
			tableElementTr.appendChild(textnodeNameTd);
			tableElementTr.appendChild(textnodeEpisodeTd);
			tableElementTr.appendChild(removeButton);

			document.getElementById("seriesTable").appendChild(tableElementTr);

			removeButton.onclick = (function (element) {
				return function () {
					chrome.storage.sync.get({ 'series': [] }, function ({ series: result }) {
						for (let i = 0; i < result.length; i++) {
							if (result[i].name == element) {
								result.splice(i, 1);
								chrome.storage.sync.set({ 'series': result }, function () {
									console.log("element removed with button");
								});
								draw();
								break;
							}
						}
					});
				}
			})(el.name);

			const xhr = new XMLHttpRequest();
			xhr.open("GET", el.link, true);
			xhr.responseType = 'document';

			xhr.onload = function () {
				const currentSeries = getSeriesFromDOM(xhr.response);
				updateSeries(currentSeries);
				console.log(el.name);
			}
			xhr.send();
		}

	});
}


draw();