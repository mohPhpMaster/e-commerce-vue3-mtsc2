<template>
  <footer>
    <div class="tp-footer-area tp-footer-style-2 tp-footer-style-5">
      <div class="tp-footer-top pt-95 pb-45">
          <div class="container">
            <div class="row">
                <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                  <div class="tp-footer-widget footer-col-1 mb-50">
                      <div class="tp-footer-widget-content">
                        <div class="tp-footer-logo">
                            <nuxt-link href="/">
		                          <img :src="$settings?.logoSmall" alt="logo" class="site-logo">
                            </nuxt-link>
                        </div>
                        <p class="tp-footer-desc" v-html="$settings?.siteDescription" />

												<div class="tp-footer-social">
													<site-social-links />
												</div>

	                      <language-selector />
                      </div>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div class="tp-footer-widget footer-col-2 mb-50">
                      <h4 class="tp-footer-widget-title">My Account</h4>
                      <div class="tp-footer-widget-content">
                        <ul>
                            <li><a href="#">Track Orders</a></li>
                            <li><a href="#">Shipping</a></li>
                            <li><a href="#">Wishlist</a></li>
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">Order History</a></li>
                            <li><a href="#">Returns</a></li>
                        </ul>
                      </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div class="tp-footer-widget footer-col-3 mb-50">
                      <h4 class="tp-footer-widget-title">Infomation</h4>
                      <div class="tp-footer-widget-content">
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Latest News</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                      </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div class="tp-footer-widget footer-col-4 mb-50">
                      <h4 class="tp-footer-widget-title">{{ $t('Talk To Us') }}</h4>
                      <div class="tp-footer-widget-content">
                        <div v-if="$settings?.phone" class="tp-footer-talk mb-20">
                            <span>{{ $t('Got Questions? Call us') }}</span>
                            <h4><nuxt-link :href="'tel:' + $settings?.phone">{{ $settings?.phone }}</nuxt-link></h4>
                        </div>
                        <div class="tp-footer-contact">
                            <div v-if="$settings?.email" class="tp-footer-contact-item d-flex align-items-start">
                              <div class="tp-footer-contact-icon">
                                  <span>
                                    <svg-email></svg-email>
                                  </span>
                              </div>
                              <div class="tp-footer-contact-content">
                                  <p><nuxt-link :href="'mailto:' + $settings?.email">{{ $settings?.email }}</nuxt-link></p>
                              </div>
                            </div>
                            <div v-if="$settings?.address" class="tp-footer-contact-item d-flex align-items-start">
                              <div class="tp-footer-contact-icon">
                                  <span>
                                    <svg-location></svg-location>
                                  </span>
                              </div>
                              <div class="tp-footer-contact-content">
                                  <p><nuxt-link
		                                  :href="$settings?.address_url"
		                                  target="_blank"
		                                  v-html="$settings?.address"
                                  /></p>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div class="tp-footer-bottom">
          <div class="container">
            <div class="tp-footer-bottom-wrapper">
                <div class="row align-items-center">
                  <div class="col-md-6">
                      <div
		                      v-if="$settings.siteCopyRight"
		                      class="tp-footer-copyright"
		                      v-html="$settings.siteCopyRight"
                      ></div>
                      <div v-else class="tp-footer-copyright">
                        <p>© 2024 All Rights Reserved  |  By <a
		                        href="https://mtsc.tech/"
		                        target="_blank"
                        >Modern Technology Solution Company</a>.</p>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="tp-footer-payment text-md-end">
                        <p>
                            <img alt="" src="/images/footer/footer-pay-2.png">
                        </p>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const {settings} = useSiteSettings();

const cssStyle = () => `
	a:focus,
	a:hover{
		color: var(--tp-hover-color) !important;
		text-decoration: none;
	}

	.tp-footer-area {
		background-color: var(--tp-footer-bg-color) !important;
	}

	.tp-footer-area,
	.tp-footer-area :is(p, h1, h2, h3, h4, h5, h6) {
		color: var(--tp-footer-text-color) !important;
	}
`;

useHead({
	style: [
		{
			id: 'footer-area-style',
			type: 'text/css',
			innerHTML: cssStyle()
		},
	],
});

</script>

<style lang="scss" scoped>
.site-logo {
	height: 35px;
}
</style>