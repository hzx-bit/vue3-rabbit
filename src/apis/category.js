import httpInstance from "@/utils/http";
export function getTopCategoryAPI(id) {
    return httpInstance({
        url: '/category',
        params: {
            id
        }
    })
}