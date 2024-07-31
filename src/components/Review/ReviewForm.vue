<template>
	<form class="review-form" @submit.prevent="submitReview">
    <div class="mb-3">
      <label for="rating" class="form-label mb-0">التقييم:</label>
		  <div class="rating">
		    <span v-for="star in 5" :key="star" :class="{ filled: star <= newReview.rating }" class="star" @click="setRating(star)">&#9733;</span>
			</div>
    </div>

    <div class="mb-3" v-show="newReview.rating">
      <label for="comment" class="form-label mb-0">التعليق:</label>
      <textarea id="comment" v-model="newReview.comment" required class="form-control"></textarea>
    </div>

    <button type="submit" :disabled="!newReview.rating" class="btn btn-block btn-outline-primary" :class="{ 'disabled': !newReview.rating }">إرسال المراجعة</button>
	</form>
</template>

<script>
import {addProductReview} from "@/plugins/axios";
import swal from "sweetalert";

export default {
	name: 'ReviewForm',
	props: {
		product: {
			type: [Object, null],
			required: true
		},
	},
	data() {
		return {
			newReview: {
				comment: '',
				rating: 0,
			}
		}
	},
	methods: {
		async submitReview() {
			try {
				const response = await addProductReview(this.product?.slug, this.newReview);
				this.$emit('review-submitted', response);

				this.newReview = {comment: '', rating: 0};
				swal({
					text: "تمت اضافة المراجعة بنجاح",
					icon: "success"
				});
			} catch (error) {
				console.error('Error submitting review:', error);

				swal({
					text: "حصل خطا غير متوقع!",
					icon: "error",
					closeOnClickOutside: false,
				});
			}
		},
		setRating(rating) {
			this.newReview.rating = rating;
		}
	}
}
</script>

<style scoped>
.rating {
	display: flex;
	margin-bottom: 1rem;
}

.rating .star {
	cursor: pointer;
}

.star {
	font-size: 1.5rem;
	color: #ccc;
}

.star.filled {
	color: #ff9800;
}

.star:hover {
	text-shadow: 0 0 5px #ff9800;
}
</style>