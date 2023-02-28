//import { displayCards } from "./displayCards.js"

fetch("data.json").then(reponse => {
    return reponse.json()
}).then((data) => {
    let favStock = JSON.parse(localStorage.getItem("cards"))
    displayCards(data.cards, favStock)

    // Element de code qui permet de faire uen barre de recherche sur les titres et sous titre des cartes.
    // on récupère notre input qu'on a définis avec un ID
    const searchInput = document.getElementById("searchInput")
    // on créé l'événement keyUp qui permet d'intéragir quand la touche du clavier se relève
    searchInput.addEventListener("keyup", () => {
        // NewCards sera notre futur tableau avec les cartes filtrées, donc pour l'instant on le définis juste normal qu'il soit vide
        let newCards = []
        // on veut parcourir avec le for notre tableau contenant les cards dans ce cas c'est celui de la réponse JSON donc data.cards
        for(let i = 0; i < data.cards.length; i++) {
            // si le titre ou le sous titre est stricement vrai à la valeur écrite dans le input alors on envoie(push)la cartes(data.card[i])
            // dans le nouveau tableau(newCards). Et pour comblé les fautes de majuscule on convertis tous en minuscules avec la fonction toLowerCase()
            if(  data.cards[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) == true 
            || data.cards[i].subTitle.toLowerCase().includes(searchInput.value.toLowerCase()) == true  ) {
              newCards.push(data.cards[i])
            }
          }

        // Nous avons ici la version optimisée pour filtrer nos cartes grâce la fonction filter qui prend en paramètre
        // la fonction avec la valeur(data.cards = value)  et qui doit return ce qu'on souhaite qui sois égale à vrai.
        // Si c'est égal à vrai filter s'occuper de push dans notre nouveau tableau qu'on a définis en variable au début
        // -----------------------------------------
        // let  newCards = data.cards.filter((value)=> {
        //     return value.title.toLowerCase().includes(searchInput.value.toLowerCase()) 
        //          || value.subTitle.toLowerCase().includes(searchInput.value.toLowerCase())
        // } )
        //------------------------------------------
          displayCards(newCards)
    })
})



function displayCards(cards, favStock) {
    document.getElementById("grid_card").innerHTML=""
    for (let i = 0; i < cards.length; i++) {
        let buttonColor;
        // On récupère l'index de l'id, et si c'est supérieur à -1, il est présent dans le tableau(localStorage) du coup il est favori
        if(favStock.indexOf(parseInt(cards[i].id)) > -1 ) {
            buttonColor = "red"
        } else {
             buttonColor = "none"
        }

        // this va récupérer toute la balise ou est le this
        document.getElementById("grid_card").innerHTML +=
            `<div class="card" style="background-image: url(${cards[i].img}); background-position:${cards[i].position}" >
            <header>
            <h1>${cards[i].title}</h1><i class="fa-solid fa-heart" style="color: ${buttonColor};" onclick="addFavorite(${cards[i].id}, this)"></i>
            </header>
            <footer onclick="cardInfo(${cards[i].id})"><h2>${cards[i].subTitle}</h2></footer></div>`
    }
}

// Fonction pour ajouter les cartes en favoris dans le localStorage (devTool => application)
function addFavorite(cardsId, element) {
    //0n créer une variable qui stocker un tableau(favStock), le localStorage.getItem va chercher la valeur de la clé "cards"
    // le local storage. 
    // JSON.parse va transformer notre chaine de caractère en tableau JS
    let favStock = JSON.parse(localStorage.getItem("cards"))
    // Si le tableau(favStock) est vide ou n'existe pas alors on setItem un tableau avec un id pour le mettre dans le local storage
    if (!favStock) {
        localStorage.setItem("cards", `[${cardsId}] `)

        // element est l'injection de notre this dans la cette variable avec la quelle nous allons changer le style pour correspondre au favoris
        element.style.color="red"
    } else {
        // On vérifie si l'id n'est pas déjà dans le tableau
        if (!favStock.includes(cardsId)) {
            // si c'est le cas, on pousse(push) dans le tableau 
            favStock.push(cardsId)
            //Et comme d'habitude on réhydrate avec setItem, et cette fois si avec JSON.stringify on transforme un tableau JS 
            // en chaine de caractères.
            localStorage.setItem("cards", JSON.stringify(favStock))
            element.style.color="red"
        }else {
            // S'il est déjà dans le tableau, on récupère son index avec indexOf
            const index = favStock.indexOf(cardsId)
            // si l'index est supérieur à -1 ce qu'il est bien présent dans le tableau
            if( index > -1) {
                // Grâce à l'index on peut supprimer celui-ci en question avec splice et qu'une seul fois(1)
                favStock.splice(index, 1)
                // et on finis par réhydrater notre modification
                localStorage.setItem("cards", JSON.stringify(favStock))
                element.style.color="black"
            }
        }

    }
}

function cardInfo(cardsId) {
window.location=`http://127.0.0.1:5500/projetInfo.html?id=${cardsId}`
}
