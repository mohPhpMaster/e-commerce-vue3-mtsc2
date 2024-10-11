<template>
  <form @submit="onSubmit">
    <div class="tp-product-details-review-form-rating d-flex align-items-center row">
      <div class="col-auto">{{ $t("Rating") }}:</div>
      <div class="tp-product-details-review-form-rating-icon d-flex align-items-center pointer col-md-10 col-12">
        <Field v-slot="{ field }" :model-value="userRating" name="rating">
          <product-rating :rating="field.value" @clicked="loading || (userRating = $event + 1)"/>
        </Field>
      </div>
      <p class="col-12">
	      <err-message :msg="errors.rating" />
      </p>
    </div>
    <div class="tp-product-details-review-input-wrapper">
      <div class="tp-product-details-review-input-box">
        <div class="tp-product-details-review-input">
          <Field name="comment" v-slot="{ field }">
            <textarea v-bind="field" id="comment" name="comment" :placeholder="$t('Write your comment here...')"
                      :disabled="loading" ></textarea>
          </Field>
        </div>
        <div class="tp-product-details-review-input-title">
          <label for="comment">{{ $t('Write Review') }}</label>
        </div>
        <err-message :msg="errors.comment" />
      </div>
<!--      <div v-if="false" class="tp-product-details-review-input-box">-->
<!--        <div class="tp-product-details-review-input">-->
<!--          <input-->
<!--		          id="name"-->
<!--		          :placeholder="$t('Your Name')"-->
<!--		          name="name"-->
<!--		          type="text"-->
<!--		          v-bind="name"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="tp-product-details-review-input-title">-->
<!--          <label for="name">{{ $t('Your Name') }}</label>-->
<!--        </div>-->
<!--        <err-message :msg="errors.name" />-->
<!--      </div>-->
<!--      <div v-if="false" class="tp-product-details-review-input-box">-->
<!--        <div class="tp-product-details-review-input">-->
<!--          <input-->
<!--		          id="email"-->
<!--		          :placeholder="$t('Your Email')"-->
<!--		          name="email"-->
<!--		          type="email"-->
<!--		          v-bind="email"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="tp-product-details-review-input-title">-->
<!--          <label for="email">{{ $t('Your Email') }}</label>-->
<!--        </div>-->
<!--        <err-message :msg="errors.email" />-->
<!--      </div>-->
    </div>
<!--    <div v-if="false" class="tp-product-details-review-suggetions mb-20">-->
<!--      <div class="tp-product-details-review-remeber">-->
<!--        <input id="remeber" type="checkbox" />-->
<!--        <label for="remeber">{{ $t('Save my name, email, and website in this browser for the next time I comment.') }}</label>-->
<!--      </div>-->
<!--    </div>-->
    <div class="tp-product-details-review-btn-wrapper">
      <button class="tp-product-details-review-btn" type="submit" :disabled="loading">{{ $t('Submit Review') }}</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import {Field, useForm} from 'vee-validate';
import * as yup from 'yup';
import toolsService from "@/services/toolsService";
import type {IProduct} from "@/types/product-d-t";
import formDataService from "@/services/formDataService";
import type {IReview} from "@/types/review-d-t";
import {toast} from "vue3-toastify";

const emit = defineEmits(["added"]);
const props = defineProps<{ product: IProduct }>();
const {t} = useI18n();

const userRating = ref(0);
const loading = ref<boolean>(false);

interface IFormValues {
	// name?: string | null;
	// email?: string | null;
	comment: string;
	rating: number;
}

const {errors, handleSubmit, defineInputBinds, resetForm} = useForm<IFormValues>({
	validationSchema: yup.object({
		// name: yup.string().required().label(t("Name")),
		// email: yup.string().required().email().label(t("Email")),
		comment: yup.string().required().label(t("Comment")),
		rating: yup.number().min(1, t("Please rate")).required().label(t("Rating")),
	}),
});

const onSubmit = handleSubmit(values => {
	if (loading.value) return;

	loading.value = true;
	$axios
			.post(toolsService.getProductReviewUrl(props?.product), formDataService(values))
			.then((response: {data: {data: IReview, message?: string}}) => {
				const data = response?.data?.data || {};
				nextTick(() => toast.success(response?.data?.message || t('Thank you for your review!')));
				resetForm();
				emit('added', data);
			})
			.catch((error) => {
				if (error?.response?.data?.message) {
					toast.error(error?.response?.data?.message);
				} else if (error?.message) {
					toast.error(error?.message);
				}

				console.error(error);
				setTimeout(() => {
					const userInput = document.querySelector('#comment');
					userInput?.focus();
					userInput?.select();
				}, 500);
			})
			.finally(() => {
				setTimeout(() => {
					loading.value = false;
				}, 100);
			});
});

// const name = defineInputBinds('name');
// const email = defineInputBinds('email');
const comment = defineInputBinds('comment');
const rating = defineInputBinds('rating');
</script>