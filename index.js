let characterCounter = document.getElementById("character");
let wordCounter = document.getElementById("word");
let sentencesCounter = document.getElementById("sentences");
let spacesCounter = document.getElementById("spaces");
let punctuationCounter = document.getElementById("punctuation");


const textArea = document.querySelector(".text-entry textarea");
const processBtn = document.getElementById("process-btn");

let values = [characterCounter, wordCounter, sentencesCounter, spacesCounter, punctuation];


function init() {
    values.forEach(value => value.innerHTML = 0);
}
init();

processBtn.addEventListener('click', () =>{
    let text = textArea.value;
    characterCounter.innerHTML = text.length;
    wordCounter.innerHTML = findWord(text);
    sentencesCounter.innerHTML = findSentences(text);
    spacesCounter.innerHTML = text.split(" ").length -1;
    punctuationCounter.innerHTML = findPunctuation(text);



});


function findWord(text){
    let tempText = text.replace(/[.,!%&*;:'"-()]/g, "");
    tempText = tempText.replace(/[\r]/g, "").split(/\n/); //spliting on the new line character

    let tempList = [];
    tempText.forEach(word => tempList.push(word.split(" ")));




    function extract(arr){
        return arr.reduce((wordList, word) => {
            return wordList.concat(Array.isArray(word) ? extract (word) : word);
        }, []);
    }

    let wordList = extract(tempList);
    return wordList.filter(character => character != '').length;


}

function findSentences(text){
    const regex = /[.?!]/g;
    let senCount = text.match(regex);
    return senCount ? senCount.length : 0;


}

function findPunctuation(text){
    const regex = /[.,?;:!-'"(){}]/g;
    let punctuationCount = text.match(regex);
    return punctuationCount ? punctuationCount.length : 0;
}
