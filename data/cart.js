import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
  { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2, deliveryOptionId: '3' }
]; ;

  function saveToStorage(){
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