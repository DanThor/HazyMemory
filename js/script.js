const cardsData = [
    { image: "images/elinadenfina.jpeg", type: "elinadenfina" },
    { image: "images/vinkla.png", type: "vinkla" },
    { image: "images/twish.jpeg", type: "twish" },
    { image: "images/simonkristiansson.jpg", type: "simonkristiansson" },
    { image: "images/wowbagger84.png", type: "wowbagger84" },
    { image: "images/wesbos.jpeg", type: "wesbos" },
    { image: "images/BrendanEich.jpeg", type: "BrendanEich" },
    { image: "images/mojombo.png", type: "mojombo" },
    { image: "images/elinadenfina.jpeg", type: "elinadenfina" },
    { image: "images/vinkla.png", type: "vinkla" },
    { image: "images/twish.jpeg", type: "twish" },
    { image: "images/simonkristiansson.jpg", type: "simonkristiansson" },
    { image: "images/wowbagger84.png", type: "wowbagger84" },
    { image: "images/wesbos.jpeg", type: "wesbos" },
    { image: "images/BrendanEich.jpeg", type: "BrendanEich" },
    { image: "images/mojombo.png", type: "mojombo" }
];

const memoryBoard = document.querySelector(".memoryBoard");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Helper function to prevent XSS injections - Creates an HTML element from string
function stringToHTML(str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
}

// This function creates an image tag from the cards array
function createCard(image, type) {
    return `<div class="memoryCard" data-framework="${type}"><img class="frontFace" src="${image}">
            <img class="backFace" src="images/yrgo.png">
    </div>`;
}

// Generates the cards(generateCards();) from the cards array to the DOM on load and inside the memoryboard section
(function generateCards() {
    cardsData.forEach(card => {
        const image = createCard(card.image, card.type);
        memoryBoard.appendChild(stringToHTML(image));
    });
})();

const cards = document.querySelectorAll(".memoryCard");
// Giving the card a radomized posistion
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

shuffle();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 750);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
        null,
        null
    ];
}

cards.forEach(card => card.addEventListener("click", flipCard));

// Reset the game from the reset button.
const resetButton = document.querySelector("button");

function resetGame() {
    cards.forEach(card => {
        card.classList.remove("flip");
    });
    setTimeout(5000);
    shuffle();
}
resetButton.addEventListener("click", resetGame);
