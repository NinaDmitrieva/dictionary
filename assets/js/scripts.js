// получить данные по апи
//вставить слово в контейнер results-word
//добавить функционал для воспроизведения звука
//вставить полученные данные в контейнер с результатами

let state = {
    word: "",
    meanings: [],
    phonetics: []

};
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const containerWord = document.querySelector('.results-word');
const soundBtn = document.querySelector('.results-sound');
const resList = document.querySelector('.results-list');
const resListWrapper = document.querySelector('.results');
const errorConteiner = document.querySelector('.error');

const showError = (error) => {
    errorConteiner.style.display = 'block';
    resListWrapper.style.display = 'none'
    errorConteiner.innerText = error.message;
}

const renderDefinition = (itemDefinition) => {
    const example = itemDefinition.example 
    ? `<div class="results-item__example">
           <p>Example: <span>${itemDefinition.example}</span></p>
        </div>`
    : ''


    return `<div class="results-item__definition">
                <p>${itemDefinition.definition}</p>
                ${example}
            </div>`
};

const getDefinitions = (definitions) => {
    return definitions.map(renderDefinition).join('')
}

const renderItem = (item) => {
    return `<div class="results-item">
                <div class="results-item__part">${item.partOfSpeech}</div>
                
                <div class="results-item__definitions">
                    ${getDefinitions(item.definitions)}
                </div>
            </div>`
}

const showRes = () => {
    resListWrapper.style.display = 'block';
    resList.innerHTML = '';

    state.meanings.forEach((item) => (resList.innerHTML += renderItem(item)));
};

const insertWord = () => {
    containerWord.innerText = state.word;
    console.log('hi')

}

const hendleSubmit = async (e) => {
    e.preventDefault();
    errorConteiner.style.display = 'none';

    if (!state.word.trim()) return;

    try {
        const response = await fetch(`${url}${state.word}`);
        const data = await response.json();

        if (response.ok && data.length) {
            const item = data[0];
            state = {
                ...state,
                meanings: item.meanings,
                phonetics: item.phonetics,
            }
            insertWord();
            showRes()
        } else {
            showError(data)
        }
    } catch (err) {
        console.log(err);
    }

};


const hendleKeyup = (e) => {
    const value = e.target.value;
    state.word = value;
};

const heandleSound = () => {
    if (state.phonetics.length) {
        const sound = state.phonetics[0];

        if (sound.audio) {
            new Audio(sound.audio).play();
        }
    }
}

//event
input.addEventListener('keyup', hendleKeyup);
form.addEventListener('submit', hendleSubmit);
soundBtn.addEventListener('click', heandleSound)