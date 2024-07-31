import {mapGetters} from "vuex";
import productParser from "@/utils/productParser";

export default {
    mixins: [productParser],
    computed: {
        ...mapGetters(["siteCurrency"]),
    },
    methods: {
        currency(value) {
            return this.siteCurrency + " " + parseFloat(value).toFixed(2);
        },
    },
    mounted() {
        this.loadData && this.loadData();
        // this.$nextTick(() => {})
    },
    watch: {
        $route() {
            this?.loadData && this?.loadData();
        },
    },
}