export class SendPedido{
  dataColor;
  dataSize;
  item = [];

  setEvent(){
    const modalContainer = document.querySelector(".modal-product-wrapper");

    modalContainer.addEventListener("submit", (event) => {
      event.preventDefault();
      const dataInput = event.target.inData;
      
      this.getElementsValues(dataInput);
  
      const btnSend = modalContainer.querySelector(".btn-send");
      
      this.addItem(btnSend);
  
      this.send();
    });
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
    this.item.push({
      name: btn.getAttribute("data-name"),
      color: this.dataColor,
      size: this.dataSize,
      price: btn.getAttribute("data-price")
    });
  }

  send(){
    const message = this.item.map(item => {
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

    this.item = [];
  }
}