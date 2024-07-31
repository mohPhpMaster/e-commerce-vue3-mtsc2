import {mapGetters} from "vuex";
import global_mixins from "@/utils/global_mixins";
import {id, model} from "@/utils/model_id";

export default {
    mixins: [global_mixins],
    methods: {
    },
    computed: {
        id,
        model,
    },
    mounted() {},
    watch: {
        id() {
            this?.loadData && this?.loadData();
        },
    },
}