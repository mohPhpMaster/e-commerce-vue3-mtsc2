<template>
  <section class="tp-order-area pb-160">
    <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
              <div class="col-lg-6">
                <div class="tp-order-details" style="background-color: var(--tp-navbar-bg-color); color: var(--tp-navbar-text-color);">
                    <div class="tp-order-details-top text-center mb-70">
                      <div class="tp-order-details-icon">
                          <span>
                            <svg-order-icon/>
                          </span>
                      </div>
                      <div class="tp-order-details-content">
                          <h3 class="tp-order-details-title">{{ $t('Your Order Confirmed.') }}</h3>
                          <p>{{ $t('We will send you a shipping confirmation email as soon as your order ships') }}</p>
                      </div>
                    </div>
                    <div class="tp-order-details-item-wrapper">
                      <div class="row">
                          <div class="col-sm-6">
                            <div class="tp-order-details-item">
                                <h4>{{ $t('Order Date:') }}</h4>
                                <p>April 10, 2023</p>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="tp-order-details-item">
                                <h4>{{ $t('Order Number:') }}</h4>
                                <p>#9641</p>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="tp-order-info-wrapper">
                    <h4 class="tp-order-info-title">{{ $t('Order Details') }}</h4>

                    <div class="tp-order-info-list">
                      <ul>

                          <!-- header -->
                          <li class="tp-order-info-list-header">
                            <h4>{{ $t('Product') }}</h4>
                            <h4>{{ $t('Total') }}</h4>
                          </li>

                          <!-- item list -->
                          <li class="tp-order-info-list-desc">
                            <p>Xiaomi Redmi Note 9 Global V. <span> x 2</span></p>
                            <span>$274:00</span>
                          </li>

                          <!-- subtotal -->
                          <li class="tp-order-info-list-subtotal">
                            <span>{{ $t('Subtotal') }}</span>
                            <span>$507.00</span>
                          </li>

                          <!-- shipping -->
                      <!-- shipping -->
                      <li class="tp-order-info-list-shipping">
                          <span>{{ $t('Shipping') }}</span>
                          <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                            <span>
                                <input id="shipping_info" type="checkbox">
                                <label for="shipping_info">Flat rate: <span>$20.00</span></label>
                            </span>
                          </div>
                      </li>

                          <!-- total -->
                          <li class="tp-order-info-list-total">
                            <span>{{ $t('Total') }}</span>
                            <span>$1,476.00</span>
                          </li>
                      </ul>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div class="invoice__print text-end mt-3">
          <div class="row">
            <div class="col-xl-12">
              <button type="button" class="tp-invoice-print tp-btn tp-btn-black" @click="$router.go(-1)">
                <span class="mr-5">
                  <i class="fa-regular fa-turn-up"></i>
                </span> {{ $t('Back') }} </button>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>
