import { cart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function orderSummary() {
  let orderSummaryHtml = "";

  cart.forEach((cartItem) => {
    const matchingProduct = products.find((p) => p.id === cartItem.productId);

    const deliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
    const today = dayjs()
    const dateString = today.add(deliveryOption.days, 'day').format('dddd, D MMMM');

    orderSummaryHtml += `
          <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatMoney(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${loadDelivery(matchingProduct, cartItem)}
                
              </div>
            </div>            
        </div>
        `;
  });

  function loadDelivery(matchingProduct, cartItem) {
    let deliveryHtml = '';
    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs()
      const dateString = today.add(deliveryOption.days, 'day').format('dddd, D MMMM');
      console.log(dateString);
      const priceString = deliveryOption.priceCents === 0 ? 'Free' : formatMoney(deliveryOption.priceCents);
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      console.log(priceString);

        deliveryHtml += `
        <div class="delivery-option js-delivery-option" data-delivery-option-id="${deliveryOption.id}"
        data-product-id="${matchingProduct.id}">
                  <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
              <div>
                  <div class="delivery-option-date">
                      ${dateString}
                  </div>
                  <div class="delivery-option-price">
                      ${priceString} - Shipping
                  </div>
              </div>
          </div>
  `;
    });

      return deliveryHtml;
   
  }
  document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;

  document.querySelectorAll('.js-delivery-option').forEach((option)=> {

    option.addEventListener('click', () => {

      const {productId, deliveryOptionId} = option.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      orderSummary();
    }); 

  });

}
