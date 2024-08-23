import type {IReview} from "@/types/review-d-t";
import type {IReviewResponse} from "@/types/review-response-d-t";
import {$axios} from "@/plugins/axiosInstance";
import type {IProduct} from "@/types/product-d-t";

export async function productReviewsData({page = 1, slug = '', product = undefined}: {
    page?: number,
    slug?: string,
    product?: IProduct
} = {}): Promise<IReview[]> {
    try {
        // console.warn(8,{prepend, append, page, slug})
        if (page) {
            page = Number(page) || 1;
            page = page < 1 ? 1 : page;
        }

        slug = slug || useRoute()?.params?.product;
        if (slug) {
            // let id = String(slug.split('-').shift());
            // slug = id ? `/${id}/products` : '';
            slug = slug ? `/${slug}` : '';
        }

        const url = `products${slug || ''}/reviews?` + (page ? `page=${page}` : '');
        const response: { data: { data: IReviewResponse[] } } = await $axios.get(url);

        return await Promise.all((response?.data?.data || []).map(convertProductReviewResponse));
    } catch (error) {
        console.error('Error fetching product reviews data:', error);
        return [];
    }
}

export function convertProductReviewResponse(review: IReviewResponse): IReview {
    return {
        ITYPE: "review",
        id: review?.id,
        comment: review.comment,
        rating: review.rating,
        user: review.user,
        date: review.date
    };
}

export default productReviewsData;