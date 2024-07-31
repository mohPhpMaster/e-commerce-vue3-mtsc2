<template>
  <div v-for="review in reviews" :key="review.id" class="review mb-4 p-3 border-bottom">
    <div class="review-header d-flex justify-content-between align-items-center mb-2">
      <div class="review-user font-weight-bold">
        <h5 class="m-0">{{ review.user }}</h5>
        <p class="review-date text-muted small">{{ review.date }}</p>
      </div>
      <div class="review-rating d-flex align-items-center">
        <span class="stars me-2">
          <span v-for="star in 5" :key="star" :class="{ filled: star <= review.rating }" class="star">&#9733;</span>
        </span>
        <span class="review-score">({{ review.rating || 0 }})</span>
      </div>
    </div>
    <p class="review-content font-italic" v-html="parseComment(review.comment)"></p>
  </div>
</template>

<script>
export default {
	name: 'Reviews',
	props: {
		reviews: {
			type: [Array, null],
			required: true
		}
	},
	methods: {
		parseComment(comment) {
			return comment.replace(/\n/g, '<br>')
		}
	}
}
</script>

<style scoped>
.review-header h5 {
	font-size: 1.1rem;
	color: #555;
}

.review-date {
	font-size: 0.85rem;
	color: #999;
}

.review-rating .star {
	font-size: 1.5rem;
	color: #ccc;
}

.star.filled {
	color: #ff9800;
}

.review-score {
	font-size: 1.5rem;
	color: var(--secondary);
}

.review-content {
  font-size: 0.95rem;
  color: #666;
}
</style>