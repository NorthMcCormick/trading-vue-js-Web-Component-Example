<template>
<!-- TradingVueJs 101 (example from 'Getting Started' ) -->

<trading-vue ref="chartPrimary" :data="dataCube" :width="this.width" :height="this.height" :titleTxt="this.titleText"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText"
    :overlays="overlays"
    :night="night"
    :toolbar="toolbar">
</trading-vue>
</template>

<script>
import { TradingVue, DataCube } from 'trading-vue-js';


import Alarms from './Alarms.vue';

export default {
    name: 'TradingVueWc',
    components: { TradingVue },
    methods: {
        onResize() {
            this.width = this.$refs.chartPrimary.$el.parentElement.parentElement.clientWidth;
            this.height = this.$refs.chartPrimary.$el.parentElement.parentElement.clientHeight;
        },
        addCandles(candles) {
            if (this.init) {
                for (const candle of candles) {
                    console.log('Updating candle', candle);
                    
                    this.dataCube.update({
                        candle: candle
                    })
                }
            } else {
                this.dataCube.set('chart.data', candles);

                this.init = true;
            }
        },
        reset() {
            this.dataCube.agg.clear()
            this.dataCube.set('chart.data', [])

            this.init = false;
        }
    },
    mounted() {
        console.log('Mounted :)');
        this.onResize();

        this.ro = new ResizeObserver(this.onResize).observe(this.$refs.chartPrimary.$el.parentElement.parentElement);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    destroyed () {
        delete this.ro;
    },
    computed: {
        colors() {
            return this.night ? {} : {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333'
            }
        },
    },
    props: {
        chart: {
            default: function() {
                return {};
            },

        },
        titleText: {
            default: ''
        },
        toolbar: {
            default: false
        },
        timeFrame: {
            default: '1h'
        }
    },
    data() {
        return {
            init: false,
            width:  0,
            height:  0,
            night: true,
            ro: null,
            overlays: [
                // ...Object.values(Overlays),
                Alarms
            ],
            dataCube: new DataCube(this.chart)
        }
    },
    watch: {
        chart: function(a, b) {
            console.log('AB', a, b);
            // Toolbar Disappears when data is loaded asynchronously
            // see https://github.com/tvjsx/trading-vue-js/issues/119
            this.$refs.chartPrimary.resetChart(false);
        },
        timeFrame: function() {
            console.log('Timeframe changed');
        }
    }
}
</script>
