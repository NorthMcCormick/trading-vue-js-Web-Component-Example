<template>
<!-- TradingVueJs 101 (example from 'Getting Started' ) -->

<trading-vue ref="chartPrimary" :data="chart" :width="this.width" :height="this.height"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText">
</trading-vue>
</template>

<script>
import TradingVue from 'trading-vue-js';
import Data from './data.json';

export default {
    name: 'TradingVueWc',
    components: { TradingVue },
    methods: {
        onResize() {
            this.width = this.$refs.chartPrimary.$el.parentElement.parentElement.clientWidth;
            this.height = this.$refs.chartPrimary.$el.parentElement.parentElement.clientHeight;
        }
    },
    mounted() {
        this.onResize();

        this.ro = new ResizeObserver(this.onResize).observe(this.$refs.chartPrimary.$el.parentElement.parentElement);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    destroyed () {
        delete this.ro;
    },
    data() {
        return {
            chart: Data,
            width:  0,
            height:  0,
            ro: null,
            colors: {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333',
            },
        }
    }
}
</script>
