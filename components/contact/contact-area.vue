<template>
  <breadcrumb class="text-center" :title="$t('Keep In Touch with Us')" :subtitle="$t('Contact Us')" />

	<section class="tp-contact-area pb-100">
	  <div class="container">
	      <div class="tp-contact-inner">
	        <div class="row">
	            <div class="col-xl-9 col-lg-8">
	              <div class="tp-contact-wrapper">
	                  <h3 class="tp-contact-title">{{ $t('Sent A Message') }}</h3>

	                  <div class="tp-contact-form">
	                    <!-- form start -->
	                    <forms-contact-form/>
	                    <!-- form end -->
	                    <p class="ajax-response"></p>
	                  </div>
	              </div>
	            </div>
	            <div class="col-xl-3 col-lg-4">
	              <div class="tp-contact-info-wrapper">
	                  <div class="tp-contact-info-item">
	                    <div class="tp-contact-info-icon">
	                        <span>
	                          <img src="/images/contact/contact-icon-1.png" :alt="$t('Contact Us')">
	                        </span>
	                    </div>
	                    <div class="tp-contact-info-content" v-if="$settings?.email || $settings?.phone">
	                        <p data-info="mail"><a :href="'mailto:' + $settings?.email" v-if="$settings?.email">{{ $settings?.email }}</a></p>
	                        <p data-info="phone"><a :href="'tel:' + $settings?.phone" v-if="$settings?.phone">{{ $settings?.phone }}</a></p>
	                    </div>
	                  </div>
	                  <div class="tp-contact-info-item" v-if="$settings?.address">
	                    <div class="tp-contact-info-icon">
	                        <span>
	                          <img src="/images/contact/contact-icon-2.png" alt="">
	                        </span>
	                    </div>
	                    <div class="tp-contact-info-content">
	                        <p>
	                          <a :href="$settings?.address_url || '#'" target="_blank" v-html="$settings?.address"></a>
	                        </p>
	                    </div>
	                  </div>
	                  <div class="tp-contact-info-item">
	                    <div class="tp-contact-info-icon">
	                        <span>
	                          <img src="/images/contact/contact-icon-3.png" alt="">
	                        </span>
	                    </div>
	                    <div class="tp-contact-info-content">
	                        <div class="tp-contact-social-wrapper mt-5">
	                          <h4 class="tp-contact-social-title">{{ $t('Find on social media') }}</h4>

	                          <div class="tp-contact-social-icon">
	                            <site-social-links :hide="['email', 'phone', 'address', 'address_url']"/>
	                          </div>
	                        </div>
	                    </div>
	                  </div>
	              </div>
	            </div>
	        </div>
	      </div>
	  </div>
	</section>

	<section class="tp-map-area pb-120" v-if="$settings?.address_url">
	  <div class="container">
	      <div class="row">
	        <div class="col-xl-12">
	            <div class="tp-map-wrapper">
	              <div class="tp-map-hotspot">
	                  <span class="tp-hotspot tp-pulse-border">
	                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
	                        <circle cx="6" cy="6" r="6" fill="#821F40"/>
	                    </svg>
	                  </span>
	              </div>
	              <div class="tp-map-iframe">
	                  <iframe :src="$settings?.address_url"></iframe>
	<!--                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830894612!2d-74.11976383964465!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1678114595329!5m2!1sen!2sbd"></iframe>-->
	              </div>
	            </div>
	        </div>
	      </div>
	  </div>
	</section>
</template>

<script setup lang="ts">

</script>
