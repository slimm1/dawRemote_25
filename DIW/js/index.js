document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-btn');
    const burgerMenu = document.querySelector('.slim-navbar-toggler');

    homeButton.addEventListener('click',  () => {
        window.location.href = 'index.html'
    });

    burgerMenu.addEventListener('click', () => toggleBurgerMenu());
});

function toggleBurgerMenu() {
    const sideMenu = document.querySelector('.slim-side-menu');
    const body = document.body;
    sideMenu.classList.toggle('active');

    
    if (sideMenu.classList.contains("active")) {
        body.style.overflow = "hidden";
        document.addEventListener("click", listenClickOutsideMenu); 
    } else {
        body.style.overflow = ""; 
        document.removeEventListener("click", listenClickOutsideMenu);
    }

}

function listenClickOutsideMenu(event) {
    let menu = document.querySelector(".slim-side-menu");
    let button = document.querySelector('.slim-navbar-toggler');

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("active");
        document.body.style.overflow = "";
        document.removeEventListener("click", listenClickOutsideMenu);
    }
}

