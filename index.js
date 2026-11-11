import { menuArray } from "./data.js";

const main = document.getElementById("main")
const order = document.getElementById("order-price")
const value = document.getElementById("total-price")
const foot = document.getElementById("foot")
const modal = document.getElementById("modal")
const orderBtn = document.getElementById("order-btn")
const form = document.getElementById("form")

let totalPriceArr = []
let sum = 0

function render(arr){
    let order = arr.map((element) => {
        return `<section class="container">
                    <h2 class="emoji">${element.emoji}</h2>
                    <div class="order-info">
                        <h3>
                            ${element.name}
                        </h3>
                        <p>
                            ${element.ingredients.join(",")}
                        </p>
                        <h4>
                            $${element.price}
                        </h4>
                    </div>
                    <button class="add-btn" data-id="${element.id}">
                        +
                    </button>
               </section>`
    }).join("")

    return order
}

function renderOrder(obj){
    renderTotalPrice(obj.price)
    return `<div class="foot-main">
                <h2>${obj.name}</h2>
                <button class="remove-btn" id="${obj.id}" data-id="${obj.id}">remove</button>
                <h2 class="price">$${obj.price}</h2>
            </div>`
}

function renderTotalPrice(price = 0){
    totalPriceArr.push(price)
    sum = totalPriceArr.reduce((total, currentValue) => {
        return total + currentValue
    }, 0)
    value.innerHTML = `$${sum}`
}

function removeItem(id, elId){
    const targetElement = document.getElementById(id)
    targetElement.parentElement.remove()

    const obj = menuArray.filter((arr) => {
        return arr.id === Number(elId)
    })[0]
    const index = totalPriceArr.indexOf(obj.price);

    if (index !== -1) {
        totalPriceArr.splice(index, 1);
    }
    renderTotalPrice()
}

main.innerHTML += render(menuArray)

main.addEventListener("click", (e) => {
    if(e.target.dataset.id){
        order.innerHTML += renderOrder(menuArray[e.target.dataset.id])
        foot.classList.remove("hidden")
    }
})

foot.addEventListener("click", (e) => {
    if(e.target.dataset.id){
        removeItem(e.target.id, e.target.dataset.id)
        if(order.innerHTML.trim() === ''){
        foot.classList.add("hidden")
        }
    }
})

orderBtn.addEventListener("click", () => {
    modal.style.display = "flex"
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    let obj = Object.fromEntries(formData)

    modal.style.display = "none"

    foot.innerHTML = `<p class="order-conform">
                            Thanks,${obj.name}!Your order is on its way!
                      </p>`
})