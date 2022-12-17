const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8c265a3574mshbc1cca717a8a3adp1a6359jsnb33733cf16c1',
        'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
    }
};

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let day = date.getDate()
let month = date.getMonth() + 1
let seconds = date.getSeconds();

let dateFactTitle = document.getElementById("date-fact-title");
let dateFact = document.getElementById("date-fact");
let hourFactTitle = document.getElementById("hour-fact-title");
let hourFact = document.getElementById("hour-fact");
let minuteFactTitle = document.getElementById("minute-fact-title");
let minuteFact = document.getElementById("minute-fact");
let secondFactTitle = document.getElementById("second-fact-title");
let secondFact = document.getElementById("second-fact");
let projectsList = document.getElementById("projects-list");

function processMinuteFact(data) {
    minuteFactTitle.innerHTML = `Minute: ${minutes}`
    minuteFact.innerHTML = data.text;
}

function processHourFact(data) {
    hourFactTitle.innerHTML = `Hour: ${hours}`
    hourFact.innerHTML = data.text;
}

function processDateFact(data) {
    dateFactTitle.innerHTML = `Date: ${month}-${day}-[${data.year}]`
    dateFact.innerHTML = data.text;
}

function processSecondFact(data) {
    secondFactTitle.innerHTML = `Second: ${seconds}`
    secondFact.innerHTML = data.text;
}

function processProjects(data) {
    let map = {};
    for (let i in data) {
        let project = data[i];

        let language = project.language
        if (!(language in map)) {
            map[language] = [];
        }
        map[language].push(project);
    }
    for (let language in map) {
        let languageHeader = document.createElement("div");
        languageHeader.innerHTML = language;
        languageHeader.classList.add('language-header')
        projectsList.appendChild(languageHeader);
        let list = document.createElement("div");
        for (let i in map[language]) {
            let project = map[language][i];
            let element = document.createElement("div");
            element.classList.add('project')
            element.innerHTML = `<a href="${project.html_url}">${project.name}</a>`
            list.appendChild(element);
        }
        languageHeader.appendChild(list);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    fetch(`https://numbersapi.p.rapidapi.com/${minutes}/math?json=true&fragment=true`, options)
        .then(response => response.json())
        .then(response => processMinuteFact(response))
        .catch(err => console.error(err));

    fetch(`https://numbersapi.p.rapidapi.com/${hours}/math?json=true&fragment=true`, options)
        .then(response => response.json())
        .then(response => processHourFact(response))
        .catch(err => console.error(err));

    fetch(`https://numbersapi.p.rapidapi.com/${seconds}/math?json=true&fragment=true`, options)
        .then(response => response.json())
        .then(response => processSecondFact(response))
        .catch(err => console.error(err));

    fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date?json=true&fragment=true`, options)
        .then(response => response.json())
        .then(response => processDateFact(response))
        .catch(err => console.error(err));

    fetch(`https://api.github.com/users/cpratim/repos`)
        .then(response => response.json())
        .then(response => processProjects(response))
        .catch(err => console.error(err));

});

