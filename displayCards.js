export const displayCards = (cards, favStock, callback) => {
    document.getElementById("grid_card").innerHTML=""
    let events = [];
    for (let i = 0; i < cards.length; i++) {
        let buttonColor;
        // On récupère l'index de l'id, et si c'est supérieur à -1, il est présent dans le tableau(localStorage) du coup il est favori
        if(favStock.indexOf(parseInt(cards[i].id)) > -1 ) {
            buttonColor = "red"
        } else {
             buttonColor = "none"
        }
        const cardId = `cards-${cards[i].id}`

        // this va récupérer toute la balise ou est le this
        document.getElementById("grid_card").innerHTML +=
            `<div class="card" style="background-image: url(${cards[i].img}); background-position:${cards[i].position}">
            <header>
            <h1>${cards[i].title}</h1><i id="${cardId}" class="fa-solid fa-heart" style="color: ${buttonColor};"></i>
            </header>
            <footer><h2>${cards[i].subTitle}</h2></footer></div>`
        
            events.push(document.getElementById(`cards-${cards[i].id}`).addEventListener("click", ()=> {
            console.log("totos")
            callback(cards[i].id, null)
        }))
    }
}