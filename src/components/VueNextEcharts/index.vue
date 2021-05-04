<template>
    <div :class="[uuidChart,'echarts']"></div>
</template>

<script>
    import * as Echarts from 'echarts'
    import { v4 as uuidv4 } from 'uuid'
    import {onMounted,watch} from 'vue';
    export default {
        name: "VueNextEcharts",
        props:{
            options:{
                type:Object,
                default:()=>{}
            },
            theme:[String,Object]
        },
        setup(props){
            let dom,echarts;
            const uuidChart = `echarts-${uuidv4()}`
            const initEcharts = ()=>{

                if(!echarts){
                    dom = document.getElementsByClassName(uuidChart)[0]
                    echarts = Echarts.init(dom,props.theme)
                }
                echarts && echarts.setOption(props.options,true)
            }
            onMounted(()=>{
                initEcharts()
            })
            watch(()=>props.options,()=>{
                initEcharts()
            })
            return{
                uuidChart
            }
        }
    }
</script>

<style scoped lang="scss">
    .echarts{
        width: 100%;
        height: 100%;
    }
</style>
