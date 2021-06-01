'use strict';

class BurgerControls {
    constructor(id) {
        this.id = id;
        this.toppingList = toppingsAll;
        this.render();
    }

    render() {
        document.querySelector(".hamburger-controls").insertAdjacentHTML('beforeend', 
        `<div class="hamburger-controls__burger-wrap" data-id = '${this.id}'>
            <p class="hamburger-controls__quantity-heading">Укажите количество бургеров:</p>
            <input class="burgerQuantity" type="number" name="burgerQuantity" value='1' data-id = '${this.id}'>
            <div class="size">
            <p class="hamburger-controls__quantity-heading">Размер:</p>
            <label><input class="size-radio" name="size-${this.id}" type="radio" value="little" checked data-id = '${this.id}'>Little</label>
            <label><input class="size-radio" name="size-${this.id}" type="radio" value="big" data-id = '${this.id}'>Big</label>
            </div>
            <p class="hamburger-controls__topping-heading">Добавьте добавок:</p>
        </div>`);

        const blockToFill = document.querySelector(`.hamburger-controls__burger-wrap[data-id = '${this.id}']`);
        for (let topping of this.toppingList) {
            blockToFill.insertAdjacentHTML('beforeend', `
            <div class="hamburger-controls__topping">
                <div class=hamburger-controls__topping-name>${topping.printName}</div>
                <input class="topping-quantity" type="number" name="${topping.name}Quantity" data-id = '${this.id}' data-topping = '${topping.name}' value='0'>
                <button class="btn-add" data-id = '${this.id}' data-topping = '${topping.name}'>+</button>
                <button class="btn-remove" data-id = '${this.id}' data-topping = '${topping.name}'>-</button>
            </div>
            `)

            document.querySelector(`.btn-add[data-topping='${topping.name}'].btn-add[data-id='${this.id}']`).addEventListener('click', () => {addTopping(topping.name, this.id)});
            document.querySelector(`.btn-remove[data-topping='${topping.name}'].btn-remove[data-id='${this.id}']`).addEventListener('click', () => {removeTopping(topping.name, this.id)})
        }
    }
}


function addTopping(name, id) {
    document.querySelector(`.topping-quantity[data-topping='${name}'].topping-quantity[data-id='${id}']`).value++;
    getTotals()
};

function  removeTopping(name, id) {
    if (document.querySelector(`.topping-quantity[data-topping='${name}'].topping-quantity[data-id='${id}']`).value != 0) {
        document.querySelector(`.topping-quantity[data-topping='${name}'].topping-quantity[data-id='${id}']`).value--;
    };
    getTotals()
}

function getTotals() {
    let burgerSum = 0;
    let burgerCal = 0;
    for (let i = 0; i < burgers.length; i++) {
        let toppingSum = 0;
        let toppingCal = 0;
        for (let j = 0; j < burgers[i].toppingList.length; j++) {
            let valueEL = document.querySelector(`.topping-quantity[data-topping='${burgers[i].toppingList[j].name}'].topping-quantity[data-id='${burgers[i].id}']`).value;
            toppingSum += valueEL*burgers[i].toppingList[j].price;
            toppingCal += valueEL*burgers[i].toppingList[j].cal;
        }

        if (document.querySelector(`.size-radio[data-id='${burgers[i].id}'].size-radio:checked`).value == 'little') {
            toppingSum += 50;
            toppingCal += 20;
        } else {
            toppingSum += 100;
            toppingCal += 40;
        };

        burgerSum += toppingSum * document.querySelector(`.burgerQuantity[data-id='${burgers[i].id}']`).value;
        burgerCal += toppingCal * document.querySelector(`.burgerQuantity[data-id='${burgers[i].id}']`).value;
    }
    document.querySelector('.total-price').innerHTML = burgerSum;
    document.querySelector('.total-cal').innerHTML = burgerCal;
}

const toppingsAll = [
    {name: "cheese", price: 10, cal: 20, printName: "Сыр"},
    {name: "salad", price: 20, cal: 5, printName: "Салат"},
    {name: "potato", price: 5, cal: 10, printName: "Картошка"},
    {name: "spice", price: 15, cal: 0, printName: "Специи"},
    {name: "mayo", price: 20, cal: 5, printName: "Майонез"},
];

let burgerId = 0;
let burgers = [];
burgers.push(new BurgerControls('burger' + burgerId));

document.querySelector('.btn-one-more').addEventListener('click', () => {
    burgerId++;
    burgers.push(new BurgerControls('burger' + burgerId));
})

document.querySelector('.hamburger-controls').addEventListener('change', getTotals);