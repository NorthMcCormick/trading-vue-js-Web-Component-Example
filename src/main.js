import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';

import TradingVueWc from './components/TradingVueWc.vue';

// Configure Vue to ignore the element name when defined outside of Vue.
Vue.config.ignoredElements = [
  'trading-vue'
];

// Enable the plugin
Vue.use(vueCustomElement);

// Register your component
Vue.customElement('trading-vue', TradingVueWc, {
  // Additional Options: https://github.com/karol-f/vue-custom-element#options
});