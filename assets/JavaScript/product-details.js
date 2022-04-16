function changeImage(el) {
    let source = el.getAttribute('src');
    document.getElementById('product-image-main').setAttribute('src', source);
    magnify('product-image-main', 3);
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
      glass.style.top = y + img.height / 2 + "px";
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

document.querySelector('.checkout-btn').addEventListener('click', function() {location.assign('../create-account.html')});



/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

const tax = 10;

//Gets the id from the url searh parameter
function getSearchParam() {
  let searchParam = new URLSearchParams(location.search);
  let id = searchParam.get('id');
  return id;
}

//Returns an object with all the elements needed to update content
function getContent() {
  let elements = {
    modal: {
      title: document.querySelector('.product-modal-title'),
      name: document.querySelector('#modal-name'),
      tax: document.querySelector('#tax'),
      total: document.querySelector('#total'),
      img: document.querySelector('.modal-image')
    },
    body: {
      imgsContainer: document.querySelector('.product-images-container'),
      imgMain: document.querySelector('#product-image-main'),
      description: document.querySelector('#info'),
      price: document.querySelector('#price'),
      name: document.querySelector('#name')
    }
  };
  return elements;
}

//Updates all content on the page
function updateContent() {
  let id = getSearchParam();
  let elements = getContent();
  const data = JSON.parse(sessionStorage.getItem(storageName));
  elements.body.name.textContent = data[id].name;
  elements.body.price.textContent = `$${data[id].price.toFixed(2)}`;
  elements.body.imgMain.setAttribute('src', `assets/Media/${data[id].images[0]}`);
  elements.body.imgMain.setAttribute('alt', data[id].name);
  elements.body.description.textContent = data[id].description;
  elements.modal.img.setAttribute('src', `assets/Media/${data[id].images[0]}`);
  elements.modal.name.textContent = data[id].name;
  elements.modal.tax.textContent = `${tax}%`;
  let total = data[id].price + (data[id].price * (1 / tax));
  elements.modal.total.textContent = `$${total.toFixed(2)}`;
  let images = [];
  for (const i in data[id].images) {
    let html = `
    <div class="col-3 img-container">
      <img src="assets/Media/${data[id].images[i]}" alt="${data[id].name}" class="img-fluid" id="product-image">
    </div>
    `;
    images.push(html);
  }
  elements.body.imgsContainer.innerHTML = images.join('');
}

function imgEvents() {
  let imageContainers = document.querySelectorAll('.img-container');
  imageContainers.forEach(el => {
    el.addEventListener('click', function() {
      changeImage(this.children[0]);
    });
  });
}

document.addEventListener('init', () => {
  updateContent();
  imgEvents();
  magnify('product-image-main', 3);
})