# trading-vue-js Web Component Example

## Why?

[trading-vue-js](https://github.com/tvjsx/trading-vue-js) is freaking awesome and I'd really like to be able to use it in my [StencilJS](https://stenciljs.com/) (web component) based project. This repo serves as an example of how this can be done.

## How?

Using [vue-custom-element](https://github.com/karol-f/vue-custom-element) we can create a custom vue component that wraps the `trading-vue` component provided by TVJS.

It makes sense in my use case to build the IO in need in a custom component that wraps trading-vue. 

This repo is just an example. To use these clone the repo and apply the code to your specific use case.

## What

`/src/components/TradingVueWc.vue`: The wrapper component where you'd add your custom IO to the outside world
`/src/main.js`: The entrypoint for our web component "library" that exports our custom components.
`/public/index.html`: The actual javascript example of how to use the custom web component. To implement the component in your own code you would import the dist js and implement your element.
`/data/data.json`: Sample data

## Ideas

- Is there a way to create types for this all?
- Someone who is a lot more familiar may be able to build a wrapper that matches the API for trading-vue(?) eliminating the need for a custom wrapper. Can that be done with the overlays and all??
- Add an examples of this being used in other works like Angular, React, StencilJS?

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
