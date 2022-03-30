// const axios = require('axios');

//GET Todos from Database
fetch("http://localhost:7000/todos", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var ul = document.getElementById("list");
      var li = document.createElement("li");
      var span = document.createElement("span");
      span.classList.add(["del"]);
      span.appendChild(document.createTextNode("Delete"));

      li.appendChild(document.createTextNode(data[i].item));
      li.appendChild(span);
      ul.appendChild(li);
    }
  });




function addTodo() {
  var textValue = document.getElementById("textbox").value;
  console.log(textValue);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    item: textValue,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:7000/addTodo", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  document.getElementById("textbox").value = "";
  document.location.reload();
}

var delBtn = document.querySelector(".del");

console.log(delBtn.innerHTML);
delBtn.addEventListener("onClick", deleteTodo(delBtn.innerHTML));

function deleteTodo(item) {
  var raw = "";

  var requestOptions = {
    method: "DELETE",
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:7000/deleteTodo/${item}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
