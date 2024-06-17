import { MenuBurguer } from "./js/MenuBurguer.js";
import { ShowModal } from "./js/ShowModal.js";
import { ShowCards } from "./js/ShowCards.js";

MenuBurguer.btnOpenMenuBurguer();
MenuBurguer.closeMenuBurguer();

ShowCards.showCards();

ShowModal.showModalProduct();
ShowModal.closeModalProduct();
ShowModal.openModalNotification();

const elements = document.querySelectorAll(".hidden");
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }else{
      entry.target.classList.remove("show");
    }
  });
});

elements.forEach(element => myObserver.observe(element));