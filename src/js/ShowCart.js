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

    static addToCart(produto){
        const produtosPorNome = this.filtrarPorNome(produto.name);

        if(produtosPorNome.length == 0){
            this.adicionarProduto(produto);
            return;
        } else{
            const sizeColorIgual = this.filtrarPorNomeTamCor(produto.name, produto.color, produto.size);
            
            if(sizeColorIgual.length == 0){
                this.adicionarProduto(produto);
                return;
            } else{
                Toastify({
                    text: "Este produto já está no carrinho com esse tamanho e cor.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#F72464",
                    },
                }).showToast();

                return;
            }
        }
    }

    static adicionarProduto(produto){
        this.cart.push(produto);

        Toastify({
            text: `${produto.name} adicionado ao carrinho.`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#6C48C5",
            },
        }).showToast();

        const callUpdateCart = new ShowCart();
        callUpdateCart.updateCart();
    }

    static filtrarPorNome(produtoNome){
        const resultado = this.cart.filter(item => item.name === produtoNome);
        return resultado;
    }
    static filtrarPorNomeTamCor(name, color, size){
        const resultado = this.cart.filter(item => item.name === name && item.color === color && item.size === size);
        return resultado;
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
        this.removeItemFromCart();
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
                    <button class="remove-product" data-name="${item.name}" data-color="${item.color}" data-size="${item.size}">Remover</button>
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
                const itemColor = event.target.getAttribute("data-color");
                const itemSize = event.target.getAttribute("data-size");

                const indexItem = ShowCart.cart.findIndex(cartItem => cartItem.name === itemName && cartItem.color === itemColor 
                    && cartItem.size === itemSize);

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