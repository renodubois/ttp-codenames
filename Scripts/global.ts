const { globalEvents, GameObject, GameWorld, world } = require('@tabletop-playground/api');


const drawAndPlaceCards = (deck) => {
    const thisCard = deck.takeCards();
    if (thisCard) {
        // this
    }
}

const allObjs = world.getAllObjects();
for (const obj of allObjs) {
    if (obj.getTemplateName().includes("words_")) {
        // This is a deck
        drawAndPlaceCards(obj);
    }
}
// console.log("test");

// // const players = thisGame.getAllPlayers();
// const players = [];

// // called whenever a chat message is sent
// globalEvents.onChatMessage.add((player, message) => {
//     // show a message on screen of the player who wrote the message
//     // for (const player of players) {
//     for (let i = 0; i < players.length; i++) {
//        player.showMessage("Should you really say something like \"" + message + "\"");
//     }
// });

// // called whenever one ore more dice are rolled and sets all dice to six
// globalEvents.onDiceRolled.add((player, dice) => {
//     dice.forEach(
//         (d, index) => {
//             // set the dice to 6 (faces 0 to 5)
//             d.setCurrentFace(5);
//         }
//     );
// });
//


export {}
