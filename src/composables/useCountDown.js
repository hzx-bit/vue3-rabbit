import dayjs from "dayjs"
import { computed, onUnmounted, ref } from "vue"
import { useRouter } from "vue-router"

export const useCountDown = () => {
    let timer = null
    const time = ref(0)
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    const router = useRouter()
    const start = (currentTime) => {
        time.value = currentTime
        timer = setInterval(() => {
            time.value--;
            if (time.value < 0) {
                clearInterval(timer)
                router.push('/')
            }
        }, 1000);
    }
    onUnmounted(() => {
        if (timer) clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}