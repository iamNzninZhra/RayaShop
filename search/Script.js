const searchText = new URLSearchParams(decodeURIComponent(location.search)).get("q");

function searchProducts() {
    const searchText = document.getElementById("searchElement").value;
    if (!searchText) {
        showSearchProducts(false);
        return;
    }

    console.log(searchText)
    fetch('/search/Json/API.json')
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
