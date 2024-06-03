class Card {
    constructor(name, colors) {
        this._name = name;
        this._colors = colors;
    }
    get name() {
        return this._name;
    }
    get colors() {
        return this._colors;
    }
}
class Spell extends Card {
    constructor(name, colors, cost, strategies) {
        super(name, colors);
        this._cost = cost;
        this._strategies = strategies;
    }
    get cost() {
        return this._cost;
    }
    get strategies() {
        return this._strategies;
    }
}
class Permanent extends Spell {
    constructor(name, colors, cost, strategies, legendary) {
        super(name, colors, cost, strategies);
        this._legendary = legendary;
    }
    get legendary() {
        return this._legendary;
    }
}
class Creature extends Permanent {
    constructor(name, colors, cost, strategies, legendary, partners, types) {
        super(name, colors, cost, strategies, legendary);
        this._partners = partners;
        this._types = types;
    }
    get partners() {
        return this._partners;
    }
    get types() {
        return this._types;
    }
}
class Enchantment extends Permanent {
    constructor(name, colors, cost, strategies, legendary) {
        super(name, colors, cost, strategies, legendary);
    }
}

// strategies
const aristocrat = "aristocrat";
const creatureTokens = "creature tokens";
const deathtouch = "deathtouch";
const deathTrigger = "death trigger";
const enchantment = "enchantment";
const flying = "flying";
const keywordCounters = "keyword counters";
const lifeGain = "life gain";
const playFromExile = "play from exile";
const plus1Counters = "plus 1 counters";
const reanimation = "reanimation";
const sacrifice = "sacrifice";
const saga = "saga";
const treasure = "treasure";
const tribal = "tribal";
const strategies = [aristocrat, creatureTokens, deathtouch, deathTrigger, enchantment, flying, keywordCounters, lifeGain, playFromExile, plus1Counters, reanimation, sacrifice, saga, treasure, tribal];

// cards
const dogmeatEverLoyal = new Creature("Dogmeat, Ever Loyal", ["Green", "Red", "White"], [1, 1, 1, 0], [], true, [], ["Dog"]);
const tomBombadil = new Creature("Tom Bombadil", ["Black", "Black", "Green", "Red", "White"], [1, 1, 1, 1, 1, 0], [saga, enchantment], true, [], ["God", "Bard"]);
const cards = [dogmeatEverLoyal, tomBombadil];

// add images to cards
cards.forEach(card => {
    card.image = `<img src="./cards/${card.name}.jpg" id="${card.name}" alt="${card.name}">`;
});

// displays strategies form for displayed card
const stratMax = 3;
let cardIndex = 0;
let currentCard = cards[cardIndex];
const updateForm = () => {
    document.getElementById("displayedCard").innerHTML = currentCard.image;
    document.getElementById("strats").innerHTML = "";
    for (let i = 1; i <= stratMax; i++) {
        document.getElementById("strats").innerHTML += `<div>
            <label for="${currentCard.name}_strat${i}">Strategy ${i}:</label>
            <input list="${currentCard.name}_strats${i}" name="${currentCard.name}_strat${i}" id="${currentCard.name}_strat${i}">
            <datalist id="${currentCard.name}_strats${i}">
                ${i > 1 ? "<option value=\"none\">" : ""}
            </datalist>
        </div>`;
        strategies.forEach(strategy => {
            document.getElementById(`${currentCard.name}_strats${i}`).innerHTML += `<option value="${strategy}">`;
        });
    }
};
updateForm();

// updates strategies for displayed card
const updateCurrentCardStrats = () => {
    let currentCardStrats = [];
    for (let i = 1; i <= stratMax; i++) {
        let pushStrat = document.getElementById(`${currentCard.name}_strat${i}`).value;
        if (pushStrat && pushStrat !== "none") {
            currentCardStrats.push(pushStrat);
        }
    }
    currentCard.strategies = currentCardStrats;
}

// displays next card
document.getElementById("prev").onclick = () => {
    if (cardIndex > 0) {
        updateCurrentCardStrats();
        currentCard = cards[--cardIndex];
        updateForm();
    }
};
document.getElementById("next").onclick = () => {
    if (cardIndex < cards.length - 1) {
        updateCurrentCardStrats();
        currentCard = cards[++cardIndex];
        updateForm();
    }
};
document.getElementById("prepSubmit").onclick = () => {
    let emailBody = "";
    cards.forEach(card => {
        emailBody += `${card.name}: ${card.strategies.join(", ")}%0D%0A`;
    });
    document.getElementById("submit").href = `mailto:lucaswselby@gmail.com?subject=MTG Strategies&body=${emailBody}`;
};