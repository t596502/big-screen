<template>
    <div>
        <BaseScrollList
                style="width: 500px;height: 500px"
                :config="config"
        ></BaseScrollList>
    </div>
</template>

<script>
    import BaseScrollList from '/@/components/BaseScrollList/index.vue'
    import {ref} from "vue";

    export default {
        name: "scrollTest",
        components:{BaseScrollList},
        setup(props){

            let config = ref({})

            let data = []

            for(let i = 0;i<10;i++){
              data.push([
                `同学${i+1}`,
                Math.floor(Math.random() * 10 + 20),
                Math.floor(Math.random() * 10000 * 10000),
              ])
            }
            config.value = {
                header:['姓名','月薪','年龄'],
                headerStyle:[{color:'red',width:'150px'}],
                rowStyle:[{color:'blue'}],
                rowBg:['rgb(240,240,240)','rgb(255,255,255)'],
                align:['center','center','left','right'],
                headerFontSize:20,
                rowFontSize:20,
                headerColor:'green',
                rowColor:'pink',
                headerHeight:"40",
                headerIndex:true,
                data,
                rowNum:8
            }
            return{
                config
            }
        }
    }
</script>

<style scoped>

</style>
