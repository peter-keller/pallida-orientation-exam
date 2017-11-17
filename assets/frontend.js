'use strict'
console.log("testme");

var xhr = new XMLHttpRequest();
var table = document.querySelector('section table');
var url = 'http://localhost:8080/search?q=';
var button = document.querySelector('button');
var search = document.querySelector('input');


function appendTable(result){
  result.forEach(function(element) {
    const markup = `<tr>
                      <td>${element.plate}</td>
                      <td>${element.car_brand}</td>
                      <td>${element.car_model}</td>
                      <td>${element.color}</td>
                      <td>${element.year}</td>
                    </tr>`
    table.innerHTML += markup;
  }, this);
};


function ajax (method, url, callback) {
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var requestAPI = JSON.parse(xhr.response);
      callback(requestAPI);
    };
  });
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
};



button.addEventListener('click', function () {
  var url = 'http://localhost:8080/search?q=';
  url += search.value;
  ajax('GET', url, appendTable)
});



ajax('GET', 'http://localhost:8080/search?q=MXS-803', appendTable);
