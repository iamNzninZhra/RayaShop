/*
function toggleMenu(element) {
    element.classList.toggle('menu-toggle');
    megamenuWrapper = element.parentElement.nextElementSibling;
    megamenuWrapper.classList.toggle('megamenu');
}*/


// SAVING IN LOCALSTORAGE
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

// SLICK SLIDER
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



//FETCH AND API
function searchProducts() {
    const searchText = document.getElementById("searchElement").value;
    if (!searchText) {
        showSearchProducts(false);
        return;
    }

    console.log(searchText)
    fetch('/Main Page/json/API.json')
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

    // const searchIconElement = document.querySelector("#searchInput i");
    // if(show) {
    //     searchIconElement.classList.add("fa-times");
    //     searchIconElement.classList.remove("fa-search");
    // }else {
    //     searchIconElement.classList.remove("fa-times");
    //     searchIconElement.classList.add("fa-search");
    // }

    return searchContainer;
}


function writeHtmlSearchProduct(product) {
    return `
<div class="d-flex align-items-center justify-content-between">
<div class="d-flex align-items-center gap-3">
    <img class="rounded-5" src="${product.img}"
        style="width: 40px; height: 40px;">
    <div>${product.title}</div>

</div>
<div>
    <div>${product.price}</div>
</div>
</div>
`
}

//MOBILE MENU DISPLAY
function showMobileMenu(e) {
    e.preventDefault();
    const mobileMenus = document.querySelector('.mobile-menus');
    if (!mobileMenus.style.display || mobileMenus.style.display === 'none') {
        mobileMenus.style.display = 'block';
    } else {
        mobileMenus.style.display = 'none';
    }
}
//SUBMENU
function toggleMenu(event) {
    const subMenu = event.target.parentElement.querySelector('ul');
    event.target.querySelector("i:first-child").classList.toggle('angle-menu');

    if (!subMenu.style.display || subMenu.style.display === 'none') {
        subMenu.style.display = 'block';
    } else {
        subMenu.style.display = 'none';
    }
}
//CLOSING THE MENU
function closeMobileMenu(e) {
    e.preventDefault();
    const mobileMenus = document.querySelector('.mobile-menus');
    if (mobileMenus.style.display === 'block') {
        mobileMenus.style.display = 'none';
    }
}












