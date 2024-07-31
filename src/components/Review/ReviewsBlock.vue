<template>
  <div class="reviews-section col-12 p-4 bg-light rounded mt-3 shadow-sm">
    <h2 class="mb-4">المراجعات</h2>
    <div v-if="reviews.length" class="reviews-list mb-4">
      <Reviews :reviews="reviews" />
    </div>
    <div v-else class="no-reviews text-center text-muted mb-4">
      <p>لا توجد مراجعات حتى الآن. كن أول من يراجع هذا المنتج!</p>
    </div>

	  <ReviewForm :product="product" @review-submitted="onReviewSubmitted" />
  </div>
</template>

<script>
import mixins from "@/utils/mixins";
import {getProductReviews} from "@/plugins/axios";
import Reviews from "@/components/Review/Reviews.vue";
import ReviewForm from "@/components/Review/ReviewForm.vue";

export default {
	name: 'ReviewsBlock',
	components: {ReviewForm, Reviews},
	props: {
		product: {
			type: [Object, null],
			required: true
		},
	},
	mixins: [mixins],
	data() {
		return {
			reviews: [],
		};
	},
	mounted() {
	},
	methods: {
		async loadData() {
			// product_reviews.json
			if (this.id) {
				try {
					this.reviews = await getProductReviews(this.id);
				} catch (error) {
					console.error('Error fetching reviews:', error);
				}
			}
		},
		onReviewSubmitted(review) {
			this.reviews.push(review);
		}
	}
};
</script>

<style scoped>
.reviews-section {
	font-family: Arial, sans-serif;
}

.reviews-section h2 {
	font-size: 1.75rem;
	color: #333;
}

.reviews-list {
	display: flex;
	flex-direction: column;
}

.no-reviews p {
	font-size: 1.2rem;
}

.review-form .form-group {
	margin-bottom: 1.25rem;
}

.review-form label {
	color: #333;
	font-size: 1.1rem;
}

.review-form .form-control {
	padding: 0.75rem;
	font-size: 1.1rem;
}

.review-form button {
	padding: 0.75rem;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 0.375rem;
	cursor: pointer;
	font-size: 1.1rem;
}

.review-form button:hover {
	background-color: #0056b3;
}

.rating .star {
	cursor: pointer;
}

.star {
	font-size: 1.75rem;
	color: #ccc;
}

.star.filled {
	color: #ff9800;
}

</style>
