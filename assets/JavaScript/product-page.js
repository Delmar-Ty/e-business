const file = 'assets/JSON/product-data.json';
let products = document.querySelector('.product-container');
const storageName = "product-data";

//This fetches the data
async function getData(resource) {
    let response = await fetch(resource);
    let data = await response.json();
    return data;
}

//Saves data to local storage and parses data
function saveData(name = "list", data) {
    localStorage.setItem(name, JSON.stringify(data));
}

//Creates product cards according to data in local storage
function init() {
    let info = JSON.parse(localStorage.getItem(storageName));
    let productArray = [];
    for (const id in info) {
        let html = `
        <div class="col-10 col-md-3 mx-5 product" data-ds-id="${id}">
            <div class="card">
            <div class="card-body">
                <img class="img-fluid" src="assets/Media/${info[id].images[0]}" alt="${info[id].name}">
                <div class="container star-container text-center my-2">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
                <h3 class="text-center my-2 product-name">${info[id].name}</h3>
                <h5 class="text-center my-2 product-price">${info[id].price}</h5>
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
            //Call function to assign a search parameter
        });
    }
}

//Checks if data already exists in local storage
if (localStorage.getItem(storageName) === null) {
getData(file)
    .then(data => {
        saveData(storageName, data);
        init();
    });
} else {
    init();
}