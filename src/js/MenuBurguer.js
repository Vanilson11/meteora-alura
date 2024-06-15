export class MenuBurguer{
  static btnOpenMenuBurguer(){
    const btnOpenMenuBurguer = document.querySelector(".icons-menu-burguer");

    btnOpenMenuBurguer.addEventListener("click", () => {
      const navMob = document.querySelector("#nav-mobile");
      navMob.style.display = 'flex';
    });
  }

  static closeMenuBurguer(){
    const btnCloseMenuBurguer = document.querySelector(".nav-mobile-icon");

    btnCloseMenuBurguer.addEventListener("click", () => {
      const navMob = document.querySelector("#nav-mobile");
      navMob.style.display = 'none';
    });
  }
}