import { getTopCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
export function useCategory() {
    const route = useRoute()
    const categoryData = ref({})
    const getCategory = async (id = route.params.id) => {
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => {
        getCategory()
    })
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })
    return {
        categoryData
    }
}