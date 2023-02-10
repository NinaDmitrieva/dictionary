

let state = {
    word: ""
};
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');

const hendleSubmit = async (e) => {
    e.preventDefault();

    if (!state.word.trim()) return;

    try {
        const response = await fetch(`${url}${state.value}`);
        const data = await response.json();

        if(response.ok && data.length) {

        }
    } catch (err){
        console.log(err);
    }

    
};

const hendleKeyup = (e) => {
    const value = e.target.value;
    state.word = value;
};

//event
input.addEventListener('keyup', hendleKeyup);
form.addEventListener('submit', hendleSubmit);