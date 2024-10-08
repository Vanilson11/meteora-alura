export class ShowCart{
    static cart = [];
    soma = 0;
    somaTotal = this.soma;
    totalElement = document.querySelector("#total-price")
    static openCart(){
        const btnOpenCart = document.querySelector(".icon-cart");
        btnOpenCart.addEventListener("click", () => {
            const cartElement = document.querySelector(".cart-container");
            const cartContentElement = document.querySelector(".cart-content");

            cartElement.classList.add("open");
            cartContentElement.style.animation = "slideRight .4s ease-in forwards";

            if(ShowCart.cart.length == 0){
                const cartProductsContainer = document.querySelector(".cart-products");
                cartProductsContainer.innerHTML = this.cartEmptyHtml();
            }
        });

        const callMethods = new ShowCart();
        callMethods.updateCart();
        callMethods.closeModalCart();
    }

    static cartEmptyHtml(){
        return `
            <div class="cart-empty-container">
                <div class="empty-icon">
                    <i class="ph ph-warning-circle"></i>
                    <h3>Seu carrinho está vazio!</h3>
                </div>
            </div>
        `
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
                this.callToast(produto);

                let newPrice = 0;

                sizeColorIgual.forEach(item => {
                    item.qty++;

                    const callMethods = new ShowCart();
                    callMethods.calcNewPrice(newPrice, item);

                    callMethods.updateCart();
                });
                return;
            }
        }
    }

    static adicionarProduto(produto){
        this.cart.push(produto);

        this.callToast(produto);

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

    calcNewPrice(newPrice, item){
        newPrice = item.price * item.qty;
        this.soma+= newPrice;
        this.somaTotal = this.soma;
        this.totalElement.textContent = this.somaTotal.toFixed(2);
    }

    static callToast(produto){
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
    }

    updateCart(){
        const itensCart = ShowCart.cart;

        this.soma = 0;

        if(itensCart.length == 0){
            const cartProductsContainer = document.querySelector(".cart-products");
            cartProductsContainer.style.height = "100%";
            cartProductsContainer.style.display = "flex";
            cartProductsContainer.style.flexDirection = "row";
            cartProductsContainer.style.alignItems = "center";
            cartProductsContainer.style.justifyContent = "center";
            
            cartProductsContainer.innerHTML = ShowCart.cartEmptyHtml();

            this.soma = 0;
            
            this.totalElement.textContent = this.soma.toFixed(2);

            return;
        }

        const cartProductsContainer = document.querySelector(".cart-products");
        cartProductsContainer.style.height = "100%";
        cartProductsContainer.style.display = "flex";
        cartProductsContainer.style.flexDirection = "column";
        cartProductsContainer.style.alignItems = "flex-start";
        cartProductsContainer.style.justifyContent = "flex-start";


        this.createElementsCart(itensCart);
        this.removeItemFromCart();
    }

    createElementsCart(itensCart){
        const cartProductsContainer = document.querySelector(".cart-products");
        cartProductsContainer.innerHTML = "";
        
        let newPrice = 0;

        itensCart.forEach(item => {
            cartProductsContainer.innerHTML += this.appendElementCart(item);

            this.calcNewPrice(newPrice, item);

            this.handleQty();
        });
    }

    appendElementCart(item){
        return `
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
                        <button class="decrement" data-name="${item.name}" data-color="${item.color}" data-size="${item.size}">-</button>
                        <span class="item-qty">${item.qty}</span>
                        <button class="increment" data-name="${item.name}" data-color="${item.color}" data-size="${item.size}">+</button>
                    </div>
                </div>
            </div>
        `
    }

    removeItemFromCart(){
        const cartProductsContainer = document.querySelector(".cart-products");

        cartProductsContainer.addEventListener("click", (event) => {
            if(event.target.classList.contains("remove-product")){
                const { name, color, size } = event.target.dataset;
                const indexItem = ShowCart.cart.findIndex(cartItem => cartItem.name === name && cartItem.color === color 
                    && cartItem.size === size);

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
                    const { name, color, size } = event.target.dataset;
                    const item = ShowCart.filtrarPorNomeTamCor(name, color, size);
                    
                    item.forEach(p => {
                        p.qty++;

                        this.updateCart();
                    });
                    
                    return;
                }

                if(event.target.classList.contains("decrement")){
                    const { name, color, size } = event.target.dataset;
                    const item = ShowCart.filtrarPorNomeTamCor(name, color, size);

                    item.forEach(p => {
                        if(p.qty === 1){
                            return;
                        } else{
                            p.qty--;
    
                            this.updateCart();
                        }
                    });
                    
                    return;
                }
            });
        });
    }
}