// получить данные по апи
//вставить слово в контейнер results-word
//добавить функционал для воспроизведения звука
//вставить полученные данные в контейнер с результатами

let state = {
    word: ""
};
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const containerWord = document.querySelector('.results-word');


const insertWord = () => {
    containerWord.innerText = state.word;
    console.log('hi')
    
}

const hendleSubmit = async (e) => {
    e.preventDefault();

    if (!state.word.trim()) return;

    try {
        const response = await fetch(`${url}${state.word}`);
        const data = await response.json();

        if(response.ok && data.length) {
            insertWord();
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