const { world } = require('@tabletop-playground/api');

const 

const drawAndPlaceCards = (deck) => {
    const thisCard = deck.takeCards();
    if (thisCard) {
		thisCard.
    }
}

const allObjs = world.getAllObjects();
for (const obj of allObjs) {
    if (obj.getTemplateName().includes("words_")) {
        drawAndPlaceCards(obj);
    }
}

console.log("Test!");
