const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const renderProduct = (title = 'Товар закончился', price = '$0') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>$ ${price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;
}

/*
Насколько я понял, запятые были потому что innerHTML преобразовывал массив в строку с разделителями по умолчанию в виде запятых. В качестве решения можно было собирать строку иначе, используя "" как разделитель.

Но мне больше нравится сразу выводить товар на страницу.
*/

const renderProducts = (list) => {
    const productWrap = document.querySelector('.products');
    const productList = list.map((product) => {
        productWrap.insertAdjacentHTML("beforeend", renderProduct(product.title, product.price));
    });
}

renderProducts(products);
