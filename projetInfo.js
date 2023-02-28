
const searchParams = new URLSearchParams(window.location.search)
let cardsId = searchParams.get("id")

fetch("data.json").then(reponse => {
    return reponse.json()
}).then((data) => {
    //on reserve une place pour la carte
    let card;
    //on cherche la carte
    for (let i = 0; i < data.cards.length; i++) {
        if (data.cards[i].id == cardsId) {
            card = data.cards[i]
            break;
        }
    }
    //on affiche la carte trouve
    console.log(card)
    displayCard(card)

})

function displayCard(card) {
    let favStock = JSON.parse(localStorage.getItem("cards"))
    document.getElementById("infoCard").innerHTML = ""
    let buttonColor;
    // On récupère l'index de l'id, et si c'est supérieur à -1, il est présent dans le tableau(localStorage) du coup il est favori
    if (favStock.indexOf(parseInt(card.id)) > -1) {
        buttonColor = "red"
    } else {
        buttonColor = "none"
    }
    // this va récupérer toute la balise ou est le this
    document.getElementById("infoCard").innerHTML +=
        `<div class="card" style="background-image: url(${card.img}); background-position:${card.position}" onclick="cardInfo(${card.id})">
            <header>
            <h1>${card.title}</h1><i class="fa-solid fa-heart" style="color: ${buttonColor};" onclick="addFavorite(${card.id}, this)"></i>
            </header>
            <footer><h2>${card.subTitle}</h2></footer></div>`
}

let inputcardNb = document.getElementById("cardNb")
let formBasket = document.getElementById("formBasket")

formBasket.addEventListener("submit", (event) => {
    cardNb = parseInt(inputcardNb.value)
    event.preventDefault()
    let basketCards = JSON.parse(localStorage.getItem("basketCards"))
    if (basketCards) {
        for (let i = 0; i < basketCards.length; i++) {
            if (basketCards[i].cardId == cardsId) {
                basketCards[i].cardNb += cardNb
                localStorage.setItem("basketCards", JSON.stringify(basketCards))
                return
            }
        }
    }
    if (cardNb > 0 && !basketCards) {
        let card = {
            "cardId": cardsId,
            "cardNb": cardNb
        }
        card = JSON.stringify(card)
        localStorage.setItem("basketCards", `[${card}] `)
    } else if (basketCards) {
        let card = {
            "cardId": cardsId,
            "cardNb": cardNb
        }
        basketCards.push(card)
        localStorage.setItem("basketCards", JSON.stringify(basketCards))
    }
})

