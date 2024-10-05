import { ShowCart } from "./ShowCart.js";
import { ShowModal } from "./ShowModal.js";

export class SendPedido{
  dataColor;
  dataSize;
  static item = [];

  static setEvent(){
    const form = document.querySelector("#form-modal");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let tagNameEvent = event.submitter.tagName;

      if(tagNameEvent === "INPUT"){
        this.comprarProduto();

        const callMethods = new SendPedido();
        callMethods.send(SendPedido.item);
      }

      if(tagNameEvent === "BUTTON"){
        const produto = this.comprarProduto();

        ShowCart.addToCart(produto);
        return;
      }
    });
  }

  static comprarProduto(){
    const inputsData = document.querySelectorAll("#form-modal #inData");
    const callMethods = new SendPedido();

    callMethods.getElementsValues(inputsData);
        
    const btnSend = document.querySelector(".btn-send");

    const produto = callMethods.addItem(btnSend);

    return produto;
  }

  getElementsValues(elements){
    elements.forEach(element => {
      if(element.name == "inColor"){
        if(element.checked){
          this.dataColor = element.getAttribute("data-input");
        }
      }
      if(element.name == "inSize"){
        if(element.checked){
          this.dataSize = element.getAttribute("data-input");
        }
      }
    });
  }

  addItem(btn){
    const produto = {
      name: btn.getAttribute("data-name"),
      img: ShowModal.btnTarget.getAttribute("data-img"),
      color: this.dataColor,
      size: this.dataSize,
      price: Number(btn.getAttribute("data-price")),
      qty: 1
    }

    SendPedido.item.push(produto);
    
    return produto;
  }

  send(produtos){
    const message = produtos.map(item => {
      return (
        ` Nome: ${item.name}, Cor: ${item.color}, Tamanho: ${item.size}, Preço: R$ ${item.price},00 | 
        `
      )
    }).join(" ");

    const headMessage = encodeURIComponent("Olá, eu gostaria de realizar o seguinte pedido: ");
    const bodyMessage = encodeURIComponent(message);
    const messageUrl = headMessage + bodyMessage;
    const phone = "98991771920";

    window.open(`https://wa.me/${phone}?text=${messageUrl}`, "_blank");

    SendPedido.item = [];
  }
}