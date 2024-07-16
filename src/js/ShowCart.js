import { data } from "./Data.js";

export class ShowCart{
    static cart = [];
    static openCart(){
        const btnOpenCart = document.querySelector(".icon-cart");
        btnOpenCart.addEventListener("click", (event) => {
            const cartElement = document.querySelector(".cart-container");
            const cartContentElement = document.querySelector(".cart-content");

            cartElement.classList.add("open");
            cartContentElement.style.animation = "slideLeft .4s ease-in forwards";
        });

        const closeCart = new ShowCart();
        closeCart.closeModalCart();
    }

    closeModalCart(){
        const btnCloseCart = document.querySelector("#closeCart");
        btnCloseCart.addEventListener("click", () => {
            const cartElement = document.querySelector(".cart-container");
            cartElement.classList.remove("open");

            const cartContentElement = document.querySelector(".cart-content");
            cartContentElement.style.animation = "none";
        })
    }

    static addToCart(){
        const btnAddCart = document.querySelector("#addToCart");
        btnAddCart.addEventListener("click", (event) => {
            event.preventDefault();
            const itemName = event.target.getAttribute("data-name");

            const item = data.find(item => item.name === itemName);

            const itemExists = this.cart.findIndex(cartItem => cartItem.id === item.id);

            if(itemExists !== -1){
                Toastify({
                    text: "Item já adicionado ao carrinho!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#FF3131",
                    },
                }).showToast();
                
                return;
            }

            this.cart.push(item);

            Toastify({
                text: "Item adicionado ao carrinho!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#50C878",
                },
            }).showToast();

            const uptade = new ShowCart();
            uptade.updateCart(item);
        });
    }

    updateCart(item){
        const cartProductsContainer = document.querySelector(".cart-products");
        cartProductsContainer.innerHTML = "";

        ShowCart.cart.forEach(item => {
            cartProductsContainer.innerHTML += `
            <div class="cart-card">
                <div class="cart-product-details">
                    <div class="cart-card-img">
                        <img src="${item.img}" alt="Imagem do produto">
                    </div>
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <span id="price-produ-cart">R$ ${item.price},00</span>
                        <div class="quantity-controls">
                            <button class="decrement">-</button>
                            <span>1</span>
                            <button class="increment">+</button>
                        </div>
                    </div>
                </div>
                <button class="remove-product">Remover</button>
            </div>
            `
        });
    }
}