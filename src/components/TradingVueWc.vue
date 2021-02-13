<template>
<!-- TradingVueJs 101 (example from 'Getting Started' ) -->

<trading-vue ref="chartPrimary" :data="chart" :width="this.width" :height="this.height"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText"
    :overlays="overlays"
    :night="night">
</trading-vue>
</template>

<script>
import TradingVue from 'trading-vue-js';

import Overlays from 'tvjs-overlays'

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

        }
    },
    data() {
        return {
            width:  0,
            height:  0,
            night: true,
            ro: null,
            overlays: Object.values(Overlays)
        }
    }
}
</script>
