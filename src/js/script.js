// const { doc } = require("prettier");

let menu = document.querySelector(".menu__body");
let menuIcon = document.querySelector(".icon-menu");

menuIcon.addEventListener('click', burgerMenuOnOff);

menu.addEventListener('click', (e) => {
    if (!menu.classList.contains('active')) return;
    if (e.target.nodeName == "A") {
        burgerMenuOnOff();
    }
});

function burgerMenuOnOff() {
    menuIcon.classList.toggle('active');
    menu.classList.toggle('active');
    document.querySelector("body").classList.toggle('lock');
}

function ibg(){
    let elements = document.querySelectorAll('.ibg');
    elements?.forEach(function(item){
        let image = item.querySelector('img');
        if( image.src.length > 0 ){
            item.style.backgroundImage = `url("${image.src}")`;
        }
    });
}

ibg();

//==========================================================================

let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

window.onload = function () {
    document.addEventListener('click', documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        // if (window.innerWidth > 768 && isMobile.any()) {
        if (isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow') || targetElement.classList.contains('menu__link')) {
                targetElement.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                document.querySelectorAll('.menu__item._hover').forEach(el => el.classList.remove('_hover'));
            }
        }
        if (window.innerWidth < 768) {
            if (targetElement.classList.contains('menu__arrow') || targetElement.classList.contains('menu__link')) {
                let subList = targetElement.closest('.menu__item').querySelector('.menu__sub-list');
                if (subList) {
                    subList.classList.toggle('accordion');
                }
            }
            if (targetElement.classList.contains('menu-footer__title')) {
                let subList = targetElement.closest('.menu-footer__column').querySelector('.menu-footer__list');
                if (subList) {
                    subList.classList.toggle('accordion');
                    targetElement.classList.toggle('active');
                }
            }
        }
        if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active');
        }
    }

    document.addEventListener('submit', documentSubmitActions);

    function documentSubmitActions(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('search-form__item') || targetElement.classList.contains('subscribe__form')) {
            e.preventDefault();
            targetElement.reset();
        }
    }

    //Header
    const headerElement = document.querySelector('.header');

    const headerObserver = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');
        }
    });
    headerObserver.observe(headerElement);

}