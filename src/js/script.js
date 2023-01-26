// const { doc } = require("prettier");
import products from '../json/products.json';

//==========================================================================

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
        if (targetElement.classList.contains('products__more')) {
            e.preventDefault();
            getProducts(targetElement);
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

    //==========================================================================

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

    //Load more products
    let productId = 4;
    function getProducts(button) {
        if (button.classList.contains('_hold')) { return };

        button.classList.add('_hold');
        let productsToLoad = products.products.slice(productId, productId + 4);
        productId += 4;
        loadProducts(productsToLoad);
        button.classList.remove('_hold');
        if (productId >= products.products.length) {
            button.remove();
        }
    }

    function loadProducts(data) {
        const productsItems = document.querySelector('.products__items');

        data.forEach(item => {
            // console.log(item);

			let productTemplateStart = `<article data-pid="${item.id}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (item.labels.length > 0) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				item.labels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
                <a href="${item.url}" class="item-product__image item-product__image_loaded">
                    <img src="../assets/images/products/${item.image}" alt="${item.title}">
                </a>
            `;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
                <div class="item-product__content">
                    <h3 class="item-product__title">${item.title}</h3>
                    <div class="item-product__text">${item.text}</div>
                </div>
            `;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">$ ${item.price}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">$ ${item.priceOld}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (item.priceOld) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
                <div class="item-product__actions actions-product">
                    <div class="actions-product__body">
                        <a href="" class="actions-product__button btn btn_white">Add to cart</a>
                        <a href="${item.shareUrl}" class="actions-product__link _icon-share">Share</a>
                        <a href="${item.likeUrl}" class="actions-product__link _icon-favorite">Like</a>
                    </div>
                </div>
            `;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

			productsItems.insertAdjacentHTML('beforeend', productTemplate);
        })
    }

	// async function getProducts(button) {
	// 	if (!button.classList.contains('_hold')) {
	// 		button.classList.add('_hold');
	// 		const file = "json/products.json";
	// 		let response = await fetch(file, {
	// 			method: "GET"
	// 		});
	// 		if (response.ok) {
	// 			let result = await response.json();
	// 			loadProducts(result);
	// 			button.classList.remove('_hold');
	// 			button.remove();
	// 		} else {
	// 			alert("Ошибка");
	// 		}
	// 	}
	// }

    


}