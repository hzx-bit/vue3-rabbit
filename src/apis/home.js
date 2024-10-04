import httpInstance from "@/utils/http";
export function getBannerAPI(params = {}) {
    const { distributionSite = '1' } = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}
export function getNewAPI(limit) {
    return httpInstance({
        url: '/home/new',
        params: {
            limit
        }
    })
}
export function getHotAPI() {
    return httpInstance({
        url: '/home/hot'
    })
}
export function getGoodsAPI() {
    return httpInstance({
        url: '/home/goods'
    })
}