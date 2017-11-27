'use strict'

const button = document.querySelector('button');
const input = document.querySelector('input');
const itemName = document.querySelectorAll('.item');
const size = document.querySelectorAll('.size');

function ajax(method, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function(){
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send();
};

/*
function addItemOptions(response) {
	let name = document.querySelector('.item_name')
	let itemNames = document.querySelector('option');
	elements.forEach(element => {
		itemNames.textContent = element.item_name;
		name.appendChild(itemNames);
	});
};*/

function createTable(response){
  let tableHeader = `<table>
                        <tr>
                        	<th>Item name</th>
                          <th>Manufacturer</th>
                          <th>Category</th>
                        	<th>Size</th>
													<th>Price</th>
													<th>In store</th>					
                        </tr>
										</table>`
	let table = document.createElement('table');	
	table.innerHTML = tableHeader;
  document.querySelector('body').appendChild(table);
  for (let i = 0; i < response.clothes.length; i++) {
    let elements = `<td>${response.clothes[i].item_name}</td>
                    <td>${response.clothes[i].manufacturer}</td>
                    <td>${response.clothes[i].category}</td>
                    <td>${response.clothes[i].size}</td>
                    <td>${response.clothes[i].unit_price}</td>
                    <td>${response.clothes[i].in_store}</td>`;
    let tableRows = document.createElement('tr');
    tableRows.innerHTML = elements;
    table.appendChild(tableRows);
  };
};

function listItems(res) {
	console.log(res);
	res.data.forEach(function(elements) {
		let div = document.createElement('div');
		div.innerHTML += `<li>${elements.item_name}</li>`;
	});
};

button.addEventListener('click', function(){
	let fullUrl = '/price-check?item=' + itemName.value + '&size=' + size.value + '&quantity=' + input.value;
	console.log(fullUrl);
	ajax('GET', fullUrl, listItems);
});

ajax('GET', '/warehouse', createTable);
