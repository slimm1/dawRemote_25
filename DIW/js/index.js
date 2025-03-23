document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-btn');
    const burgerMenu = document.querySelector('.slim-navbar-toggler');

    homeButton.addEventListener('click',  () => {
        window.location.href = 'index.html'
    });

    burgerMenu.addEventListener('click', () => toggleBurgerMenu());

    // Uso de Jquery para mostrar el modal en caso de pasar las validaciones establecidas
    $("#myForm").submit(function(event) {
        event.preventDefault(); 
        if (this.checkValidity()) {
            $("#confirmationModal").modal("show"); 
            this.reportValidity(); 
        }
    });

    // escuchar evento click del boton de confirmar del modal
    $("#confirmSubmit").click(function() {
        $("#myForm")[0].submit();
    });
    
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

