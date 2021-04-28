<template>
    <div id="imooc-container" :ref="refName">
        <template v-if="isReady">
            <slot></slot>
        </template>
    </div>
</template>

<script>
    import {ref,nextTick,onMounted,getCurrentInstance,onUnmounted} from 'vue'
    import {debounce} from "../../utils";

    export default {
        name: "ImoocContainer",
        props:{
            options:Object,
        },
        setup(props){
            const refName = 'imoocContainer'
            // 容器宽高
            const width = ref(0)
            const height = ref(0)
            // 视口宽高
            const originalWidth = ref(0)
            const originalHeight = ref(0)

            const isReady = ref(false)
            const style = ref({})
            let context,dom,observer

            const initSize = ()=>{
                return new Promise(resolve => {
                    nextTick(()=>{
                        dom = context.$refs[refName]
                        if(props.options && props.options.width && props.options.height){
                            width.value = props.options.width
                            height.value = props.options.height
                        }else {
                            width.value = dom.clientWidth
                            height.value = dom.clientHeight
                        }
                        if(!originalWidth.value || !originalHeight.value){
                            originalWidth.value = window.screen.width
                            originalHeight.value = window.screen.height
                        }
                        console.log(window.screen);
                        console.log('大屏真实尺寸', width.value, height.value,originalWidth.value, originalHeight.value)
                        resolve()
                    })
                })
            }
            const updateSize = ()=>{
                if(width.value && height.value){
                    dom.style.width = `${width.value}px`
                    dom.style.height = `${height.value}px`
                }else {
                    dom.style.width = `${originalWidth.value}px`
                    dom.style.height = `${originalHeight.value}px`
                }
            }

            const updateScale = ()=>{
                // 当前展示的区域
                const clientWidth = document.body.clientWidth
                const clientHeight = document.body.clientHeight
                console.log('展示区域的宽高 ', clientWidth, clientHeight)
                // 获取大屏最终真实的宽高
                const realWidth = width.value || originalWidth.value
                const realHeight = height.value || originalHeight.value
                console.log('获取大屏真实的宽高 ', realWidth, realHeight)
                const widthScale = clientWidth / realWidth
                const heightScale = clientHeight / realHeight
                dom.style.transform = `scale(${widthScale},${heightScale})`

            }
            const onResize = async(e)=>{
                console.log('initMutationObserver',e);
                await initSize()
                updateScale()
            }

            const initMutationObserver = ()=>{
                // https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
                const MutationObserver = window.MutationObserver
                // 创建一个观察器实例并传入回调函数
                const observer = new MutationObserver(onResize)
                // 配置开始观察目标节点 dom
                // 观察器的配置（需要观察什么变动）
                observer.observe(dom,{
                    attributes:true,
                    attributeFilter:['style'],
                    attributeOldValue: true
                })
            }

            const removeMutationObserver = () => {
                if (observer) {
                    observer.disconnect()
                    observer.takeRecords()
                    observer = null
                }
            }

            onMounted(async()=>{
                isReady.value = false
                const instance = getCurrentInstance()
                context = instance.ctx
                await initSize()
                updateSize()
                updateScale()
                window.addEventListener('resize',debounce(100,onResize))
                initMutationObserver()
                isReady.value = true
            })
            onUnmounted(()=>{
                window.removeEventListener('resize',onResize)
                removeMutationObserver()
            })
            const onclick = ()=>{
                dom.style.height=`1000px`

            }
            return{
                refName,
                onclick,
                isReady
            }
        }
    }
</script>

<style scoped>
    #imooc-container {
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
        transform-origin: left top;
        z-index: 999;
    }
</style>
