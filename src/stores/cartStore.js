import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "./userStore"
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    const totalCount = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count, 0))
    const totalPrice = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0))
    const allChecked = computed(() => cartList.value.every(item => item.selected))
    const selectedCount = computed(() => cartList.value.reduce((pre, cur) => pre + (cur.selected ? cur.count : 0), 0))
    const selectedPrice = computed(() => cartList.value.reduce((pre, cur) => pre + (cur.selected ? cur.count * cur.price : 0), 0))
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    const clearCart = () => {
        cartList.value = []
    }
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            const item = cartList.value.find(item => goods.skuId === item.skuId)
            if (item) {
                item.count++

            }
            else {
                cartList.value.push(goods)
            }
        }
    }
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            cartList.value = cartList.value.filter(item => item.skuId != skuId)
        }
    }
    const singleCheck = (skuId, selected) => {
        cartList.value.forEach(item => {
            if (item.skuId === skuId) item.selected = selected
        })
    }
    const allCheck = selected => cartList.value.forEach(item => item.selected = selected)
    return {
        allChecked,
        totalCount,
        totalPrice,
        cartList,
        selectedCount,
        selectedPrice,
        updateNewList,
        addCart,
        delCart,
        clearCart,
        singleCheck,
        allCheck
    }
}, {
    persist: true,
}
)