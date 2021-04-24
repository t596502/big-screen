<template>
    <div class="home">
        <ImoocContainer>
            <div class="test">2131231</div>
         </ImoocContainer>
    </div>
</template>

<script>
    import ImoocContainer from '../components/ImoocContainer/index.vue'
    export default {
        name: "Home",
        components:{ImoocContainer},
        setup(){
            console.log(3333);

        }
    }
</script>

<style scoped>
    /*.home{*/
    /*    width: 100%;*/
    /*    height: 100%;*/

    /*}*/
    .test{
        font-size: 14px;
        transform: scale(1,1);
    }
    .home #imooc-container {
        /*width: 100%;*/
        /*height: 100%;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        /*align-items: center;*/
    }
</style>
