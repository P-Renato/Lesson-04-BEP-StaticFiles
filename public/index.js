const output = document.querySelector("#output");
const msgBox = document.querySelector("#greeting");
const btn = document.querySelector("button");


function getTime(){
    fetch("http://localhost:5000/api/time")
    .then((res) => res.text())
    .then((data) => (output.value = data));
}

btn.addEventListener('click', getTime)

    fetch("http://localhost:5000/api/greeting")
    .then((res) => res.json())
    .then((data) => msgBox.textContent = data);

    fetch("http://localhost:5000/api/testing123")
    .then((res) => res.json())
    .then((data) => console.log(data));