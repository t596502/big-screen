<template>
    <div id="imooc-container" :ref="refName">
        <slot></slot>
    </div>
</template>

<script>
    import {ref,nextTick,onMounted,getCurrentInstance} from 'vue'
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
                        console.log('大屏真实尺寸', width.value, height.value)
                    })
                    resolve()
                })
            }


            onMounted(async()=>{
                const instance = getCurrentInstance()
                context = instance.ctx
                await initSize()

            })

            return{
                refName
            }
        }
    }
</script>

<style scoped>
    #imooc-container {
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*overflow: hidden;*/
        /*transform-origin: left top;*/
        /*z-index: 999;*/
    }
</style>
