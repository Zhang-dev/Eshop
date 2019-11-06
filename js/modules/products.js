import { items } from "../data/items.js";
import ShoppingCart from "../ShoppingCart.js";
import app from "../app.js";
const products = (_ => {
  //get all itemsIncategory in the storage

  let category = "";
  let itemsIncategory = [];

  console.log("products");
  let cart = new ShoppingCart();
  // cache the DOM
  const itemsIncategoryUl = document.querySelector(".products");
  const categoryHeaderEL = document.querySelector(".products-wrapper h2");

  //render
  const render = _ => {
    let html = "";
    itemsIncategory.forEach(item => {
      html += `<li class="product-layout">
                    <div class="product-thumbnail">
                      <div class="image">
                       <a href="#">
                        <img src="/images/${item.id}.jpg" alt="product-thumbnail" />
                       </a>
                       <div class="add-to-cart">
                       <i class="fas fa-dollar-sign"></i>
                       </div>
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
    if (itemsIncategoryUl !== null) {
      itemsIncategoryUl.innerHTML = html;
    }
    if (categoryHeaderEL !== null) {
      categoryHeaderEL.innerHTML = capitalizeFirstLetter(category);
    }
    document.title = category;
  };

  //listner
  const listner = _ => {
    const addtocartButtonEls = [
      ...document.querySelectorAll(".add-to-cart > *")
    ];
    if (addtocartButtonEls !== null) {
      addtocartButtonEls.forEach(button => {
        button.addEventListener("click", function() {
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
          let id = image.src.slice(-6, -4);
          saveCurrentItem(id);
          window.location.href = "item-details.html";
        });
      });
    }
  };

  const saveCurrentItem = id =>
    localStorage.setItem("currentItem", JSON.stringify(items[Number(id) - 1]));

  const saveCart = _ =>
    localStorage.setItem("shoppingcart", JSON.stringify(cart.items));

  const loadCart = _ => {
    let cartFile = localStorage.getItem("shoppingcart");
    if (cartFile !== "null") {
      cart.items = JSON.parse(cartFile);
    }
  };
  const loadCurrentCategory = _ => {
    let CurrentCategoryFile = localStorage.getItem("currentCategory");
    if (CurrentCategoryFile !== "null") {
      category = JSON.parse(CurrentCategoryFile);
    }
  };

  const pickItemsInCate = _ => {
    items.forEach(item => {
      if (
        item.category.includes(category) ||
        item.title.toLowerCase().includes(category.toLowerCase())
      ) {
        itemsIncategory.push(item);
      }
    });
  };
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const init = _ => {
    loadCurrentCategory();
    pickItemsInCate();
    loadCart();
    render();
    listner();
  };

  window.onbeforeunload = saveCart;

  return {
    init,
    listner
  };
})();
export default products;
products.init();
// app.listner();
