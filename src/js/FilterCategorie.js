import { data } from "./Data.js";
import { ShowCards } from "./ShowCards.js";
import { ShowModal } from "./ShowModal.js";

export class FilterCategorie{
    static addEventFilter(){
        const btnFilter = document.querySelectorAll("[data-categorie]");

        btnFilter.forEach(btn => {
            btn.addEventListener("click", (event) => {
                const categorie = event.target.getAttribute("data-categorie");
                
                const dataFilter = data.filter(item => item.category === categorie);
                
                ShowCards.addItemHtml(dataFilter);

                const elements = document.querySelectorAll(".hidden");
                elements.forEach(element => element.classList.remove("hidden"));

                ShowModal.showModalProduct();
            });
        })
    }
}