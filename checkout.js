const formCheckout = document.getElementById("formCheckout")
const errorName = document.getElementById("error-name")
const regexName = "^[a-zA-Z]+$"

let clickOnSubmit = false 

formCheckout.addEventListener("submit", (event) => {
    clickOnSubmit = true
    event.preventDefault()
    if(!formCheckout.name.value.match(regexName)) {
        errorName.innerHTML="Ce champ doit contenir que des lettres !"
    } else {
        errorName.innerHTML=""
    }
})


formCheckout.addEventListener("keyup", (event) => {
    event.preventDefault()
    if(clickOnSubmit == true) {
        if(!formCheckout.name.value) {
            errorName.innerHTML="Ce champ doit être remplis"
        } else if(!formCheckout.name.value.match(regexName)) {
            errorName.innerHTML="Ce champ doit contenir que des lettres !"
        } else {
            errorName.innerHTML=""
        }
    }
   
})