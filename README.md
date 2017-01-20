# Vue Inview
Event that fired as soon as element appears in the user's viewport.

## Install
```sh
npm install --save https://github.com/duck8823/vue-inview.git
```

## Synopsis
```html
<div id="app">
    <div vue-inview="hoge">
        {{ fuga }}
    </div>
</div>
```
```js
import InView from 'v-inview';
Vue.use(InView);
new Vue({
    data: {
        fuga: 'Hello Vue!'
    },
    created: function () {
        this.$onBottom(function () {
            console.log('onBottom');
        });
        this.$onTop(function () {
            console.log('onTop');
        });
    },
    methods: {
        hoge: function () {
            console.log('inview');
        }
    }
}).$mount('$app');
```
