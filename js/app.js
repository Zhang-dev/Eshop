import { items } from "./data/items.js";
const app = (_ => {
  const audio = new Audio("../sounds/click.m4a");
  audio.play();

  let searchWord = "";

  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  };

  //cache DOM
  const featuresUl = document.querySelector(".products");
  const navButtonEls = [...document.querySelectorAll(".navbar__nav li")];
  const categoryHeaderEL = document.querySelector(".products-wrapper h2");
  const swiperEl = document.querySelector(".swiper-container");
  const searchButtonEl = document.querySelector(".search button");
  const searchFieldEl = document.querySelector(".searchfield input");

  const shuffleArr = arr => {
    let new_arr = items.slice(0);
    for (let i = new_arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [new_arr[i], new_arr[j]] = [new_arr[j], new_arr[i]];
    }
    return new_arr.slice(0, 8);
  };
  // swiper

  let mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    loop: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination"
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  const render = _ => {
    let html = "";
    shuffleArr(items).forEach(item => {
      html += `<li class="product-layout">
                <div class="product-thumbnail">
                  <div class="image">
                  <a href="#">
                  <img src="/images/${item.id}.jpg" alt="product-thumbnail" />
                  </a>
                </div>
                <div class="caption">
                <h4>
                <a href="#">${item.title}</a>
                </h4>
                <p>
                ${item.description}
                </p>
                <p class="price">
                 €${item.price}
                </p>
                </div>
                  </div>
                </li>`;
    });
    if (featuresUl !== null) {
      featuresUl.innerHTML = html;
    }
    if (categoryHeaderEL !== null) {
      categoryHeaderEL.innerHTML = "Empfehlungen für dich";
    }
  };

  // listner
  const listner = _ => {
    navButtonEls.forEach(button => {
      button.addEventListener("click", function() {
        audio.play();
        let catego = button.innerHTML;
        saveCurrentCategory(catego);
        window.location.href = "products.html";
      });
    });

    const addtocartButtonEls = [
      ...document.querySelectorAll(".add-to-cart button")
    ];
    if (addtocartButtonEls !== null) {
      addtocartButtonEls.forEach(button => {
        button.addEventListener("click", function() {
          audio.play();
          let imgSrc =
            button.parentElement.parentElement.firstElementChild
              .firstElementChild.src;
          let id = imgSrc.slice(-6, -4);
          cart.add(id);
        });
      });
    }

    const itemImageEls = [...document.querySelectorAll(".products img")];
    if (itemImageEls !== null) {
      itemImageEls.forEach(image => {
        image.addEventListener("click", function() {
          audio.play();
          let id = image.src.slice(-6, -4);
          saveCurrentItem(id);
          window.location.href = "item-details.html";
        });
      });
    }

    searchButtonEl.addEventListener("click", search);
  };

  const search = _ => {
    items.forEach(item => {
      if (
        searchFieldEl.value.length > 2 &&
        item.title.toLowerCase().includes(searchFieldEl.value.toLowerCase())
      ) {
        console.log("found");
        let catego = searchFieldEl.value;
        saveCurrentCategory(catego);
        window.location.href = "products.html";
      }
    });
  };

  const saveCurrentItem = id =>
    localStorage.setItem("currentItem", JSON.stringify(items[Number(id) - 1]));

  const saveCurrentCategory = catego =>
    localStorage.setItem("currentCategory", JSON.stringify(catego));

  window.onload = function() {
    let cart = localStorage.getItem("shoppingcart");
  };

  const init = _ => {
    render();
    listner();
  };

  return {
    render,
    listner,
    init
  };
})();
export default app;
app.init();

// products.listner();
