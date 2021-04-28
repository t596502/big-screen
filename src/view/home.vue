<template>
    <div class="home">
        <imoocLoading  v-if="loading">
            <div class="loading-text">数据大屏加载中...</div>
        </imoocLoading>
        <ImoocContainer v-else :options="{width:3480,height:2160}">
            <div class="top">
                <TopHeader></TopHeader>
            </div>
         </ImoocContainer>
    </div>
</template>

<script>
    import {ref,onMounted} from 'vue'
    import ImoocContainer from '../components/ImoocContainer/index.vue'
    import imoocLoading from '../components/ImoocLoading/index.vue'
    import TopHeader from '../components/TopHeader/index.vue'

    export default {
        name: "Home",
        components:{ImoocContainer,imoocLoading,TopHeader},
        setup(){
            const loading = ref(true)

            onMounted(()=>{
                setTimeout(() => {
                    loading.value = false
                }, 200)
            })
            return{
                loading
            }
        }
    }
</script>

<style scoped>
    .home{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #1d1d1d;
        color: #fff;
        font-size: 48px;
    }
    .test{
        font-size: 140px;
        transform: scale(1,1);
    }
    .home #imooc-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header {
        width: 100%;
        margin-top: 10px;
        height: 167px;
    }
</style>
