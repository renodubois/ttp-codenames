const {
	world,
	Button,
	Card,
	GameObject,
	Player,
	UIElement,
	Vector,
} = require("@tabletop-playground/api");

const TABLE_HEIGHT = world.getTableHeight();
const BLUE_LABEL_GUID = "975E711B400CC7C37728FF9F34E4F555";
const RED_LABEL_GUID = "B322C2C94CC900001EDE3CB1B8D095AD";
const ASSASSIN_LABEL_GUID = "D8F5600D4D165ECC011CB099684C15C6";
const NEUTRAL_LABEL_GUID = "FB3F5D4B47C033D106B0D19D958DB8D9";
let x = 0;
const gameBoard: gameBoardSpace[][] = [];

interface gameState {
	turn: "red" | "blue";
}

const state: gameState = {
	turn: "red",
};

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
];
const X_COORD_VALUES = [12, 6, 0, -6, -12];
const Y_COORD_VALUES = [-18, -9, 0, 9, 18];

interface gameBoardSpace {
	type: "red" | "blue" | "neutral" | "assassin";
	guessed: boolean;
	text: string;
	//	x: number;
	//	y: number;
}

interface coord {
	x: number;
	y: number;
}

const randNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

// Converts from grid (internal representation, [0, 5)) to the game's positional units.
const gridToGamePos = (pos: coord): coord => {
	return {
		x: X_COORD_VALUES[pos.x],
		y: Y_COORD_VALUES[pos.y],
	};
};

const coordIsEqual = (a: coord, b: coord): boolean => {
	if (a.x !== b.x) return false;
	if (a.y !== b.y) return false;
	return true;
};

const generateUnusedCoords = (
	gameBoard: gameBoardSpace[][],
	gameState: typeof state
): coord => {
	while (true) {
		let coord: coord = { x: randNumber(0, 5), y: randNumber(0, 5) };
		if (gameBoard[coord.x][coord.y].type !== "neutral") continue;
		return coord;
	}
};

const printGameBoard = (gameBoard: gameBoardSpace[][]): void => {
	let outputString = "";
	for (const row of gameBoard) {
		for (const piece of row) {
			outputString += piece.type.substring(0, 1);
			+" ";
		}
		outputString += "\n";
	}
	console.log(outputString);
};

const setUpGameBoard = (gameBoard: gameBoardSpace[][]): void => {
	for (let i = 0; i < 5; i++) {
		let thisRow: gameBoardSpace[] = [];
		for (let j = 0; j < 5; j++) {
			thisRow.push({
				type: "neutral",
				guessed: false,
				text: "",
			});
		}
		gameBoard.push(thisRow);
	}
	// figure out who's going first
	if (Math.random() > 0.5) {
		state.turn = "blue";
	}

	let blueTiles = 8;
	let redTiles = 8;
	if (state.turn === "blue") {
		blueTiles++;
	} else {
		redTiles++;
	}

	gameBoard[randNumber(0, 5)][randNumber(0, 5)].type = "assassin";

	for (let i = 0; i < redTiles; i++) {
		const { x, y } = generateUnusedCoords(gameBoard, state);
		gameBoard[x][y].type = "red";
	}
	for (let i = 0; i < blueTiles; i++) {
		const { x, y } = generateUnusedCoords(gameBoard, state);
		gameBoard[x][y].type = "blue";
	}
	printGameBoard(gameBoard);
};

const drawAndPlaceCards = (deck: typeof Card): void => {
	deck.shuffle();
	for (let i = 0; i < CARD_POS.length; i++) {
		const thisCard = deck.takeCards();
		if (thisCard) {
			const [x, y] = CARD_POS[i];
			thisCard.setPosition(new Vector(x, y, TABLE_HEIGHT));
		}
	}
};

// TODO(reno): I think these are actually supposed to get placed *after* a guess, and we can use a different label
// to indicate what state a clue is without making it the same as the guess marker.
const makeLabelForClue = (
	gameBoard: gameBoardSpace[][],
	gameState: typeof state,
	loc: coord
): typeof GameObject => {
	let objGuid = NEUTRAL_LABEL_GUID;
	switch (gameBoard[loc.x][loc.y].type) {
		case "assassin":
			objGuid = ASSASSIN_LABEL_GUID;
			break;
		case "blue":
			objGuid = BLUE_LABEL_GUID;
			break;
		case "red":
			objGuid = RED_LABEL_GUID;
			break;
		default:
			break;
	}
	const gamePos = gridToGamePos(loc);
	return world.createObjectFromTemplate(
		objGuid,
		new Vector(gamePos.x, gamePos.y, TABLE_HEIGHT + 1)
	);
};

const createSetupButton = (): void => {
	const setup_btn = new Button();
	setup_btn.setText("Set up game");
	setup_btn.onClicked = (button: typeof Button, player: typeof Player) => {
		const allObjs = world.getAllObjects();
		setUpGameBoard(gameBoard);

		// TODO(reno): Add support/handling for multiple decks. Combine cards and pull randomly from them.
		for (const obj of allObjs) {
			if (
				obj.getTemplateName().includes("words_") &&
				obj.getStackSize() >= 25
			) {
				drawAndPlaceCards(obj);
				break;
			}
		}
		// now, add the labels on to the board
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				makeLabelForClue(gameBoard, state, { x: i, y: j });
			}
		}
	};
	const buttonElement = new UIElement();
	buttonElement.widget = setup_btn;
	buttonElement.useWidgetSize = true;
	buttonElement.position = new Vector(25, 0, TABLE_HEIGHT);
	world.addUI(buttonElement);
};

// TODO(reno): I want a more official setup function, but not sure what
// it would do at the moment other than call this function.
createSetupButton();
