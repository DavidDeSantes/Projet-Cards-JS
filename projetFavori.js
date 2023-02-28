import { displayCards } from "./displayCards.js"

let cards = []

fetch("data.json").then(reponse => {
    return reponse.json()
}).then((data) => {
    cards = data.cards
    let favCard = getFavoriteCards()
    let favStock = JSON.parse(localStorage.getItem("cards"))
    displayCards(favCard, favStock, deleteFav)
})

function getFavoriteCards() {
    let favStock = JSON.parse(localStorage.getItem("cards"))

    let displayFavStock = cards.filter((value) => {
        return favStock.includes(parseInt(value.id))
    })

    return displayFavStock;
}

let deleteFav= (cardsId, element)=> {
    let favStock = JSON.parse(localStorage.getItem("cards"))

    const index = favStock.indexOf(cardsId)
    // si l'index est supérieur à -1 ce qu'il est bien présent dans le tableau
    if( index > -1) {
        // Grâce à l'index on peut supprimer celui-ci en question avec splice et qu'une seul fois(1)
        favStock.splice(index, 1)
        // et on finis par réhydrater notre modification
        localStorage.setItem("cards", JSON.stringify(favStock))
        element.style.color="black"
        displayFavoriteCards()
    }
}


