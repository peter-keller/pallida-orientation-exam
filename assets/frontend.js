'use strict'

var xhr = new XMLHttpRequest();
var url = 'http://localhost:8080';

var button = document.querySelector('button');
var search = document.querySelector('input');
var police = document.getElementById('police');
var diplomat = document.getElementById('diplomat')
var table = document.querySelector('table');


function appendTable(result){
  table.innerHTML = `<tr>
                      <th>License Plate</th>
                      <th>Car Brand</th> 
                      <th>Car Model</th>
                      <th>Color</th>
                      <th>Year</th>
                    </tr>
  `
  result.forEach(function(element) {
    const markup = `<tr>
                      <td>${element.plate}</td>
                      <td>${element.car_brand}</td>
                      <td>${element.car_model}</td>
                      <td>${element.color}</td>
                      <td>${element.year}</td>
                    </tr>
    `
    table.innerHTML += markup;
  }, this);
};


function ajax (method, url, callback) {
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      callback(JSON.parse(xhr.response));
    };
  });
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
};


button.addEventListener('click', function () {
  var url = 'http://localhost:8080';
  url += search.value;
  ajax('GET', url, appendTable)
});

police.addEventListener('click', function() {

});

diplomat.addEventListener('click', function() {

});


ajax('GET', 'http://localhost:8080', appendTable);
