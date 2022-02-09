const { refObject, UIElement, GameObject, Rotator, Vector, refCard } = require('@tabletop-playground/api');

// make a 3x3
const pos = [
    new Vector(0,0,0),
    new Vector(0,1,0),
    new Vector(0,2,0),
    new Vector(0,3,0),
    new Vector(0,4,0),
    new Vector(0,5,0),
    new Vector(0,6,0),
    new Vector(0,7,0),
    new Vector(0,8,0),
]


console.log(refCard.takeCards(1));