//به نام ایزد منان


// **********************************
// SAVING IN LOCALSTORAGE
// **********************************
localStorage.setItem('basket', 0);
function addtobasket() {
    // e.preventDefault()
    bsk = localStorage.getItem('basket');
    if (isNaN(bsk)) {
        bsk = 0;
    }
    else {
        bsk = Number(bsk);
    }
    bsk++;
    localStorage.setItem('basket', bsk);
    document.getElementById('basket-badge').innerHTML = bsk;
}
//🛑SAVING IN LOCALSTORAGE IN MOBILE CONDITION
localStorage.setItem('basket', 0);
function addtobasket() {
    bsk = localStorage.getItem('basket');
    if (isNaN(bsk)) {
        bsk = 0;
    }
    else {
        bsk = Number(bsk);
    }
    bsk++;
    localStorage.setItem('basket', bsk);
    document.getElementById('mobile-basket-badge').innerHTML = bsk;
}
//END OF  SAVING IN LOCALSTORAGE IN MOBILE CONDITION
// **************************************
//END OF SAVING IN LOCALSTORAGE
// **************************************



// **********************************
// SLICK SLIDER
// **********************************
arrowSliderMouseDownId = -1;

function arrowSliderMouseDown(change, containerName) {

    const slick = document.querySelector(containerName + " .slick-list .slick-track");

    arrowSliderMouseDownId = setInterval(() => {
        if (change === "last") {
            slick.scrollTo({
                left: slick.scrollLeft - 50,
                top: 0,
                behavior: "smooth"
            });
        } else if (change === "first") {
            slick.scrollTo({
                left: slick.scrollLeft + 50,
                top: 0,
                behavior: "smooth"
            });
        }
    }, 100);

}

function arrowSliderMouseUp() {
    clearInterval(arrowSliderMouseDownId);
}
// **********************************
//END OF SLICK SLIDER
// **********************************



// **********************************
//FETCH AND API
// **********************************
function searchProducts() {
    const searchText = document.getElementById("searchElement").value;
    if (!searchText) {
        showSearchProducts(false);
        return;
    }

    console.log(searchText)
    fetch('/Main Page/Json/API.json')
        .then(response => response.json())
        .then(posts => {

            const products = posts.products.filter(p => p.title.includes(searchText));

            if (products.length) {

                let html = ""
                for (const product of products) {

                    html += writeHtmlSearchProduct(product);
                }

                const searchContainer = showSearchProducts(true);

                searchContainer.innerHTML = html;
            }

        })
}

function showSearchProducts(show) {
    const searchContainer = document.querySelector(".search-products");

    searchContainer.style.visibility = show ? "visible" : "hidden";

    const searchIconElement = document.querySelector("#searchInput i");
    if(show) {
        searchIconElement.classList.add("fa-times");
        searchIconElement.classList.remove("fa-search");
    }else {
        searchIconElement.classList.remove("fa-times");
        searchIconElement.classList.add("fa-search");
    }

    return searchContainer;
}

function writeHtmlSearchProduct(product) {
    return `
<div class="d-flex align-items-center justify-content-between">
<div class="d-flex align-items-center gap-3">
    <img class="rounded-5" src="${product.img}"
        style="width: 45px; height: 45px;">
    <div onclick="searchedProduct()">${product.title}</div>

</div>
<div>
    <div>${product.price}</div>
</div>
</div>
`
}
// **********************************
//END OF FETCH AND API
// **********************************




// **********************************
//MOBILE MENU DISPLAY BY JQUERY
// **********************************

//🛑OPEN THE MOBILE MENU BY JQUERY
// function showMobileMenu(e) {
//     e.preventDefault();
//     const mobileMenus = document.querySelector('.mobile-menus');
//     if (!mobileMenus.style.display || mobileMenus.style.display === 'none') {
//         mobileMenus.style.display = 'block';
//     } else {
//         mobileMenus.style.display = 'none';
//     }
// }
function showMobileMenu(e) {
    e.preventDefault();
    $('.mobile-menus').toggle();
}
//END OF OPEN THE MOBILE MENU BY JQUERY


// 🛑SUBMENU BY JQUERY
// function toggleMenu(event) {
//     const subMenu = event.target.parentElement.querySelector('ul');
//     event.target.querySelector("i:first-child").classList.toggle('angle-menu');

//     if (!subMenu.style.display || subMenu.style.display === 'none') {
//         subMenu.style.display = 'block';
//     } else {
//         subMenu.style.display = 'none';
//     }
// }
function toggleMenu(event) {
    var subMenu = $(event.target).parent().find('ul');
    $(event.target).find("i:first-child").toggleClass('angle-menu');

    if (!subMenu.is(':visible')) {
        subMenu.show();
    } else {
        subMenu.hide();
    }
}
//END OF SUBMENU BY JQUERY

//🛑CLOSING THE MENU BY JQUERY
// function closeMobileMenu(e) {
//     e.preventDefault();
//     const mobileMenus = document.querySelector('.mobile-menus');
//     if (mobileMenus.style.display === 'block') {
//         mobileMenus.style.display = 'none';
//     }
// }
function closeMobileMenu(e) {
    e.preventDefault();
    $('.mobile-menus').hide();
}
//END OF CLOSING THE MENU BY JQUERY
// ******************************************
//END OF MOBILE MENU DISPLAY BY JQUERY
// ******************************************



// **********************************
//SPLIDE SLIDER
// **********************************
var splide = new Splide('.splide', {
    direction: 'ttb',
    height: '10rem',
});

splide.mount();
// **********************************
//END OF SPLIDE SLIDER
// **********************************



// **********************************
//FIXED TOPBAR
// **********************************
// window.onscroll = function () {
//     var scrol = document.body.scrollTop || document.documentElement.scrollTop;
//     console.log(scrol);
//     var topbar = document.getElementById('topbar');
//     if (scrol > 90) {
//         topbar.style.position = "fixed";
//         topbar.style.marginTop = "-60px";
//     } else {
//         topbar.style.position = "";
//         topbar.style.marginTop = "";
//     }
// }
// **********************************
//END OF FIXED TOPBAR
// **********************************


// **********************************
//FIXED TOPBAR BY JQUERY
// **********************************
$(window).scroll(function () {
    var scrol = $(this).scrollTop();
    console.log(scrol);
    if (scrol > 70) {
        $('#topbar').css({'margin-top': '-60px' });
    } else {
        $('#topbar').css({'margin-top': '' });
    }
});
// ***************************************
//END OF FIXED TOPBAR BY JQUERY
// ***************************************





