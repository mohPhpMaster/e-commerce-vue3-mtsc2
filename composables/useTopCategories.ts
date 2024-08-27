import {onMounted, watch} from 'vue';
import {api} from "@/plugins/api";

export function useTopCategories() {
    const topCategories = useState('top_categories', (): string[] => [])
    const currentPage = useState('current_page', (): number => 1)

    const loadTopCategories = () => {
        return api.categoryData({
            page: currentPage.value,
            slug: ""
        }).then((data) => {
            topCategories.value = data;

            return data;
        })
    };

    onMounted(loadTopCategories)

    watch(currentPage, loadTopCategories);

    return {
        topCategories,
        loadTopCategories,
        currentPage,
    }
}