import { formatMoney } from "../scripts/utils/money.js";
import { products } from "./products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";


export let orders =  JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(fetchOrderData) {
  orders.unshift(fetchOrderData);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function renderOrder() {
  let orderPageHtml = "";
const formatdate = (date) => dayjs(date).format('dddd, D MMMM, YYYY'); 
  orders.forEach((order) => {

    orderPageHtml += ` <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatdate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatMoney(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${loadProductOrder(order.products)}
          </div>
        </div>`;
  });


  function loadProductOrder(orderProducts){

    let html = '';

    orderProducts.forEach((op) => {
        let productId = op.productId;
        const matchingProduct = products.find((p) => p.id === productId);

        html += `<div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatdate(op.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${op.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
    });
    return html;
  }


  const orderEl = document.querySelector('.js-orders-grid');
  orderEl.innerHTML = orderPageHtml;
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrder();
});
