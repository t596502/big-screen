<template>
    <div>
        <ImoocContainer :options="{width:100,height:100}"></ImoocContainer>
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

</style>
