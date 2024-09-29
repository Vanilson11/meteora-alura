export class ShowCart{
    static cart = [];
    soma = 0;
    somaTotal = this.soma;
    static openCart(){
        const btnOpenCart = document.querySelector(".icon-cart");
        btnOpenCart.addEventListener("click", (event) => {
            const cartElement = document.querySelector(".cart-container");
            const cartContentElement = document.querySelector(".cart-content");

            cartElement.classList.add("open");
            cartContentElement.style.animation = "slideRight .4s ease-in forwards";

            if(ShowCart.cart.length == 0){
                const cartProductsContainer = document.querySelector(".cart-products");
                cartProductsContainer.innerHTML = `
                    <div class="cart-empty-container">
                        <div class="empty-icon">
                            <i class="ph ph-warning-circle"></i>
                            <h3>Seu carrinho está vazio!</h3>
                        </div>
                    </div>
                `
            }
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

    static addToCart(itens){
        itens.forEach(item => {
            Toastify({
                text: `${item.name} Adicionado ao carrinho!`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
              }).showToast();
        });
    }

    updateCart(){
        const itensCart = ShowCart.cart;

        const totalElement = document.querySelector("#total-price");

        this.soma = 0;

        if(itensCart.length == 0){
            const cartProductsContainer = document.querySelector(".cart-products");
            cartProductsContainer.innerHTML = `
                <div class="cart-empty-container">
                    <div class="empty-icon">
                        <i class="ph ph-warning-circle"></i>
                        <h3>Seu carrinho está vazio!</h3>
                    </div>
                </div>
            `

            this.soma = 0;
            totalElement.textContent = this.soma.toFixed(2);

            return;

        }

        this.createElementsCart(itensCart, totalElement);
    }

    createElementsCart(itensCart, totalElement){
        const cartProductsContainer = document.querySelector(".cart-products");
        cartProductsContainer.innerHTML = "";

        let newPrice = 0;

        itensCart.forEach(item => {
            cartProductsContainer.innerHTML += `
            <div class="cart-card">
                <div class="cart-product-details">
                    <div class="cart-card-img">
                        <img src="${item.img}" alt="Imagem do produto">
                    </div>
                    <div class="product-info">
                        <h4>${item.name}</h4>
                        <span>Tamanho: ${item.size}</span>
                        <span>Cor: ${item.color}</span>
                        <span id="price-produ-cart">R$ ${item.price},00</span>
                    </div>
                </div>
                <div class="buttons-container">
                    <button class="remove-product" data-name="${item.name}">Remover</button>
                    <div class="quantity-controls">
                        <button class="decrement" data-name="${item.name}">-</button>
                        <span class="item-qty">${item.qty}</span>
                        <button class="increment" data-name="${item.name}">+</button>
                    </div>
                </div>
            </div>
            `

            newPrice = item.price * item.qty;
            this.soma+= newPrice;
            this.somaTotal = this.soma;

            totalElement.textContent = this.somaTotal.toFixed(2);

            this.handleQty();
            
        });
    }

    removeItemFromCart(){
        const cartProductsContainer = document.querySelector(".cart-products");

        cartProductsContainer.addEventListener("click", (event) => {
            if(event.target.classList.contains("remove-product")){
                const itemName = event.target.getAttribute("data-name");
                
                const indexItem = ShowCart.cart.findIndex(cartItem => cartItem.name === itemName);

                if(indexItem !== -1){
                    ShowCart.cart.splice(indexItem, 1);
                    this.updateCart();
                }
            }
        });
    }

    handleQty(){
        const btnsQty = document.querySelectorAll(".quantity-controls button");
        btnsQty.forEach(btn => {
            btn.addEventListener("click", (event) => {
                if(event.target.classList.contains("increment")){
                    const itemName = event.target.getAttribute("data-name");
                    const item = ShowCart.cart.find(item => item.name === itemName);

                    item.qty++;
                    
                    this.updateCart();
                }

                if(event.target.classList.contains("decrement")){
                    const itemName = event.target.getAttribute("data-name");
                    const item = ShowCart.cart.find(item => item.name === itemName);

                    if(item.qty === 1){
                        return;
                    } else{
                        item.qty--;

                        this.updateCart();
                    }
                }
            });
        });
    }
}