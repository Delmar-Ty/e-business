var imgIDArray = ['product-image', 'product-image-2', 'product-image-3', 'product-image-4'];
function changeImage() {
    var img = this.getAttribute('src');
    document.getElementById('product-image-main').setAttribute('src', img);
}

function addToCart() {
    var productName = document.getElementById('name').textContent;
    var productPrice = document.getElementById('price').textContent;
    var productPriceNum = productPrice.slice(1);
    productPriceNum = parseFloat(productPriceNum);
    console.log(typeof(productPriceNum));
    var tax = parseFloat(productPriceNum);
    console.log(typeof(tax));
    var total = productPriceNum + tax;
    console.log(total);
    document.getElementById('modal-name').textContent = productName;
    document.getElementById('modal-price').textContent = productPrice;
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

for (i = 0; i < imgIDArray.length; i++) {
    document.getElementById(imgIDArray[i]).addEventListener('click', changeImage);
}

document.querySelector('.add-to-cart').addEventListener('click', addToCart);
document.querySelector('.checkout-btn').addEventListener('click', function() {location.reload();});