export class ScrollTop{
    static visibilityBtnScroll(){
        const scrollTop = document.querySelector('.scrolltop');

        window.onload = () => {//some o button de scroll sempre que a página recarrega
            scrollTop.style.visibility = "hidden";
            scrollTop.style.opacity = 0;
        }

        //quando a página for scrollada 
        window.onscroll = () => {
            //se a rolagem ultrapassar 550px da tela:
            if(window.scrollY > 200){
                scrollTop.style.animation = "scrollBtnVisibility .3s ease-out backwards";
                scrollTop.style.visibility = "visible";
                scrollTop.style.opacity = 1;
            } else{
                scrollTop.style.visibility = "hidden";
                scrollTop.style.opacity = 0;
                scrollTop.style.animation = "none";
            }
        }
    }

    static scrollToTopSmooth(){
        document.querySelector('.scrolltop').addEventListener('click', (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0, behavior:'smooth'
            });
        });
    }
}