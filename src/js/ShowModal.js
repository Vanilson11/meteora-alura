import { SendPedido } from "./SendPedido.js";
import { ShowCart } from "./ShowCart.js";

export class ShowModal{
  static showModalProduct(){
    const btnSeeMore = document.querySelectorAll("#seeMore");

    btnSeeMore.forEach(btn => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();

        const modal = document.querySelector(".modal-product-wrapper");
        const modalContainer = document.querySelector(".modal-product-wrapper-container");

        modalContainer.style.animation = "slideLeft .4s ease-in forwards";
        modal.classList.toggle("open");

        this.modalConstructor(event.target);
        new SendPedido().setEvent();
        ShowCart.addToCart();
      });
    });
  }

  static modalConstructor(btnTarget){
    const modalProductContent = document.querySelector(".modal-product-content");
    modalProductContent.innerHTML = `
      <div class="modal-product-img">
        <img src="${btnTarget.dataset.img}" alt="">
      </div>
      <div class="modal-product-options">
        <div class="modal-product-description">
          <h3>${btnTarget.dataset.name}</h3>
          <p>Modelo unissex oversized com gola de camurça. Atemporal e autêntica!</p>
        </div>
        <div class="modal-product-price">
          <p>R$ ${btnTarget.dataset.price},00</p>
          <span>Vendido e entregue por Riachuelo</span>
        </div>
        <form id="form-modal">
          <fieldset>
            <legend>Cores:</legend>
            <div class="input-color-wrapper">
              <div class="color">
                <input type="radio" name="inColor" id="inData" data-input="Azul claro" required/>
                <label for="light-blue">Azul claro</label>
              </div>
              <div class="color">
                <input type="radio" name="inColor" id="inData" data-input="Offwhite" required/>
                <label for="white">Offwhite</label>
              </div>
              <div class="color">
                <input type="radio" name="inColor" id="inData" data-input="Preto" required/>
                <label for="black">Preto</label>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Tamanho: </legend>
            <div class="input-size-wrapper">
              <div class="size">
                <input type="radio" name="inSize" id="inData" data-input="P" required/>
                <label for="size-P">P</label>
              </div>
              <div class="size">
                <input type="radio" name="inSize" id="inData" data-input="PP" required/>
                <label for="size-PP">PP</label>
              </div>
              <div class="size">
                <input type="radio" name="inSize" id="inData" data-input="M" required/>
                <label for="size-M">M</label>
              </div>
              <div class="size">
                <input type="radio" name="inSize" id="inData" data-input="G" required/>
                <label for="size-G">G</label>
              </div>
              <div class="size">
                <input type="radio" name="inSize" id="inData" data-input="GG" required/>
                <label for="size-GG">GG</label>
              </div>
            </div>
          </fieldset>
          <div class="form-btns-wrapper">
            <input 
              class="btn-send"
              type="submit" 
              value="Comprar agora"
              data-name="${btnTarget.dataset.name}"
              data-price="${btnTarget.dataset.price}"
            />
            <button id="addToCart" data-name="${btnTarget.dataset.name}">Adicionar à Sacola</button>
          </div>
        </form>
      </div>
    `;
    //sendPedido();
  }

  static closeModalProduct(){
    const btnCloseModal = document.querySelector(".close-modal");

    btnCloseModal.addEventListener("click", (event) => {
      const modal = document.querySelector(".modal-product-wrapper");
      const modalContainer = document.querySelector(".modal-product-wrapper-container");

      modalContainer.style.animation = "none";
      modal.classList.toggle("open");
    });
  }

  static openModalNotification(){
    const frm = document.querySelector("#form-newsletter");

    frm.addEventListener("submit", (event) => {
      event.preventDefault();

      const modal = document.querySelector(".modal-notification");

      modal.style.animation = "notification .4s ease-in forwards"
      modal.classList.add('open');

      setTimeout(this.closeModalNotification, 4000);
    });
  }

  static closeModalNotification(){
    const modal = document.querySelector(".modal-notification");

    const classExists = modal.classList.contains('open');

    if(classExists){
      modal.style.animation = "none"
      modal.classList.remove('open');
    } 
  }
}