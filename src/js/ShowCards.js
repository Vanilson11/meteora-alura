import { data } from "./Data.js";
export class ShowCards{
  static showCards(){
    const cardsContainer = document.querySelector(".products-wrapper");
    cardsContainer.innerHTML = "";

    this.addItemHtml(cardsContainer);
  }

  static addItemHtml(cardsContainer){
    data.forEach(item => {
      cardsContainer.innerHTML += `
        <div class="product-card">
            <div class="product-img">
              <img src="${item.img}" alt="">
            </div>
            <div class="product-infos">
              <div class="desciption">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
              </div>
              <p id="price">
                ${item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
              <button id="seeMore" 
                data-img="${item.img}"
                data-name="${item.name}"
                data-description="${item.description}"
                data-price="${item.price}"
              >
                Ver mais
              </button>
            </div>
          </div>
      `
    });
  }
}