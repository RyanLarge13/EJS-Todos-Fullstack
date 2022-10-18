const form = document.querySelector('form');
const baseURL = 'http://localhost:8080/';

const handleResponse = async (e) => {
    await fetch(`${baseURL}login`, {
        method: 'POST'
    }).then((res) => {
        res.json()
    }).then((content) => {
        console.log(content.token)
    })
};

form.addEventListener('submit', handleResponse);