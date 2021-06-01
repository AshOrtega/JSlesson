class ProductInCart extends ProductItem {
    constructor(product, img='https://via.placeholder.com/200x150', quantity = 0) {
        super(product, img='https://via.placeholder.com/200x150');
        this.quantity = quantity;
    }

    addOneMoreProduct(); //Добавляет +1 продукт в корзину
    removeOneProduct(); //Убирает 1 продукт или удаляет, если последний
    deleteFromCart(); //Удаляет продукт из корзины
    /*render возьмем из родителя. Только надо в родителе прописать смену кнопки "В корзину" на "+1", 
    если в корзине уже есть хотя бы один товар.
    Возможно все эти методы уедут в родителя. Они там тоже уместны. */
}

class Cart {
    constructor(container = '.products-in-cart') {
        this.container = container;
    }
    
    getTotalPrice(); //Считаем сумму по корзине
    renderCart(); //Отображаем карзину на страничке
    clearCart(); //Чистим всю корзину
}