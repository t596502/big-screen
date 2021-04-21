<template>
    <div id="imooc-container" :ref="refName">
        <template>
            <slot></slot>
        </template>
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
                    })
                    console.log('大屏真实尺寸', width.value, height.value)
                    resolve()
                })
            }
            const promise = new Promise((resolve, reject) => {
                console.log(1);
                resolve();
                setTimeout(() => {
                    console.log(2);
                })
                reject('error');
            })
            promise.then(() => {
                console.log(3);
            }).then(() => {
                console.log(5)
            }).catch(e => console.log(e))
            console.log(4);

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

</style>
