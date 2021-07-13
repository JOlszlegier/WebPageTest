const box = document.querySelector(".game-box");
let clickedCards = [];
let clickedCardsId = [];
let doneCards = [];
let clicks = 0;
let moves = 0;
let namesDeck = []
let deck = 0;
let mobileMode = 0;
let tileName = 0;
let filteredArray =[];
const mobile = window.matchMedia( "(max-width: 430px)" )

const deckArray = [
    {
        name:'dog',
        img: 'pictures/Dog100.jpg'
    },
    {
        name:'dog',
        img: 'pictures/Dog100.jpg'
    },
    {
        name:'bug',
        img: 'pictures/Bug100.jpg'
    },
    {
        name:'bug',
        img: 'pictures/Bug100.jpg'
    },
    {
        name:'parrots',
        img: 'pictures/Parrots100.jpg'
    },
    {
        name:'parrots',
        img: 'pictures/Parrots100.jpg'
    },
    {
        name:'dino',
        img: 'pictures/dino100.jpg'
    },
    {
        name:'dino',
        img: 'pictures/dino100.jpg'
    },
    {
        name:'frog',
        img: 'pictures/Frog100.jpg'
    },
    {
        name:'frog',
        img: 'pictures/Frog100.jpg'
    },
    {
        name:'koala',
        img: 'pictures/koala100.jpg'
    },
    {
        name:'koala',
        img: 'pictures/koala100.jpg'
    },
    {
        name:'pig',
        img: 'pictures/Pig100.jpg'
    },
    {
        name:'pig',
        img: 'pictures/Pig100.jpg'
    },
    {
        name:'howl',
        img: 'pictures/Howl100.jpg'
    },
    {
        name:'howl',
        img: 'pictures/Howl100.jpg'
    },
]
const deckArrayMobile = [
    {
        name:'dog',
        img: 'pictures/DogSmall.jpg'
    },
    {
        name:'dog',
        img: 'pictures/DogSmall.jpg'
    },
    {
        name:'bug',
        img: 'pictures/BugSmall.jpg'
    },
    {
        name:'bug',
        img: 'pictures/BugSmall.jpg'
    },
    {
        name:'parrots',
        img: 'pictures/ParrotsSmall.jpg'
    },
    {
        name:'parrots',
        img: 'pictures/ParrotsSmall.jpg'
    },
    {
        name:'dino',
        img: 'pictures/dinoSmall.jpg'
    },
    {
        name:'dino',
        img: 'pictures/dinoSmall.jpg'
    },
    {
        name:'frog',
        img: 'pictures/FrogSmall.jpg'
    },
    {
        name:'frog',
        img: 'pictures/FrogSmall.jpg'
    },
    {
        name:'koala',
        img: 'pictures/koalaSmall.jpg'
    },
    {
        name:'koala',
        img: 'pictures/koalaSmall.jpg'
    },
    {
        name:'pig',
        img: 'pictures/PigSmall.jpg'
    },
    {
        name:'pig',
        img: 'pictures/PigSmall.jpg'
    },
    {
        name:'howl',
        img: 'pictures/HowlSmall.jpg'
    },
    {
        name:'howl',
        img: 'pictures/HowlSmall.jpg'
    },
]

const shuffledDeck = (array) => {
    for (let firstIndex = array.length - 1; firstIndex > 0; firstIndex--) {
        const secondIndex = Math.floor(Math.random() * (firstIndex + 1));
        [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
    }
}

const arrayErase = () =>{
    clickedCards = [];
    clickedCardsId = [];
}

const variableErasing = () =>{
    moves = 0;
    doneCards =[];
    clicks = 0;
}

const deckMapping = (array) =>{
    namesDeck = array.map(cards => cards.name);
}

const attributeSetting = (card,i) =>{
    card.setAttribute('src',tileName)
    card.setAttribute('id',i.toString());
    card.setAttribute('class','single-box');
}

const cardListener = (card,i,array) =>{
    card.addEventListener('click', () =>{
        if(clickedCards.length !==2){
            clickCounter();
            card.setAttribute('src',array[i].img)
            clickedCards.push(namesDeck[i]);
            clickedCardsId.push(i);
            console.log(filteredArray);
        }
        if(clickedCards.length === 2) {
            setTimeout(scoreCheck,500);
        }
    })
}

const scoreCheck = () =>{

    const cards = document.querySelectorAll('img');
    if(clickedCards[0] === clickedCards[1]) {
        doneCards.push(clickedCards[0]);
        doneCards.push(clickedCards[0]);
    }
    else if(doneCards.find(element => element===clickedCards[0])){
        cards[clickedCardsId[1]].setAttribute('src',tileName);
    }
    else if (doneCards.find(element => element===clickedCards[1])){
        cards[clickedCardsId[0]].setAttribute('src',tileName);
    }
    else {
        cards[clickedCardsId[0]].setAttribute('src',tileName);
        cards[clickedCardsId[1]].setAttribute('src',tileName);
    }
    arrayErase();
    filteredArray = doneCards.filter(e => e != null);
    if(filteredArray.length === deckArray.length){
        alert("You won !");
        reset();
    }
}

const createDeck = (array,mobile) => {
    for(let i=0;i<namesDeck.length;i++) {
        const card = document.createElement('img');
        attributeSetting(card,i);
        cardListener(card,i,array);
        box.append(card);
    }
}

const clickCounter = () =>{
    clicks +=1;
    moves=clicks/2;
    moves=Math.floor(moves);
    document.getElementById("clicks").innerHTML = moves;
}

const mobileSet = () =>{
    if(mobile.matches){
        deck = deckArrayMobile;
        mobileMode = 1;
        tileName = 'pictures/tileSmall.jpg';
    }
    else{
        deck = deckArray;
        mobileMode = 0;
        tileName = 'pictures/tile.jpg';
    }
}
const reset = () => {
    const box = document.querySelector(".game-box");
    mobileSet();

    while(box.firstChild){
        box.removeChild(box.firstChild);
    }
    variableErasing()
    arrayErase();
    shuffledDeck(deck);
    deckMapping(deck)
    createDeck(deck,mobileMode)
    document.getElementById("clicks").innerHTML = moves;
}

mobileSet();
if(mobile.matches){
    shuffledDeck(deckArrayMobile);
    deckMapping(deckArrayMobile);
    createDeck(deckArrayMobile,1);
}
else {
    shuffledDeck(deckArray);
    deckMapping(deckArray);
    createDeck(deckArray,0);
}