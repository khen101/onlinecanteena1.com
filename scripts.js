window.addEventListener("scroll",function(){
    if(this.pageYOffset >60){
        document.querySelector(".header").classList.add("sticky");
    }
    else{
        document.querySelector(".header").classList.remove("sticky")
    }
});


let cart = document.querySelectorAll('.btn-default');

let products = [
    {
        name: 'Kalderetang Kambing',
        tag: 'kalderetangkambing',
        price: 160,
        inCart: 0
    },

    {
        name: 'Champeni Kambing',
        tag: 'champenikambing',
        price: 140,
        inCart: 0
    },

    {
        name: 'Gotong Batangas',
        tag: 'GotongBatangas',
        price: 80,
        inCart: 0
    },

    {
        name: 'Kare-kare',
        tag: 'Karekare',
        price: 100,
        inCart: 0
    },

    {
        name: 'Pork Menudo',
        tag: 'porkmenudo',
        price: 80,
        inCart: 0
    },

    {
        name: 'Pork Sisig',
        tag: 'porksisig',
        price: 120,
        inCart: 0
    },

    {
        name: 'Pork Dinuguan',
        tag: 'porkdinuguan',
        price: 80,
        inCart: 0
    },

    {
        name: 'Lomi',
        tag: 'lomi',
        price: 100,
        inCart: 0
    },

    {
        name: 'Pancit Bihon',
        tag: 'pancitbihon',
        price: 100,
        inCart: 0
    },

    {
        name: 'Pancit Canton',
        tag: 'pancitcanton',
        price: 100,
        inCart: 0
    },

    {
        name: 'Miki Bihon',
        tag: 'mikibihon',
        price: 100,
        inCart: 0
    }
];
for (let i=0; i < cart.length ; i++) {
    cart[i].addEventListener('click', ()=> {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItem(products);
}
function setItem(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else{
        products.inCart = 1;
    cartItems = {
         [products.tag]:products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(products){
    //console.log("The product is", products.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else{
        localStorage.setItem("totalCost", products.price);
    }

}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector(".products");
    console.log(cartItems);
    if(cartItems && productsContainer){
        productsContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productsContainer.innerHTML += `
            <div class="products">
            <ion-icon name="close-circle"></ion-icon>
            <span>${item.name}<span>
            </div>
            <div class="price">${item.price}.00</div>
            <div class="quantity">
            <ion-icon class="decrease"
            <ion-icon name="arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase"
            <ion-icon name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                ${item.inCart * item.price}.00
            </div>
            `;
        });
    }
}
onLoadCartNumbers();
displayCart();