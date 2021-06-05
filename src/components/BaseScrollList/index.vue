<template>
    <div class="base-scroll-list" :id="id">
        <div class="base-scroll-list-header"
             :style="{
               background:actualConfig.headerBg,
               height:actualConfig.headerHeight + 'px',
               fontSize:actualConfig.headerFontSize+'px',
               color:actualConfig.headerColor
               }"
        >
            <div class="header-item base-scroll-list-text"
                 v-for="(headerItem,i) in headerData"
                 :key="headerItem+i"
                 :style="{
                     width:columnWidths[i] + 'px',
                     ...headerStyle[i],
                 }"
                 :align="align[i]"
                 v-html="headerItem"
            />

        </div>
        <div class="base-scroll-list-rows-wrapper"
             :style="{
                height:height - actualConfig.headerHeight + 'px'
             }"
        >
            <div class="base-scroll-list-rows base-scroll-list-text"
                 v-for="(rowData,index) in currentRowsData"
                 :key="rowData.rowIndex"
                 :style="{
                height:rowHeights[index] + 'px',
                lineHeight:rowHeights[index] + 'px',
                background:rowData.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
                fontSize:actualConfig.rowFontSize+'px',
                color:actualConfig.rowColor
             }"
            >
                <div class="base-scroll-list-columns"
                     v-for="(colData,colIndex) in rowData.data"
                     :key="colData + colIndex"
                     :style="{
            width:columnWidths[colIndex] + 'px',
            ...rowStyle[colIndex]
          }"
                     :align="align[colIndex]"
                     v-html="colData"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import {v4 as uuidv4} from 'uuid'
    import {useScreen} from '../../hooks/useScreen'
    import {cloneDeep, assign} from 'lodash'

    const defaultConfig = {
        // 标题数据
        header: [],
        // 标题样式
        headerStyle: [],
        // 行样式
        rowStyle: [],
        // 行背景色
        rowBg: [],
        // 标题背景色
        headerBg: 'rgb(90,90,90)',
        // 标题高度
        headerHeight: 35,
        // 标题是否展示序号
        headerIndex: false,
        // 序号列标题的样式
        headerIndexContent: '#',
        // 序号列标题的样式
        headerIndexStyle: {width: '50px'},
        // 序号列的数据内容
        headerIndexData:[],
        // 序号列内容的样式
        rowIndexStyle: {width: '50px'},
        // 数组项，二维数组
        data: [],
        // 每页显示数据量
        rowNum: 10,
        // 居中方式
        align: [],
        // 标题字体大小
        headerFontSize: 28,
        // 行字体大小
        rowFontSize: 28,
        //
        headerColor: '#fff',
        rowColor: '#000',
        // 移动的位置
        moveNum: 1,
        // 动画间隔时间
        duration: 2000,


    }
    export default {
        name: 'BaseScrollList',
        props: {
            config: {
                type: Object,
                default: () => {
                }
            },

        },
        setup(props) {
            const id = `base-scroll-list-${uuidv4()}`
            const {width, height} = useScreen(id)
            const actualConfig = ref([])
            const headerData = ref([])
            const headerStyle = ref([])
            const rowStyle = ref([])
            const columnWidths = ref([])
            const rowBg = ref([])
            const rowHeights = ref([])
            const rowsData = ref([])
            const currentRowsData = ref([])
            const currentIndex = ref(0) // 动画指针
            const rowNum = ref(defaultConfig.rowNum)
            const align = ref([])
            const isAnimationStart = ref(true)
            let avgHeight

            const handleHeader = (config) => {
                config.value = assign(defaultConfig, config)
                const _headerData = cloneDeep(config.header)
                const _headerStyle = cloneDeep(config.headerStyle)
                const _rowStyle = cloneDeep(config.rowStyle)
                const _rowsData = cloneDeep(config.data)
                const _align = cloneDeep(config.align)
                if (config.header.length === 0) {
                    return
                }

                if (config.headerIndex) {
                    _headerData.unshift(config.headerIndexContent)
                    _headerStyle.unshift(config.headerIndexStyle)
                    _rowStyle.unshift(config.rowIndexStyle)
                    _align.unshift('center')
                    _rowsData.forEach((row, index) => {
                        if(config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index]){
                            row.unshift(config.headerIndexData[index])
                        }else{
                            row.unshift(index + 1)
                        }
                    })
                }
                // 动态计算header中每一列的宽度
                let usedWidth = 0, usedColumnNum = 0;
                // 判断是否自定义width
                _headerStyle.forEach(style => {
                    if (style.width) {
                        usedWidth += +style.width.replace('px', '')
                        usedColumnNum++
                    }
                })
                // 如果计算列宽时，使用剩余的宽度除以剩余的列数
                const avgWidth = (width.value - usedWidth) / (_headerData.length - usedColumnNum)
                const _columnWidths = new Array(_headerData.length).fill(avgWidth)

                _headerStyle.forEach((style, index) => {
                    if (style.width) {
                        const headerWidth = +style.width.replace('px', '')

                        _columnWidths[index] = headerWidth
                    }
                })

                columnWidths.value = _columnWidths
                headerData.value = _headerData
                headerStyle.value = _headerStyle
                align.value = _align
                rowStyle.value = _rowStyle
                const {rowNum} = config
                if(_rowsData.length >= rowNum && _rowsData.length < rowNum * 2){
                  rowsData.value = [..._rowsData,..._rowsData].map((item,index)=>({
                    data:item,
                    rowIndex:index
                  }))
                }else{
                  rowsData.value = _rowsData.map((item,index)=>({
                    data:item,
                    rowIndex:index
                  }))
                }

            }

            const handleRows = (config) => {
                // 动态计算每行数据的高度
                const {headerHeight} = config
                rowNum.value = config.rowNum
                const unusedHeight = height.value - headerHeight

                // 如果rowNum大于时机数据长度，则以实际数据长度为准
                if (rowsData.value.length < rowNum.value) {
                    rowNum.value = rowsData.value.length
                }
                avgHeight = unusedHeight / rowNum.value
                rowHeights.value = new Array(rowNum.value).fill(avgHeight)

                // 获取行背景色
                if (config.rowBg) {
                    rowBg.value = config.rowBg
                }
            }

            const startAnimation = async () => {
                console.log(isAnimationStart.value);
                if(!isAnimationStart.value) return
                const config = actualConfig.value
                const {data, rowNum, duration, moveNum} = config
                const totalLength = rowsData.value.length
                if (totalLength < rowNum) return
                const index = currentIndex.value
                const _rowsData = cloneDeep(rowsData.value)
                // 将数据重新头尾相连
                let rows = _rowsData.slice(index)
                rows.push(..._rowsData.slice(0, index))
                currentRowsData.value = rows
                // 先将所有行的高度还原
                rowHeights.value = new Array(totalLength).fill(avgHeight)
                const waitTime = 300
                if(!isAnimationStart.value) return
                await new Promise(resolve => setTimeout(resolve, waitTime))
                // 将moveNum的行高度设置0
                rowHeights.value.splice(0,moveNum,...new Array(moveNum).fill(0))
                currentIndex.value += moveNum

                //是否到达最后一组
                const isLast = currentIndex.value - totalLength
                if(isLast >=0){
                    currentIndex.value = isLast
                }
                if(!isAnimationStart.value) return
                await new Promise(resolve => setTimeout(resolve, duration - waitTime))

                // await startAnimation()

            }
            const stopAnimation = ()=>{
                isAnimationStart.value = false
            }
            const update = ()=>{
                stopAnimation()
                const _actualConfig = assign(defaultConfig, props.config)
                rowsData.value = _actualConfig.data || []
                handleHeader(_actualConfig)
                handleRows(_actualConfig)
                console.log('_actualConfig:',_actualConfig);
                actualConfig.value = _actualConfig
                // 展示动画
                isAnimationStart.value = true
                startAnimation()
            }

            const stop = watch(()=>props.config,()=>{
                console.log(999);
                update()
                stop()
            })

            return {
                id,
                headerData,
                headerStyle,
                actualConfig,
                columnWidths,
                rowsData,
                rowHeights,
                rowStyle,
                rowBg,
                align,
                currentRowsData,
                height,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .base-scroll-list {
        width: 100%;
        height: 100%;

        .base-scroll-list-text {
            /*padding: 0 10px;*/
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
        }

        .base-scroll-list-header {
            display: flex;
            font-size: 15px;
            align-items: center;

        }

        .base-scroll-list-rows-wrapper {
            overflow: hidden;
            .base-scroll-list-rows {
                display: flex;
                align-items: center;
                transition: all 0.3s linear;
                .base-scroll-list-columns {
                }
            }
        }


        /*.base-scroll-list-text {*/
        /*    //padding: 0 10px;*/
        /*    box-sizing: border-box;*/
        /*    overflow: hidden;*/
        /*    white-space: nowrap;*/
        /*    text-overflow: ellipsis;*/
        /*}*/
        /*.base-scroll-list-header {*/
        /*    display: flex;*/
        /*    align-items: center;*/
        /*    font-size: 15px;*/

        /*    .header-item {}*/
        /*}*/

        /*.base-scroll-list-rows-wrapper {*/
        /*    overflow: hidden;*/

        /*    .base-scroll-list-rows {*/
        /*        display: flex;*/
        /*        align-items: center;*/
        /*        transition: all 0.3s linear;*/

        /*        .base-scroll-list-columns {*/
        /*            height: 100%;*/
        /*        }*/
        /*    }*/
        /*}*/
    }
</style>
