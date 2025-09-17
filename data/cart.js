import { products } from "./products.js";

export let cart = [
  { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2 }
]; ;

export function addToCart(productId, quantity, container) {
  const matchingProduct = products.find((p) => productId === p.id);

  let cartItem = cart.find((c) => matchingProduct.id === c.productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = {
      productId,
      quantity,
    };
    cart.push(cartItem);
  }
  const addedText = container.querySelector(".added-to-cart");
  addedText.style.opacity = 1;
  addedText.innerHTML = `<img src="images/icons/checkmark.png"> Added ${cartItem.quantity}`;

  console.log(cart);
}
