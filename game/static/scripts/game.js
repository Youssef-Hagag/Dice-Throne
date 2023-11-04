let tokens_container;
let token_description;
let deck_view;
let discard_view;
let deck_pile;
let tokens;
let upgrades;
let icons;
let hero_name;
let theme;
let hand = [];
let discard_pile = [];

document.addEventListener("DOMContentLoaded", () => {

    //------------------------------------------------initialization----------------------------------------------

    //disabling context menu and double click text selection
    document.oncontextmenu = () => false;
    document.addEventListener('mousedown', function(event) {
        if (event.detail > 1) {
          event.preventDefault();
        }
      }, false);

    //django template variables
    deck_pile = JSON.parse(document.getElementById("deck").textContent);
    tokens = JSON.parse(document.getElementById("tokens").textContent);
    upgrades = JSON.parse(document.getElementById("upgrades").textContent);
    icons = JSON.parse(document.getElementById("icons").textContent);
    unique_icons = removeDuplicates(icons);
    hero_name = JSON.parse(document.getElementById("hero").textContent);
    theme = JSON.parse(document.getElementById("theme").textContent);
    adjustments = JSON.parse(document.getElementById("adjustments").textContent);


    //frequently used elements
    tokens_container = document.getElementById("tokens-container");
    token_description = document.getElementById("token-description");
    deck_view = document.getElementById("deck-view");
    discard_view = document.getElementById("discard-view");

    //other preparations
    shuffleArray(deck_pile);
    createTokens(tokens);
    initializeDice();
    initializeBoard();

    //-----------------------------------------------game functions-----------------------------------------------

    //magnify hero board
    document.querySelector(".hero-board").onclick = function(){
        if(isTouchDevice())
        {
            // Effect is disabled for touch device "they can zoom in instead"
            return;
        }

        this.classList.toggle("enlarge");
        this.parentElement.classList.toggle("enlarge");
    }

    //select or deselect dice to roll
    document.querySelectorAll(".dice").forEach((dice) => {
        dice.onclick = function(){
            this.classList.toggle("selected-dice");
        }
    })

    //roll the dice
    document.querySelector(".roll-dice").onclick = () => {
        document.querySelectorAll(".dice").forEach((dice) => {
            if(dice.classList.contains("selected-dice"))
            {
                dice.innerHTML = '';
                setTimeout(()=>{
                    const roll = Math.floor((Math.random() * 6) + 1);
                    dice.innerHTML = roll;
                    dice.insertAdjacentHTML("beforeend",`
                        <img class="icon" src="/static/icons/${hero_name}/${icons[roll - 1]}.png" alt="${icons[roll - 1]}">
                    `)
                }, 500)
            }  
        })
    }

    //adjust number of tokens
    document.querySelectorAll(".change-token").forEach((button) => {
        button.onclick = function(){
            const token = this.parentElement.querySelector(".token");
            const value = parseInt(token.innerHTML);
            const max = parseInt(token.dataset.max);
            
            if(button.dataset.change == "add" && value < max)
                token.innerHTML = parseInt(token.innerHTML) + 1;
            else if(button.dataset.change == "remove" && value > 0)
                token.innerHTML = parseInt(token.innerHTML) - 1;
        }
    })

    //show token description
    tokens_container.querySelectorAll("label").forEach((label) => {
        label.onmouseover = function(){
            const token = label.parentElement.querySelector(".token");
            document.getElementById("stack-limit").innerHTML = token.dataset.max;
            token_description.innerHTML = prepareDescription(token.dataset.description);
        }
    })

    //draw from, view or shuffle the deck
    document.querySelector("#deck-pile").onmousedown = (e) => {
        if(e.button == 0 && deck_pile.length)   //left click: draw
        {
            const hand_element = document.getElementById("hand");
            const card = deck_pile.shift(); 
            hand.push(card);
    
            if(card !== undefined){
                insertCardElement(hand_element, card)
            }      
            new_card = hand_element.lastElementChild;
            handleCard(new_card);
        }

        else if(e.button == 2)   //right click: view
        {
            deck_view.style.visibility = "visible";
        }

        else if(e.button == 1)
        {
            shuffleArray(deck_pile);
            
            const deck_pile_element = document.getElementById("deck-pile");
            deck_pile_element.style.transform = "rotateY(180deg)";
            deck_pile_element.style.transitionDuration = "1s";   
            setTimeout(() =>{
                deck_pile_element.style.transform = "none"; 
            }
            ,1000);
            setTimeout(() =>{
                deck_pile_element.style.transitionDuration = "unset";
            }
            ,2000);
        }
    }

    //View or reset discard pile cards
    document.querySelector("#discard-pile").onmousedown = (e) => {
        if(e.button == 2)   //right click: view
        {
            discard_view.style.visibility = "visible";
        }
        else if(e.button == 1)   //middle click: reset deck
        {
            let card = discard_pile.shift();
            while(card !== undefined){
                deck_pile.push(card);
                insertCardElement(deck_view, card);
                card = discard_pile.shift();
            }
            discard_view.innerHTML= "<h1>Discard Pile</h1>";
            
            const discard_pile_element = document.getElementById("discard-pile");
            discard_pile_element.style.transform = "rotateY(180deg)";
            discard_pile_element.style.transitionDuration = "1s";
            setTimeout(() =>{
                discard_pile_element.style.transform = "none"; 
            }
            ,1000);
            setTimeout(() =>{
                discard_pile_element.style.transitionDuration = "unset";
            }
            ,2000);
        }
    }

    //upgrade skills
    document.querySelector(".upgrade-skill").onclick = function(){
        let slot = this.parentElement.querySelector("#slot-choice").value;
        skill = document.querySelector(".hero-container").querySelector(`[data-slot="${slot}"]`);
        const next_level = parseInt(skill.dataset.level) + 1;
        const slot_upgrades = upgrades.filter(upgrade => upgrade.slot == slot);
        const next_upgrade = slot_upgrades.find(upgrade => upgrade.level == next_level);
        skill.style.animation = "fadeIn 0.5s ease-in-out";

        if(next_upgrade){
            skill.innerHTML = "<p>" + prepareDescription(next_upgrade.description) + "</p>";
            skill.style.visibility = "visible";
            skill.dataset.level = next_level; 
        }
        else if(applyAdjustment(slot)){
            skill.dataset.level = 1;
        }
        else{
            skill.innerHTML = "<p>No Upgrade!!</p>";
            skill.style.visibility = "visible";
            skill.dataset.level = 1;
            setTimeout(() => {
                skill.style.animation = "fadeOut 0.5s ease-in-out";
            }, 500);
            setTimeout(() => {
                skill.innerHTML = "";
                skill.style.visibility = "hidden";
            }, 1000);
        }

        setTimeout(() => {
            skill.style.animation = "none";
        }, 1000);
        
    }

    deck_view.onclick = function(){
        this.style.visibility = "hidden";
    };
    discard_view.onclick = function(){
        this.style.visibility = "hidden";
    };

    //Option buttons
    document.getElementById("show-deck").onmousedown = ()=>{
        deck_view.style.visibility = "visible";
    }

    document.getElementById("show-graveyard").onmousedown = ()=>{
        discard_view.style.visibility = "visible";
    }

    document.getElementById("shuffle-deck").onmousedown = ()=>{
        shuffleArray(deck_pile);
    }

    document.getElementById("reset-graveyard").onmousedown = ()=>{
        let card = discard_pile.shift();
        while(card !== undefined){
            deck_pile.push(card);
            insertCardElement(deck_view, card);
            card = discard_pile.shift();
        }
        discard_view.innerHTML= "<h1>Discard Pile</h1>";
    }

})

//-------------------------------------------------------------Helper functions--------------------------------------------------
function createTokens(tokens){
    tokens.forEach((token) => {
        tokens_container.insertAdjacentHTML("beforeend",`
        <div class="token-container">
            <label> ${token.name} </label>
            <button data-change="remove" class="change-token button"> - </button>
            <div data-description = "${token.description}" data-max = "${token.max}" class="token"> 0 </div>
            <button data-change="add" class="change-token button"> + </button>
        </div>
        `)
    })
}

//sets up any hero skill adjustments at the start
function initializeBoard(){
    for (let i = 1; i < 10; i++) {
        applyAdjustment(i);
    }
}

//returns true only if there was an adjustment for the skill
function applyAdjustment(slot){
    adjustment = adjustments.find(adjustment => adjustment.slot == slot);
    if(adjustment)
    {
        skill = document.querySelector(".hero-container").querySelector(`[data-slot="${slot}"]`);
        skill.innerHTML = "<p>" + prepareDescription(adjustment.description) + "</p>";
        skill.style.visibility = "visible";
        return true;
    }
    return false;
}

function initializeDice(){
    all_dice = document.querySelectorAll(".dice");
    all_dice.forEach(function(dice){
        dice.style.backgroundColor = theme;
        //if the theme of the hero is too bright we adjust its dice selector to a more suitable color
        const red = parseInt(theme[1]+theme[2],16); 
        const green = parseInt(theme[3]+theme[4],16); 
        const blue = parseInt(theme[5]+theme[6],16);
        if (red + green + blue > 382)
            document.querySelectorAll(".selected-dice").forEach((border)=>{
                border.style.borderColor = "#c92525";
                dice.style.color = "#111111";
            })        

        dice.insertAdjacentHTML("beforeend",`
            <img class="icon" src="/static/icons/${hero_name}/${icons[5]}.png" alt="${icons[5]}">
        `)
    })
}

function updateDeckView(){
    deck_view.innerHTML = "<h1> Deck </h1>";
    deck_pile.forEach(card => {
        insertCardElement(deck_view, card);
    });
}

//adds a card's event listner to be able to play it later (discard it)
function handleCard(card_element){
    //when the card is drawn it no longer shows when veiwing the deck
    deck_view.removeChild(deck_view.firstElementChild.nextElementSibling);
    
    card_element.onmousedown = function(e){
        const name = card_element.querySelector(".card-name").innerText;
        const card = hand.find(card => card.name == name);
        if(e.button == 0)   //left click: play/discard
        {
            discard_pile.push(card);
            insertCardElement(discard_view, card);
        }
        else if(e.button == 2)  //right click: return to deck end
        {
            deck_pile.push(card);
            insertCardElement(deck_view, card);
        }   
        card_element.remove();
    }
}

function insertCardElement(element, card){
    let card_description = prepareDescription(card.description);

    element.insertAdjacentHTML("beforeend",`
        <div class = "${card.phase} card">
            <div class = "card-name">
                ${card.name}
            </div>
            <hr class = "${card.phase}">
            <div class ="${card.phase} card-cost">
                ${card.cost}CP
            </div>
            <div class="card-description">
                <p>    
                    ${card_description}
                </p>
            </div>
        </div>`);
}

//replaces line ends by <br> tag and replaces icon names by the actual icons
function prepareDescription(description){
    description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    description = description.replaceAll("dice", '<img class="icon" style="background-color:unset; padding:unset;" src="/static/other_images/dice.png" alt="dice">');

    unique_icons.forEach(icon => {
        description = description.replaceAll(icon, `
        <img class="icon" src="/static/icons/${hero_name}/${icon}.png" alt="${icon}">
        `);
    }); 

    return description;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    updateDeckView();
}

//removing duplicate icon names, used mainly for textToIcons
function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

//detects if the device is a touch device (tablet or phone), for styling purposes
function isTouchDevice() {
    if(window.matchMedia("(any-pointer: coarse)").matches) {
        // touchscreen
        return true;
    }
}
