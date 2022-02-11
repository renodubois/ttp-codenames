const { world, Button, Card, Player, UIElement, Vector } = require('@tabletop-playground/api');

const TABLE_HEIGHT = world.getTableHeight();
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

interface gameBoardSpace {
	type: "red" | "blue" | "neutral" | "assassin";
	guessed: boolean;
	text: string;
//	x: number;
//	y: number;
}

const gameBoard: gameBoardSpace[][] = [];

const setUpGameBoard  = (gameBoard: gameBoardSpace[][]) => {
	for (let i = 0; i < 5; i++) {
		let thisRow: gameBoardSpace[] = [];
		for (let j = 0; j < 5; i++) {
			thisRow.push({
				type: "neutral",
				guessed: false,
				text: ""
			})
		}
		gameBoard.push(thisRow);
	}
}

console.log(gameBoard);

const drawAndPlaceCards = (deck: typeof Card) => {
    deck.shuffle();
    for (let i = 0; i < CARD_POS.length; i++) {
        const thisCard = deck.takeCards();
        if (thisCard) {
            const [x, y] = CARD_POS[i];
            thisCard.setPosition(new Vector(x, y, TABLE_HEIGHT));
        }
    }
}

const setup_btn = new Button();
setup_btn.setText("Set up game");
setup_btn.onClicked = (button: typeof Button, player: typeof Player) => {
	const allObjs = world.getAllObjects();
	setUpGameBoard(gameBoard);
	// TODO(reno): Add support/handling for multiple decks. Combine cards and pull randomly from them.
	for (const obj of allObjs) {
		if (obj.getTemplateName().includes("words_") && obj.getStackSize() >= 25) {
			drawAndPlaceCards(obj);
			break;
		}
	}
}
const buttonElement = new UIElement();
buttonElement.widget = setup_btn;
buttonElement.useWidgetSize = true;
buttonElement.position = new Vector(25, 0, TABLE_HEIGHT);
world.addUI(buttonElement);

