import { items } from "../data/items.js";
import app from "../app.js";
import ShoppingCart from "../ShoppingCart.js";
const item = (_ => {
  let currentItem = "";
  let cart = new ShoppingCart();

  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  };

  //load Cart
  const loadCart = _ => {
    let cartFile = localStorage.getItem("shoppingcart");
    cart.items = JSON.parse(cartFile);
  };
  //save cart
  const saveCart = _ => {
    localStorage.setItem("shoppingcart", JSON.stringify(cart.items));
    console.log("save");
  };

  const loadCurrentItem = _ => {
    let CurrentItemFile = localStorage.getItem("currentItem");
    if (CurrentItemFile !== "null") {
      currentItem = JSON.parse(CurrentItemFile);
    }
  };

  // cache DOM
  const contentEl = document.querySelector(".items-details-wrapper");

  //render
  const render = _ => {
    document.title = `${currentItem.title}`;
    let colorHtml = "";
    let sizeHtml = "";
    currentItem.color.forEach((color, index) => {
      colorHtml += `<input type="radio" name="color" value="${color}" ${
        index === 0 ? "checked" : ""
      }>${color} `;
    });
    currentItem.size.forEach(size => {
      sizeHtml += `<option value="${size}">${size}</option>`;
    });
    console.log(currentItem.image);
    contentEl.innerHTML = `
        <h2>${currentItem.title}</h2>
              <div class="items-details">
                  <div class="items-image">
                      <img src="${currentItem.image}" alt="Image no found!">
                  </div>
                  <div class="item-column">
                      <form action="">
                        <p class="price"><strong>€ ${
                          currentItem.price
                        }</strong>   <font color="#d3d3d3" size="-4">inkl. MwSt. zzgl. Versandkosten</font></p>
                        <p class="description"><font color="#d3d3d3" size="-1">${currentItem.description}</font></p>
                        ${
                          colorHtml === ""
                            ? ""
                            : `<p>Farbe:</p>
                        ${colorHtml}`
                        }
                        ${
                          sizeHtml === ""
                            ? ""
                            : `<p>Größe:</p>
                              <select>
                              ${sizeHtml}
                              </select>`
                        }
                        <p><font size="-0.5">lieferbar - in 2-3 Werktagen bei dir</font></p>
                        <a href=""></a>
                        <input class="add-to-cart-button" type="button" value="In den Warenkorb">
                      </form>
                  </div>
              </div>
              <div class="back">
                 <a href="javascript:history.back()"><i class="fa fa-arrow-left"></i>Zurück</a>
              </div>
        `;
  };
  //listner
  const listner = _ => {
    const buttonEl = document.querySelector(".add-to-cart-button");
    buttonEl.addEventListener("click", function() {
      cart.add(currentItem.id);
      let hasColor =
        document.querySelector('input[type="radio"]:checked') !== null;
      const color = hasColor
        ? document.querySelector('input[type="radio"]:checked').value
        : "";
      const e = document.querySelector("select");
      const size = e !== null ? e.options[e.selectedIndex].value : "";
      const confirmationMaskEl = document.createElement("div");
      confirmationMaskEl.className = "confirmation-background";
      confirmationMaskEl.innerHTML = `
             <div class="confirmation-wrapper">
                <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                <div class="confirmation">
                    <p>Der Artikel wurde deinem Warenkorb hinzugefügt!</p>
                    <p>${currentItem.title}</p>
                    <p>${color}   ${size}</p>
                    <p>€ ${currentItem.price}</p>
                </div>
                 <a href="shopping-cart.html">
                     <input type="button" value="Zum Warenkorb">
                </a>
            </div>
      `;
      document.querySelector("body").appendChild(confirmationMaskEl);
      confirmationMaskEl.addEventListener("click", function(e) {
        if (e.target.className.includes("fa-times")) {
          confirmationMaskEl.remove();
        }
      });
    });
  };

  window.onbeforeunload = saveCart;

  const init = _ => {
    loadCurrentItem();
    loadCart();
    render();
    listner();
    app.listner();
  };
  return {
    init
  };
})();
item.init();
