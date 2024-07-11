export class ShowCart{
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
}