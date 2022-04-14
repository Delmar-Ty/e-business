var imgIDArray = ['product-image', 'product-image-2', 'product-image-3', 'product-image-4'];
function changeImage() {
    var img = this.getAttribute('src');
    document.getElementById('product-image-main').setAttribute('src', img);
    magnify('product-image-main', 3);
}

function addToCart() {
    var productName = document.getElementById('name').textContent;
    var productPrice = document.getElementById('price').textContent;
    var productPriceNum = productPrice.slice(1);
    productPriceNum = parseFloat(productPriceNum);
    console.log(typeof(productPriceNum));
    var tax = parseFloat(productPriceNum) * 0.1;
    console.log(typeof(tax));
    var total = productPriceNum + tax;
    console.log(total);
    document.getElementById('modal-name').textContent = productName;
    document.getElementById('modal-price').textContent = productPrice;
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
  
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth;
    h = glass.offsetHeight;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      glass.style.display = 'block';
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Set the position of the magnifier glass: */
      glass.style.left = x + img.width / 2 + "px";
      glass.style.top = y + img.height + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }

    img.addEventListener('mouseleave', hideGlass);

    function hideGlass() {
        glass.style.display = 'none';
    }
  }

for (i = 0; i < imgIDArray.length; i++) {
    document.getElementById(imgIDArray[i]).addEventListener('click', changeImage);
}

document.querySelector('.add-to-cart').addEventListener('click', addToCart);
document.querySelector('.checkout-btn').addEventListener('click', function() {location.replace('../create-account.html')});