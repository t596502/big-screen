<template>
    <div class="home">
        <imoocLoading  v-if="loading">
            <div class="loading-text">数据大屏加载中...</div>
        </imoocLoading>
        <ImoocContainer v-else :options="{width:3480,height:2160}">
            <div class="header">
                <top-header />
            </div>
            <div class="separator-wrapper">
                <div class="separator"></div>
            </div>
            <div class="center">
                <div class="left">
                    <div class="left1">
                        <total-user
                                :today-user="todayUser"
                                :growth-last-day="growthLastDay"
                                :growth-last-month="growthLastMonth"
                        />
                    </div>
                    <div class="left2">
                        <average-age
                                :data="ageData"
                                :avg-age="averageAge"
                        />
                    </div>
                    <div class="left3">
                        <total-device :data="deviceData" />
                    </div>
                    <div class="left4">
                        <total-gender :data="genderData" />
                    </div>
                    <div class="left5">
                        <total-rider :data="riderData" />
                    </div>
                    <div class="left6">
                        <hot-category :data="hotCategoryData" />
                    </div>
                </div>
                <div class="right">
                    <div class="right-top1">
                        <center-header :data="headerData" />
                    </div>
                    <div class="right-top2">
                        <transform-category :data="countryCategoryData"/>
                    </div>
                    <div class="right-bottom">
                        <div class="right-left">
                            <div class="right-left1">
                                <order-map />
                            </div>
                            <div class="right-left2">
                                <transform-category
                                        :data="indexCategoryData"
                                        :color="['rgb(178,209,126)', 'rgb(116,166,49)']"
                                />
                            </div>
                            <div class="right-left3">
                                <Imooc-Fly-Box>
                                    <real-time-order :data="realTimeOrderData"/>
                                </Imooc-Fly-Box>
                            </div>
                            <div class="right-left4">
                                <schedule-view />
                            </div>
                        </div>
                        <div class="right-right">
                            <div class="right-right1">
                                <sales-list :data="salesListData"/>
<!--                                <sales-list />-->
                            </div>
                            <div class="right-right2">
                                <sales-rank :data="salesRankData" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </ImoocContainer>
    </div>
</template>

<script>
    import {ref,onMounted} from 'vue'
    import {useScreenData} from '/@/hooks/useScreenData.js'
    import ImoocContainer from '../components/ImoocContainer/index.vue'
    import imoocLoading from '../components/ImoocLoading/index.vue'
    import TopHeader from '/@/components/TopHeader/index.vue'
    import TotalUser from '/@/components/TotalUser/index.vue'
    import AverageAge from '/@/components/AverageAge/index.vue'
    import TotalDevice from '/@/components/TotalDevice/index.vue'
    import TotalGender from '/@/components/TotalGender/index.vue'
    import TotalRider from '/@/components/TotalRider/index.vue'
    import HotCategory from '/@/components/HotCategory/index.vue'
    import CenterHeader from '/@/components/CenterHeader/index.vue'
    import TransformCategory from '/@/components/TransformCategory/index.vue'
    import OrderMap from '/@/components/OrderMap/index.vue'
    import RealTimeOrder from '/@/components/RealTimeOrder/index.vue'
    import ImoocFlyBox from '/@/components/ImoocFlyBox/index.vue'
    import ScheduleView from '/@/components/ScheduleView/index.vue'
    import SalesRank from '/@/components/SalesRank/index.vue'
    // import SalesList from '/@/components/SalesList/index.vue'
    import SalesList from '/@/components/SalesList/index1.vue'

    export default {
        name: "Home",
        components:{ImoocContainer,imoocLoading,TopHeader,TotalUser,AverageAge,TotalDevice,TotalGender,TotalRider,HotCategory,CenterHeader,TransformCategory,OrderMap,RealTimeOrder,ImoocFlyBox,ScheduleView,SalesRank,SalesList},
        setup(){
            const loading = ref(true)
            const screenData = useScreenData()
            onMounted(()=>{
                setTimeout(() => {
                    loading.value = false
                }, 200)
            })

            return{
                loading,
                ...screenData
            }
        }
    }
</script>

<style scoped lang="scss">
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
        #imooc-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .header {
                width: 100%;
                margin-top: 10px;
                height: 167px;
            }

            .separator-wrapper {
                width: 100%;
                height: 10px;

                .separator {
                    width: 100%;
                    height: 10px;
                    background: #5c5859;
                    filter: blur(0);
                    backdrop-filter: blur(0);
                }
            }

            .center {
                width: 100%;
                flex: 1;
                display: flex;

                .left {
                    flex: 0 0 860px;
                    display: flex;
                    flex-direction: column;
                    width: 860px;
                    height: 100%;
                    margin: 0 10px;
                    box-sizing: border-box;
                    background: #3c3d40;

                    .left1 {
                        height: 300px;
                    }

                    .left2 {
                        height: 320px;
                    }

                    .left3 {
                        height: 280px;
                    }

                    .left4 {
                        height: 230px;
                    }

                    .left5 {
                        height: 360px;
                    }

                    .left6 {
                        height: 360px;
                    }

                    & > div {
                        margin-bottom: 20px;
                    }
                }

                .right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    margin: 0 10px;
                    max-width: 2960px;
                    overflow: hidden;

                    .right-top1 {
                        width: 100%;
                        height: 206px;
                        margin-bottom: 20px;
                    }

                    .right-top2 {
                        width: 100%;
                        height: 48px;
                        margin-bottom: 20px;
                    }

                    .right-bottom {
                        flex: 1;
                        display: flex;

                        .right-left {
                            display: flex;
                            flex-direction: column;
                            width: 1917px;

                            .right-left1 {
                                height: 999px;
                            }

                            .right-left2 {
                                height: 60px;
                                margin-top: 20px;
                            }

                            .right-left3 {
                                height: 350px;
                                margin-top: 10px;
                            }

                            .right-left4 {
                                height: 220px;
                                margin-top: 10px;
                            }
                        }

                        .right-right {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            margin-left: 10px;

                            .right-right1 {
                                width: 100%;
                                height: 999px;
                                padding-right: 5px;
                                box-sizing: border-box;
                            }

                            .right-right2 {
                                width: 100%;
                                flex: 1;
                                margin-top: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
