import { MenuBurguer } from "./js/MenuBurguer.js";
import { ShowModal } from "./js/ShowModal.js";
import { ShowCards } from "./js/ShowCards.js";
import { Observer } from "./js/Observer.js";
import { FilterCategorie } from "./js/FilterCategorie.js";
import { ShowCart } from "./js/ShowCart.js";

MenuBurguer.btnOpenMenuBurguer();
MenuBurguer.closeMenuBurguer();

ShowCards.showCards();

Observer.initObserver();

ShowModal.showModalProduct();
ShowModal.closeModalProduct();

ShowModal.openModalNotification();

ShowCart.openCart();

FilterCategorie.addEventFilter();