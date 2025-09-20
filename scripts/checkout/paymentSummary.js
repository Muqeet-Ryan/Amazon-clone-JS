import { cart,clearCart } from "../../data/cart.js";
import { formatMoney } from "../utils/money.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/order.js";


export function renderPaymentSummary() {

  let subtotal = 0;
  let shippingCost = 0;
  let totalItem = 0; 

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryId = cartItem.deliveryOptionId;

    const matchingProduct = products.find((p) => p.id === productId);
    const matchingShipping = deliveryOptions.find((o) => o.id === deliveryId);

    const itemTotal = cartItem.quantity * matchingProduct.priceCents;
    shippingCost += matchingShipping.priceCents;
    subtotal += itemTotal;
    totalItem += cartItem.quantity;

  });

  const totalBeforeTax = subtotal + shippingCost;
  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax + tax;
  
  let paymentSummaryHtml = `<div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${totalItem}):</div>
  <div class="payment-summary-money">$${formatMoney(subtotal)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatMoney(shippingCost)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatMoney(totalBeforeTax)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatMoney(tax)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatMoney(total)}</div>
</div>

<button class="place-order-button button-primary js-place-order-button">
  Place your order
</button>
`;

document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

const orderBtnEl =  document.querySelector('.js-place-order-button');

orderBtnEl.addEventListener('click', async()=> {

  try{
    const response = await fetch('https://supersimplebackend.dev/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: cart
    }),
  });
    console.log('Response object:', response);

  const fetchOrderData = await response.json();
  console.log(fetchOrderData);
  addOrder(fetchOrderData);
  
  window.location.href = 'orders.html';
  clearCart();


  } catch (error){
    alert(`Error: ${error.message}, Please try again`);
  }


});

}
