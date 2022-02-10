const { world } = require('@tabletop-playground/api');

const TABLE_HEIGHT = 82.0;
let x = 0;


const CARD_POS = [
    [12, -18],
    [12, -9],
    [12, 0],
    [12, 9],
    [12, 18],
    [6, -18],
    [6, -9],
    [6, 0],
    [6, 9],
    [6, 18],
    [0, -18],
    [0, -9],
    [0, 0],
    [0, 9],
    [0, 18],
    [-6, -18],
    [-6, -9],
    [-6, 0],
    [-6, 9],
    [-6, 18],
    [-12, -18],
    [-12, -9],
    [-12, 0],
    [-12, 9],
    [-12, 18],
]

const drawAndPlaceCards = (deck) => {
    deck.shuffle();
    for (let i = 0; i < CARD_POS.length; i++) {
        const thisCard = deck.takeCards();
        if (thisCard) {
            const [x, y] = CARD_POS[i];
            thisCard.setPosition(new Vector(x, y, TABLE_HEIGHT));
        }
    }
}

const allObjs = world.getAllObjects();
for (const obj of allObjs) {
    if (obj.getTemplateName().includes("words_") && obj.getStackSize() >= 25) {
        drawAndPlaceCards(obj);
        return;
    }
}