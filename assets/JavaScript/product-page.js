let products = document.querySelector('.product-container');

//Creates product cards according to data in local storage
function init() {
    let data = JSON.parse(sessionStorage.getItem(storageName));
    let productArray = [];
    for (const id in data) {
        let html = `
        <div class="col-10 col-md-3 mx-5 product" data-ds-id="${id}">
            <div class="card">
            <div class="card-body">
                <img class="img-fluid" src="assets/Media/${data[id].images[0]}" alt="${data[id].name}">
                <div class="container star-container text-center my-2">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
                <h3 class="text-center my-2 product-name">${data[id].name}</h3>
                <h5 class="text-center my-2 product-price">$${data[id].price.toFixed(2)}</h5>
            </div>
            </div>
        </div>
        `;
    productArray.push(html)
    }
    products.innerHTML = productArray;
    let children = products.children;
    for (const element of children) {
        element.addEventListener('click', function() {
            let searchParam = new URLSearchParams();
            searchParam.set('id', element.getAttribute('data-ds-id'));
            location.assign(`../../product-details.html?${searchParam.toString()}`);
        });
    }
}

document.addEventListener('init', () => {
    init();
});