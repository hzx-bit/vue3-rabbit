import { loginAPI } from "@/apis/user"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useCartStore } from "./cartStore"
import { mergeCartAPI } from "@/apis/cart"
export const useUserStore = defineStore('user', () => {
    let userInfo = ref({})
    const cartStore = useCartStore()
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        mergeCartAPI(cartStore.cartList.map(item => ({ skuId: item.skuId, selected: item.selected, count: item.count })))
        cartStore.updateNewList()
    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
    {
        persist: true,
    },
)