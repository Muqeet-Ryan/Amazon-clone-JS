import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
  { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2, deliveryOptionId: '3' }
]; ;

  export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
  }


export function addToCart(productId, quantity, container) {
  const matchingProduct = products.find((p) => productId === p.id);

  let cartItem = cart.find((c) => matchingProduct.id === c.productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = {
      productId,
      quantity,
      deliveryOptionId: '1'
    };
    cart.push(cartItem);
  }
  const addedText = container.querySelector(".added-to-cart");
  addedText.style.opacity = 1;
  addedText.innerHTML = `<img src="images/icons/checkmark.png"> Added ${cartItem.quantity}`;

  console.log(cart);

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){

  const matchingProduct = cart.find((c)=> c.productId === productId);

  matchingProduct.deliveryOptionId = deliveryOptionId; 

  saveToStorage();

}

//handlecheckoutCartUpdate
export function handleUpdate(updateLink){
    const productId = updateLink.dataset.productId;
    const container = updateLink.closest(".cart-item-container");
    const quantityEl = container.querySelector(".js-quantity-label"); 

    const currentQuantity = quantityEl.textContent;

    quantityEl.innerHTML = `
      <input type='number' min='1' value='${currentQuantity}' class='updating-quantity-input'>
      <button class='save-btn' data-product-id="${productId}">save</button>
    `;

    return;
}
//save
export function handleSave(saveButton){
  const container = saveButton.closest(".cart-item-container");
    const productId = saveButton.dataset.productId;
    const input = container.querySelector(".updating-quantity-input");
    const newQuantity = parseInt(input.value);

    const cartItem = cart.find((c) => c.productId === productId);

    if (cartItem && newQuantity > 0) {
      cartItem.quantity = newQuantity;
      saveToStorage();
    }
    return;
}

 //delete
  export function handleDelete(deleteLink){

  if (deleteLink) {
    const container = deleteLink.closest('.cart-item-container');
    const productId = deleteLink.dataset.productId;

    cart = cart.filter(c => c.productId !== productId);
    saveToStorage();

    container.remove();
    return;
  }

  }
