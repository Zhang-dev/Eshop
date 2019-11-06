import { items } from "../data/items.js";
import ShoppingCart from "../ShoppingCart.js";
import app from "../app.js";
const shoppingCart = (_ => {
  //copy the items in storage for cart(temp)
  let cart = new ShoppingCart();

  const itemslistEl = document.querySelector(".products-chosen");
  const totalEl = document.querySelector(".total");
  const subTotalEl = document.querySelector(".sub-total");

  //easy for dev
  const loadCart = _ => {
    let cartFile = localStorage.getItem("shoppingcart");
    if(cartFile!=="null"){
      cart.items = JSON.parse(cartFile);
    }
  };
  const setHtml = (elem, html) => (elem.innerHTML = html);
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  };
  Element.prototype.show = function() {
    console.log(this);
  };
  const saveCart = _ =>
    localStorage.setItem("shoppingcart", JSON.stringify(cart.items));

  //   render
  const renderChosenItems = _ => {
    let html = "";
    cart.items.forEach(item => {
      html += `<li>
        <img src="/images/${item.id}.jpg" alt="">
        <div class="product-description">
              <p class="item-name">${item.title}</p>
              <p class="item-details">${item.description}</p>
              <p class="item-price">${item.price}€</p>
        </div>
        <div class="item-number">
              <input type="number" value="${item.qty}" min="1" max="99">
        </div>
        <div class="total-price">
              <p>${(item.price * item.qty).toFixed(2)}€</p>
        </div>
        <div class="delete-button">
              <i class="fa fa-times-circle" style="font-size:28px"></i>
        </div>
      </li>
      <hr>
    `;
    });
    setHtml(itemslistEl, html);
  };
  const renderOrder = _ => {
    let summe = 0;
    const productDescriptionEls = [
      ...document.querySelectorAll(".product-description")
    ];
    productDescriptionEls.forEach(element => {
      const price = parseFloat(element.lastElementChild.innerHTML);
      const qty = parseInt(element.nextElementSibling.firstElementChild.value);
      summe += price * qty;
    });
    setHtml(totalEl.lastElementChild, `${summe.toFixed(2)}€`);
    setHtml(subTotalEl.lastElementChild, `${summe.toFixed(2)}€`);
  };

  const refresh = _ => {
    renderChosenItems();
    renderOrder();
    listner();
  };
  const init = _ => {
    loadCart();
    refresh();
    app.listner()
  };

  //addeventlistner
  const listner = _ => {
    const deleteButtonEls = [...document.querySelectorAll(".delete-button")];
    deleteButtonEls.forEach(el => {
      el.firstElementChild.addEventListener("click", function() {
        let id = el.parentElement.firstElementChild.src.slice(-6, -4);
        cart.remove(id)
        refresh();
      });
    });

    const qtyOfItemEls = [...document.querySelectorAll(".item-number")];
    qtyOfItemEls.forEach(el => {
      const qtyInputEl = el.firstElementChild;
      qtyInputEl.addEventListener("change", function() {
        let qty = Number(qtyInputEl.value);
        if (qty > 99) {
          qtyInputEl.value = "99";
          qty = 99;
        } else if (qty < 1) {
          qty = 1;
          qtyInputEl.value = "1";
        }
        let id = el.parentElement.firstElementChild.src.slice(-6, -4);
        cart.changeQty(id, qty);
        refresh();
      });
    });
  };


  window.onbeforeunload = saveCart;

  return {
    init
  };
})();
shoppingCart.init();
export default shoppingCart;
