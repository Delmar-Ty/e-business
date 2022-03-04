var imgIDArray = ['product-image', 'product-image-2', 'product-image-3', 'product-image-4'];
function changeImage() {
    var img = this.getAttribute('src');
    document.getElementById('product-image-main').setAttribute('src', img);
}

for (i = 0; i < imgIDArray.length; i++) {
    document.getElementById(imgIDArray[i]).addEventListener('click', changeImage);
}